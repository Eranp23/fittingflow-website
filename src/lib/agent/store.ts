import { emptyLead } from "@/lib/agent/qualify";
import type { StoredConversation } from "@/lib/agent/types";

/** Chat state in memory (one server). Kept 6 hours. Nothing is written to disk. */
const conversations = new Map<string, StoredConversation>();
const TTL_MS = 6 * 60 * 60 * 1000;

export function loadConversation(id: string): StoredConversation {
  const now = Date.now();
  for (const [key, value] of conversations) if (now - value.updatedAt > TTL_MS) conversations.delete(key);
  return conversations.get(id) ?? { id, updatedAt: now, status: "open", lead: emptyLead() };
}

export function saveConversation(conversation: StoredConversation): void {
  if (conversation.id === "anonymous") return;
  conversation.updatedAt = Date.now();
  conversations.set(conversation.id, conversation);
}
