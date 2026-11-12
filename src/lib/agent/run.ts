import { getAIProvider } from "@/lib/agent/ai";
import type { AgentMessage, AgentTool } from "@/lib/agent/ai/types";
import { EMAIL, PHONE, knowledgeForPrompt } from "@/lib/agent/knowledge";
import {
  LEAD_FIELDS,
  canSend,
  isEmail,
  leadSummary,
  looksLikePersonName,
  mergeLead,
  missingFields,
  phoneDigits,
} from "@/lib/agent/qualify";
import { loadConversation, saveConversation } from "@/lib/agent/store";
import type { AgentLead, AgentTurn } from "@/lib/agent/types";
import { forwardEnquiry } from "@/lib/api";

const tools: AgentTool[] = [
  {
    name: "record_details",
    description:
      "Save any new lead details the visitor just gave. Call as soon as you learn a field. Never invent values.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        business: { type: "string", description: "Boutique or shop name" },
        businessType: { type: "string", description: "Bridal boutique, alteration shop, tailor, formalwear, other" },
        locations: { type: "string", description: "How many locations" },
        currentSoftware: { type: "string" },
        interest: { type: "string", description: "What they want: demo, trial help, free switch, pricing question, and so on" },
        preferredTime: { type: "string", description: "When they prefer a call. A note, not a booking." },
      },
    },
  },
  {
    name: "send_lead",
    description:
      "Email the lead to the FittingFlow team. Call only after you read the details back and the visitor said yes.",
    parameters: { type: "object", properties: { confirmed: { type: "boolean" } }, required: ["confirmed"] },
  },
];

async function systemPrompt(lead: AgentLead): Promise<string> {
  return `You are a friendly product specialist at FittingFlow, chatting with a visitor on fittingflow.com.
Answer the visitor's actual question first, in 1 to 3 short sentences, using only the facts below. No pressure, no sales script.
Then end with one short, helpful next step: start the 30-day free trial, see a short demo with the team, or ask one question about their shop (type, number of locations, current software).
If they want a demo, a call, help with the free switch, or a custom plan, collect their details one at a time: name, phone, email, boutique or shop name. Name, phone and email are required. Then read the details back, ask "Does that look right?", and call send_lead only after they say yes.
Do not ask for contact details in every message. Do not book a clock time; a preferred time is only a note and the team will reach out to confirm.
If they say it is too expensive: acknowledge it, mention the 30-day free trial and the free switch, and suggest the plan that fits their size.
Never criticize other software. Never invent prices, discounts, features, integrations, certifications or customer names.
If you don't know, say so and offer ${PHONE} or ${EMAIL}.
Plain text only, no markdown, no em dashes. Share links as plain URLs.
Missing for a lead: ${missingFields(lead).join(", ") || "none"}.
Already collected:
${leadSummary(lead) || "Nothing yet."}

${await knowledgeForPrompt()}`;
}

function nextQuestion(lead: AgentLead): string {
  const next = missingFields(lead)[0];
  if (next === "name") return "What's your name?";
  if (next === "phone") return "What's the best phone number to reach you?";
  if (next === "email") return "And your email?";
  if (next === "boutique or shop name") return "What's the name of your boutique or shop?";
  return `Here's what I have:\n${leadSummary(lead)}\nDoes that look right?`;
}

function isYes(text: string): boolean {
  return /^(yes|yeah|yep|yup|sure|ok|okay|correct|that's right|thats right|looks good|sounds good)\b/i.test(text.trim());
}

const CONFIRM = /look right|sound right|that right|correct\?/i;

/** Plain answers (a name, a number, an email, "yes") are handled without calling Gemini. */
function localReply(lead: AgentLead, messages: AgentTurn[]): { lead: AgentLead; send: boolean } | null {
  const latest = messages.at(-1);
  const asked = [...messages].reverse().find((t) => t.role === "assistant")?.content ?? "";
  if (!latest || latest.role !== "user" || !asked) return null;
  const reply = latest.content.trim();
  if (/[?]/.test(reply) || /^(how|what|why|when|where|who|can|do|does|is|are)\b/i.test(reply)) return null;
  if (CONFIRM.test(asked) && isYes(reply)) return { lead, send: true };
  if (/your name/i.test(asked) && looksLikePersonName(reply)) return { lead: mergeLead(lead, { name: reply }), send: false };
  if (/phone|number/i.test(asked) && phoneDigits(reply).length >= 10) return { lead: mergeLead(lead, { phone: reply }), send: false };
  if (/email/i.test(asked) && isEmail(reply)) return { lead: mergeLead(lead, { email: reply }), send: false };
  if (/boutique or shop/i.test(asked) && reply.length >= 2 && reply.length <= 80) {
    return { lead: mergeLead(lead, { business: reply }), send: false };
  }
  return null;
}

async function sendLead(lead: AgentLead, messages: AgentTurn[], page: string) {
  const transcript = messages
    .slice(-14)
    .map((t) => `${t.role === "user" ? "Visitor" : "Chat"}: ${t.content}`)
    .join("\n");
  return forwardEnquiry({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.business,
    subject: `Website chat lead: ${lead.business || lead.name}`.slice(0, 300),
    message: `Lead from the AI chat on ${page}.\n\n${leadSummary(lead)}\n\nConversation:\n${transcript}`.slice(0, 4900),
    flag: /demo/i.test(`${lead.interest} ${transcript}`) ? "demo" : "contact",
  });
}

function thanks(lead: AgentLead): string {
  const first = lead.name.split(/\s+/)[0];
  return `Thanks${first ? `, ${first}` : ""}! I've sent your details to the FittingFlow team and they'll reach out soon. You can also call ${PHONE}.`;
}

function asPatch(args: Record<string, unknown>): Partial<AgentLead> {
  const patch: Partial<AgentLead> = {};
  for (const key of LEAD_FIELDS) if (typeof args[key] === "string") patch[key] = args[key] as string;
  return patch;
}

export type AgentReply = { message: string; leadSent: boolean };

export async function runAgent(
  input: { conversationId: string; messages: AgentTurn[]; page: string },
  onDelta?: (delta: string) => void,
): Promise<AgentReply> {
  const conversation = loadConversation(input.conversationId);
  let lead = conversation.lead;
  let leadSent = false;

  const quick = localReply(lead, input.messages);
  if (quick) {
    lead = quick.lead;
    let message = nextQuestion(lead);
    if (quick.send) {
      if (conversation.status === "sent") {
        message = `You're all set, your details are already with the team. Anything else I can help with?`;
      } else if (canSend(lead)) {
        const saved = await sendLead(lead, input.messages, input.page);
        if (saved.ok) {
          conversation.status = "sent";
          leadSent = true;
          message = thanks(lead);
        } else {
          message = `Sorry, I couldn't send that just now. Please call ${PHONE} or email ${EMAIL}.`;
        }
      }
    }
    onDelta?.(message);
    conversation.lead = lead;
    saveConversation(conversation);
    return { message, leadSent };
  }

  const provider = getAIProvider();
  const thread: AgentMessage[] = input.messages.slice(-12).map((t) => ({ role: t.role, content: t.content }));
  let text = "";
  for (let step = 0; step < 3; step += 1) {
    const request = { system: await systemPrompt(lead), messages: thread, tools };
    let responseText = "";
    const calls: { name: string; arguments: Record<string, unknown> }[] = [];
    if (provider.stream) {
      for await (const chunk of provider.stream(request)) {
        if (chunk.textDelta) {
          responseText += chunk.textDelta;
          onDelta?.(chunk.textDelta);
        }
        if (chunk.toolCall) calls.push(chunk.toolCall);
      }
    } else {
      const response = await provider.complete(request);
      responseText = response.text;
      calls.push(...response.toolCalls);
      if (responseText) onDelta?.(responseText);
    }
    text = `${text}${responseText}`;
    if (!calls.length) break;

    thread.push({ role: "assistant", content: responseText || "Noted." });
    for (const call of calls) {
      if (call.name === "record_details") {
        lead = mergeLead(lead, asPatch(call.arguments));
        thread.push({
          role: "tool",
          name: call.name,
          content: JSON.stringify({ saved: true, missing: missingFields(lead), summary: leadSummary(lead) }),
        });
      } else if (call.name === "send_lead") {
        if (call.arguments.confirmed !== true || !canSend(lead) || conversation.status === "sent") {
          thread.push({
            role: "tool",
            name: call.name,
            content: JSON.stringify({
              sent: false,
              reason: conversation.status === "sent" ? "Already sent." : "Need a confirmed name, phone and email first.",
              missing: missingFields(lead),
            }),
          });
          continue;
        }
        const saved = await sendLead(lead, input.messages, input.page);
        if (saved.ok) {
          conversation.status = "sent";
          leadSent = true;
        }
        thread.push({ role: "tool", name: call.name, content: JSON.stringify({ sent: saved.ok }) });
      }
    }
    if (leadSent && !responseText) {
      const done = thanks(lead);
      onDelta?.(done);
      text = done;
      break;
    }
    if (text && !calls.some((c) => c.name === "send_lead")) break;
  }

  const message = text.trim() || nextQuestion(lead);
  if (!text.trim()) onDelta?.(message);
  conversation.lead = lead;
  saveConversation(conversation);
  return { message, leadSent };
}
