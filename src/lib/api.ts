/** Server-side calls to the FittingFlow API. */
export const API_BASE_URL = (process.env.API_BASE_URL || "https://api.fittingflow.com/api").replace(/\/$/, "");

export type EnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  flag: string;
};

/** Sends a lead to the API's public contact endpoint, which emails info@fittingflow.com. */
export async function forwardEnquiry(payload: EnquiryPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/contact/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      console.error("[enquiry]", res.status, (await res.text()).slice(0, 300));
      return { ok: false, error: "The message could not be sent." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[enquiry]", err instanceof Error ? err.message : err);
    return { ok: false, error: "The message could not be sent." };
  }
}
