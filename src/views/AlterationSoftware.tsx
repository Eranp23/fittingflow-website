import { CalendarClock, ClipboardList, Ruler, Workflow } from "lucide-react";
import MarketingPageShell, {
  MarketingFaqList,
  RelatedGuides,
  faqJsonLd,
  type MarketingFaq,
} from "@/components/landing/MarketingPageShell";
import { pageSeo } from "@/lib/seoPages";

const steps = [
  {
    icon: ClipboardList,
    title: "An alteration record for each job",
    text: "Each alteration sits on the client’s order with the services and price. The team can see what was promised without hunting through notes.",
  },
  {
    icon: Ruler,
    title: "Measurements on the fitting",
    text: "Save measurements with templates so the next fitting starts from the same numbers, not a new piece of paper.",
  },
  {
    icon: CalendarClock,
    title: "Due dates on the order",
    text: "Orders carry a due date. Staff can see which dresses and alterations are coming due before a wedding weekend.",
  },
  {
    icon: Workflow,
    title: "Status from pending to completed",
    text: "Move work across the alterations board as it progresses, so the front of the shop and the workroom share one status.",
  },
];

const faqs: MarketingFaq[] = [
  {
    question: "What is alteration software?",
    answer:
      "Alteration software keeps alteration jobs, measurements, prices, due dates, and status in one system. FittingFlow does that inside the same platform boutiques use for appointments and orders.",
  },
  {
    question: "Can FittingFlow track alteration due dates?",
    answer:
      "Yes. Orders include due dates, and each alteration moves from pending to completed on the alterations board with its services and price.",
  },
  {
    question: "Is this only for a standalone alteration shop?",
    answer:
      "It fits both. A bridal boutique with an in-house workroom and an alteration studio can track the same job from the fitting through pickup.",
  },
];

const AlterationSoftware = () => {
  return (
    <MarketingPageShell
      title={pageSeo("/alteration-software").title}
      description={pageSeo("/alteration-software").description}
      keywords="alteration software, alteration shop software, alteration tracking, bridal alteration software, FittingFlow"
      path="/alteration-software"
      jsonLd={faqJsonLd(faqs)}
      eyebrow="Alteration software"
      heading={<>Alteration software for shops and boutiques</>}
      lede="FittingFlow is alteration software for teams that still lose jobs in notebooks and spreadsheets. Every alteration stays on the client’s order, with measurements, services, price, a due date, and a status the whole shop can see."
    >
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">
            From the fitting to pickup
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[#191E49]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light text-[#191E49]">Built into the boutique, not a side spreadsheet</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            The alteration is tied to the customer, the order, and the payment. When someone calls about a dress, staff open one record: the fitting, the measurements, what was altered, what it costs, and whether it is ready.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Bridal boutiques with their own workroom can see how this works for gowns in our{" "}
            <a href="/bridal-alteration-software" className="font-medium text-blue-600 hover:underline">
              bridal alteration software
            </a>{" "}
            guide. Boutiques that also sell and schedule fittings can keep that work in the same system. See how the rest of the shop runs in our{" "}
            <a href="/boutique-software" className="font-medium text-blue-600 hover:underline">
              boutique software
            </a>{" "}
            guide.
          </p>
        </div>
      </section>

      <MarketingFaqList title="Questions about alteration software" faqs={faqs} />
      <RelatedGuides
        links={[
          {
            href: "/boutique-software",
            label: "Boutique software",
            text: "Appointments, customers, orders, payments, and staff around the alteration work.",
          },
          {
            href: "/best-boutique-software",
            label: "Best boutique software",
            text: "Why a spreadsheet or a generic calendar falls short for alterations.",
          },
          {
            href: "/why-fittingflow",
            label: "Why FittingFlow",
            text: "How FittingFlow compares with tools that were not built for boutiques.",
          },
        ]}
      />
    </MarketingPageShell>
  );
};

export default AlterationSoftware;
