import { NextResponse } from "next/server";
import { runAgent } from "@/lib/agent/run";
import { PHONE } from "@/lib/agent/knowledge";
import type { AgentTurn } from "@/lib/agent/types";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 30;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentByIp.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

function cleanTurns(value: unknown): AgentTurn[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 60) return null;
  const turns: AgentTurn[] = [];
  for (const item of value) {
    const role = (item as { role?: unknown })?.role;
    const content = (item as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.replace(/[ \t]+/g, " ").trim().slice(0, 800);
    if (text) turns.push({ role, content: text });
  }
  return turns.at(-1)?.role === "user" ? turns : null;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: `Too many messages. Please call ${PHONE}.` }, { status: 429 });
  }
  let body: { messages?: unknown; page?: unknown; conversationId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const messages = cleanTurns(body.messages);
  if (!messages) return NextResponse.json({ error: "Send a short message to start." }, { status: 400 });
  const page = typeof body.page === "string" && body.page.startsWith("/") ? body.page.slice(0, 200) : "/";
  const conversationId =
    typeof body.conversationId === "string" && /^[a-zA-Z0-9-]{8,80}$/.test(body.conversationId)
      ? body.conversationId
      : "anonymous";

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      try {
        const reply = await runAgent({ conversationId, messages, page }, (delta) => send({ delta }));
        send({ done: true, ...reply });
      } catch (err) {
        console.error("[chat]", err instanceof Error ? err.message : err);
        const message = `Sorry, I didn't catch that. Please send it again, or call ${PHONE}.`;
        send({ delta: message });
        send({ done: true, message, leadSent: false });
      } finally {
        controller.close();
      }
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } });
}
