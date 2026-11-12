import MarketingPageShell, {
  MarketingFaqList,
  RelatedGuides,
  faqJsonLd,
  type MarketingFaq,
} from "@/components/landing/MarketingPageShell";
import { pageSeo } from "@/lib/seoPages";

type Cell = "yes" | "partial" | "no";

const rows: { feature: string; sheets: Cell; generic: Cell; fittingflow: Cell }[] = [
  { feature: "Fitting appointments", sheets: "partial", generic: "yes", fittingflow: "yes" },
  { feature: "Customer history on the appointment", sheets: "partial", generic: "partial", fittingflow: "yes" },
  { feature: "Alteration board and status", sheets: "partial", generic: "no", fittingflow: "yes" },
  { feature: "Measurement templates", sheets: "no", generic: "no", fittingflow: "yes" },
  { feature: "Orders with due dates", sheets: "partial", generic: "no", fittingflow: "yes" },
  { feature: "Payments and balance due", sheets: "partial", generic: "no", fittingflow: "yes" },
  { feature: "Staff roles and locations", sheets: "no", generic: "partial", fittingflow: "yes" },
  { feature: "Reminders", sheets: "no", generic: "yes", fittingflow: "yes" },
];

const faqs: MarketingFaq[] = [
  {
    question: "What should you look for in boutique software?",
    answer:
      "Look for fittings, customer history, alterations, measurements, orders, payments, and staff access in one system. A calendar that only books a time slot leaves the rest of the shop in spreadsheets.",
  },
  {
    question: "Is FittingFlow the best boutique software?",
    answer:
      "FittingFlow is built for boutiques and alteration shops that need appointments, alterations, orders, and payments together. A generic scheduler is enough if you only book times. A spreadsheet can track a small list until the shop outgrows it.",
  },
  {
    question: "Can a boutique replace spreadsheets with FittingFlow?",
    answer:
      "Yes. Customer lists can be imported from Excel, and orders, alterations, measurements, and payments then live on the client record instead of in separate files.",
  },
];

const Mark = ({ value }: { value: Cell }) => {
  const label = value === "yes" ? "Yes" : value === "partial" ? "Partial" : "No";
  const tone =
    value === "yes"
      ? "text-blue-700"
      : value === "partial"
        ? "text-amber-600"
        : "text-slate-400";
  return <span className={`font-medium ${tone}`}>{label}</span>;
};

const BestBoutiqueSoftware = () => {
  return (
    <MarketingPageShell
      title={pageSeo("/best-boutique-software").title}
      description={pageSeo("/best-boutique-software").description}
      keywords="best boutique software, boutique management software, bridal boutique software, alteration software, FittingFlow"
      path="/best-boutique-software"
      jsonLd={faqJsonLd(faqs)}
      eyebrow="Best boutique software"
      heading={<>Best boutique software for fittings and alterations</>}
      lede="The best boutique software is the one that follows a client from the fitting through alterations, the order, and the last payment. FittingFlow is built for that. A spreadsheet or a generic scheduler covers only part of the day."
    >
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">
            FittingFlow, spreadsheets, and a generic scheduler
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500">
            Yes means the tool is built for that job. Partial means a shop can approximate it by hand.
          </p>

          <div className="mt-8 space-y-3 md:hidden">
            {rows.map((row) => (
              <article key={row.feature} className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="font-semibold text-[#191E49]">{row.feature}</h3>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <dt className="text-slate-500">Spreadsheets</dt>
                    <dd className="mt-1"><Mark value={row.sheets} /></dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Scheduler</dt>
                    <dd className="mt-1"><Mark value={row.generic} /></dd>
                  </div>
                  <div>
                    <dt className="text-blue-700">FittingFlow</dt>
                    <dd className="mt-1"><Mark value={row.fittingflow} /></dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-slate-200 md:block">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] text-left text-[#191E49]">
                  <th className="px-4 py-4 font-semibold">What the shop needs</th>
                  <th className="px-4 py-4 text-center font-semibold">Spreadsheets</th>
                  <th className="px-4 py-4 text-center font-semibold">Generic scheduler</th>
                  <th className="bg-blue-50 px-4 py-4 text-center font-semibold text-blue-700">FittingFlow</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature} className="border-t border-slate-200">
                    <td className="px-4 py-3 text-[#191E49]">{row.feature}</td>
                    <td className="px-4 py-3 text-center"><Mark value={row.sheets} /></td>
                    <td className="px-4 py-3 text-center"><Mark value={row.generic} /></td>
                    <td className="bg-blue-50/60 px-4 py-3 text-center"><Mark value={row.fittingflow} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#191E49]">Stay on spreadsheets if</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              You have a short client list, one person runs the shop, and you rarely need reminders or a shared alteration status.
            </p>
          </article>
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#191E49]">Use a generic scheduler if</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              You only need a time slot and a reminder. Measurements, alteration tickets, and balances will still live somewhere else.
            </p>
          </article>
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#191E49]">Use FittingFlow if</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Fittings, alterations, orders, and payments have to stay on one client. That is the job this software is built for.
            </p>
          </article>
        </div>
      </section>

      <MarketingFaqList title="Questions about choosing boutique software" faqs={faqs} />
      <RelatedGuides
        links={[
          {
            href: "/boutique-software",
            label: "Boutique software",
            text: "Appointments, customers, orders, payments, and staff in FittingFlow.",
          },
          {
            href: "/alteration-software",
            label: "Alteration software",
            text: "Jobs, measurements, due dates, and status on the alterations board.",
          },
          {
            href: "/pricing",
            label: "Pricing",
            text: "See plans and start a trial when the comparison matches your shop.",
          },
        ]}
      />
    </MarketingPageShell>
  );
};

export default BestBoutiqueSoftware;
