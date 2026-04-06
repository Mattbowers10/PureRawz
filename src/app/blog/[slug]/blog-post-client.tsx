"use client";

import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  Tag,
} from "lucide-react";

function renderContent(blocks: string[]) {
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">
          {block.replace("## ", "")}
        </h2>
      );
    }
    return (
      <p key={i} className="text-foreground-muted leading-relaxed mb-5">
        {block}
      </p>
    );
  });
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] overflow-hidden hover:border-[var(--glass-border-hover)] hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[2/1] bg-gradient-to-br from-crimson-700/20 to-[var(--background-tertiary)] flex items-center justify-center">
        <BookOpen className="w-8 h-8 text-crimson-500/40" />
      </div>
      <div className="p-5">
        <Badge variant="secondary" className="mb-2">
          {post.pillar}
        </Badge>
        <h3 className="text-sm font-semibold text-foreground group-hover:text-crimson-400 transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>
        <p className="text-xs text-foreground-subtle line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-3 mt-3 text-xs text-foreground-subtle">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  }

  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-foreground-subtle mb-8">
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground-muted">{post.pillar}</span>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <Badge variant="default" className="mb-4">
            {post.pillar}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-foreground-muted leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson-700 to-crimson-600 flex items-center justify-center text-white text-sm font-bold">
                {post.author.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
                <p className="text-xs text-foreground-subtle">{post.author.role}</p>
              </div>
            </div>

            <div className="h-6 w-px bg-[var(--border)] hidden sm:block" />

            <div className="flex items-center gap-4 text-sm text-foreground-subtle">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-1.5 text-sm text-foreground-subtle hover:text-foreground transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </header>

        {/* Hero Image Placeholder */}
        <div className="rounded-2xl bg-gradient-to-br from-crimson-700/10 via-[var(--background-tertiary)] to-[var(--background-secondary)] border border-[var(--glass-border)] aspect-[2/1] flex items-center justify-center mb-12">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-crimson-500/30 mx-auto mb-2" />
            <p className="text-sm text-foreground-subtle">Featured Image</p>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto">{renderContent(post.content)}</article>

        {/* Tags */}
        <div className="max-w-3xl mx-auto mt-10 pt-8 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-foreground-subtle" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] text-xs text-foreground-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="max-w-3xl mx-auto mt-8 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)]">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-crimson-700 to-crimson-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {post.author.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Written by {post.author.name}
              </p>
              <p className="text-xs text-crimson-500 mb-2">{post.author.role}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Contributing researcher and author at PureRawz. Dedicated to advancing
                scientific understanding through accessible, rigorous content.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="max-w-3xl mx-auto mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-crimson-700/10 to-crimson-700/5 border border-crimson-700/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Ready to start your research?
              </h3>
              <p className="text-sm text-foreground-muted">
                Browse our catalog of third-party tested compounds with COA documentation.
              </p>
            </div>
            <Button variant="glow" asChild className="shrink-0">
              <Link href="/products" className="gap-1.5">
                Shop Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {relatedPosts.map((rp) => (
                <RelatedPostCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
