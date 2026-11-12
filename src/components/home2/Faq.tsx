import { ChevronDown } from "lucide-react";

/** Questions from the design. Answers are drafts for Natella to confirm (3 and 5 especially). */
export const homeFaqs = [
  {
    q: "Who is FittingFlow for?",
    a: "Bridal boutiques, formalwear and dress shops, alteration studios and tailors. If your day is fittings, alterations, orders and payments, FittingFlow keeps them in one place.",
  },
  {
    q: "Does each boutique get a landing page?",
    a: "Yes. Every plan includes your own store page with your brand, services and gallery, plus a public booking page so clients can book online at any time.",
  },
  {
    q: "Can my boutique appear in the directory?",
    a: "A boutique directory is planned as part of Myuverse, which is coming soon. Today your store page and booking page are public, so clients can find and book you from your own link.",
  },
  {
    q: "Does FittingFlow have a Task Board?",
    a: "Yes. Task management is included on every plan, so your team can see what is due for each client. Professional and Business add advanced tasks.",
  },
  {
    q: "Can I connect my AI assistant?",
    a: "We are opening a connection for AI assistants so you can ask about your schedule and orders in plain language. Book a demo and we will show you what is available today.",
  },
  {
    q: "Is Myuverse available now?",
    a: "Not yet. Myuverse is coming soon as an optional app that helps clients discover boutiques and connect with the community. FittingFlow works fully without it.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white px-5 py-20 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[920px]">
        <h2 className="mx-auto max-w-xl text-center text-[32px] font-medium leading-tight tracking-[-0.01em] text-[#191E49] md:text-[44px]">
          Questions boutiques ask before switching to FittingFlow
        </h2>
        <div className="mt-10 space-y-3">
          {homeFaqs.map((f, i) => (
            <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white transition-colors open:border-[#3764F3]/40 open:shadow-[0_12px_40px_rgba(55,100,243,0.1)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-lg font-medium text-[#191E49] [&::-webkit-details-marker]:hidden">
                <span>{i + 1}. {f.q}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-[#3764F3]" />
              </summary>
              <p className="px-6 pb-6 text-base leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
