import type { AgentLead } from "@/lib/agent/types";

export const LEAD_FIELDS = [
  "name",
  "phone",
  "email",
  "business",
  "businessType",
  "locations",
  "currentSoftware",
  "interest",
  "preferredTime",
] as const;

export function emptyLead(): AgentLead {
  return Object.fromEntries(LEAD_FIELDS.map((k) => [k, ""])) as AgentLead;
}

function clean(value: unknown, max = 300): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const OUR_PHONE = ["8888390060", "18888390060"];

export function phoneDigits(value: string): string {
  const digits = value.replace(/\D/g, "");
  return OUR_PHONE.includes(digits) ? "" : digits;
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) && !/@fittingflow\.com$/i.test(value.trim());
}

export function looksLikePersonName(value: string): boolean {
  const words = value.trim().split(/\s+/);
  return (
    words.length > 0 &&
    words.length <= 4 &&
    words.every((w) => /^[\p{L}][\p{L}'.-]{0,24}$/u.test(w)) &&
    !/^(i|we|my|the|a|an|hi|hello|yes|no)$/i.test(words[0])
  );
}

export function mergeLead(current: AgentLead, patch: Partial<AgentLead>): AgentLead {
  const next = { ...current };
  for (const field of LEAD_FIELDS) {
    const value = clean(patch[field], field === "interest" ? 800 : 300);
    if (value) next[field] = value;
  }
  if (next.name && !looksLikePersonName(next.name)) next.name = current.name;
  if (next.email && !isEmail(next.email)) next.email = current.email;
  if (next.phone && phoneDigits(next.phone).length < 10) next.phone = current.phone;
  return next;
}

/** Name, phone and email are required (the FittingFlow API needs an email on every lead). */
export function missingFields(lead: AgentLead): string[] {
  const missing: string[] = [];
  if (!lead.name) missing.push("name");
  if (phoneDigits(lead.phone).length < 10) missing.push("phone");
  if (!isEmail(lead.email)) missing.push("email");
  if (!lead.business) missing.push("boutique or shop name");
  return missing;
}

export function canSend(lead: AgentLead): boolean {
  return Boolean(lead.name) && phoneDigits(lead.phone).length >= 10 && isEmail(lead.email);
}

export function leadSummary(lead: AgentLead): string {
  return [
    lead.name && `Name: ${lead.name}`,
    lead.phone && `Phone: ${lead.phone}`,
    lead.email && `Email: ${lead.email}`,
    lead.business && `Business: ${lead.business}`,
    lead.businessType && `Type: ${lead.businessType}`,
    lead.locations && `Locations: ${lead.locations}`,
    lead.currentSoftware && `Current software: ${lead.currentSoftware}`,
    lead.interest && `Interested in: ${lead.interest}`,
    lead.preferredTime && `Best time to call (not booked): ${lead.preferredTime}`,
  ]
    .filter(Boolean)
    .join("\n");
}
