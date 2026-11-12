"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock, ArrowRight, Layout } from 'lucide-react';
import { blogPosts } from '@/data/blogPost';
import Header from "@/components/Header";
import Footer from '@/components/landing/Footer';
import { pageSeo } from "@/lib/seoPages";

const categories = ['All', 'Operations', 'Alterations', 'Marketing', 'Customer Experience', 'Business'];

const Blog = () => {
  const navigate = (to: string) => { window.location.href = to; };
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      const q = query.toLowerCase();
      const matchesQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, activeCategory]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
  
  
    <div className="page-urbanist min-h-screen bg-background">
    
    <Header />
      {/* Hero */}
      <section className="pt-32 pb-12 px-6" style={{ backgroundImage: "url('/uploads/landing/inner.webp')" }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-pink-600 mb-4">FittingFlow Journal</p>
          <h1 className="text-4xl md:text-5xl  text-slate-900 font-extralight mb-4">
            Insights for <span className="text-4xl md:text-5xl font-medium">boutiques & alterations</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 mb-8">
            Practical guides, customer stories, and product updates to help you run a calmer, more profitable boutique.
          </p>

          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="pl-11 h-12 rounded-full border-border/60 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 sticky top-[80px] bg-background/95 backdrop-blur z-30">
        <div className="max-w-7xl mx-auto py-6 flex justify-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-pink-600 text-white'
                  : 'bg-pink-600/10 text-pink-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <article
              onClick={() => navigate(`/blog/${featured.slug}`)}
              className="group grid md:grid-cols-2 gap-8 cursor-pointer rounded-3xl overflow-hidden border border-border/60 hover:shadow-xl transition-shadow bg-card"
            >
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4 bg-gray-200">{featured.category}</Badge>
                <h2 className="text-3xl md:text-4xl font-bold  mb-4 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="font-medium text-foreground">{featured.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                </div>
                <Button className="w-fit rounded-full bg-blue-600 text-white" variant="default">
                  Read article <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {rest.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No articles match your search.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <article
                  key={post.slug}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="group cursor-pointer rounded-2xl overflow-hidden border border-border/60 hover:shadow-lg transition-all hover:-translate-y-1 bg-card"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3 bg-gray-200">{post.category}</Badge>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
<Footer />
    </div>
 
  );
};

export default Blog;
