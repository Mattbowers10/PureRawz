"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FlaskConical, CreditCard } from "lucide-react";

/* ── Spark particle ── */
interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

function Sparks() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  useEffect(() => {
    setSparks(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 3,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {sparks.map((s) => (
        <div
          key={s.id}
          className="absolute animate-spark"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" style={{ width: s.size * 5, height: s.size * 5 }}>
            <path
              d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5L12 0Z"
              fill="currentColor"
              style={{ color: "rgba(160,3,3,0.5)" }}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ── Right-side compound spec card ── */
function SpecCard() {
  const specs = [
    { label: "Purity", value: "99.9%+", unit: "", accent: "var(--green)" },
    { label: "Method", value: "HPLC", unit: "verified", accent: "var(--blue)" },
    { label: "COA", value: "Every", unit: "batch", accent: "var(--yellow)" },
  ];

  return (
    <div
      className="animate-fade-in-up hidden lg:flex flex-col gap-4 relative"
      style={{ animationDelay: "300ms" }}
    >
      {/* Vertical line accent */}
      <div
        className="absolute left-0 top-4 bottom-4 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, var(--red), transparent)" }}
      />

      {/* Compound formula display */}
      <div
        className="ml-8 p-5 rounded-[var(--radius-xl)]"
        style={{
          background: "var(--card-surface)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-raise)",
        }}
      >
        <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: "var(--text-dim)" }}>
          Research Grade
        </p>
        {/* Molecule name styled as formula */}
        <div className="font-display-syne" style={{ color: "var(--text-primary)" }}>
          <span style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
            RAD‑140
          </span>
          <br />
          <span style={{ fontSize: "11px", color: "var(--text-dim)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
            C<sub>20</sub>H<sub>16</sub>ClN<sub>5</sub>O<sub>2</sub>
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          {specs.map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-6">
              <span className="text-xs" style={{ color: "var(--text-dim)" }}>{s.label}</span>
              <div className="flex items-baseline gap-1">
                <span
                  className="font-display-syne"
                  style={{ fontSize: "15px", fontWeight: 700, color: s.accent, letterSpacing: "-0.01em" }}
                >
                  {s.value}
                </span>
                {s.unit && (
                  <span className="text-xs" style={{ color: "var(--text-dim)" }}>{s.unit}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COA badge */}
      <div
        className="ml-8 px-4 py-3 rounded-[var(--radius-lg)] flex items-center gap-3"
        style={{
          background: "var(--green-dim)",
          border: "1px solid rgba(95,201,146,0.2)",
        }}
      >
        <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: "var(--green)" }} />
        <span className="text-xs font-semibold" style={{ color: "var(--green)" }}>
          Independent COA on every batch
        </span>
      </div>

      {/* Order stat */}
      <div
        className="ml-8 p-4 rounded-[var(--radius-lg)]"
        style={{
          background: "var(--card-surface)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-raise-sm)",
        }}
      >
        <p className="text-xs" style={{ color: "var(--text-dim)" }}>Ships within</p>
        <p
          className="font-display-syne mt-0.5"
          style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          24 hrs
        </p>
        <p className="text-xs" style={{ color: "var(--text-dim)" }}>Mon – Fri, all orders</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{ paddingTop: "86px" }}
    >
      {/* Deep crimson radial bloom — off-center left */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "10%",
          left: "20%",
          width: "800px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(160,3,3,0.16) 0%, rgba(160,3,3,0.04) 45%, transparent 70%)",
        }}
      />

      {/* Subtle right-side blue accent */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "40%",
          right: "-5%",
          width: "500px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(85,179,255,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Spark particles */}
      <Sparks />

      <div className="container relative py-24 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Badge */}
            <div
              className="animate-fade-in-up inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-[var(--radius-pill)]"
              style={{
                background: "var(--card-surface)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-raise-sm)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}
              />
              <span
                className="text-xs font-semibold tracking-[0.08em] uppercase"
                style={{ color: "var(--text-tertiary)" }}
              >
                All products independently COA verified
              </span>
            </div>

            {/* Headline — Syne 88px, left-aligned */}
            <h1
              className="animate-fade-in-up font-display-syne"
              style={{
                fontSize: "clamp(44px, 6.5vw, 88px)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                animationDelay: "80ms",
              }}
            >
              Research-grade
              <br />
              <span className="gradient-text-glow" style={{ letterSpacing: "-0.02em" }}>
                clarity.
              </span>
              <br />
              <span style={{ fontSize: "0.55em", fontWeight: 600, color: "var(--text-dim)", letterSpacing: "-0.01em" }}>
                Zero compromise.
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="animate-fade-in-up mt-8 max-w-xl"
              style={{
                fontSize: "17px",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                animationDelay: "180ms",
              }}
            >
              99.9%+ purity verified by independent labs. Certificate of Analysis on every
              batch. SARMs, peptides, and nootropics built for serious research.
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-in-up mt-10 flex flex-col sm:flex-row items-start gap-3"
              style={{ animationDelay: "260ms" }}
            >
              <Link href="/products">
                <button
                  className="btn-primary"
                  style={{ fontSize: "15px", height: "52px", paddingLeft: "32px", paddingRight: "32px" }}
                >
                  <span>Shop Products</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/resources">
                <button className="btn-ghost" style={{ fontSize: "15px", height: "52px" }}>
                  <ShieldCheck className="w-4 h-4" />
                  <span>View COA Library</span>
                </button>
              </Link>
            </div>

            {/* Payment line */}
            <div
              className="animate-fade-in-up mt-6 flex items-center gap-2"
              style={{ animationDelay: "340ms" }}
            >
              <CreditCard className="w-3.5 h-3.5" style={{ color: "var(--text-dim)" }} />
              <span className="text-xs tracking-[0.06em]" style={{ color: "var(--text-dim)" }}>
                Credit card &bull; PayPal &bull; Crypto accepted
              </span>
            </div>

            {/* Trust indicators — horizontal strip on desktop */}
            <div
              className="animate-fade-in-up mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-lg)]"
              style={{
                border: "1px solid var(--border-subtle)",
                animationDelay: "440ms",
                maxWidth: "520px",
              }}
            >
              {[
                { icon: ShieldCheck, label: "Third-Party Tested", sub: "Independent labs", color: "var(--green)" },
                { icon: FlaskConical, label: "99%+ Purity", sub: "HPLC verified", color: "var(--blue)" },
                { icon: CreditCard, label: "Fast Shipping", sub: "Ships in 24 hrs", color: "var(--yellow)" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 p-4"
                  style={{
                    background: i === 0 ? "var(--card-raised)" : "var(--card-surface)",
                    borderRight: i < 2 ? "1px solid var(--border-subtle)" : "none",
                  }}
                >
                  <item.icon className="w-4 h-4 mb-1" style={{ color: item.color }} />
                  <span className="text-xs font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                    {item.label}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-dim)" }}>{item.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Spec card ── */}
          <SpecCard />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </section>
  );
}
