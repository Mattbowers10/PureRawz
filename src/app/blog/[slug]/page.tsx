import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { getPostBySlug, getRelatedPosts, blogPosts } from "@/lib/blog";
import { BlogPostClient } from "./blog-post-client";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found | PureRawz" };

  return {
    title: `${post.title} | PureRawz Research Library`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="pt-32 lg:pt-40 pb-24 text-center">
        <div className="max-w-md mx-auto px-4">
          <BookOpen className="w-12 h-12 text-foreground-subtle mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Article Not Found</h1>
          <p className="text-foreground-muted mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button variant="glow" asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "PureRawz",
      url: "https://purerawz.co",
    },
    datePublished: post.date,
    keywords: post.tags.join(", "),
    articleSection: post.pillar,
    url: `https://purerawz.co/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
