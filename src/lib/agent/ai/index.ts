import { geminiProvider } from "@/lib/agent/ai/gemini";
import type { AIProvider } from "@/lib/agent/ai/types";

/** Gemini only for now (same as Pure Home). Key: GEMINI_API_KEY, server-side only. */
export function getAIProvider(): AIProvider {
  return geminiProvider();
}
