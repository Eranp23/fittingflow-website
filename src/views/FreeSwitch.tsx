"use client";

import { FormEvent, useState } from "react";
import MarketingPageShell, {
  MarketingFaqList,
  RelatedGuides,
  faqJsonLd,
  type MarketingFaq,
} from "@/components/landing/MarketingPageShell";
import { pageSeo } from "@/lib/seoPages";
import { submitContactEnquiry } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";
import { useAppToast } from "@/lib/toast";

/**
 * "Switch for free": FittingFlow's team moves a new store's data from its old
 * software at no cost. Requests go to info@fittingflow.com through the existing
 * contact enquiry endpoint (flag "contact"), with "Free switch request" in the subject.
 */

const SOFTWARE = [
  "BridalLive",
  "CloudBridal",
  "Poppy Bridal",
  "BridalOp",
  "Square Appointments",
  "Vagaro",
  "Acuity Scheduling",
  "HoneyBook",
  "Google Calendar",
  "Spreadsheets or paper",
  "Something else",
];

const MOVE = [
  { id: "clients", label: "Clients (names, phone, email, notes)" },
  { id: "services", label: "Services or appointment types, with prices" },
  { id: "alterations", label: "Alteration price list" },
  { id: "appointments", label: "Upcoming appointments" },
];

const steps = [
  { title: "Tell us what you use today", text: "Fill in the form below with your current software and what you want moved." },
  { title: "Send us your export", text: "We email you back with simple steps to export your client list from your current system. It usually takes a few minutes." },
  { title: "We set everything up", text: "Our team imports your clients and enters your services, alteration price list and upcoming appointments, usually within 3 business days." },
  { title: "Check it and go", text: "You look it over in your free trial. Your old system keeps running until you're happy." },
];

const faqs: MarketingFaq[] = [
  {
    question: "Is the switch really free?",
    answer:
      "Yes, on every plan. Each new store gets one free move, requested within 30 days of signing up. There is no setup fee.",
  },
  {
    question: "What doesn't get moved?",
    answer:
      "Past appointment history, past payments and messages stay in your old system. Keep it for your records until you no longer need them.",
  },
  {
    question: "Which systems can you move from?",
    answer:
      "BridalLive, CloudBridal, Poppy Bridal, BridalOp, Square Appointments, Vagaro, Acuity, HoneyBook, Google Calendar and spreadsheets. If you use something else, tell us and we'll check.",
  },
  {
    question: "Can I move my clients myself?",
    answer:
      "Yes. FittingFlow can import your client list from an Excel or CSV file in a few minutes. Our team is there if you'd rather we did it.",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  store: string;
  software: string;
  move: string[];
  notes: string;
};

const empty: FormState = { name: "", email: "", phone: "", store: "", software: "", move: ["clients"], notes: "" };

const FreeSwitch = () => {
  const seo = pageSeo("/switch");
  const toast = useAppToast();
  const [form, setForm] = useState<FormState>(empty);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const valid =
    form.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && form.store.trim() && form.software;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!valid || sending) {
      setError("Please fill in your name, email, store name and current software.");
      return;
    }
    setSending(true);
    setError("");
    const moveLabels = MOVE.filter((m) => form.move.includes(m.id)).map((m) => m.label);
    try {
      await submitContactEnquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.store.trim(),
        subject: `Free switch request: ${form.software}`,
        message: [
          `Store: ${form.store.trim()}`,
          `Current software: ${form.software}`,
          `Move: ${moveLabels.join("; ") || "not specified"}`,
          form.notes.trim() && `Notes: ${form.notes.trim()}`,
        ]
          .filter(Boolean)
          .join("\n"),
        flag: "contact",
      });
      void trackEvent("generate_lead", { lead_type: "switch", software: form.software, page: "/switch" });
      setSent(true);
      setForm(empty);
      toast.success("Request sent", "We'll email you about your free switch.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send your request. Please email info@fittingflow.com.");
    } finally {
      setSending(false);
    }
  }

  const input =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-[#191E49] outline-none focus:border-pink-400";

  return (
    <MarketingPageShell
      title={seo.title}
      description={seo.description}
      keywords="switch boutique software, BridalLive alternative, move from BridalLive, CloudBridal alternative, free data migration, FittingFlow"
      path="/switch"
      jsonLd={faqJsonLd(faqs)}
      eyebrow="Switch for free"
      heading={<>Switch to FittingFlow for free. We move your data.</>}
      lede="Changing software shouldn't mean losing your clients or your bookings. On every plan, our team moves your clients, services, alteration price list and upcoming appointments from your current system at no cost."
    >
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">How the free switch works</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#191E49] text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-[#191E49]">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="request" className="bg-[#F8FAFC] px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">Request your free switch</h2>
          {sent ? (
            <p className="mt-8 rounded-2xl bg-white p-6 text-center text-slate-700 shadow-sm" role="status">
              Thanks! Your request is in. We'll email you with the next steps.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-2xl bg-white p-6 shadow-sm" noValidate>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-medium text-[#191E49]" htmlFor="sw-name">
                  Your name
                  <input id="sw-name" className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" required />
                </label>
                <label className="grid gap-1 text-sm font-medium text-[#191E49]" htmlFor="sw-email">
                  Email
                  <input id="sw-email" type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" required />
                </label>
                <label className="grid gap-1 text-sm font-medium text-[#191E49]" htmlFor="sw-phone">
                  Phone (optional)
                  <input id="sw-phone" type="tel" className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" />
                </label>
                <label className="grid gap-1 text-sm font-medium text-[#191E49]" htmlFor="sw-store">
                  Store or business name
                  <input id="sw-store" className={input} value={form.store} onChange={(e) => setForm({ ...form, store: e.target.value })} autoComplete="organization" required />
                </label>
              </div>
              <label className="grid gap-1 text-sm font-medium text-[#191E49]" htmlFor="sw-software">
                What do you use today?
                <select id="sw-software" className={input} value={form.software} onChange={(e) => setForm({ ...form, software: e.target.value })} required>
                  <option value="">Choose one</option>
                  {SOFTWARE.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <fieldset className="grid gap-2">
                <legend className="mb-1 text-sm font-medium text-[#191E49]">What should we move?</legend>
                {MOVE.map((m) => (
                  <label key={m.id} className="flex items-center gap-2 text-sm text-slate-700" htmlFor={`sw-move-${m.id}`}>
                    <input
                      id={`sw-move-${m.id}`}
                      type="checkbox"
                      checked={form.move.includes(m.id)}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          move: e.target.checked ? [...form.move, m.id] : form.move.filter((x) => x !== m.id),
                        })
                      }
                    />
                    {m.label}
                  </label>
                ))}
              </fieldset>
              <label className="grid gap-1 text-sm font-medium text-[#191E49]" htmlFor="sw-notes">
                Anything we should know? (optional)
                <textarea id="sw-notes" rows={3} className={input} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </label>
              {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
              <button
                type="submit"
                disabled={sending}
                className="rounded-full bg-[#F22DCE] px-6 py-3 font-medium text-white hover:bg-pink-600 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Request my free switch"}
              </button>
              <p className="text-xs text-slate-500">
                One free move per new store, requested within 30 days of signing up. Past history, payments and messages
                are not moved.
              </p>
            </form>
          )}
        </div>
      </section>

      <MarketingFaqList title="Questions about switching" faqs={faqs} />
      <RelatedGuides
        links={[
          { href: "/best-boutique-software", label: "How to choose boutique software", text: "FittingFlow vs spreadsheets and a generic scheduler." },
          { href: "/pricing", label: "Pricing", text: "Every plan starts with a 30-day free trial." },
          { href: "/bridal-alteration-software", label: "Bridal alteration software", text: "How FittingFlow tracks every gown from fitting to pickup." },
        ]}
      />
    </MarketingPageShell>
  );
};

export default FreeSwitch;
