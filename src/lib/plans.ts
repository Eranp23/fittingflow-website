import { API_BASE_URL } from "@/lib/api";

export interface PlanFeatureValue {
  planFeatureId: number;
  featureKey: string;
  featureName: string;
  featureType: number;
  isIncluded: boolean;
  limitValue: number | null;
}

export interface PlanPricing {
  id: number;
  billingCycle: number; // 0 = monthly, 3 = yearly
  billingCycleText: string;
  price: number;
  discountPercent: number;
  discountedPrice: number;
  isActive: boolean;
}

export interface SubscriptionPlan {
  id: number;
  planName: string;
  description: string;
  basePrice: number;
  isPopular: boolean;
  hasTrial: boolean;
  trialDurationDays: number;
  pricings: PlanPricing[];
  featureValues: PlanFeatureValue[];
}

export const MONTHLY = 0;
export const YEARLY = 3;

/** Live plans from the FittingFlow API, refreshed at most once an hour. Change prices in SuperAdmin. */
export async function getPlans(): Promise<SubscriptionPlan[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/subscription-plans`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as SubscriptionPlan[];
    return data.filter((plan) => {
      const hasMonthly = plan.pricings.some((p) => p.billingCycle === MONTHLY && p.isActive);
      const hasYearly = plan.pricings.some((p) => p.billingCycle === YEARLY && p.isActive);
      return !(!hasMonthly && hasYearly && plan.planName.toLowerCase().includes("annual"));
    });
  } catch (err) {
    console.error("[plans]", err instanceof Error ? err.message : err);
    return [];
  }
}

export function pricingFor(plan: SubscriptionPlan, cycle: number) {
  return plan.pricings.find((p) => p.billingCycle === cycle && p.isActive);
}

/** Price shown to visitors: whole dollars, the same as the old site (89.40 shows as 89). */
export function shownPrice(plan: SubscriptionPlan, cycle: number): number {
  const pricing = pricingFor(plan, cycle);
  if (pricing) return Math.floor(pricing.discountedPrice ?? pricing.price);
  if (cycle === YEARLY) return Math.floor((pricingFor(plan, MONTHLY)?.price || plan.basePrice) * 12);
  return Math.floor(plan.basePrice);
}

export function bestAnnualSaving(plans: SubscriptionPlan[]): number {
  const d = plans.map((p) => pricingFor(p, YEARLY)?.discountPercent ?? 0).filter((n) => n > 0);
  return d.length ? Math.max(...d) : 0;
}

export function limitOf(plan: SubscriptionPlan, word: string): number {
  const f = plan.featureValues?.find((v) => v.featureName.toLowerCase().includes(word));
  return Number(f?.limitValue ?? 1);
}

/** Plain-text plan list for the AI chat. */
export function plansForPrompt(plans: SubscriptionPlan[]): string {
  if (!plans.length) return "Plan prices could not be loaded right now. Send them to https://fittingflow.com/pricing.";
  return plans
    .map((plan) => {
      const features = (plan.featureValues || [])
        .filter((f) => f.isIncluded && !/location|team/i.test(f.featureName))
        .map((f) => (f.limitValue ? `${f.featureName}: ${f.limitValue}` : f.featureName))
        .join(", ");
      return `${plan.planName}: $${shownPrice(plan, MONTHLY)}/month or $${shownPrice(plan, YEARLY)}/year. ${limitOf(plan, "location")} location(s), ${limitOf(plan, "team")} users. ${plan.description || ""} Includes: ${features || "see pricing page"}.`;
    })
    .join("\n");
}
