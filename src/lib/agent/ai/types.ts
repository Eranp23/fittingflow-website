export type AgentMessage =
  | { role: "user" | "assistant"; content: string }
  | { role: "tool"; name: string; content: string };

export type AgentTool = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};

export type AgentToolCall = {
  name: string;
  arguments: Record<string, unknown>;
};

export type ProviderRequest = {
  system: string;
  messages: AgentMessage[];
  tools?: AgentTool[];
};

export type ProviderResponse = {
  text: string;
  toolCalls: AgentToolCall[];
};

export type ProviderChunk = {
  textDelta?: string;
  toolCall?: AgentToolCall;
};

/** The rest of the app talks only to this interface. */
export interface AIProvider {
  id: "gemini";
  complete(request: ProviderRequest): Promise<ProviderResponse>;
  stream?(request: ProviderRequest): AsyncGenerator<ProviderChunk>;
}
