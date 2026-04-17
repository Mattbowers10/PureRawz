"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ShieldCheck,
  FlaskConical,
  Microscope,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  ExternalLink,
  Sparkles,
  Package,
} from "lucide-react";
import { getProductsByCategory } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { getAllBundles } from "@/lib/peptide-bundles";

/* ─── Peptide Compound Data ───────────────────────────────────────── */
const featuredPeptides = [
  {
    code: "BPC-157",
    name: "Body Protection Compound-157",
    formula: "C₆₂H₉₈N₁₆O₂₂",
    mw: "1419.5 g/mol",
    purity: "99.1%",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    researched: ["Tissue cytoprotection", "GI tract signaling", "Angiogenic pathways"],
    status: "under-review",
    statusLabel: "FDA Under Review",
    color: "#55b3ff",
    glow: "rgba(85,179,255,0.25)",
  },
  {
    code: "TB-500",
    name: "Thymosin Beta-4 Analog",
    formula: "C₂₁₂H₃₅₀N₅₆O₇₈S",
    mw: "4963.5 g/mol",
    purity: "98.9%",
    sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu",
    researched: ["Actin polymerization", "Wound healing pathways", "Anti-inflammatory signaling"],
    status: "under-review",
    statusLabel: "FDA Under Review",
    color: "#55b3ff",
    glow: "rgba(85,179,255,0.25)",
  },
  {
    code: "PT-141",
    name: "Bremelanotide",
    formula: "C₅₀H₆₈N₁₄O₁₀",
    mw: "1025.2 g/mol",
    purity: "99.3%",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH",
    researched: ["Melanocortin receptor agonism", "CNS receptor pathway", "MC3R / MC4R studies"],
    status: "in-catalog",
    statusLabel: "Available Now",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.30)",
  },
  {
    code: "GHK-Cu",
    name: "Copper Tripeptide-1",
    formula: "C₁₄H₂₃CuN₆O₄",
    mw: "403.9 g/mol",
    purity: "99.4%",
    sequence: "Gly-His-Lys · Cu²⁺",
    researched: ["Gene expression modulation", "Collagen synthesis pathways", "Antioxidant enzyme induction"],
    status: "in-catalog",
    statusLabel: "Available Now",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.25)",
  },
  {
    code: "CJC-1295",
    name: "CJC-1295 (no DAC)",
    formula: "C₁₅₂H₂₅₂N₄₂O₄₂S",
    mw: "3367.9 g/mol",
    purity: "98.7%",
    sequence: "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg",
    researched: ["GHRH receptor binding", "Pulsatile GH secretion studies", "IGF-1 pathway research"],
    status: "in-catalog",
    statusLabel: "Available Now",
    color: "#A00303",
    glow: "rgba(160,3,3,0.35)",
  },
  {
    code: "Ipamorelin",
    name: "Ipamorelin Acetate",
    formula: "C₃₈H₄₉N₉O₅",
    mw: "711.8 g/mol",
    purity: "99.0%",
    sequence: "Aib-His-D-2Nal-D-Phe-Lys-NH₂",
    researched: ["Ghrelin receptor selectivity", "GH secretagogue studies", "Cortisol pathway independence"],
    status: "in-catalog",
    statusLabel: "Available Now",
    color: "#A00303",
    glow: "rgba(160,3,3,0.35)",
  },
  {
    code: "Sermorelin",
    name: "Sermorelin Acetate",
    formula: "C₁₄₉H₂₄₆N₄₄O₄₂S",
    mw: "3357.9 g/mol",
    purity: "98.5%",
    sequence: "Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH₂",
    researched: ["GHRH(1-29) analog activity", "Somatotroph stimulation studies", "GH pulsatility research"],
    status: "under-review",
    statusLabel: "FDA Under Review",
    color: "#55b3ff",
    glow: "rgba(85,179,255,0.25)",
  },
  {
    code: "Epitalon",
    name: "Epithalon Tetrapeptide",
    formula: "C₁₄H₂₂N₄O₉",
    mw: "390.3 g/mol",
    purity: "99.2%",
    sequence: "Ala-Glu-Asp-Gly",
    researched: ["Telomerase activation studies", "Pineal gland peptide research", "Circadian rhythm regulation"],
    status: "under-review",
    statusLabel: "FDA Under Review",
    color: "#55b3ff",
    glow: "rgba(85,179,255,0.25)",
  },
];

/* ─── Countdown ───────────────────────────────────────────────────── */
const FDA_PANEL_DATE = new Date("2026-07-15T09:00:00-04:00");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-display-syne text-3xl sm:text-4xl font-bold tabular-nums leading-none"
        style={{ color: "#55b3ff", letterSpacing: "-0.03em" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] uppercase tracking-[0.18em] mt-1.5" style={{ color: "var(--text-dim)" }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Helix SVG decoration ────────────────────────────────────────── */
function HelixDecoration() {
  return (
    <svg
      className="absolute right-0 top-0 h-full w-[280px] opacity-[0.06] pointer-events-none"
      viewBox="0 0 280 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {Array.from({ length: 18 }).map((_, i) => {
        const y = i * 34 + 10;
        const xLeft = 40 + 80 * Math.sin(i * 0.7);
        const xRight = 240 + 0 * Math.cos(i * 0.7);
        return (
          <g key={i}>
            <line
              x1={xLeft} y1={y} x2={xRight} y2={y + 12}
              stroke="#55b3ff" strokeWidth={i % 3 === 0 ? "2" : "1"}
              strokeOpacity={i % 3 === 0 ? "1" : "0.5"}
            />
            <circle cx={xLeft} cy={y} r="4" fill="#55b3ff" opacity={i % 3 === 0 ? "1" : "0.4"} />
            <circle cx={xRight} cy={y + 12} r="3" fill="#55b3ff" opacity="0.3" />
          </g>
        );
      })}
      <path
        d={`M 40 ${10 + 80 * 0} ${Array.from({ length: 18 }, (_, i) => {
          const y = i * 34 + 10;
          const x = 40 + 80 * Math.sin(i * 0.7);
          return `L ${x} ${y}`;
        }).join(" ")}`}
        stroke="#55b3ff" strokeWidth="1.5" fill="none" opacity="0.6"
      />
    </svg>
  );
}

/* ─── Compound Card ───────────────────────────────────────────────── */
function CompoundCard({ p }: { p: typeof featuredPeptides[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-400 cursor-pointer"
      style={{
        background: "var(--card-surface)",
        boxShadow: expanded
          ? `0 0 0 1px ${p.color}44, 0 16px 48px ${p.glow}`
          : "0 0 0 1px rgba(255,255,255,0.06)",
        transform: expanded ? "translateY(-1px)" : "none",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${p.color}60, transparent)` }} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-display-syne text-xl font-bold"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                {p.code}
              </span>
              {/* Status badge */}
              <span
                className="text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full"
                style={{
                  background: p.status === "under-review" ? "rgba(85,179,255,0.12)" : "rgba(52,211,153,0.10)",
                  color: p.status === "under-review" ? "#55b3ff" : "#34d399",
                  border: `1px solid ${p.status === "under-review" ? "rgba(85,179,255,0.25)" : "rgba(52,211,153,0.20)"}`,
                }}
              >
                {p.status === "under-review" ? "⬡ FDA Review" : "● Available"}
              </span>
            </div>
            <p className="text-[11px]" style={{ color: "var(--text-dim)" }}>{p.name}</p>
          </div>
          <div className="text-right">
            <div className="font-display-syne text-lg font-bold" style={{ color: p.color, letterSpacing: "-0.02em" }}>{p.purity}</div>
            <div className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>purity</div>
          </div>
        </div>

        {/* Formula */}
        <div
          className="font-mono text-[11px] px-3 py-1.5 rounded-lg mb-3 inline-block"
          style={{ background: `${p.color}0d`, color: p.color, border: `1px solid ${p.color}22` }}
        >
          {p.formula} · {p.mw}
        </div>

        {/* Research areas */}
        <div className="flex flex-wrap gap-1.5">
          {p.researched.map((r) => (
            <span
              key={r}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "var(--text-secondary)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {r}
            </span>
          ))}
        </div>

        {/* Expanded: sequence */}
        {expanded && (
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[9px] uppercase tracking-[0.14em] mb-1.5" style={{ color: "var(--text-muted)" }}>
              Sequence
            </p>
            <p
              className="font-mono text-[10px] leading-relaxed break-all"
              style={{ color: "var(--text-secondary)" }}
            >
              {p.sequence}
            </p>
          </div>
        )}

        {/* Expand hint */}
        <div className="mt-3 flex items-center gap-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
          <span>{expanded ? "▲ Collapse" : "▼ View sequence"}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Bundles Section ─────────────────────────────────────────────── */
function BundlesSection() {
  const bundles = getAllBundles();
  return (
    <div className="mb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4" style={{ color: "#55b3ff" }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#55b3ff" }}>
              Research Protocol Bundles
            </p>
          </div>
          <h2
            className="font-display-syne text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
          >
            Research Protocol Bundles
          </h2>
          <p className="mt-2 text-sm max-w-lg" style={{ color: "var(--text-secondary)" }}>
            Curated combinations grounded in published mechanistic research. Each bundle pairs
            compounds targeting distinct, non-overlapping receptor classes for cleaner multi-pathway study design.
          </p>
        </div>
        <Link
          href="/products?category=peptides"
          className="flex items-center gap-1.5 text-sm font-medium shrink-0 transition-opacity hover:opacity-60"
          style={{ color: "var(--text-dim)" }}
        >
          Individual compounds <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Bundle cards */}
      <div className="grid lg:grid-cols-3 gap-5">
        {bundles.map((bundle) => (
          <Link
            key={bundle.slug}
            href={`/research/peptides/bundles/${bundle.slug}`}
            className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-400"
            style={{
              background: "var(--card-surface)",
              boxShadow: `0 0 0 1px rgba(255,255,255,0.06)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${bundle.accentColor}44, 0 20px 60px ${bundle.accentGlow}`;
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px rgba(255,255,255,0.06)`;
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${bundle.accentColor}80, transparent)` }}
            />

            {/* Ambient bloom */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(ellipse at 20% 80%, ${bundle.accentGlow} 0%, transparent 60%)` }}
              aria-hidden="true"
            />

            <div className="relative p-6 flex flex-col flex-1">
              {/* Badge + price row */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full"
                  style={{
                    background: `${bundle.accentColor}18`,
                    color: bundle.accentColor,
                    border: `1px solid ${bundle.accentColor}33`,
                  }}
                >
                  {bundle.badgeLabel}
                </span>
                <div className="text-right">
                  <span
                    className="font-display-syne text-xl font-bold"
                    style={{ color: bundle.accentColor, letterSpacing: "-0.02em" }}
                  >
                    ${bundle.price}
                  </span>
                  <span
                    className="ml-2 text-xs line-through"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ${bundle.comparePrice}
                  </span>
                </div>
              </div>

              {/* Name + domain */}
              <h3
                className="font-display-syne text-lg font-bold mb-1"
                style={{ color: bundle.accentColor, letterSpacing: "-0.02em" }}
              >
                {bundle.name}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: "var(--text-muted)" }}>
                {bundle.researchDomain}
              </p>
              <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                {bundle.tagline}
              </p>

              {/* Compound pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {bundle.compounds.map((c) => (
                  <span
                    key={c.code}
                    className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded"
                    style={{
                      background: `${c.color}14`,
                      color: c.color,
                      border: `1px solid ${c.color}28`,
                    }}
                  >
                    {c.code} ×{c.quantity}
                  </span>
                ))}
              </div>

              {/* Accessories */}
              <div className="flex flex-wrap gap-1 mb-6">
                {bundle.accessories.map((a) => (
                  <span
                    key={a.name}
                    className="text-[9px] px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      color: "var(--text-muted)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    + {a.name.split(" ").slice(0, 3).join(" ")}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                  View Protocol + Research
                </span>
                <div
                  className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                  style={{ color: bundle.accentColor }}
                >
                  Shop bundle <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-5 text-[10px] text-center" style={{ color: "var(--text-muted)" }}>
        Bundle pricing reflects current test values. All compounds for laboratory research use only. Not for human consumption.
      </p>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────── */
export default function PeptidesPage() {
  const countdown = useCountdown(FDA_PANEL_DATE);
  const peptideProducts = getProductsByCategory("peptides");
  const { addItem } = useCart();

  return (
    <div className="relative overflow-hidden">
      {/* Page-level blue atmosphere — overrides the default crimson */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 0%, rgba(85,179,255,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(85,179,255,0.04) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* ── NEWS TICKER BANNER ────────────────────────────────────── */}
      <div
        className="sticky top-[var(--header-height,80px)] z-40 py-2 overflow-hidden"
        style={{
          background: "rgba(85,179,255,0.08)",
          borderBottom: "1px solid rgba(85,179,255,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="container flex items-center gap-3">
          <span
            className="shrink-0 text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded"
            style={{ background: "#55b3ff", color: "#000" }}
          >
            April 2026
          </span>
          <p className="text-[11px] truncate" style={{ color: "rgba(85,179,255,0.9)" }}>
            FDA advisory panel confirmed for July 2026 — reviewing peptide compounding reclassification including BPC-157 &amp; TB-500.
            &nbsp;·&nbsp; RFK Jr.: <em>"I am a big fan of peptides."</em>
            &nbsp;·&nbsp; The era of legitimate, documented peptide research is beginning.
          </p>
          <a
            href="https://www.cbsnews.com/news/fda-weigh-restrictions-peptides-rfk-jr/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1 text-[10px] font-semibold transition-opacity hover:opacity-70"
            style={{ color: "#55b3ff" }}
          >
            CBS News <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      <div className="pt-20 lg:pt-28 pb-32">
        <div className="container">

          {/* ── HERO ────────────────────────────────────────────────── */}
          <div className="relative mb-28">
            <HelixDecoration />

            {/* Overline */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                style={{
                  background: "rgba(85,179,255,0.1)",
                  color: "#55b3ff",
                  border: "1px solid rgba(85,179,255,0.25)",
                }}
              >
                Research Peptides
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                · For Laboratory Research Use Only
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="font-display-syne font-bold leading-none mb-6"
              style={{
                fontSize: "clamp(42px, 7vw, 96px)",
                letterSpacing: "-0.035em",
                color: "var(--text-primary)",
                maxWidth: "16ch",
              }}
            >
              The{" "}
              <span
                style={{
                  color: "#55b3ff",
                  filter: "drop-shadow(0 0 24px rgba(85,179,255,0.45)) drop-shadow(0 0 60px rgba(85,179,255,0.20))",
                }}
              >
                Legitimate
              </span>
              {" "}Era.
            </h1>

            <p
              className="text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              For decades, peptide research operated in regulatory grey. July 2026 changes
              that — the FDA advisory panel&apos;s reclassification review marks the dawn of a
              new era for documented, quality-controlled peptide science. PureRawz has been
              the research-grade standard all along. Now the science is catching up.
            </p>

            {/* Countdown */}
            <div
              className="inline-flex flex-col mb-10 p-6 rounded-2xl"
              style={{
                background: "var(--card-raised)",
                boxShadow: "0 0 0 1px rgba(85,179,255,0.18), 0 20px 60px rgba(85,179,255,0.08)",
              }}
            >
              <p
                className="text-[9px] uppercase tracking-[0.2em] mb-4 text-center"
                style={{ color: "var(--text-muted)" }}
              >
                FDA Advisory Panel — Est. July 2026
              </p>
              <div className="flex items-center gap-5">
                <CountdownUnit value={countdown.days} label="Days" />
                <span className="font-display-syne text-2xl font-bold pb-3" style={{ color: "rgba(85,179,255,0.3)" }}>:</span>
                <CountdownUnit value={countdown.hours} label="Hours" />
                <span className="font-display-syne text-2xl font-bold pb-3" style={{ color: "rgba(85,179,255,0.3)" }}>:</span>
                <CountdownUnit value={countdown.minutes} label="Min" />
                <span className="font-display-syne text-2xl font-bold pb-3" style={{ color: "rgba(85,179,255,0.3)" }}>:</span>
                <CountdownUnit value={countdown.seconds} label="Sec" />
              </div>
              <p className="text-[9px] text-center mt-4" style={{ color: "var(--text-muted)" }}>
                Estimated target date · Subject to official FDA announcement
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products?category=peptides"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all hover:opacity-85 group"
                style={{
                  background: "#55b3ff",
                  color: "#040507",
                  boxShadow: "0 0 30px rgba(85,179,255,0.30)",
                }}
              >
                Shop Peptide Catalog
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#compounds"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-70"
                style={{
                  background: "var(--card-raised)",
                  color: "var(--text-secondary)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                View Compounds
              </a>
            </div>
          </div>

          {/* ── REGULATORY CONTEXT ──────────────────────────────────── */}
          <div className="mb-28">
            <div className="grid lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Sparkles,
                  iconColor: "#55b3ff",
                  iconBg: "rgba(85,179,255,0.10)",
                  label: "The Shift",
                  title: "From grey market to legitimate science",
                  body: "The FDA review marks a pivot from unregulated gray-market imports to a documented, quality-controlled framework — exactly what serious researchers have always needed.",
                },
                {
                  icon: Clock,
                  iconColor: "#f59e0b",
                  iconBg: "rgba(245,158,11,0.10)",
                  label: "The Moment",
                  title: "Advisory panel confirmed: July 2026",
                  body: "The FDA advisory panel reviewing peptide compounding reclassification will convene in July 2026 — a formal step toward legitimizing the research landscape for BPC-157, TB-500, and more.",
                },
                {
                  icon: Zap,
                  iconColor: "#A00303",
                  iconBg: "rgba(160,3,3,0.10)",
                  label: "The Standard",
                  title: "PureRawz has been research-grade all along",
                  body: "COA on every batch. HPLC and mass spec verification. Documented supply chain. The quality standard regulators are now demanding is the one we've held since day one.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative p-6 rounded-2xl overflow-hidden"
                  style={{
                    background: "var(--card-surface)",
                    boxShadow: "var(--shadow-ring)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: item.iconBg }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.iconColor }} />
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.18em] mb-2" style={{ color: item.iconColor }}>
                    {item.label}
                  </p>
                  <h3
                    className="font-display-syne text-base font-bold mb-2"
                    style={{ color: "var(--text-primary)", letterSpacing: "-0.015em" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── QUALITY DIVIDE ──────────────────────────────────────── */}
          <div className="mb-28">
            <div className="mb-10">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-3"
                style={{ color: "#55b3ff" }}
              >
                Why Sourcing Matters
              </p>
              <h2
                className="font-display-syne text-3xl sm:text-4xl font-bold max-w-xl"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
              >
                The Gray Market{" "}
                <span style={{ color: "#A00303" }}>Problem</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                The FDA&apos;s own advisory documentation cites unregulated imports as the primary
                safety concern driving the review. Quality-controlled, documented sourcing is the
                difference between useful research data and unreliable results.
              </p>
            </div>

            {/* Comparison table */}
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Gray market */}
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: "var(--card-surface)",
                  boxShadow: "var(--shadow-ring)",
                  border: "1px solid rgba(160,3,3,0.15)",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(160,3,3,0.4), transparent)" }} />
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(160,3,3,0.8)" }}>
                  Gray Market / Unverified Import
                </p>
                {[
                  "Unknown country of origin",
                  "No independent purity verification",
                  "No Certificate of Analysis",
                  "Inconsistent concentration",
                  "No amino acid sequence confirmation",
                  "No documented supply chain",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(160,3,3,0.12)" }}>
                      <span className="text-[8px]" style={{ color: "#A00303" }}>✗</span>
                    </div>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* PureRawz */}
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: "var(--card-surface)",
                  boxShadow: "0 0 0 1px rgba(85,179,255,0.2), 0 16px 48px rgba(85,179,255,0.08)",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(85,179,255,0.5), transparent)" }} />
                <div className="flex items-center gap-2 mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#55b3ff" }}>
                    PureRawz Research Grade
                  </p>
                  <span
                    className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded"
                    style={{ background: "#55b3ff", color: "#040507" }}
                  >
                    COA
                  </span>
                </div>
                {[
                  "US-based with full supply-chain traceability",
                  "Independent HPLC purity verification",
                  "Certificate of Analysis with every order",
                  "Quantitative concentration confirmed",
                  "Mass spectrometry sequence confirmation",
                  "Lyophilized for stability — not liquid",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(85,179,255,0.12)" }}>
                      <CheckCircle2 className="w-2.5 h-2.5" style={{ color: "#55b3ff" }} />
                    </div>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── PROCESS STRIP ───────────────────────────────────────── */}
          <div className="mb-28">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
              {[
                {
                  icon: FlaskConical,
                  step: "01",
                  title: "Synthesized",
                  body: "GMP-compliant synthesis from vetted facilities with full supply-chain documentation.",
                },
                {
                  icon: Microscope,
                  step: "02",
                  title: "HPLC Verified",
                  body: "Independent high-performance liquid chromatography confirms purity on every batch.",
                },
                {
                  icon: FileCheck,
                  step: "03",
                  title: "Mass Spec Confirmed",
                  body: "Molecular weight and amino acid sequence verified by mass spectrometry.",
                },
                {
                  icon: ShieldCheck,
                  step: "04",
                  title: "COA Issued",
                  body: "Certificate of Analysis with quantitative results ships with every order.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="p-6"
                  style={{ background: "var(--card-surface)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>{s.step}</span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(85,179,255,0.08)", border: "1px solid rgba(85,179,255,0.15)" }}
                    >
                      <s.icon className="w-4 h-4" style={{ color: "#55b3ff" }} />
                    </div>
                  </div>
                  <h3
                    className="font-display-syne text-sm font-bold mb-1.5"
                    style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RESEARCH BUNDLES ────────────────────────────────────── */}
          <BundlesSection />

          {/* ── COMPOUND GRID ───────────────────────────────────────── */}
          <div id="compounds" className="mb-28 scroll-mt-32">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-3"
                  style={{ color: "#55b3ff" }}
                >
                  Featured Compounds
                </p>
                <h2
                  className="font-display-syne text-3xl sm:text-4xl font-bold"
                  style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
                >
                  Under the Microscope
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[10px]" style={{ color: "var(--text-muted)" }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#55b3ff]" /> FDA Under Review
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#A00303" }} /> Available
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredPeptides.map((p) => (
                <CompoundCard key={p.code} p={p} />
              ))}
            </div>

            <p className="mt-6 text-xs text-center" style={{ color: "var(--text-muted)" }}>
              Click any compound to expand amino acid sequence. All compounds for laboratory research use only.
            </p>
          </div>

          {/* ── CTA ─────────────────────────────────────────────────── */}
          <div
            className="relative rounded-3xl overflow-hidden px-8 py-16 sm:px-14 sm:py-20"
            style={{
              background: "var(--card-raised)",
              boxShadow: "0 0 0 1px rgba(85,179,255,0.18), 0 30px 80px rgba(85,179,255,0.10)",
            }}
          >
            {/* Blue bloom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 15% 60%, rgba(85,179,255,0.10) 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />
            {/* Top stripe */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(85,179,255,0.35), transparent)" }} aria-hidden="true" />

            <div className="relative max-w-2xl">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{
                  background: "rgba(85,179,255,0.10)",
                  border: "1px solid rgba(85,179,255,0.22)",
                  color: "#55b3ff",
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                For Research Purposes Only
              </div>

              <h2
                className="font-display-syne font-bold leading-none mb-5"
                style={{
                  fontSize: "clamp(32px, 4vw, 56px)",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                }}
              >
                The era of legitimate peptide research starts now.
              </h2>

              <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: "var(--text-secondary)" }}>
                18 peptide compounds. COA on every batch. Same-day shipping. The research-grade
                standard the field is moving toward — available from PureRawz today.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link
                  href="/products?category=peptides"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all hover:opacity-85 group"
                  style={{
                    background: "#55b3ff",
                    color: "#040507",
                    boxShadow: "0 0 30px rgba(85,179,255,0.30)",
                  }}
                >
                  Shop All Peptides
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{
                    background: "var(--surface-100)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  View COA Library
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div
              className="relative mt-14 pt-10 grid grid-cols-2 sm:grid-cols-4 gap-8"
              style={{ borderTop: "1px solid rgba(85,179,255,0.12)" }}
            >
              {[
                { value: "18", label: "Peptide compounds" },
                { value: "99%+", label: "Purity standard" },
                { value: "COA", label: "Every batch" },
                { value: "24hrs", label: "Dispatch time" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="font-display-syne text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: "#55b3ff", letterSpacing: "-0.03em" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── COMPLIANCE FOOTER ───────────────────────────────────── */}
          <div
            className="mt-12 p-5 rounded-xl text-xs leading-relaxed"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              color: "var(--text-muted)",
            }}
          >
            <strong style={{ color: "var(--text-dim)" }}>Research Use Only.</strong>{" "}
            All products on this page are sold strictly for in vitro laboratory research purposes. They are not
            intended for human or animal consumption, self-administration, clinical use, or any purpose outside
            of a controlled research setting. PureRawz makes no medical claims and does not endorse any specific
            use of these compounds beyond legitimate scientific investigation. Regulatory information referenced
            on this page is sourced from public news reporting and does not constitute legal or regulatory advice.
          </div>

        </div>
      </div>
    </div>
  );
}
