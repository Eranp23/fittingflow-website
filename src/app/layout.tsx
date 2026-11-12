import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Playfair_Display, Urbanist } from "next/font/google";
import { DemoModalProvider } from "@/components/DemoModalContext";
import AiChat from "@/components/AiChat";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME } from "@/lib/seoConfig";
import { IS_PRODUCTION_SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist-family", display: "swap" });
// Headings on some pages use Playfair Display, as in the app's base.css.
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-playfair-family", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-cormorant-family", display: "swap" });
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  icons: { icon: "/favicon.ico" },
  // Only the real site is indexed; local and staging copies stay out of Google.
  robots: IS_PRODUCTION_SITE ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#191E49" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <DemoModalProvider>{children}</DemoModalProvider>
        <AiChat />
        {IS_PRODUCTION_SITE && GA4_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
