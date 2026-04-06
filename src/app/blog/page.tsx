import type { Metadata } from "next";
import { blogPosts, blogPillars } from "@/lib/blog";
import { BlogListingClient } from "./blog-listing-client";

export const metadata: Metadata = {
  title: "Research Library | PureRawz — SARMs, Peptides & Nootropics Guides",
  description:
    "Compound guides, research protocols, and scientific overviews covering SARMs, peptides, GLP-1 agonists, and nootropics. Written by the PureRawz research team.",
  openGraph: {
    title: "Research Library | PureRawz",
    description:
      "In-depth guides on SARMs, peptides, GLP-1 research, and nootropics — with compound comparisons, storage protocols, and COA explanations.",
    type: "website",
  },
};

// Build JSON-LD list schema from all posts
const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "PureRawz Research Library",
  description:
    "Research guides, compound comparisons, and scientific protocols for SARMs, peptides, GLP-1 agonists, and nootropics.",
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    datePublished: post.date,
    keywords: post.tags.join(", "),
    url: `https://purerawz.co/blog/${post.slug}`,
    articleSection: post.pillar,
  })),
};

// Populate "All" count
const pillarsWithCounts = blogPillars.map((pillar) => ({
  ...pillar,
  count:
    pillar.slug === "all"
      ? blogPosts.length
      : blogPosts.filter((p) => p.pillarSlug === pillar.slug).length,
}));

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      <BlogListingClient posts={blogPosts} pillars={pillarsWithCounts} />
    </>
  );
}
