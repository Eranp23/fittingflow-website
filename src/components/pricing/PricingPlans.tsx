"use client";

import { useState } from "react";
import { Check, MessagesSquare, X } from "lucide-react";
import { appUrl } from "@/lib/site";
import { MONTHLY, YEARLY, limitOf, pricingFor, shownPrice, type SubscriptionPlan } from "@/lib/plans";
import { trackEvent } from "@/lib/analytics";
import { FOUNDING_LABEL, foundingNote, foundingOfferFor } from "@/lib/offers";

/** Plan cards with the monthly/annual switch. Prices come from the server (live API). */
export default function PricingPlans({ plans, saving }: { plans: SubscriptionPlan[]; saving: number }) {
  const [annual, setAnnual] = useState(false);
  const cycle = annual ? YEARLY : MONTHLY;

  if (!plans.length) {
    return (
      <p className="py-16 text-gray-600">
        Prices are loading slowly right now. Please refresh, or call us on{" "}
        <a className="text-pink-600 font-semibold" href="tel:+18888390060">(888) 839-0060</a>.
      </p>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className={!annual ? "font-medium" : "text-gray-400"}>Monthly</span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Bill annually"
          onClick={() => setAnnual(!annual)}
          className="w-12 h-6 bg-blue-500 rounded-full relative"
        >
          <span className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${annual ? "right-1" : "left-1"}`} />
        </button>
        <span className={annual ? "font-medium" : "text-gray-400"}>Annual</span>
        {saving > 0 && <span className="text-pink-500 text-sm">Save {saving}%</span>}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
        {plans.map((plan, index) => {
          const pricing = pricingFor(plan, cycle);
          const discount = pricing?.discountPercent ?? 0;
          const locations = limitOf(plan, "location");
          const users = limitOf(plan, "team");
          const previous = index > 0 ? plans[index - 1].featureValues?.map((f) => f.featureName) || [] : [];
          const shown = (plan.featureValues || []).filter((f) => !/location|team/i.test(f.featureName));
          const newFeatures = index === 0 ? shown : shown.filter((f) => !previous.includes(f.featureName));
          const offer = foundingOfferFor(plan.planName);
          const signup = appUrl(`/register?plan=${plan.id}&billing=${annual ? "annual" : "monthly"}`);
          return (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-2xl border bg-white shadow-md flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.isPopular ? "border-pink-500 shadow-2xl" : "border-gray-200"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 z-20 overflow-hidden w-28 h-28 pointer-events-none">
                  <div className="absolute top-5 right-[-34px] rotate-45 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white text-[11px] font-semibold uppercase tracking-wide text-center py-1 w-40 shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="p-5 md:p-8 text-left flex flex-col flex-1">
                {offer && (
                  <p className="mb-3 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
                    {FOUNDING_LABEL}
                  </p>
                )}
                {offer && !annual && (
                  <p className="mb-2 text-base text-pink-500">
                    Regular price <span className="font-bold line-through">${offer.regularMonthly}/mo</span>
                  </p>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">{plan.planName}</span>
                  {discount > 0 && (
                    <span className="bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">Save {discount}%</span>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mt-4 flex-wrap">
                  <h2 className="text-3xl md:text-4xl font-semibold">${shownPrice(plan, cycle).toFixed(2)}</h2>
                  {discount > 0 && pricing && (
                    <span className="text-pink-500/80 text-lg line-through">${pricing.price.toFixed(2)}</span>
                  )}
                  <p className="text-primary/50 text-sm">{annual ? "Billed Annually" : "Billed Monthly"}</p>
                </div>
                <p className="text-primary text-xs mt-4 min-h-[50px]">{plan.description}</p>
                {offer && (
                  <p className="mt-2 text-xs leading-relaxed text-[#191E49]/70">{foundingNote(plan.planName, shownPrice(plan, MONTHLY))}</p>
                )}
                {plan.hasTrial && plan.trialDurationDays > 0 && (
                  <p className="text-xs text-pink-500 font-medium mt-2">{plan.trialDurationDays}-day free trial</p>
                )}
                <div className="border-t mt-4">
                  <h4 className={`font-bold pt-1 text-2xl ${plan.isPopular ? "text-pink-500" : "text-blue-600"}`}>
                    {locations} <span>Location{locations > 1 ? "s" : ""}</span>
                  </h4>
                  <p className="text-2xl font-bold text-pink-600">
                    {users} <span>Users</span>
                  </p>
                </div>
                <div className="mt-1 pt-4 border-t space-y-4 flex-1">
                  {index > 0 && (
                    <p className="text-sm font-semibold text-[#191E49] mb-5">
                      ✓ Includes everything in the <span className="text-blue-600">{plans[index - 1].planName}</span> plan, plus:
                    </p>
                  )}
                  {newFeatures.map((feature) => (
                    <div key={feature.featureName} className="flex items-center gap-3 text-sm">
                      {feature.isIncluded ? (
                        <Check className="text-white bg-blue-500 w-4 h-4 rounded-full p-[2px] shrink-0" />
                      ) : (
                        <X className="text-white bg-pink-500 w-4 h-4 rounded-full p-[3px] shrink-0" />
                      )}
                      <span className="text-[#191E49]/50">
                        {feature.limitValue ? `${feature.featureName}: ${feature.limitValue}` : feature.featureName}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href={signup}
                  onClick={() => void trackEvent("select_plan", { plan: plan.planName, billing: annual ? "annual" : "monthly" })}
                  className="mt-6 w-full text-center bg-[#F22DCE] hover:bg-pink-600 text-white py-3.5 rounded-full text-base font-bold shadow-[0_10px_26px_rgba(242,45,206,0.35)] transition hover:-translate-y-0.5"
                >
                  Start Your 30-Day Free Trial Now
                </a>
              </div>
            </div>
          );
        })}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
          <div className="p-5 md:p-8 text-center flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-[#191E49]">5 or More Locations?</h3>
            <div className="flex items-center gap-3 mt-6 mb-5">
              <span className="flex-1 h-px bg-gray-200" />
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <MessagesSquare className="w-6 h-6 text-green-700" />
              </div>
              <span className="flex-1 h-px bg-gray-200" />
            </div>
            <h2 className="text-2xl font-semibold text-[#191E49]">Contact Us</h2>
            <p className="text-sm text-gray-500 mt-3">Get in touch with us for a custom enterprise solution tailored to your business.</p>
            <a href="/contact" className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium">
              Contact Sales
            </a>
            <div className="mt-auto" />
            <div className="border-t mt-6 pt-5 space-y-3">
              {["Premium Support", "Mobile Support UI"].map((t) => (
                <div key={t} className="flex items-center justify-center gap-3 text-sm">
                  <Check className="text-white bg-green-600 w-4 h-4 rounded-full p-[2px] shrink-0" />
                  <span className="text-[#191E49]/70">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
