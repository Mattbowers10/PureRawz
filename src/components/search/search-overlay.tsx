"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { products, type Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Search, X, ArrowRight, Clock, TrendingUp } from "lucide-react";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const trendingSearches = [
  "RAD-140",
  "BPC-157",
  "MK-677",
  "Noopept",
  "Peptides",
];

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Search panel */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="max-w-2xl mx-auto px-4 pt-24 pb-8">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-subtle" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full h-14 pl-14 pr-14 rounded-2xl bg-[var(--background-secondary)] border border-[var(--glass-border)] text-foreground text-lg placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-crimson-700/50 focus:border-crimson-700/50 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-foreground-subtle hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Results / Suggestions */}
          <div className="mt-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--glass-border)] overflow-hidden max-h-[60vh] overflow-y-auto">
            {query.trim() === "" ? (
              /* Trending searches */
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-crimson-500" />
                  <span className="text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
                    Trending Searches
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--glass-border)] text-sm text-foreground-muted hover:text-foreground hover:border-[var(--glass-border-hover)] transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              /* No results */
              <div className="p-8 text-center">
                <p className="text-foreground-muted">
                  No products found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-sm text-foreground-subtle mt-1">
                  Try a different search term
                </p>
              </div>
            ) : (
              /* Results list */
              <div className="divide-y divide-[var(--border)]">
                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-foreground-subtle">
                    {results.length} result{results.length !== 1 && "s"}
                  </span>
                  <Link
                    href={`/products?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-xs text-crimson-500 hover:text-crimson-400 font-medium flex items-center gap-1"
                  >
                    View all <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                {results.slice(0, 6).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--surface)] transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background)] flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-foreground-subtle/20">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground group-hover:text-crimson-400 transition-colors truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-foreground-subtle truncate">
                        {product.shortDescription}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge variant="secondary" className="mb-1">
                        {product.category}
                      </Badge>
                      <p className="text-sm font-bold text-foreground">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Keyboard hint */}
          <div className="mt-3 text-center">
            <span className="text-xs text-foreground-subtle">
              Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--glass-border)] text-[10px] font-mono">ESC</kbd> to close
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
