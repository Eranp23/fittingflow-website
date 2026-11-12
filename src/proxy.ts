import { NextResponse, type NextRequest } from "next/server";
import { seoPages } from "@/lib/seoPages";

/**
 * Runs before every page request (Next 16 "proxy", formerly middleware).
 *
 * 1. www.fittingflow.com -> fittingflow.com (308).
 * 2. Any address that is not a website page belongs to the FittingFlow app, which moves to
 *    APP_URL (app.fittingflow.com). Those are sent there with the same path and query (308):
 *    logins, dashboards, boutique booking links (/<ccode>/book, /<ccode>/store), password-reset
 *    and invite links in old emails, Stripe/Square returns, and anything else not listed here.
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fittingflow.com").replace(/\/$/, "");
const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://fittingflow.com").replace(/\/$/, "");

const WEBSITE_PATHS = new Set<string>([...seoPages.map((p) => p.path), "/compare", "/howitworks", "/home-preview", "/home-old"]);

const isWebsitePath = (path: string) => {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return WEBSITE_PATHS.has(clean) || clean.startsWith("/blog/");
};

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const host = (request.headers.get("host") || "").toLowerCase();

  if (host.startsWith("www.")) {
    return NextResponse.redirect(`${SITE_URL}${url.pathname}${url.search}`, 308);
  }

  const appHost = new URL(APP_URL).host;
  const siteHost = new URL(SITE_URL).host;
  if (appHost !== siteHost && !isWebsitePath(url.pathname)) {
    return NextResponse.redirect(`${APP_URL}${url.pathname}${url.search}`, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Skip Next internals, the site's API routes and any file with an extension
  // (images, robots.txt, sitemap.xml, favicon.ico, ...).
  // The app's uploaded files (boutique logos, customer photos, chat attachments) are saved in the
  // database as https://fittingflow.com/fittingflow/... and /chat-files/..., so those are always
  // forwarded to the app, extension or not.
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)", "/fittingflow/:path*", "/chat-files/:path*"],
};
