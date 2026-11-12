import { getPlans, plansForPrompt } from "@/lib/plans";
import { SITE_URL, appUrl } from "@/lib/site";

export const PHONE = "(888) 839-0060";
export const EMAIL = "info@fittingflow.com";

/** Facts the chat may use. Everything here is already published on fittingflow.com. */
export async function knowledgeForPrompt(): Promise<string> {
  const plans = plansForPrompt(await getPlans());
  return `
FACTS ABOUT FITTINGFLOW (use only these; if something is not here, say you'll have the team confirm):
- FittingFlow (one word; people also write "Fitting Flow") is management and point of sale (POS) software for bridal boutiques, alteration shops, tailors and formalwear stores. It is not a fitness app.
- It runs in the web browser on computer, tablet and phone. Nothing to install.
- Phone ${PHONE}. Email ${EMAIL}. No other phone numbers or addresses.

Features:
- Client experience: appointment scheduling with types, durations and calendar views; online booking; customer profiles with notes, history and tags (import old customers from Excel); style boards with colors, fabrics, images and video; email templates for promotions.
- Client portal: brides and clients sign in to see appointment, alteration and order status in real time, get notifications and messages, and share inspiration.
- Fittings and orders: orders with items, totals, taxes, statuses and due dates; an alterations board from pending to completed with services and pricing; measurement templates; payments and balance due.
- Operations: multiple locations with hours, capacity, services and managers; staff roles and permissions; setup of appointment types, services and categories; analytics on revenue, customers and appointments.
- Payments are processed by Stripe. For a specific integration (Square, calendars, other tools) say the team will confirm what fits their setup.
- Security: data is encrypted and access is role-based. Details: ${SITE_URL}/data-security. Do not claim certifications or audits. If asked about a certification, say it is not something we list on the site, point to the security page, and offer to have the team answer their specific security questions.

Plans (live prices; every plan starts with a 30-day free trial):
${plans}
- 5 or more locations: custom plan, contact sales.
- Founding Customer Offer (a promotion): Starter is at its founding price now; the regular price is $119/month. Whoever signs up during the promotion keeps that price until they cancel. When the promotion ends, new subscribers pay the regular price. No end date has been announced. The 30-day free trial still applies.
- Cancellation and commitment terms are being finalized. Do not promise "cancel anytime" or describe billing terms; say the team will confirm the exact terms before they subscribe.
- There is no "Essentials" plan and no coupon. Do not invent other discounts.
- Full details: ${SITE_URL}/pricing. Start the free trial: ${appUrl("/register")}.

Free switch:
- On every plan, the FittingFlow team moves a new store's clients, services, alteration price list and upcoming appointments from BridalLive, CloudBridal, Poppy Bridal, BridalOp, Square Appointments, Vagaro, Acuity, HoneyBook, Google Calendar or spreadsheets, at no cost. One free move per store, requested within 30 days of signing up. Past appointment history, past payments and messages stay in the old system. Details: ${SITE_URL}/switch.

Pages: features ${SITE_URL}/features, why FittingFlow ${SITE_URL}/why-fittingflow, contact ${SITE_URL}/contact.
`.trim();
}
