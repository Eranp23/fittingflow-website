import { CalendarClock, ClipboardList, PenLine, Ruler, Tags, Users } from "lucide-react";
import MarketingPageShell, {
  MarketingFaqList,
  RelatedGuides,
  faqJsonLd,
  type MarketingFaq,
} from "@/components/landing/MarketingPageShell";
import { pageSeo } from "@/lib/seoPages";

/**
 * Focus-keyword page: "bridal alteration software".
 * Only describe features that exist in the app (alteration types with price and
 * duration, measurement templates, the alterations board, order due dates, the
 * client portal, and the signed pickup page).
 */

const capabilities = [
  {
    icon: ClipboardList,
    title: "A ticket for every gown",
    text: "Each alteration is a record on the bride's order: the gown, the services, the price and who is working on it. Nothing lives on a paper tag that can fall off in the workroom.",
  },
  {
    icon: Tags,
    title: "Your alteration price list",
    text: "Set up your services once, such as hem, bustle, bust or shoulder adjustments, each with a price and a usual number of days. Staff pick from the list, so quotes stay consistent.",
  },
  {
    icon: Ruler,
    title: "Bridal measurement templates",
    text: "Save measurements with templates, for example a full bridal body template with upper bust, bust, underbust and the rest. The next fitting starts from the same numbers.",
  },
  {
    icon: CalendarClock,
    title: "Due dates before the wedding",
    text: "Orders carry a due date, so the team can see which gowns are coming due before a busy wedding weekend and plan the workroom around them.",
  },
  {
    icon: Users,
    title: "One board for the whole shop",
    text: "Move work across the alterations board from pending to in progress to completed, with urgency flags and staff assignment. The front desk and the seamstress see the same status.",
  },
  {
    icon: PenLine,
    title: "Signed pickup",
    text: "At pickup the bride reviews the work, accepts your pickup policy and signs on screen, and you can print a receipt. The record shows exactly what was handed over and when.",
  },
];

const steps = [
  {
    title: "The fitting",
    text: "The bride comes in for her first fitting. Her appointment, contact details and wedding plans are already on her profile.",
  },
  {
    title: "Measurements",
    text: "The seamstress records measurements on a bridal template, so the numbers are saved with the bride, not on a notepad.",
  },
  {
    title: "The alteration ticket",
    text: "Services come from your price list, the total is added to her order, and a due date is set well ahead of the wedding.",
  },
  {
    title: "Work starts",
    text: "The job is assigned and started on the alterations board, so everyone can see who has the gown and how far along it is.",
  },
  {
    title: "Second and final fittings",
    text: "Each fitting opens the same record: past measurements, what was changed and what is still to do.",
  },
  {
    title: "Pickup and final payment",
    text: "The bride signs for the gown, the balance is taken on the order, and the alteration is marked completed.",
  },
];

const faqs: MarketingFaq[] = [
  {
    question: "What is bridal alteration software?",
    answer:
      "Bridal alteration software tracks each gown's alterations from the first fitting to pickup: the services and price, measurements, the due date, who is working on it, and its status. FittingFlow does this inside the same system a boutique uses for appointments, orders and payments.",
  },
  {
    question: "Can I set my own alteration prices?",
    answer:
      "Yes. You create your own list of alteration types, each with a price and a usual number of days. Staff choose from that list when they write up a ticket, so every bride gets the same price for the same work.",
  },
  {
    question: "Does it store bridal measurements?",
    answer:
      "Yes. Measurement templates hold the fields your shop uses, such as a full bridal body template, and the measurements are saved on the bride's record for every later fitting.",
  },
  {
    question: "How do I know which gowns are due before a wedding?",
    answer:
      "Every order has a due date, and the alterations board shows each job's status, urgency and the staff member assigned. That makes it easy to see what has to be finished before a busy weekend.",
  },
  {
    question: "Is it only for bridal boutiques?",
    answer:
      "It is built for bridal boutiques with an in-house seamstress or workroom, and it also works for alteration studios that handle bridal gowns. Shops focused on everyday tailoring can see our alteration software page.",
  },
  {
    question: "Which plans include alteration tracking?",
    answer:
      "Alteration management, measurement templates, alteration reminders and the customer portal are included in the Professional and Business plans. Every plan starts with a 30-day free trial; see the pricing page for current prices.",
  },
];

const BridalAlterationSoftware = () => {
  const seo = pageSeo("/bridal-alteration-software");
  return (
    <MarketingPageShell
      title={seo.title}
      description={seo.description}
      keywords="bridal alteration software, bridal alteration tracking software, bridal shop alteration software, wedding dress alteration tracking, FittingFlow"
      path="/bridal-alteration-software"
      jsonLd={faqJsonLd(faqs)}
      eyebrow="Bridal alteration software"
      heading={<>Bridal alteration software that tracks every gown from fitting to pickup</>}
      lede="FittingFlow keeps each bride's alterations in one place: the services and price, her measurements, the due date, who is working on the gown and whether it is ready. No paper tags, no spreadsheet, no guessing the week before the wedding."
    >
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">
            What bridal alteration software should do
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center leading-relaxed text-slate-600">
            A bridal gown usually needs two or three fittings, several services and a hard deadline. The software has to
            follow the gown through all of it, and the whole team has to see the same thing.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[#191E49]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">See it in FittingFlow</h2>
          <div className="mt-10 grid items-start gap-8 md:grid-cols-[3fr_2fr]">
            <figure className="rounded-2xl bg-white p-3 shadow-sm">
              <img
                src="/uploads/landing/alteration.png"
                alt="FittingFlow alteration price list with bust, hem, inseam and shoulder adjustments, each with a price and duration in days"
                width={775}
                height={350}
                loading="lazy"
                className="w-full rounded-xl"
              />
              <figcaption className="px-2 pt-3 text-sm text-slate-500">
                Your alteration services, each with a price and a usual number of days.
              </figcaption>
            </figure>
            <figure className="rounded-2xl bg-white p-3 shadow-sm">
              <img
                src="/uploads/landing/alteration1.png"
                alt="FittingFlow measurement templates, including a 22-field bridal body template measured in inches"
                width={455}
                height={400}
                loading="lazy"
                className="w-full rounded-xl"
              />
              <figcaption className="px-2 pt-3 text-sm text-slate-500">
                Measurement templates, such as a full bridal body template.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">A bridal alteration, step by step</h2>
          <ol className="mt-10 space-y-4">
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

      <section className="bg-[#F8FAFC] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">
            Why paper tickets and spreadsheets break in wedding season
          </h2>
          <p className="mt-6 leading-relaxed text-slate-600">
            Most boutiques start with a notebook, a tag pinned to the garment bag or a shared spreadsheet. It works
            while the workroom is quiet. In peak season the same gown is touched by a consultant, a seamstress and the
            front desk, and each of them keeps a slightly different version of the truth.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            The costs show up at the worst moment: a bride calls to ask if her gown is ready and nobody knows, a price
            quoted at the fitting is not the price on the invoice, or measurements from the first fitting cannot be
            found at the second. Bridal alteration software fixes this by keeping one record per gown that everyone
            reads and updates.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            General tailoring software can track a job ticket, but it does not know about bridal appointments, orders
            and deposits. FittingFlow keeps alterations next to the rest of the boutique, so the fitting, the order,
            the alteration and the payment are one story. See how the rest of the shop runs in our{" "}
            <a href="/boutique-software" className="font-medium text-blue-600 hover:underline">
              bridal boutique software
            </a>{" "}
            guide, or compare options in{" "}
            <a href="/best-boutique-software" className="font-medium text-blue-600 hover:underline">
              how to choose boutique software
            </a>
            .
          </p>
        </div>
      </section>

      <MarketingFaqList title="Questions about bridal alteration software" faqs={faqs} />
      <RelatedGuides
        links={[
          {
            href: "/alteration-software",
            label: "Alteration software",
            text: "For alteration and tailor shops that handle everyday garments as well as gowns.",
          },
          {
            href: "/boutique-software",
            label: "Bridal boutique software",
            text: "Appointments, customers, orders, payments and staff around the alteration work.",
          },
          {
            href: "/pricing",
            label: "Pricing",
            text: "Start with a 30-day free trial, then choose a plan.",
          },
        ]}
      />
    </MarketingPageShell>
  );
};

export default BridalAlterationSoftware;
