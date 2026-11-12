import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPost from "@/views/BlogPost";
import { blogPosts, getBlogPost } from "@/data/blogPost";
import { metadataFor } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!getBlogPost(slug)) return {};
  return metadataFor(`/blog/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getBlogPost(slug)) notFound();
  return <BlogPost slug={slug} />;
}
