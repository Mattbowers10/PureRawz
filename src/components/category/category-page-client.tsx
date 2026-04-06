"use client";

import type { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { ProductCard } from "@/components/products/product-card";

interface CategoryPageClientProps {
  products: Product[];
}

export function CategoryPageClient({ products }: CategoryPageClientProps) {
  const { addItem } = useCart();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={addItem} />
      ))}
    </div>
  );
}
