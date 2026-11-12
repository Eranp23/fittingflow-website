import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seoPages";
import { canonicalUrl } from "@/lib/seoConfig";
import { blogPosts } from "@/data/blogPost";

const postDates = new Map(blogPosts.map((post) => [`/blog/${post.slug}`, new Date(post.date)]));

export default function sitemap(): MetadataRoute.Sitemap {
  return seoPages.map((page) => ({
    url: canonicalUrl(page.path),
    // Blog posts carry their publish date; other pages leave it out rather than guess.
    ...(postDates.has(page.path) ? { lastModified: postDates.get(page.path) } : {}),
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
}
