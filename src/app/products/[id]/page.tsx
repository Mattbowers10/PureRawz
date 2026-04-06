import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { ProductDetailClient } from "./product-detail-client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductBySlug(id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `Buy ${product.name} | ${product.purity} Purity | PureRawz`,
    description: `${product.shortDescription} ${product.purity} purity, COA-verified, third-party tested. SKU: ${product.sku}. Free shipping on qualifying orders.`,
    openGraph: {
      title: `${product.name} — ${product.purity} Purity Research Compound`,
      description: product.shortDescription,
      type: "website",
    },
  };
}

function ProductNotFound() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 text-center">
      <div className="max-w-md mx-auto px-4">
        <FlaskConical className="w-16 h-16 text-foreground-subtle mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-foreground mb-3">Product Not Found</h1>
        <p className="text-foreground-muted mb-6">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button variant="glow" asChild>
          <Link href="/products">Browse All Products</Link>
        </Button>
      </div>
    </div>
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductBySlug(id);

  if (!product) return <ProductNotFound />;

  const related = getRelatedProducts(product);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "PureRawz",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://purerawz.co/products/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "PureRawz",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: "https://purerawz.co/products",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category,
        item: `https://purerawz.co/products?category=${product.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://purerawz.co/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
