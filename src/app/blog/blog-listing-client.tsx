"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  ChevronDown,
} from "lucide-react";

type SortOption = "newest" | "oldest" | "popular";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest First",
  oldest: "Oldest First",
  popular: "Most Popular",
};

interface Pillar {
  name: string;
  slug: string;
  color: string;
  glow?: string;
  description?: string;
  count: number;
}

function parseDate(dateStr: string): number {
  return new Date(dateStr).getTime() || 0;
}

function parseReadMinutes(readTime: string): number {
  const match = readTime.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 5;
}

interface PostCardProps {
  post: BlogPost;
  pillarColor: string;
}

function PostCard({ post, pillarColor }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] overflow-hidden hover:border-[var(--glass-border-hover)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        {/* Image placeholder with pillar accent */}
        <div
          className="aspect-[16/10] flex items-center justify-center"
          style={{
            background: pillarColor
              ? `linear-gradient(135deg, ${pillarColor}18 0%, var(--background-tertiary) 100%)`
              : "linear-gradient(135deg, var(--background-secondary) 0%, var(--background-tertiary) 100%)",
          }}
        >
          <BookOpen
            className="w-8 h-8 opacity-20"
            style={{ color: pillarColor || "var(--text-dim)" }}
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          {/* Pillar badge */}
          <div className="mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                color: pillarColor || "var(--text-secondary)",
                background: pillarColor ? `${pillarColor}18` : "var(--surface-100)",
                border: `1px solid ${pillarColor ? `${pillarColor}30` : "var(--border-subtle)"}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: pillarColor || "var(--text-dim)" }}
              />
              {post.pillar}
            </span>
          </div>

          <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity flex-1">
            {post.title}
          </h3>
          <p className="text-sm text-foreground-muted line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 text-xs text-foreground-subtle mt-auto">
            <span className="flex items-center gap-1.5">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[7px] font-bold"
                style={{ background: "var(--red)" }}
              >
                {post.author.avatar}
              </div>
              {post.author.name}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface BlogListingClientProps {
  posts: BlogPost[];
  pillars: Pillar[];
}

export function BlogListingClient({ posts, pillars }: BlogListingClientProps) {
  const [activePillar, setActivePillar] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [sortOpen, setSortOpen] = useState(false);

  const pillarColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    pillars.forEach((p) => { map[p.slug] = p.color || ""; });
    return map;
  }, [pillars]);

  const filtered = useMemo(() => {
    let result = posts;

    if (activePillar !== "all") {
      result = result.filter((p) => p.pillarSlug === activePillar);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return [...result].sort((a, b) => {
      if (sortBy === "newest") return parseDate(b.date) - parseDate(a.date);
      if (sortBy === "oldest") return parseDate(a.date) - parseDate(b.date);
      // popular: featured first, then shortest read time
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return parseReadMinutes(a.readTime) - parseReadMinutes(b.readTime);
    });
  }, [posts, activePillar, searchQuery, sortBy]);

  const isDefaultView = !searchQuery && activePillar === "all";
  const featuredPost = isDefaultView ? posts.find((p) => p.featured) : null;
  const gridPosts = featuredPost
    ? filtered.filter((p) => p.slug !== featuredPost.slug)
    : filtered;

  const activePillarData = pillars.find((p) => p.slug === activePillar);
  const activePillarColor = activePillarData?.color || "var(--red)";

  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--red)" }}
            >
              Research Library
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Research Insights &amp;{" "}
              <span style={{ color: "var(--red)" }}>Guides</span>
            </h1>
            <p className="mt-4 text-lg text-foreground-muted leading-relaxed">
              Compound guides, research protocols, and scientific overviews from
              the PureRawz team.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Pillar filter pills + Sort */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-1 min-w-0">
            {pillars.map((pillar) => {
              const isActive = activePillar === pillar.slug;
              const color = pillar.color || "var(--red)";
              return (
                <button
                  key={pillar.slug}
                  onClick={() => setActivePillar(pillar.slug)}
                  className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
                  style={
                    isActive
                      ? {
                          background: color,
                          color: "#fff",
                          boxShadow: pillar.glow ? `0 0 16px ${pillar.glow}` : undefined,
                        }
                      : {
                          background: "var(--surface)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-subtle)",
                        }
                  }
                >
                  {pillar.slug !== "all" && (
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: isActive ? "rgba(255,255,255,0.7)" : color }}
                    />
                  )}
                  {pillar.name}
                  {pillar.count > 0 && (
                    <span
                      className="text-xs"
                      style={{ opacity: isActive ? 0.75 : 0.5 }}
                    >
                      {pillar.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-foreground-muted hover:text-foreground border border-[var(--border-subtle)] bg-[var(--surface)] transition-colors"
            >
              {SORT_LABELS[sortBy]}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sortOpen && (
              <div
                className="absolute right-0 top-full mt-1 z-20 rounded-xl overflow-hidden"
                style={{
                  background: "var(--card-raised)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-float)",
                  minWidth: "160px",
                }}
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setSortOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                    style={{
                      color: sortBy === opt ? "var(--text-primary)" : "var(--text-secondary)",
                      background: sortBy === opt ? "var(--surface-100)" : "transparent",
                      fontWeight: sortBy === opt ? 600 : 400,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-100)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = sortBy === opt ? "var(--surface-100)" : "transparent"; }}
                  >
                    {SORT_LABELS[opt]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pillar description bar */}
        {activePillar !== "all" && activePillarData?.description && (
          <div
            className="mb-8 px-5 py-3 rounded-xl text-sm text-foreground-muted"
            style={{
              background: `${activePillarColor}0d`,
              borderLeft: `3px solid ${activePillarColor}`,
            }}
          >
            {activePillarData.description}
          </div>
        )}

        {/* Featured Post Hero — only on default view */}
        {featuredPost && (
          <div className="mb-12">
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div
                className="grid lg:grid-cols-2 gap-6 p-6 rounded-2xl border transition-all duration-300"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--glass-border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                }}
              >
                <div
                  className="aspect-[16/10] rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(160,3,3,0.15) 0%, var(--background-tertiary) 100%)",
                  }}
                >
                  <BookOpen className="w-16 h-16 opacity-15" style={{ color: "var(--red)" }} />
                </div>
                <div className="flex flex-col justify-center py-2 lg:py-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        color: pillarColorMap[featuredPost.pillarSlug] || "var(--red)",
                        background: `${pillarColorMap[featuredPost.pillarSlug] || "var(--red)"}18`,
                        border: `1px solid ${pillarColorMap[featuredPost.pillarSlug] || "var(--red)"}30`,
                      }}
                    >
                      {featuredPost.pillar}
                    </span>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        color: "var(--green)",
                        background: "rgba(95,201,146,0.1)",
                        border: "1px solid rgba(95,201,146,0.2)",
                      }}
                    >
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 group-hover:opacity-80 transition-opacity">
                    {featuredPost.title}
                  </h2>
                  <p className="text-foreground-muted leading-relaxed mb-5">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-foreground-subtle">
                    <span className="flex items-center gap-1.5">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                        style={{ background: "var(--red)" }}
                      >
                        {featuredPost.author.avatar}
                      </div>
                      {featuredPost.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {featuredPost.date}
                    </span>
                    <span
                      className="ml-auto flex items-center gap-1 font-medium"
                      style={{ color: "var(--red)" }}
                    >
                      Read article
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Results info */}
        {(searchQuery || activePillar !== "all") && (
          <p className="text-sm text-foreground-subtle mb-6">
            {filtered.length} article{filtered.length !== 1 && "s"}
            {activePillar !== "all" && (
              <span>
                {" "}in{" "}
                <span className="text-foreground-muted font-medium">
                  {activePillarData?.name}
                </span>
              </span>
            )}
            {searchQuery && (
              <span>
                {" "}matching &ldquo;
                <span className="text-foreground-muted font-medium">{searchQuery}</span>
                &rdquo;
              </span>
            )}
          </p>
        )}

        {/* Post Grid */}
        {gridPosts.length === 0 && !featuredPost ? (
          <div className="text-center py-20">
            <BookOpen className="w-10 h-10 text-foreground-subtle mx-auto mb-3" />
            <p className="text-lg text-foreground-muted mb-2">No articles found</p>
            <p className="text-sm text-foreground-subtle mb-6">
              Try adjusting your filters or search terms.
            </p>
            <Button
              variant="secondary"
              onClick={() => { setActivePillar("all"); setSearchQuery(""); }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridPosts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                pillarColor={pillarColorMap[post.pillarSlug] || ""}
              />
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div
          className="mt-16 p-8 sm:p-10 rounded-2xl border text-center"
          style={{
            background: "linear-gradient(135deg, rgba(160,3,3,0.08) 0%, rgba(160,3,3,0.04) 100%)",
            borderColor: "rgba(160,3,3,0.2)",
          }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">Stay Updated</h2>
          <p className="text-foreground-muted mb-6 max-w-md mx-auto">
            Get the latest research guides and compound updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1" type="email" />
            <button
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85 shrink-0"
              style={{ background: "var(--red)", boxShadow: "0 0 20px rgba(160,3,3,0.35)" }}
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
