"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/product-card";
import {
  ShoppingCart,
  Star,
  ShieldCheck,
  FileCheck,
  Truck,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle2,
  Download,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "coa">(
    "description"
  );

  const tabs = [
    { key: "description" as const, label: "Description" },
    { key: "details" as const, label: "Specifications" },
    { key: "coa" as const, label: "COA / Lab Results" },
  ];

  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-foreground-subtle mb-8" aria-label="Breadcrumb">
          <Link href="/products" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Products
          </Link>
          <span>/</span>
          <Link href={`/products?category=${product.categorySlug}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground-muted">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background-secondary)] border border-[var(--glass-border)] flex items-center justify-center overflow-hidden">
              <span className="text-[120px] font-bold text-foreground-subtle/5 select-none">
                {product.name.charAt(0)}
              </span>
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={
                      product.badge === "Sale"
                        ? "default"
                        : product.badge === "New"
                        ? "info"
                        : "secondary"
                    }
                    className="text-sm px-4 py-1"
                  >
                    {product.badge}
                  </Badge>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 py-2.5 px-4 bg-crimson-950/90 backdrop-blur-sm border-t border-crimson-700/20">
                <p className="text-[11px] text-crimson-200/70 text-center font-medium tracking-wide">
                  FOR RESEARCH PURPOSES ONLY
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl bg-[var(--surface)] border ${
                    i === 1
                      ? "border-crimson-700/50"
                      : "border-[var(--glass-border)]"
                  } flex items-center justify-center cursor-pointer hover:border-[var(--glass-border-hover)] transition-colors`}
                >
                  <span className="text-sm font-bold text-foreground-subtle/10">
                    {product.name.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <div className="mb-2">
              <Badge variant="default">{product.category}</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-foreground-subtle"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-foreground-muted">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-foreground-subtle line-through">
                    ${product.originalPrice}
                  </span>
                  <Badge variant="default">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            <p className="text-foreground-muted leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "SKU", value: product.sku },
                { label: "Purity", value: product.purity },
                { label: "Form", value: product.form },
                { label: "Volume", value: product.volume },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)]"
                >
                  <span className="text-[10px] uppercase tracking-wider text-foreground-subtle">
                    {spec.label}
                  </span>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 rounded-xl border border-[var(--glass-border)] bg-[var(--surface)]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant="glow"
                size="lg"
                className="flex-1 group"
                onClick={() => addItem(product, quantity)}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: "Third-Party Tested" },
                { icon: FileCheck, label: "COA Included" },
                { icon: Truck, label: "Same-Day Shipping" },
              ].map((feat) => (
                <div
                  key={feat.label}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)] text-center"
                >
                  <feat.icon className="w-4 h-4 text-crimson-500" />
                  <span className="text-[10px] font-medium text-foreground-muted">
                    {feat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-[var(--border)]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key
                    ? "text-foreground"
                    : "text-foreground-subtle hover:text-foreground-muted"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-crimson-700 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose prose-invert max-w-3xl">
                {product.description.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-foreground-muted leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-foreground-muted">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="max-w-2xl">
                <div className="rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] overflow-hidden">
                  {[
                    { label: "Product Name", value: product.name },
                    { label: "SKU", value: product.sku },
                    { label: "Category", value: product.category },
                    { label: "Concentration", value: product.concentration },
                    { label: "Form", value: product.form },
                    { label: "Volume / Quantity", value: product.volume },
                    { label: "Purity", value: product.purity },
                    { label: "COA Batch", value: product.coaBatch },
                    { label: "Research Application", value: product.researchUse },
                  ].map((row, i, arr) => (
                    <div
                      key={row.label}
                      className={`grid grid-cols-2 gap-4 px-5 py-3 ${
                        i < arr.length - 1 ? "border-b border-[var(--border)]" : ""
                      }`}
                    >
                      <span className="text-sm text-foreground-subtle">{row.label}</span>
                      <span className="text-sm font-medium text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "coa" && (
              <div className="max-w-2xl">
                <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)]">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-crimson-700/10 flex items-center justify-center shrink-0">
                      <FileCheck className="w-6 h-6 text-crimson-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Certificate of Authenticity
                      </h3>
                      <p className="text-sm text-foreground-muted mt-1">
                        Independent third-party lab analysis for batch{" "}
                        <span className="font-mono text-foreground">{product.coaBatch}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Test Method", value: "HPLC & Mass Spectrometry" },
                      { label: "Purity Result", value: product.purity },
                      { label: "Batch Number", value: product.coaBatch },
                      { label: "Test Status", value: "Passed" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0"
                      >
                        <span className="text-sm text-foreground-muted">{row.label}</span>
                        <span className="text-sm font-medium text-foreground">
                          {row.value === "Passed" ? (
                            <Badge variant="success">{row.value}</Badge>
                          ) : (
                            row.value
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button variant="secondary" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Download Full COA (PDF)
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={addItem} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
