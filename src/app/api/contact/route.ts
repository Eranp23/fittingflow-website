import { NextResponse } from "next/server";
import { forwardEnquiry } from "@/lib/api";

const FIELDS = ["name", "email", "phone", "company", "subject", "message", "flag"] as const;

/** Forwards the site's forms to the FittingFlow API (server-to-server, so no CORS setup is needed). */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  const p = Object.fromEntries(
    FIELDS.map((key) => [key, String(body[key] ?? "").trim().slice(0, key === "message" ? 4000 : 300)]),
  ) as Record<(typeof FIELDS)[number], string>;
  if (!p.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
    return NextResponse.json({ message: "Please add your name and a valid email." }, { status: 400 });
  }
  const sent = await forwardEnquiry({
    ...p,
    subject: p.subject || "Website enquiry",
    message: p.message.length >= 10 ? p.message : `${p.message} (sent from the website)`.trim(),
    flag: p.flag || "contact",
  });
  if (!sent.ok) {
    return NextResponse.json({ message: "We couldn't send your message. Please call (888) 839-0060." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
