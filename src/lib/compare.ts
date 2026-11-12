import type { CompareRow } from "@/data/competitors";
import { MONTHLY, limitOf, shownPrice, type SubscriptionPlan } from "@/lib/plans";

const has = (plan: SubscriptionPlan, words: RegExp) =>
  (plan.featureValues || []).some((f) => f.isIncluded && words.test(f.featureName));

function planList(names: string[], total: number): string {
  if (names.length === total) return "every plan";
  if (names.length === 1) return `the ${names[0]} plan`;
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

/** FittingFlow's row and summary lines, built from the live plans so they can't go stale. */
export function fittingFlowCompare(plans: SubscriptionPlan[]) {
  const alterPlans = plans.filter((p) => has(p, /alterations management/i)).map((p) => p.planName);
  const portalPlans = plans.filter((p) => has(p, /customer portal|customer login portal/i)).map((p) => p.planName);
  const trial = Math.max(30, ...plans.map((p) => (p.hasTrial ? p.trialDurationDays : 0)));
  const row: CompareRow = {
    name: "FittingFlow",
    isUs: true,
    url: "/pricing",
    price: plans.length
      ? `${plans.map((p) => `$${shownPrice(p, MONTHLY)}`).join(" / ")} per month (${plans.length} plans)`
      : "See pricing page",
    trial: `${trial} days`,
    users: plans.length ? `${plans.map((p) => limitOf(p, "team")).join(", ").replace(/, (\d+)$/, " or $1")} by plan` : "See pricing page",
    alterations: alterPlans.length
      ? `Yes, on ${planList(alterPlans, plans.length)}: alteration board, reminders, measurement templates and signed pickup`
      : "See pricing page",
    portal: portalPlans.length ? `Yes, on ${planList(portalPlans, plans.length)}` : "See pricing page",
    dataMove: "Free switch on every plan: we move your clients, services and upcoming appointments",
    fits: "Bridal boutiques with their own seamstress or workroom that want appointments, alterations, orders and payments in one place.",
    sources: [{ label: "FittingFlow pricing", href: "/pricing" }],
  };
  return { row, alterationsOn: alterPlans.length ? planList(alterPlans, plans.length) : "" };
}
