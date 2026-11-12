"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

type Turn = { role: "user" | "assistant"; content: string };

const PHONE = "(888) 839-0060";
/** Same WhatsApp button and number as the live site. */
const WHATSAPP_URL = "https://wa.me/19296996150";
const WHATSAPP_ICON =
  "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.25 8.23Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.47-.01a.9.9 0 0 0-.65.31c-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.11-.23-.17-.48-.29Z";
const GREETING = "Hi! I'm the FittingFlow assistant. Ask me anything about running your boutique or alteration shop on FittingFlow.";
const SUGGESTIONS = ["How much does it cost?", "Can you move my data from BridalLive?", "Does it work for alteration shops?", "I'd like a demo"];

/** AI chat (Gemini, server-side). Same design as Pure Home's chat, in FittingFlow colors. */
export default function AiChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Turn[]>([{ role: "assistant", content: GREETING }]);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const sending = useRef(false);
  const conversationId = useRef("");

  useEffect(() => {
    try {
      const key = "ff-chat-id";
      conversationId.current = sessionStorage.getItem(key) || crypto.randomUUID();
      sessionStorage.setItem(key, conversationId.current);
    } catch {
      conversationId.current = crypto.randomUUID();
    }
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      field.current?.focus();
      void trackEvent("chat_open", { page: pathname });
    }
  }, [open, pathname]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending.current) return;
    sending.current = true;
    const history = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(history);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(1), page: pathname, conversationId: conversationId.current }),
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || `Please call ${PHONE}.`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let shown = "";
      let started = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";
        for (const chunk of chunks) {
          const line = chunk.trim();
          if (!line.startsWith("data:")) continue;
          const data = JSON.parse(line.slice(5).trim()) as { delta?: string; done?: boolean; leadSent?: boolean };
          if (data.delta) {
            shown += data.delta;
            const content = shown;
            setLoading(false);
            setMessages((current) => {
              if (!started) return [...current, { role: "assistant", content }];
              const next = [...current];
              next[next.length - 1] = { role: "assistant", content };
              return next;
            });
            started = true;
          }
          if (data.done && data.leadSent) {
            void trackEvent("generate_lead", { lead_type: "chat", page: pathname });
          }
        }
      }
      if (!shown) throw new Error(`Please call ${PHONE}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Please call ${PHONE}.`);
    } finally {
      sending.current = false;
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  return (
    <div className="fixed right-2.5 bottom-3 z-[60] md:right-6 md:bottom-6 page-urbanist">
      {open ? (
        <section
          aria-label="FittingFlow chat"
          className="flex h-[min(34rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_16px_50px_rgba(25,30,73,0.25)]"
        >
          <header className="flex items-start justify-between gap-3 bg-[#191E49] px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F22DCE] text-white">
                <SparkIcon />
              </span>
              <div>
                <p className="text-sm font-bold">FittingFlow</p>
                <p className="text-xs text-white/75">AI assistant · replies in seconds</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-full px-2 text-xl leading-none text-white/80 hover:text-white"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </header>

          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 pt-4 pb-2">
            {messages.map((turn, index) => (
              <div
                key={index}
                className={
                  turn.role === "user"
                    ? "ml-8 whitespace-pre-wrap rounded-2xl rounded-br-md bg-[#F22DCE] px-3 py-2 text-sm text-white"
                    : "mr-6 whitespace-pre-wrap rounded-2xl rounded-bl-md bg-pink-50 px-3 py-2 text-sm text-[#191E49]"
                }
              >
                {turn.role === "assistant" ? withLinks(turn.content) : turn.content}
              </div>
            ))}
            {loading && <p className="mr-6 rounded-2xl bg-pink-50 px-3 py-2 text-sm text-gray-500">Typing…</p>}
            {error && <p className="text-sm text-red-700">{error}</p>}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="rounded-full border border-pink-200 bg-white px-3 py-1.5 text-left text-xs font-semibold text-[#191E49] hover:border-[#F22DCE]"
                    onClick={() => void send(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-gray-200 p-3">
            <label className="sr-only" htmlFor="ff-chat-input">Message</label>
            <input
              id="ff-chat-input"
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about FittingFlow"
              maxLength={600}
              className="w-full rounded-full border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-[#F22DCE]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-full bg-blue-600 px-4 text-sm font-bold text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
          <p className="px-3 pb-2 text-[10px] text-gray-400">AI answers can be wrong. The team confirms details before you sign up.</p>
        </section>
      ) : (
        <div className="flex flex-col items-end gap-2 md:gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          onClick={() => void trackEvent("whatsapp_click", { page: pathname })}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] md:h-14 md:w-14 shadow-lg ring-2 ring-white transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white md:h-8 md:w-8" aria-hidden="true">
            <path d={WHATSAPP_ICON} />
          </svg>
        </a>
        <button
          type="button"
          aria-label="Open FittingFlow chat"
          className="flex items-center gap-3 rounded-full bg-[#F22DCE] p-1.5 text-white shadow-[0_14px_36px_rgba(242,45,206,0.4)] ring-2 ring-white md:py-2 md:pr-5 md:pl-2"
          onClick={() => setOpen(true)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#F22DCE] md:h-11 md:w-11">
            <SparkIcon className="h-6 w-6" />
          </span>
          <span className="hidden text-left leading-tight md:block">
            <span className="block text-base font-bold">Questions?</span>
            <span className="block text-xs font-semibold text-white/90">Ask our AI</span>
          </span>
        </button>
        </div>
      )}
    </div>
  );
}

function withLinks(text: string) {
  return text.split(/(https?:\/\/[^\s)]+)/g).map((part, i) => {
    if (!/^https?:\/\//.test(part)) return part;
    const url = part.replace(/[.,!?]+$/, "");
    const trailing = part.slice(url.length);
    const label = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    return (
      <span key={i}>
        <a href={url} className="font-semibold underline underline-offset-2">{label}</a>
        {trailing}
      </span>
    );
  });
}

function SparkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2.2 13.7 8.3 19.8 10 13.7 11.7 12 17.8 10.3 11.7 4.2 10 10.3 8.3 12 2.2Z" />
      <path d="M18.2 14.2 19 16.4 21.2 17.2 19 18 18.2 20.2 17.4 18 15.2 17.2 17.4 16.4 18.2 14.2Z" />
    </svg>
  );
}
