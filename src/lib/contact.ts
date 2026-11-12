export interface ContactEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  flag: string;
}

/** Sends a lead through this site's /api/contact, which forwards it to the FittingFlow API
 *  (same email to info@fittingflow.com as the app's forms). */
export async function submitContactEnquiry(payload: ContactEnquiryPayload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    let message = "Failed to send enquiry";
    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  return response.json().catch(() => ({}));
}
