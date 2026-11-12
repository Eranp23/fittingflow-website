import MarketingPageShell, {
  MarketingFaqList,
  RelatedGuides,
  faqJsonLd,
  type MarketingFaq,
} from "@/components/landing/MarketingPageShell";
import { CHECKED_ON, type CompareRow } from "@/data/competitors";

const columns: { key: keyof CompareRow; label: string }[] = [
  { key: "price", label: "Published price" },
  { key: "trial", label: "Free trial" },
  { key: "users", label: "Users" },
  { key: "alterations", label: "Alteration tracking" },
  { key: "portal", label: "Client portal" },
  { key: "dataMove", label: "Moving your data" },
];

const checklist = [
  "Can a seamstress see every gown she owes this week, with due dates, in one place?",
  "Are measurements saved on the bride's record and reused at the next fitting?",
  "Does the price stay the same after the first months, and what does each extra user or location cost?",
  "Can brides check their order or alteration status without calling the shop?",
  "How do your customers, orders and appointments get moved over, and who does it?",
  "Can you try it with your own appointments before you pay?",
];

const buildFaqs = (alterationsOn: string): MarketingFaq[] => [
  {
    question: "What is the best bridal shop software?",
    answer:
      "It depends on how your shop works. If alterations happen in-house, look for alteration tracking with due dates and measurements. If you mainly sell gowns and accessories, inventory, special orders and point of sale may matter more. The table above shows what each product publishes so you can match it to your shop.",
  },
  {
    question: "Is this comparison neutral?",
    answer: `No. We make FittingFlow, so we have a stake in the answer. To keep it fair, every fact about another product comes from that company's own website, checked on ${CHECKED_ON}, with a link so you can check it yourself. Prices and features change, so confirm with each company before you decide.`,
  },
  {
    question: "Which bridal software includes alteration tracking?",
    answer:
      `On their websites, FittingFlow${alterationsOn ? ` (on ${alterationsOn})` : ""}, CloudBridal and BridalOp describe alteration features. Poppy Bridal and BridalLive do not list alteration tracking on their features pages, though BridalLive stores measurements on customer profiles.`,
  },
  {
    question: "Can I switch from BridalLive or CloudBridal to FittingFlow?",
    answer:
      "Yes, and it's free on every plan. Send us an export from your current system and our team moves your clients, services, alteration price list and upcoming appointments for you, usually within 3 business days of your request. Ask within 30 days of signing up.",
  },
];

const Cell = ({ row, col }: { row: CompareRow; col: keyof CompareRow }) => (
  <>{String(row[col])}</>
);

export const COMPARE_TITLE = "Bridal Shop Software Compared (2026) | FittingFlow";
export const COMPARE_DESCRIPTION =
  "FittingFlow, CloudBridal, Poppy Bridal, BridalOp and BridalLive side by side: published prices, free trials, users, alteration tracking, client portal and data moves.";

const CompareSoftware = ({ compareRows, alterationsOn }: { compareRows: CompareRow[]; alterationsOn: string }) => {
  const faqs = buildFaqs(alterationsOn);
  return (
    <MarketingPageShell
      title={COMPARE_TITLE}
      description={COMPARE_DESCRIPTION}
      keywords="bridal shop software comparison, best bridal shop software, BridalLive alternative, CloudBridal alternative, Poppy Bridal alternative, BridalOp alternative"
      path="/compare"
      jsonLd={faqJsonLd(faqs)}
      eyebrow="Compare bridal shop software"
      heading={<>Bridal shop software compared: FittingFlow, CloudBridal, Poppy, BridalOp and BridalLive</>}
      lede={`We make FittingFlow, so we are not neutral. Everything below about other products comes from their own websites, checked on ${CHECKED_ON}, with links so you can check it yourself.`}
    >
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">Side by side</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500">
            Prices are per month in US dollars as published by each company. &ldquo;Not listed&rdquo; means we could not
            find it on that company&rsquo;s website, not that the product can&rsquo;t do it.
          </p>

          {/* Phone: one card per product */}
          <div className="mt-8 space-y-4 md:hidden">
            {compareRows.map((row) => (
              <article
                key={row.name}
                className={`rounded-2xl border p-5 ${row.isUs ? "border-pink-300 bg-pink-50/40" : "border-slate-200 bg-white"}`}
              >
                <h3 className="text-lg font-semibold text-[#191E49]">{row.name}</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  {columns.map((col) => (
                    <div key={col.key}>
                      <dt className="font-medium text-slate-500">{col.label}</dt>
                      <dd className="text-[#191E49]"><Cell row={row} col={col.key} /></dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-slate-200 md:block">
            <table className="w-full min-w-[960px] border-collapse text-left text-sm">
              <caption className="sr-only">Bridal shop software comparison, checked {CHECKED_ON}</caption>
              <thead>
                <tr className="bg-[#F8FAFC] text-[#191E49]">
                  <th scope="col" className="px-4 py-4 font-semibold">Product</th>
                  {columns.map((col) => (
                    <th key={col.key} scope="col" className="px-4 py-4 font-semibold">{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.name} className={`border-t border-slate-200 align-top ${row.isUs ? "bg-pink-50/40" : ""}`}>
                    <th scope="row" className="px-4 py-4 font-semibold text-[#191E49]">{row.name}</th>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-4 text-slate-600"><Cell row={row} col={col.key} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">Where each one fits</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {compareRows.map((row) => (
              <article key={row.name} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#191E49]">{row.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{row.fits}</p>
                <p className="mt-3 text-xs text-slate-500">
                  Source:{" "}
                  {row.sources.map((s, i) => (
                    <span key={s.href}>
                      {i > 0 ? ", " : ""}
                      <a
                        href={s.href}
                        className="underline hover:text-blue-600"
                        {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
                      >
                        {s.label}
                      </a>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">Questions to ask any vendor</h2>
          <ul className="mt-8 space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
                <span aria-hidden="true" className="text-pink-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-slate-600">
            Switching from one of these? We move your data for free on every plan.{" "}
            <a href="/switch" className="font-medium text-blue-600 hover:underline">See how the free switch works</a>.
          </p>
          <p className="mt-3 text-center text-slate-600">
            If alterations are a big part of your shop, see how FittingFlow handles them in our{" "}
            <a href="/bridal-alteration-software" className="font-medium text-blue-600 hover:underline">
              bridal alteration software
            </a>{" "}
            guide.
          </p>
        </div>
      </section>

      <MarketingFaqList title="Questions about choosing bridal shop software" faqs={faqs} />
      <RelatedGuides
        links={[
          { href: "/bridal-alteration-software", label: "Bridal alteration software", text: "Tickets, measurements, due dates and signed pickup for every gown." },
          { href: "/best-boutique-software", label: "How to choose boutique software", text: "FittingFlow vs spreadsheets and a generic scheduler." },
          { href: "/pricing", label: "Pricing", text: "Every plan starts with a 30-day free trial." },
        ]}
      />
      <p className="px-6 pb-10 text-center text-xs text-slate-400">
        CloudBridal, Poppy Bridal, BridalOp and BridalLive are trademarks of their owners and are used here only to
        identify their products. Information checked {CHECKED_ON}; it may have changed since.
      </p>
    </MarketingPageShell>
  );
};

export default CompareSoftware;
