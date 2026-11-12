import JsonLd from "@/components/JsonLd";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/landing/Footer";
import CTASection from "@/components/landing/CTASection";

export type MarketingFaq = {
  question: string;
  answer: string;
};

type MarketingPageShellProps = {
  title: string;
  description: string;
  keywords: string;
  path: string;
  jsonLd?: object | object[];
  eyebrow: string;
  heading: ReactNode;
  lede: string;
  children: ReactNode;
};

export const faqJsonLd = (faqs: MarketingFaq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

const MarketingPageShell = ({
  title,
  description,
  keywords,
  path,
  jsonLd,
  eyebrow,
  heading,
  lede,
  children,
}: MarketingPageShellProps) => {
  return (
    <div className="page-urbanist min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <Header />

      <section
        className="bg-cover bg-center px-6 pb-16 pt-32 text-center"
        style={{ backgroundImage: "url('/uploads/landing/inner.webp')" }}
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-medium text-pink-500">{eyebrow}</p>
          <h1 className="text-4xl font-extralight leading-tight text-slate-900 md:text-5xl">
            {heading}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl rounded-2xl bg-white/75 px-4 py-3 text-slate-700">
            {lede}
          </p>
        </div>
      </section>

      {children}
      <CTASection />
      <Footer />
    </div>
  );
};

export const MarketingFaqList = ({
  title,
  faqs,
}: {
  title: string;
  faqs: MarketingFaq[];
}) => (
  <section className="bg-white px-6 py-16 md:py-20">
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-8 text-center text-3xl font-light text-[#191E49]">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-[#191E49]">
              {faq.question}
              <span className="text-xl leading-none text-pink-500 group-open:hidden">+</span>
              <span className="hidden text-xl leading-none text-pink-500 group-open:inline">−</span>
            </summary>
            <p className="mt-3 leading-relaxed text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export const RelatedGuides = ({
  links,
}: {
  links: { href: string; label: string; text: string }[];
}) => (
  <section className="px-6 pb-4">
    <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-pink-200 hover:shadow-sm"
        >
          <p className="font-semibold text-[#191E49]">{link.label}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{link.text}</p>
        </a>
      ))}
    </div>
  </section>
);

export default MarketingPageShell;
