/**
 * Founding Customer Offer (Natella, Nov 11, 2026).
 * The price people pay comes from the live plans (SuperAdmin). This file only adds the
 * crossed-out regular price and the offer wording. Add Professional/Business here once
 * their promotional pricing is approved. Set to {} to switch the offer off.
 */
export const FOUNDING_OFFER: Record<string, { regularMonthly: number }> = {
  starter: { regularMonthly: 119 },
};

export const FOUNDING_LABEL = "Founding Customer Offer – Lock In Your Rate";

export const foundingOfferFor = (planName: string) => FOUNDING_OFFER[planName.trim().toLowerCase()];

/** Eran, Nov 11: whoever signs up during the promotion keeps that price until they cancel; when the promotion ends, new subscribers pay the regular price. */
export const foundingNote = (planName: string, price: number) =>
  `Sign up during this promotion and your ${planName} price stays $${price}/month until you cancel. When the promotion ends, new subscribers pay the regular price.`;
