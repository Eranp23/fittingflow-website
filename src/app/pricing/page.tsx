import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import PricingPlans from "@/components/pricing/PricingPlans";
import { metadataFor } from "@/lib/metadata";
import { bestAnnualSaving, getPlans, MONTHLY, shownPrice } from "@/lib/plans";
import { SITE_URL } from "@/lib/seoConfig";

export const metadata = metadataFor("/pricing");
export const revalidate = 3600;

export default async function PricingPage() {
  const plans = await getPlans();
  const saving = bestAnnualSaving(plans);
  const faqs = [
    { q: "Can I switch plans later?", a: "Yes! You can upgrade or downgrade anytime." },
    { q: "Is there a free trial?", a: "Yes. Every plan starts with a 30-day free trial." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards." },
    {
      q: "Do you offer annual discounts?",
      a: saving > 0 ? `Yes, save ${saving}% with annual billing.` : "Yes, annual billing costs less than paying monthly.",
    },
  ];
  const prices = plans.map((p) => shownPrice(p, MONTHLY)).filter((n) => n > 0);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    ...(prices.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "FittingFlow",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: `${SITE_URL}/pricing`,
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "USD",
              lowPrice: Math.min(...prices),
              highPrice: Math.max(...prices),
              offerCount: prices.length,
            },
          },
        ]
      : []),
  ];

  return (
    <div className="page-urbanist overflow-x-hidden">
      <JsonLd data={jsonLd} />
      <Header />
      <main>
        <section
          className="pt-32 pb-28 px-4 text-center bg-cover bg-center"
          style={{ backgroundImage: "url('/uploads/landing/inner.webp')" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-pink-500 font-medium mb-2">Simple, Transparent Pricing</p>
              <h1 className="text-2xl md:text-4xl font-extralight text-[#191E49]">
                Choose Your <span className="text-2xl md:text-4xl font-semibold">Plan</span>
              </h1>
              <p className="mt-2">
                Start with a 30-day free trial, then pay one simple monthly price.
                <br /> Manage appointments, customers, alterations, orders, payments, and staff from all in one simple platform.
              </p>
              <p className="mb-10 font-semibold text-pink-600">Founding Customer Offer: lock in the Starter rate while the introductory promotion lasts.</p>
            </div>

            <PricingPlans plans={plans} saving={saving} />

            <div className="max-w-5xl mx-auto mt-12 rounded-2xl border border-pink-200 bg-pink-50/60 p-6 md:p-8 text-left flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">Switch for free</p>
                <h3 className="mt-1 text-xl md:text-2xl font-semibold text-[#191E49]">We move your data from your current software</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Clients, services, your alteration price list and upcoming appointments, moved by our team at no cost on every plan. From
                  BridalLive, CloudBridal, Poppy, Square, Vagaro, Acuity, HoneyBook or a spreadsheet.
                </p>
              </div>
              <a href="/switch" className="shrink-0 rounded-full bg-[#F22DCE] hover:bg-pink-600 px-6 py-3 font-medium text-white">
                How the free switch works
              </a>
            </div>

            <div className="max-w-5xl flex mx-auto mt-12 bg-white p-6 rounded-xl shadow text-left text-gray-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="px-3" src="/uploads/landing/card.png" alt="" />
              <p className="flex flex-col justify-center p-4">
                Find the right plan tailored to your business goals. Whether you&apos;re looking to boost leads, increase bookings, or grow your
                brand, our flexible options help you invest smart and scale faster.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl text-center font-light mb-10">
              Frequently Asked <span className="font-semibold text-3xl">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((item) => (
                <details key={item.q} className="group bg-white rounded-xl shadow">
                  <summary className="w-full text-left p-5 flex justify-between cursor-pointer list-none">
                    {item.q}
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">-</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-500 text-sm">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
