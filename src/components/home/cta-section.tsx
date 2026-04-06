"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, FlaskConical } from "lucide-react";

const stats = [
  { value: "100+", label: "Active Compounds" },
  { value: "50K+", label: "Orders Shipped" },
  { value: "99%+", label: "Purity Standard" },
  { value: "4.9★", label: "Avg Rating" },
];

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container">
        <div
          className="relative rounded-[var(--radius-2xl)] overflow-hidden px-8 py-16 sm:px-16 sm:py-20 lg:px-24"
          style={{
            background: "var(--card-raised)",
            boxShadow: "var(--shadow-raise)",
          }}
        >
          {/* Crimson radial bloom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 20% 50%, rgba(160,3,3,0.14) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* Top highlight stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
            }}
            aria-hidden="true"
          />

          {/* Corner icon */}
          <div
            className="absolute top-8 right-8 w-14 h-14 rounded-[var(--radius-xl)] flex items-center justify-center opacity-20"
            style={{ background: "var(--red-dim)", border: "1px solid rgba(160,3,3,0.3)" }}
            aria-hidden="true"
          >
            <FlaskConical className="w-7 h-7" style={{ color: "var(--red)" }} />
          </div>

          {/* Content */}
          <div className="relative max-w-2xl">
            {/* Compliance pill */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: "var(--red-dim)",
                border: "1px solid rgba(160,3,3,0.2)",
                color: "var(--red)",
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              For Research Purposes Only
            </div>

            <h2
              className="font-display-geist text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-none mb-5"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
            >
              Ready to Elevate Your Research?
            </h2>

            <p
              className="text-base leading-relaxed mb-10 max-w-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Join thousands of researchers who trust PureRawz for premium, third-party tested
              compounds — full documentation, fast shipping, zero compromise on purity.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius-pill)] text-sm font-semibold transition-opacity hover:opacity-80 group"
                style={{
                  background: "var(--red)",
                  color: "#fff",
                  boxShadow: "var(--badge-glow-red)",
                }}
              >
                Shop All Products
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius-pill)] text-sm font-semibold transition-opacity hover:opacity-70"
                style={{
                  background: "var(--surface-100)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-inset)",
                }}
              >
                Contact Our Team
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="relative mt-14 pt-10 grid grid-cols-2 sm:grid-cols-4 gap-8"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div
                  className="font-display-geist text-2xl sm:text-3xl font-bold mb-1"
                  style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--text-dim)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
