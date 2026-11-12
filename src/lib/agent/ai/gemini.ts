import type {
  AgentMessage,
  AgentTool,
  AIProvider,
  ProviderChunk,
  ProviderRequest,
  ProviderResponse,
} from "@/lib/agent/ai/types";

type GeminiPart =
  | { text: string }
  | { functionCall: { name: string; args?: Record<string, unknown> } }
  | { functionResponse: { name: string; response: Record<string, unknown> } };

function partsFor(message: AgentMessage): GeminiPart[] {
  if (message.role === "tool") {
    let response: Record<string, unknown> = { result: message.content };
    try {
      const parsed = JSON.parse(message.content) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        response = parsed as Record<string, unknown>;
      }
    } catch {
      response = { result: message.content };
    }
    return [{ functionResponse: { name: message.name, response } }];
  }
  return [{ text: message.content }];
}

function toContents(messages: AgentMessage[]) {
  const contents: { role: "user" | "model"; parts: GeminiPart[] }[] = [];
  for (const message of messages) {
    const role = message.role === "assistant" ? "model" : "user";
    const parts = partsFor(message);
    const previous = contents.at(-1);
    if (previous && previous.role === role) {
      previous.parts.push(...parts);
    } else {
      contents.push({ role, parts });
    }
  }
  return contents;
}

function requestBody(request: ProviderRequest) {
  return {
    systemInstruction: { parts: [{ text: request.system }] },
    contents: toContents(request.messages),
    tools: request.tools?.length
      ? [{ functionDeclarations: request.tools satisfies AgentTool[] }]
      : undefined,
    generationConfig: {
      maxOutputTokens: 400,
    },
  };
}

async function* readGeminiStream(response: Response): AsyncGenerator<ProviderChunk> {
  const reader = response.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const raw = trimmed.slice(5).trim();
      if (!raw || raw === "[DONE]") continue;
      let data: { candidates?: { content?: { parts?: GeminiPart[] } }[] };
      try {
        data = JSON.parse(raw) as typeof data;
      } catch {
        continue;
      }
      for (const part of data.candidates?.[0]?.content?.parts ?? []) {
        if ("text" in part && part.text) yield { textDelta: part.text };
        if ("functionCall" in part && part.functionCall?.name) {
          yield {
            toolCall: {
              name: part.functionCall.name,
              arguments: part.functionCall.args ?? {},
            },
          };
        }
      }
    }
  }
}

export function geminiProvider(): AIProvider {
  return {
    id: "gemini",
    async complete(request: ProviderRequest): Promise<ProviderResponse> {
      const key = process.env.GEMINI_API_KEY?.trim();
      if (!key) {
        throw new Error("GEMINI_API_KEY is not set.");
      }
      const model = process.env.GEMINI_MODEL?.trim() || "gemini-3.5-flash-lite";
      let res: Response | null = null;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": key,
              },
              signal: AbortSignal.timeout(50000),
              body: JSON.stringify(requestBody(request)),
            },
          );
          if (response.ok) {
            res = response;
            break;
          }
          const detail = await response.text();
          console.error("[gemini]", model, response.status, detail.slice(0, 240));
          if (response.status !== 503) break;
        } catch (err) {
          console.error("[gemini]", model, err instanceof Error ? err.message : err);
          break;
        }
        if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 800));
      }
      if (!res) throw new Error("Gemini request failed.");

      const data = (await res.json()) as {
        candidates?: { content?: { parts?: GeminiPart[] } }[];
      };
      const parts = data.candidates?.[0]?.content?.parts ?? [];
      const text = parts
        .map((part) => ("text" in part ? part.text : ""))
        .filter(Boolean)
        .join("\n")
        .trim();
      const toolCalls = parts.flatMap((part) => {
        if (!("functionCall" in part) || !part.functionCall?.name) return [];
        return [
          {
            name: part.functionCall.name,
            arguments: part.functionCall.args ?? {},
          },
        ];
      });
      return { text, toolCalls };
    },
    async *stream(request: ProviderRequest): AsyncGenerator<ProviderChunk> {
      const key = process.env.GEMINI_API_KEY?.trim();
      if (!key) throw new Error("GEMINI_API_KEY is not set.");
      const model = process.env.GEMINI_MODEL?.trim() || "gemini-3.5-flash-lite";
      let response: Response | null = null;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          const attemptResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": key,
              },
              signal: AbortSignal.timeout(attempt === 0 ? 50000 : 8000),
              body: JSON.stringify(requestBody(request)),
            },
          );
          if (attemptResponse.ok) {
            response = attemptResponse;
            break;
          }
          const detail = await attemptResponse.text();
          console.error("[gemini]", model, attemptResponse.status, detail.slice(0, 240));
          if (attemptResponse.status !== 503) break;
        } catch (err) {
          console.error("[gemini]", model, err instanceof Error ? err.message : err);
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      if (!response) throw new Error("Gemini request failed.");
      yield* readGeminiStream(response);
    },
  };
}
