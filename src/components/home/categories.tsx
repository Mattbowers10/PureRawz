"use client";

import Link from "next/link";
import { FlaskConical, Brain, Syringe, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    name: "SARMs",
    tagline: "Selective Androgen Receptor Modulators",
    description:
      "Precision-engineered compounds with exceptional receptor selectivity. The most clinically studied class in our catalog.",
    icon: FlaskConical,
    href: "/products?category=sarms",
    productCount: 12,
    purity: "99.2%",
    color: "#A00303",
    colorMid: "rgba(160,3,3,0.18)",
    colorDim: "rgba(160,3,3,0.08)",
    colorGlow: "rgba(160,3,3,0.35)",
    colorBorder: "rgba(160,3,3,0.3)",
    bloomColor: "rgba(160,3,3,0.15)",
    wide: true,
  },
  {
    name: "Peptides",
    tagline: "Bio-Identical Peptide Chains",
    description:
      "Research-grade sequences for tissue repair, hormonal pathway, and recovery mechanism studies.",
    icon: Syringe,
    href: "/products?category=peptides",
    productCount: 18,
    purity: "98.8%",
    color: "#55b3ff",
    colorMid: "rgba(85,179,255,0.18)",
    colorDim: "rgba(85,179,255,0.07)",
    colorGlow: "rgba(85,179,255,0.30)",
    colorBorder: "rgba(85,179,255,0.28)",
    bloomColor: "rgba(85,179,255,0.12)",
    wide: false,
  },
  {
    name: "Nootropics",
    tagline: "Cognitive Enhancement Compounds",
    description:
      "From proven racetams to cutting-edge peptide nootropics — neurological mechanism research at its finest.",
    icon: Brain,
    href: "/products?category=nootropics",
    productCount: 9,
    purity: "99.1%",
    color: "#a78bfa",
    colorMid: "rgba(167,139,250,0.18)",
    colorDim: "rgba(167,139,250,0.07)",
    colorGlow: "rgba(167,139,250,0.30)",
    colorBorder: "rgba(167,139,250,0.28)",
    bloomColor: "rgba(167,139,250,0.12)",
    wide: false,
  },
];

/* Decorative dot grid for the wide card */
function DotGrid({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

/* Animated corner accent */
function CornerAccent({ color }: { color: string }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      className="absolute top-0 right-0 opacity-20 pointer-events-none"
      aria-hidden="true"
    >
      <path d="M80 0 L80 80 L0 0 Z" fill={color} />
      <path d="M80 0 L80 40 L40 0 Z" fill={color} opacity="0.6" />
    </svg>
  );
}

function WideCategoryCard({ cat }: { cat: typeof categories[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={cat.href}
      className="group relative lg:col-span-2 rounded-[var(--radius-xl)] overflow-hidden flex flex-col justify-between transition-all duration-500"
      style={{
        background: "var(--card-raised)",
        boxShadow: hovered
          ? `0 0 0 1px ${cat.colorBorder}, 0 20px 60px ${cat.colorGlow}, var(--shadow-raise)`
          : `0 0 0 1px rgba(255,255,255,0.06), var(--shadow-raise)`,
        minHeight: "340px",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dot grid texture */}
      <DotGrid color={cat.color} />

      {/* Corner triangle accent */}
      <CornerAccent color={cat.color} />

      {/* Ambient bloom — always visible, intensifies on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0.5,
          background: `radial-gradient(ellipse at 15% 60%, ${cat.bloomColor} 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      {/* Top-left glow on hover */}
      <div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 0.6 : 0,
          background: `radial-gradient(circle, ${cat.colorGlow} 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative p-8 pt-9">
        {/* Icon + purity badge row */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center transition-all duration-300"
            style={{
              background: cat.colorMid,
              border: `1px solid ${cat.colorBorder}`,
              boxShadow: hovered
                ? `0 0 20px ${cat.colorGlow}, 0 0 40px ${cat.colorDim}, inset 0 1px 0 ${cat.colorMid}`
                : `0 0 10px ${cat.colorDim}, inset 0 1px 0 ${cat.colorDim}`,
            }}
          >
            <cat.icon
              className="w-6 h-6 transition-transform duration-300"
              style={{
                color: cat.color,
                transform: hovered ? "scale(1.15)" : "scale(1)",
              }}
            />
          </div>

          {/* Purity stat */}
          <div className="flex flex-col items-end">
            <div
              className="text-2xl font-bold tracking-tight leading-none"
              style={{ color: cat.color }}
            >
              {cat.purity}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3" style={{ color: "var(--green)" }} />
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                Avg purity
              </span>
            </div>
          </div>
        </div>

        <div
          className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2"
          style={{ color: cat.color, opacity: 0.7 }}
        >
          {cat.tagline}
        </div>
        <h3
          className="font-display-syne text-3xl font-bold mb-3"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
        >
          {cat.name}
        </h3>
        <p
          className="text-sm leading-relaxed max-w-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          {cat.description}
        </p>
      </div>

      {/* Bottom row */}
      <div
        className="relative flex items-center justify-between px-8 py-5 mt-auto"
        style={{ borderTop: `1px solid ${hovered ? cat.colorBorder : "rgba(255,255,255,0.05)"}`, transition: "border-color 0.4s" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{
              background: cat.colorMid,
              border: `1px solid ${cat.colorBorder}`,
              color: cat.color,
            }}
          >
            {cat.productCount} compounds
          </span>
          <span className="text-xs" style={{ color: "var(--text-dim)" }}>
            COA verified
          </span>
        </div>
        <div
          className="flex items-center gap-2 text-sm font-semibold transition-all duration-200"
          style={{
            color: cat.color,
            gap: hovered ? "10px" : "6px",
          }}
        >
          Shop now
          <ArrowRight
            className="w-4 h-4 transition-transform duration-200"
            style={{ transform: hovered ? "translateX(3px)" : "translateX(0)" }}
          />
        </div>
      </div>
    </Link>
  );
}

function NarrowCategoryCard({ cat }: { cat: typeof categories[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={cat.href}
      className="group relative rounded-[var(--radius-xl)] overflow-hidden flex flex-col justify-between transition-all duration-500"
      style={{
        background: "var(--card-raised)",
        boxShadow: hovered
          ? `0 0 0 1px ${cat.colorBorder}, 0 16px 48px ${cat.colorGlow}, var(--shadow-raise)`
          : `0 0 0 1px rgba(255,255,255,0.06), var(--shadow-raise)`,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        flex: 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner accent */}
      <CornerAccent color={cat.color} />

      {/* Bloom */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0.4,
          background: `radial-gradient(ellipse at 10% 80%, ${cat.bloomColor} 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Hover glow */}
      <div
        className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 0.5 : 0,
          background: `radial-gradient(circle, ${cat.colorGlow} 0%, transparent 70%)`,
          filter: "blur(24px)",
        }}
        aria-hidden="true"
      />

      <div className="relative p-6">
        {/* Icon + count */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-300"
            style={{
              background: cat.colorMid,
              border: `1px solid ${cat.colorBorder}`,
              boxShadow: hovered
                ? `0 0 16px ${cat.colorGlow}, inset 0 1px 0 ${cat.colorMid}`
                : `inset 0 1px 0 ${cat.colorDim}`,
            }}
          >
            <cat.icon
              className="w-5 h-5 transition-transform duration-300"
              style={{
                color: cat.color,
                transform: hovered ? "scale(1.1)" : "scale(1)",
              }}
            />
          </div>

          {/* Count pill */}
          <div
            className="flex flex-col items-end"
          >
            <span
              className="text-xl font-bold leading-none"
              style={{ color: cat.color }}
            >
              {cat.purity}
            </span>
            <span
              className="text-[9px] uppercase tracking-wider mt-0.5"
              style={{ color: "var(--text-dim)" }}
            >
              purity
            </span>
          </div>
        </div>

        <h3
          className="font-display-syne text-xl font-bold mb-2"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          {cat.name}
        </h3>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {cat.description}
        </p>
      </div>

      {/* Bottom */}
      <div
        className="relative flex items-center justify-between px-6 py-4"
        style={{
          borderTop: `1px solid ${hovered ? cat.colorBorder : "rgba(255,255,255,0.05)"}`,
          transition: "border-color 0.4s",
        }}
      >
        <span
          className="text-[11px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: cat.colorDim,
            border: `1px solid ${cat.colorBorder}`,
            color: cat.color,
            opacity: 0.85,
          }}
        >
          {cat.productCount} compounds
        </span>
        <div
          className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200"
          style={{ color: cat.color }}
        >
          Shop now
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-200"
            style={{ transform: hovered ? "translateX(3px)" : "translateX(0)" }}
          />
        </div>
      </div>
    </Link>
  );
}

export function Categories() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-3"
            style={{ color: "var(--red)" }}
          >
            Browse Categories
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="font-display-syne text-3xl sm:text-4xl lg:text-5xl font-bold leading-none"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
            >
              Research Compounds for{" "}
              <span className="gradient-text-glow">Every Protocol</span>
            </h2>
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-sm font-medium shrink-0 transition-opacity hover:opacity-60"
              style={{ color: "var(--text-dim)" }}
            >
              All products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Wide card */}
          <WideCategoryCard cat={categories[0]} />

          {/* Two narrow cards stacked */}
          <div className="flex flex-col gap-4">
            {categories.slice(1).map((cat) => (
              <NarrowCategoryCard key={cat.name} cat={cat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
