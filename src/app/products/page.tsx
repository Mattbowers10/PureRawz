"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/product-card";
import { Search } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "newest">("popular");
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.categorySlug === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "newest":
        return [...filtered].reverse();
      default:
        return [...filtered].sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-semibold text-crimson-500 uppercase tracking-wider mb-3">
              Product Catalog
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              All Products
            </h1>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="shrink-0 h-9 px-3 rounded-full text-sm font-medium bg-[var(--surface)] text-foreground-muted border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-crimson-700/50 cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>

          <div className="h-6 w-px bg-[var(--border)]" />

          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.slug
                  ? "bg-crimson-700 text-white"
                  : "bg-[var(--surface)] text-foreground-muted hover:text-foreground border border-[var(--glass-border)] hover:border-[var(--glass-border-hover)]"
              }`}
            >
              {cat.name}
              <span className="ml-1.5 text-xs opacity-60">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-foreground-subtle mb-6">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 && "s"}
          {activeCategory !== "all" && (
            <span>
              {" "}in <span className="text-foreground-muted font-medium">{categories.find((c) => c.slug === activeCategory)?.name}</span>
            </span>
          )}
          {searchQuery && (
            <span>
              {" "}matching &ldquo;<span className="text-foreground-muted font-medium">{searchQuery}</span>&rdquo;
            </span>
          )}
        </p>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-foreground-muted mb-2">No products found</p>
            <p className="text-sm text-foreground-subtle mb-6">Try adjusting your filters or search terms.</p>
            <Button
              variant="secondary"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
