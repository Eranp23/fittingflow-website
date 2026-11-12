/**
 * Conversion events for GA4 (tag G-N65ZDZEJN1 in index.html), imported into
 * Google Ads as conversions.
 *
 *   sign_up        account created on /register          (secondary)
 *   trial_start    back from Stripe checkout, plan active  (PRIMARY for Ads)
 *   generate_lead  demo request or contact form sent      (secondary)
 *
 * Events are only sent from the live site (fittingflow.com); anywhere else
 * (localhost, test.fittingflow.com) they are printed to the console instead,
 * so test signups never count as conversions.
 */
import { isProductionHost } from "@/lib/seoConfig";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends one GA4 event. Resolves when GA confirms it, or after 800 ms at most,
 * so it is safe to await right before a redirect (e.g. to Stripe).
 */
export const trackEvent = (name: string, params: EventParams = {}): Promise<void> =>
  new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    if (!isProductionHost() || typeof window.gtag !== "function") {
      console.info("[analytics]", name, params);
      return resolve();
    }
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        resolve();
      }
    };
    window.gtag("event", name, { ...params, transport_type: "beacon", event_callback: finish });
    setTimeout(finish, 800);
  });

/** Sends an event at most once per browser (for pages a user can reload). */
export const trackOnce = (name: string, key: string, params: EventParams = {}) => {
  const flag = `ff_tracked_${name}_${key}`;
  try {
    if (localStorage.getItem(flag)) return Promise.resolve();
    localStorage.setItem(flag, new Date().toISOString());
  } catch {
    /* storage blocked: send anyway */
  }
  return trackEvent(name, params);
};
