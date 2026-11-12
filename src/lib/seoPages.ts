/**
 * One place for every public page's title and description.
 *
 * Used twice:
 *  - by the pages themselves (via <SEO />) after the app loads, and
 *  - by vite-plugin-seo-pages.ts at build time, which writes a separate
 *    dist/<path>/index.html for each entry with these tags already in the
 *    raw HTML, plus dist/sitemap.xml.
 *
 * Keep titles under ~60 characters and descriptions under ~155 (Google cuts
 * longer ones). Only relative imports here: vite.config.ts imports this file
 * before the "@" alias exists.
 */
import { blogPosts } from "../data/blogPost";

export interface SeoPage {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
}

const BRAND = "FittingFlow";

const staticPages: SeoPage[] = [
  {
    path: "/",
    title: "FittingFlow | Bridal Boutique & Alteration Software",
    description:
      "Software for bridal boutiques and alteration shops: appointments, fittings, alterations, orders, payments and staff in one place. Try it free for 30 days.",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    path: "/features",
    title: "Features | FittingFlow Boutique & Alteration Software",
    description:
      "Appointment scheduling, alteration tracking, measurements, orders, payments, staff and a client portal, built for boutiques and alteration shops.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/boutique-software",
    title: "Bridal Boutique Software for Fittings & Orders | FittingFlow",
    description:
      "FittingFlow runs a bridal boutique's appointments, fittings, customers, alterations, orders, payments and staff in one system, not a generic calendar.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/bridal-alteration-software",
    title: "Bridal Alteration Software: Track Every Gown | FittingFlow",
    description:
      "Bridal alteration software for boutiques: alteration tickets, your price list, bridal measurements, due dates, a shared board and signed pickup.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/alteration-software",
    title: "Alteration Software for Shops & Boutiques | FittingFlow",
    description:
      "Track every alteration job with measurements, services, price, due date and status from pending to completed. Built for alteration shops and boutiques.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/best-boutique-software",
    title: "Best Bridal Boutique Software: How to Choose | FittingFlow",
    description:
      "What to look for in boutique software for fittings, alterations, orders and payments, and how FittingFlow compares with spreadsheets and schedulers.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/switch",
    title: "Switch to FittingFlow Free, We Move Your Data",
    description:
      "Moving from BridalLive, CloudBridal, Poppy, Square or a spreadsheet? Our team moves your clients, services and upcoming appointments free, on every plan.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/pricing",
    title: "Pricing | FittingFlow Boutique & Alteration Software",
    description:
      "FittingFlow plans for boutiques and alteration shops. Start with a 30-day free trial, then pick the plan that fits your appointments, team and locations.",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/why-fittingflow",
    title: "Why FittingFlow | Software Built for Boutiques",
    description:
      "Why boutiques and alteration shops choose FittingFlow over generic schedulers: fittings, alterations, measurements, designer orders and a client portal.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/about",
    title: "About FittingFlow | Boutique & Alteration Software",
    description:
      "Meet the team behind FittingFlow, the management software for bridal boutiques and alteration shops.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog",
    title: "FittingFlow Journal | Guides for Boutiques",
    description:
      "Guides for boutiques and alteration shops on appointments, alterations, pricing and client experience, from the FittingFlow team.",
    changefreq: "weekly",
    priority: 0.8,
  },
  {
    path: "/contact",
    title: "Contact FittingFlow | Boutique & Alteration Software",
    description:
      "Questions about FittingFlow, a demo, pricing or support? Contact the team or email info@fittingflow.com.",
    changefreq: "yearly",
    priority: 0.5,
  },
  {
    path: "/data-security",
    title: "Data Security | FittingFlow",
    description:
      "How FittingFlow protects boutique data, customer information and appointments with encryption, backups and modern security practices.",
    changefreq: "yearly",
    priority: 0.4,
  },
  {
    path: "/privacy",
    title: "Privacy Policy | FittingFlow",
    description:
      "How FittingFlow collects, uses and protects personal data for boutique owners, staff and clients.",
    changefreq: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    title: "Terms of Service | FittingFlow",
    description: "The terms for using the FittingFlow boutique and alteration management platform.",
    changefreq: "yearly",
    priority: 0.3,
  },
];

const clip = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;

export const blogPostTitle = (postTitle: string) => clip(`${postTitle} | ${BRAND}`, 70);

const blogPages: SeoPage[] = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  title: blogPostTitle(post.title),
  description: clip(post.excerpt, 155),
  type: "article",
  image: post.image,
  changefreq: "monthly",
  priority: 0.6,
}));

export const seoPages: SeoPage[] = [...staticPages, ...blogPages];

const byPath = new Map(seoPages.map((p) => [p.path, p]));

/** Title and description for a public page. Throws in dev if the path is missing. */
export const pageSeo = (path: string): SeoPage => {
  const page = byPath.get(path);
  if (!page) throw new Error(`No SEO entry for "${path}" in src/lib/seoPages.ts`);
  return page;
};
