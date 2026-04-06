"use client";

import { ShieldCheck, FlaskConical, Truck, CreditCard, HeadphonesIcon, Award } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "Third-Party Tested" },
  { icon: Award, label: "COA On Every Batch" },
  { icon: FlaskConical, label: "99%+ Purity Guaranteed" },
  { icon: Truck, label: "Same-Day Shipping" },
  { icon: CreditCard, label: "Secure Checkout" },
  { icon: HeadphonesIcon, label: "Expert Research Support" },
];

export function TrustBar() {
  return (
    <section
      className="relative py-5 overflow-hidden"
      aria-label="Trust indicators"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        background: "var(--surface-100)",
      }}
    >
      {/* Fade masks at edges */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, var(--surface-100), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, var(--surface-100), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Marquee track */}
      <div className="flex animate-marquee whitespace-nowrap will-change-transform" aria-hidden="true">
        {[...trustItems, ...trustItems, ...trustItems].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 mx-10 shrink-0"
          >
            <div
              className="w-7 h-7 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0"
              style={{
                background: "var(--red-dim)",
                border: "1px solid rgba(160,3,3,0.12)",
              }}
            >
              <item.icon className="w-3.5 h-3.5" style={{ color: "var(--red)" }} />
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Accessible static list for screen readers */}
      <ul className="sr-only">
        {trustItems.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>
    </section>
  );
}
