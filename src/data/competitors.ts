/**
 * Facts for the /compare page about other products. Everything comes from each
 * company's own public website; keep the source links and update CHECKED_ON
 * whenever you re-check. Don't add claims a source page doesn't support.
 * FittingFlow's own row is built from the live plans (src/lib/compare.ts).
 */
export const CHECKED_ON = "November 10, 2026";

export interface CompareRow {
  name: string;
  isUs?: boolean;
  url?: string;
  price: string;
  trial: string;
  users: string;
  alterations: string;
  portal: string;
  dataMove: string;
  fits: string;
  sources: { label: string; href: string }[];
}

export const competitorRows: CompareRow[] = [
  {
    name: "CloudBridal",
    url: "https://cloudbridal.com/pricing",
    price: "$80 / $120 / $180 per month (3 plans)",
    trial: "30 days, no credit card",
    users: "3, 8 or unlimited by plan",
    alterations: "Yes: seamstress details, measurements and alteration charges on the order",
    portal: "On the Ultimate plan ($180)",
    dataMove: "Done-for-you migration, flat $500",
    fits: "Shops that want published prices and a strong special-order workflow; unlimited users on the top plan.",
    sources: [
      { label: "CloudBridal pricing", href: "https://cloudbridal.com/pricing" },
      { label: "CloudBridal alterations", href: "https://cloudbridal.com/features/alterations" },
      { label: "CloudBridal data migration", href: "https://cloudbridal.com/data-migration" },
    ],
  },
  {
    name: "Poppy Bridal",
    url: "https://poppy-bridal.com/pricing/",
    price: "One plan: $149/mo for the first 6 months, then $199/mo",
    trial: "Free trial offered (length not stated)",
    users: "Unlimited",
    alterations: "Not listed among the features on its website",
    portal: "Not listed on its website",
    dataMove: "Paid migration: $399, or $999 white glove",
    fits: "Shops that want one simple plan with unlimited users, an iOS app and integrated payment processing.",
    sources: [
      { label: "Poppy Bridal pricing", href: "https://poppy-bridal.com/pricing/" },
      { label: "Poppy Bridal features", href: "https://poppy-bridal.com/" },
    ],
  },
  {
    name: "BridalOp",
    url: "https://bridalop.com/",
    price: "One plan: $299/mo",
    trial: "None shown",
    users: "Unlimited staff",
    alterations: "Yes: tailor assignment, task checklist, measurements, due dates, status from pending to delivered, ready alerts",
    portal: "Not listed on its website",
    dataMove: "CSV import",
    fits: "Shops that want a full point-of-sale system with contracts and e-signatures in one plan.",
    sources: [
      { label: "BridalOp", href: "https://bridalop.com/" },
      { label: "BridalOp alterations docs", href: "https://bridalop-docs.pages.dev/features/alterations" },
    ],
  },
  {
    name: "BridalLive",
    url: "https://www.bridallive.com/pricing",
    price: "Not published; quote from sales",
    trial: "Demo only",
    users: "Unlimited (Standard Plus plan)",
    alterations: "Not listed on its features tour; measurements are stored on customer profiles",
    portal: "Add-on: $110/mo for the first location, $60/mo for each additional location",
    dataMove: "Not stated",
    fits: "Larger or long-established shops that sell bridal, prom and tuxedo and want an established vendor.",
    sources: [
      { label: "BridalLive plans", href: "https://www.bridallive.com/pricing" },
      { label: "BridalLive features tour", href: "https://www.bridallive.com/tour.html" },
    ],
  },
];
