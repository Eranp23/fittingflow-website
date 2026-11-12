import type { Metadata } from "next";
import { pageSeo } from "@/lib/seoPages";
import { absoluteUrl, canonicalUrl, SITE_NAME } from "@/lib/seoConfig";

/** Next.js metadata for a page, from the same title/description list the old site used. */
export function metadataFor(path: string): Metadata {
  const page = pageSeo(path);
  const image = absoluteUrl(page.image || "/uploads/og-1200.jpg");
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      type: page.type === "article" ? "article" : "website",
      siteName: SITE_NAME,
      url: canonicalUrl(path),
      title: page.title,
      description: page.description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [image] },
  };
}
