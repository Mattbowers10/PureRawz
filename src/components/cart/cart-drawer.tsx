"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
} from "lucide-react";

export function CartDrawer() {
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
  } = useCart();

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Move focus into drawer on open
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
        return;
      }
      if (e.key !== "Tab") return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        role="button"
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            closeCart();
          }
        }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Shopping cart — ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px]",
          "flex flex-col",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          background: "var(--card-raised)",
          borderLeft: "1px solid var(--border)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2.5">
            <ShoppingCart
              className="w-5 h-5"
              style={{ color: "var(--red)" }}
            />
            <h2
              className="text-base font-semibold"
              id="cart-drawer-title"
              style={{ color: "var(--text-primary)" }}
            >
              Cart
              {itemCount > 0 && (
                <span
                  className="ml-2 text-sm font-normal"
                  style={{ color: "var(--text-dim)" }}
                >
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            className="btn-icon"
            aria-label="Close cart"
            onClick={closeCart}
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Cart content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
              style={{
                background: "var(--surface-100)",
                boxShadow: "var(--shadow-inset)",
              }}
            >
              <ShoppingCart
                className="w-8 h-8"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
            <h3
              className="text-base font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Your cart is empty
            </h3>
            <p
              className="text-sm mb-6 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Explore our catalog and add research compounds to your cart.
            </p>
            <Link
              href="/products"
              className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-[var(--radius-pill)]"
              onClick={closeCart}
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-[var(--radius-lg)]"
                  style={{
                    background: "var(--surface-100)",
                    boxShadow: "var(--shadow-ring)",
                  }}
                >
                  {/* Product image placeholder */}
                  <div
                    className="w-14 h-14 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 text-xl font-bold"
                    style={{
                      background: "var(--card-surface)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {item.product.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p
                          className="text-[11px] font-semibold uppercase tracking-wider mb-0.5"
                          style={{ color: "var(--red)" }}
                        >
                          {item.product.category}
                        </p>
                        <h4
                          className="text-sm font-semibold leading-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Remove ${item.product.name} from cart`}
                        className="shrink-0 transition-opacity hover:opacity-60 p-1"
                        style={{ color: "var(--text-dim)" }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity controls */}
                      <div
                        className="flex items-center rounded-[var(--radius-md)]"
                        style={{
                          background: "var(--card-raised)",
                          boxShadow: "var(--shadow-inset)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          className="w-7 h-7 flex items-center justify-center transition-opacity hover:opacity-60"
                          style={{ color: "var(--text-dim)" }}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span
                          className="w-7 text-center text-sm font-semibold"
                          aria-live="polite"
                          aria-label={`Quantity: ${item.quantity}`}
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          aria-label={`Increase quantity of ${item.product.name}`}
                          className="w-7 h-7 flex items-center justify-center transition-opacity hover:opacity-60"
                          style={{ color: "var(--text-dim)" }}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span
                        className="text-sm font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="p-5 space-y-4"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {/* Promo code */}
              <div>
                <label
                  htmlFor="cart-promo-code"
                  className="sr-only"
                >
                  Promo code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                      style={{ color: "var(--text-dim)" }}
                    />
                    <input
                      id="cart-promo-code"
                      type="text"
                      placeholder="Promo code"
                      className="w-full h-10 pl-9 pr-3 text-sm rounded-[var(--radius-md)] transition-all"
                      style={{
                        background: "var(--surface-100)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--red)";
                        e.currentTarget.style.boxShadow = "0 0 0 2px rgba(160,3,3,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-subtle)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <button
                    className="h-10 px-4 text-sm font-medium rounded-[var(--radius-md)] transition-opacity hover:opacity-75"
                    style={{
                      background: "var(--surface-100)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>Subtotal</span>
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>Shipping</span>
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                    {subtotal >= 100 ? (
                      <span style={{ color: "var(--green)" }}>Free</span>
                    ) : (
                      "Calculated at checkout"
                    )}
                  </span>
                </div>
                <div
                  className="my-1"
                  style={{ height: "1px", background: "var(--border)" }}
                />
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Total
                  </span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout button */}
              <button
                className="w-full h-12 rounded-[var(--radius-pill)] text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 group"
                style={{
                  background: "var(--red)",
                  color: "#fff",
                  boxShadow: "var(--badge-glow-red)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.88";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
                onClick={() => {
                  closeCart();
                  router.push("/checkout");
                }}
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-5 pt-1">
                <span
                  className="flex items-center gap-1.5 text-[11px]"
                  style={{ color: "var(--text-dim)" }}
                >
                  <ShieldCheck className="w-3 h-3" style={{ color: "var(--green)" }} />
                  Secure Checkout
                </span>
                <span
                  className="flex items-center gap-1.5 text-[11px]"
                  style={{ color: "var(--text-dim)" }}
                >
                  <Truck className="w-3 h-3" style={{ color: "var(--green)" }} />
                  Free over $100
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
