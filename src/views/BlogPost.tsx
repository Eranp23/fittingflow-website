"use client";

import { appUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { blogPosts, getBlogPost } from '@/data/blogPost';
import Header from "@/components/Header";
import Footer from '@/components/landing/Footer';
import { blogPostTitle } from '@/lib/seoPages';
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/seoConfig';

const BlogPost = ({ slug }: { slug: string }) => {
  
  const navigate = (to: string) => { window.location.href = to; };
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const path = `/blog/${post.slug}`;
  const image = absoluteUrl(post.image);
  const published = new Date(post.date).toISOString();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image,
    datePublished: published,
    author: {
      "@type": post.author === "FittingFlow Team" ? "Organization" : "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}${path}`,
  };

  return (
    <div className="page-urbanist min-h-screen bg-background">
    <JsonLd data={articleJsonLd} />
<Header />
      {/* Header */}
      <article className="pt-28">
        <div className="max-w-3xl mx-auto px-6">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </button>
<br></br>
          <Badge variant="secondary" className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{post.author}</div>
                <div className="text-xs text-muted-foreground">{post.authorRole}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Cover */}
        <div className="max-w-5xl mx-auto px-6 my-12">
          <div className="aspect-[21/9] rounded-3xl overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 pb-16">
          <div className="prose prose-lg max-w-none">
            {post.content.map((block, i) => (
              <React.Fragment key={i}>
                {block.heading && (
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">{block.heading}</h2>
                )}
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6">{block.paragraph}</p>
              </React.Fragment>
            ))}
          </div>

          {/* Tags + share */}
          <div className="mt-12 pt-8 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Badge key={t} variant="outline" className="rounded-full">#{t}</Badge>
              ))}
            </div>
        
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 md:p-14 text-center text-white" style={{ background: 'hsl(230 65% 52%)' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to simplify your boutique workflow?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6">
            Appointments, alterations, and payments — all in one beautifully simple platform built for boutiques.
          </p>
          <Button
            size="lg"
            onClick={() => navigate(appUrl('/onboarding/store-owner'))}
            className="bg-transparent text-white  border border-white hover:bg-white hover:text-blue-600  px-6"
          >
         Start your 45-day free trial
          </Button>
        </div>
      </section>

      {/* Related */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Continue reading</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((rp) => (
              <article
                key={rp.slug}
                onClick={() => { navigate(`/blog/${rp.slug}`); window.scrollTo({ top: 0 }); }}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-border/60 hover:shadow-lg transition-all bg-card"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">{rp.category}</Badge>
                  <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">{rp.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
<Footer />
    </div>

  );
};

export default BlogPost;
