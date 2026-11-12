export type AgentTurn = { role: "user" | "assistant"; content: string };

export type AgentLead = {
  name: string;
  phone: string;
  email: string;
  business: string;
  businessType: string;
  locations: string;
  currentSoftware: string;
  interest: string;
  preferredTime: string;
};

export type StoredConversation = {
  id: string;
  updatedAt: number;
  status: "open" | "sent";
  lead: AgentLead;
};
