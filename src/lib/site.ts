/** Public addresses. Set in .env.local locally and as build args in Docker. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fittingflow.com").replace(/\/$/, "");
/** The FittingFlow app (login, sign-up, booking). Moves to https://app.fittingflow.com at launch. */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://fittingflow.com").replace(/\/$/, "");
export const appUrl = (path: string) => `${APP_URL}${path.startsWith("/") ? path : `/${path}`}`;
/** Only the real site is indexed and sends analytics. */
export const IS_PRODUCTION_SITE = SITE_URL === "https://fittingflow.com";
