"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

const featuredProducts = products.slice(0, 6);

export function FeaturedProducts() {
  const { addItem } = useCart();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-3"
              style={{ color: "var(--red)" }}
            >
              Featured Products
            </p>
            <h2
              className="font-display-syne text-3xl sm:text-4xl font-bold"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
            >
              Popular Research Compounds
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm font-medium shrink-0 transition-opacity hover:opacity-60"
            style={{ color: "var(--text-dim)" }}
          >
            View all products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
