import { Calendar, CircleDollarSign, Scissors, ShoppingBag, Users, UserRound } from "lucide-react";
import MarketingPageShell, {
  MarketingFaqList,
  RelatedGuides,
  faqJsonLd,
  type MarketingFaq,
} from "@/components/landing/MarketingPageShell";
import { pageSeo } from "@/lib/seoPages";

const capabilities = [
  {
    icon: Calendar,
    title: "Appointments and fittings",
    text: "Book fitting appointments by type, staff member, and location. Keep the calendar clear so a bride is not double-booked on a busy Saturday.",
  },
  {
    icon: Users,
    title: "Customers",
    text: "Keep contact details, notes, visit history, and tags on one profile. Import an existing customer list from Excel when you move off a spreadsheet.",
  },
  {
    icon: Scissors,
    title: "Alterations",
    text: "Track each alteration from pending to completed, with the services and price attached to the client’s order.",
  },
  {
    icon: ShoppingBag,
    title: "Orders",
    text: "Create orders with items, taxes, statuses, and due dates so the team can see what is still outstanding.",
  },
  {
    icon: CircleDollarSign,
    title: "Payments",
    text: "Record payments and the balance still due, so staff are not guessing at the register.",
  },
  {
    icon: UserRound,
    title: "Staff",
    text: "Add staff, assign roles, and control which locations they can access.",
  },
];

const faqs: MarketingFaq[] = [
  {
    question: "What is boutique software?",
    answer:
      "Boutique software is a system for running a clothing boutique: appointments, customers, fittings, alterations, orders, payments, and staff. FittingFlow is built for that workflow.",
  },
  {
    question: "Who is FittingFlow boutique software for?",
    answer:
      "It is for bridal and fashion boutiques, and for shops that also run alterations. Teams use it to schedule fittings, keep client records, and follow orders through to pickup.",
  },
  {
    question: "Does FittingFlow include payments and staff access?",
    answer:
      "Yes. You can track payments and balances on an order, and give each staff member a role and access to the locations they work.",
  },
];

const BoutiqueSoftware = () => {
  return (
    <MarketingPageShell
      title={pageSeo("/boutique-software").title}
      description={pageSeo("/boutique-software").description}
      keywords="boutique software, boutique management software, bridal boutique software, fitting appointments, FittingFlow"
      path="/boutique-software"
      jsonLd={faqJsonLd(faqs)}
      eyebrow="Boutique software"
      heading={
        <>
          Boutique software for fittings, alterations, and orders
        </>
      }
      lede="FittingFlow is boutique software for shops that live on appointments. Run fittings, customers, alterations, orders, payments, and staff in one place, so the day is not split across a calendar, a spreadsheet, and a group text."
    >
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-light text-[#191E49]">
            What boutique software should cover
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
            A calendar alone does not run a boutique. These are the jobs FittingFlow keeps on the same client record.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
                    <Icon className="h-5 w-5" />
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
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-light text-[#191E49]">One record from the first fitting</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              A client books a fitting, the stylist saves measurements, the order is written with a due date, and alterations move across the board as the dress is ready. Payments stay on that same order, so anyone on the team can see what is left to collect.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Shops with more than one location can keep hours, staff, and appointments separate without keeping a second system.
            </p>
          </div>
          <div className="rounded-[28px] bg-[#3868FC] p-8 text-white">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-100">Included with FittingFlow</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed">
              <li>Appointment types and a shared calendar</li>
              <li>Customer profiles and Excel import</li>
              <li>Orders, taxes, statuses, and due dates</li>
              <li>Alteration board with services and pricing</li>
              <li>Payments and the balance still due</li>
              <li>Staff roles and multi-location access</li>
            </ul>
          </div>
        </div>
      </section>

      <MarketingFaqList title="Questions about boutique software" faqs={faqs} />
      <RelatedGuides
        links={[
          {
            href: "/bridal-alteration-software",
            label: "Bridal alteration software",
            text: "How FittingFlow tracks each gown's alterations, measurements, due dates, and pickup.",
          },
          {
            href: "/best-boutique-software",
            label: "Best boutique software",
            text: "How FittingFlow compares with spreadsheets and a generic scheduler.",
          },
          {
            href: "/features",
            label: "All features",
            text: "Appointments, inventory, the client portal, and the rest of the platform.",
          },
        ]}
      />
    </MarketingPageShell>
  );
};

export default BoutiqueSoftware;
