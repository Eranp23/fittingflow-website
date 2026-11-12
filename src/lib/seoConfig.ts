export const SITE_URL = "https://fittingflow.com";
export const SITE_NAME = "FittingFlow";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/uploads/og-1200.jpg`;

export const DEFAULT_TITLE = "FittingFlow | Bridal Boutique & Alteration Software";

export const DEFAULT_DESCRIPTION =
  "Software for bridal boutiques and alteration shops: appointments, fittings, alterations, orders, payments and staff in one place. Try it free for 30 days.";

/** Only the live site may be indexed; test/preview hosts always get noindex. */
export const PRODUCTION_HOSTS = ["fittingflow.com", "www.fittingflow.com"];
export const isProductionHost = (hostname: string = typeof window !== "undefined" ? window.location.hostname : "") =>
  PRODUCTION_HOSTS.includes(hostname.toLowerCase());

export const DEFAULT_KEYWORDS =
  "FittingFlow, Fitting Flow, boutique software, alteration management software, fitting appointments, boutique management software, alteration tracking";

const INDEXABLE_EXACT = new Set([
  "/",
  "/privacy",
  "/terms",
  "/contact",
  "/data-security",
  "/why-fittingflow",
  "/about",
  "/blog",
  "/features",
  "/boutique-software",
  "/alteration-software",
  "/bridal-alteration-software",
  "/best-boutique-software",
  "/switch",
  "/pricing",
]);

export const canonicalUrl = (path: string) => {
  const clean = (path.split("?")[0].split("#")[0] || "/").replace(/\/+$/, "") || "/";
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
};

export const isIndexablePublicPath = (pathname: string) => {
  const clean = (pathname.split("?")[0].split("#")[0] || "/").replace(/\/+$/, "") || "/";
  if (INDEXABLE_EXACT.has(clean)) return true;
  if (clean.startsWith("/blog/")) return true;
  return false;
};

export const absoluteUrl = (url: string) => {
  if (!url) return DEFAULT_OG_IMAGE;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: ["Fitting Flow", "FittingFlow.com"],
  url: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  email: "info@fittingflow.com",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61589879087854",
    "https://instagram.com/fittingflow",
    "https://www.linkedin.com/company/fittingflow/",
    "https://x.com/fittingflow",
    "https://www.youtube.com/@Fittingflow",
  ],
};

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/pricing`,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export const landingFaqs = [
  {
    question: "What is FittingFlow?",
    answer:
      "FittingFlow is boutique and alteration management software. It helps teams manage appointments, fittings, customers, alterations, orders, payments, and staff in one place.",
  },
  {
    question: "Is FittingFlow the same as Fitting Flow?",
    answer:
      "Yes. The product name is FittingFlow (one word). People also search for Fitting Flow. It is not a fitness or gym app.",
  },
  {
    question: "Who is FittingFlow for?",
    answer:
      "FittingFlow is built for boutiques, alteration studios, and tailoring businesses that need fitting appointments, measurement tracking, and a client portal.",
  },
  {
    question: "Does FittingFlow include a client portal?",
    answer:
      "Yes. Clients can sign in to view appointment, alteration, and order updates, messages, and related status in real time.",
  },
];

export const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: landingFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

