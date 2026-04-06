"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Star, ShieldCheck, Eye } from "lucide-react";
import type { Product } from "@/lib/products";

const badgeMap: Record<string, { bg: string; color: string; border: string }> = {
  "Best Seller": { bg: "rgba(160,3,3,0.15)",   color: "#FF6B6B", border: "rgba(160,3,3,0.35)" },
  "Popular":     { bg: "rgba(85,179,255,0.12)", color: "#55b3ff", border: "rgba(85,179,255,0.35)" },
  "New":         { bg: "rgba(95,201,146,0.12)", color: "#5fc992", border: "rgba(95,201,146,0.35)" },
  "Sale":        { bg: "rgba(255,188,51,0.12)", color: "#ffbc33", border: "rgba(255,188,51,0.35)" },
};

export const categoryAccent: Record<string, { color: string; glow: string }> = {
  SARMs:      { color: "#FF6B6B", glow: "rgba(160,3,3,0.55)" },
  Peptides:   { color: "#55b3ff", glow: "rgba(85,179,255,0.45)" },
  Nootropics: { color: "#a78bfa", glow: "rgba(167,139,250,0.45)" },
};

const defaultAccent = { color: "#FF6B6B", glow: "rgba(160,3,3,0.45)" };

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  /** Show "View Details" overlay + link the image. Defaults to true. */
  linkToProduct?: boolean;
}

export function ProductCard({ product, onAddToCart, linkToProduct = true }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const badge  = product.badge ? badgeMap[product.badge] ?? null : null;
  const accent = categoryAccent[product.category] ?? defaultAccent;

  const imageContent = (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ aspectRatio: "4/3", background: "var(--surface-100)" }}
    >
      {/* Category bloom */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 60%, ${accent.glow.replace(/[\d.]+\)$/, "0.13)")} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Monogram */}
      <span
        className="relative text-5xl font-black select-none transition-all duration-300"
        style={{
          color: hovered ? accent.color : "var(--text-muted)",
          letterSpacing: "-0.03em",
          filter: hovered ? `drop-shadow(0 0 16px ${accent.glow})` : "none",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
        aria-hidden="true"
      >
        {product.name.charAt(0)}
      </span>

      {/* "View Details" overlay */}
      {linkToProduct && (
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: hovered ? 1 : 0, background: "rgba(0,0,0,0.35)" }}
        >
          <span
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold"
            style={{
              background: "rgba(7,8,10,0.7)",
              border: `1px solid ${accent.glow}`,
              color: accent.color,
              backdropFilter: "blur(8px)",
            }}
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </span>
        </div>
      )}

      {/* COA pill */}
      <div
        className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
        style={{
          background: "rgba(95,201,146,0.12)",
          color: "var(--green)",
          border: "1px solid rgba(95,201,146,0.25)",
        }}
      >
        <ShieldCheck className="w-2.5 h-2.5" />
        COA Verified
      </div>

      {/* Badge */}
      {badge && product.badge && (
        <div
          className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
          style={{
            background: badge.bg,
            color: badge.color,
            border: `1px solid ${badge.border}`,
          }}
        >
          {product.badge}
        </div>
      )}
    </div>
  );

  return (
    <article
      className="relative rounded-[var(--radius-xl)] overflow-hidden flex flex-col transition-all duration-300"
      style={{
        background: "var(--card-surface)",
        border: `1px solid ${hovered ? accent.glow : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered
          ? `0 0 0 1px ${accent.glow}, 0 0 30px ${accent.glow}, 0 8px 40px rgba(0,0,0,0.4)`
          : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {linkToProduct ? (
        <Link href={`/products/${product.slug}`} tabIndex={-1} aria-hidden="true">
          {imageContent}
        </Link>
      ) : imageContent}

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-1.5 transition-colors duration-200"
          style={{ color: hovered ? accent.color : "var(--text-dim)" }}
        >
          {product.category}
        </p>

        {linkToProduct ? (
          <Link href={`/products/${product.slug}`}>
            <h3
              className="text-sm font-bold leading-tight mb-2.5 hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-primary)" }}
            >
              {product.name}
            </h3>
          </Link>
        ) : (
          <h3
            className="text-sm font-bold leading-tight mb-2.5"
            style={{ color: "var(--text-primary)" }}
          >
            {product.name}
          </h3>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3"
                style={{
                  color: i < Math.floor(product.rating) ? "var(--yellow)" : "var(--text-muted)",
                  fill:  i < Math.floor(product.rating) ? "var(--yellow)" : "transparent",
                }}
              />
            ))}
          </div>
          <span className="sr-only">{product.rating} out of 5 stars</span>
          <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>
            ({product.reviewCount})
          </span>
        </div>

        {/* Price + cart */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black" style={{ color: "var(--text-primary)" }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through" style={{ color: "var(--text-muted)" }}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          {onAddToCart && (
            <button
              aria-label={`Add ${product.name} to cart`}
              className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-200"
              style={{
                background: hovered ? accent.glow.replace(/[\d.]+\)$/, "0.15)") : "var(--surface-100)",
                color: hovered ? accent.color : "var(--text-dim)",
                border: `1px solid ${hovered ? accent.glow : "rgba(255,255,255,0.06)"}`,
                boxShadow: hovered ? `0 0 12px ${accent.glow}` : "none",
              }}
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
