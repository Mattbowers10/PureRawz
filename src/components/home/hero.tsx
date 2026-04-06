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
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 2.5,
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
          <svg
            viewBox="0 0 24 24"
            fill="none"
            style={{ width: s.size * 4, height: s.size * 4 }}
          >
            <path
              d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5L12 0Z"
              fill="currentColor"
              style={{ color: "rgba(160,3,3,0.45)" }}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      style={{ paddingTop: "86px" }} /* compliance bar (30px) + header (56px) */
    >
      {/* Deep crimson radial bloom — hero accent */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "450px",
          background: "radial-gradient(ellipse, rgba(160,3,3,0.18) 0%, rgba(160,3,3,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Warm ambient glow — centered behind content */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(215,201,175,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Spark particles */}
      <Sparks />

      <div className="container relative py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge — pulse dot + text */}
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

          {/* Headline — 64px/600, line-height 1.1 per DESIGN.md */}
          <h1
            className="animate-fade-in-up mb-6"
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: 0,
              fontFeatureSettings: '"liga" 0, "ss02", "ss08"',
              color: "var(--text-primary)",
              animationDelay: "80ms",
            }}
          >
            Research-grade clarity.
            <br />
            <span className="gradient-text-glow">Zero compromise.</span>
          </h1>

          {/* Subheading — 18px/400, relaxed */}
          <p
            className="animate-fade-in-up font-body-lg max-w-2xl mx-auto mb-10"
            style={{
              color: "var(--text-secondary)",
              animationDelay: "160ms",
            }}
          >
            99.9%+ purity verified by independent labs. Certificate of Analysis on every
            batch. SARMs, peptides, and nootropics built for serious research.
          </p>

          {/* CTA row */}
          <div
            className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link href="/products">
              <button className="btn-primary" style={{ fontSize: "15px", height: "48px", paddingLeft: "28px", paddingRight: "28px" }}>
                <span>Shop Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="/resources">
              <button className="btn-ghost" style={{ fontSize: "15px", height: "48px" }}>
                <ShieldCheck className="w-4 h-4" />
                <span>View COA Library</span>
              </button>
            </Link>
          </div>

          {/* Payment methods — differentiator */}
          <div
            className="animate-fade-in-up mt-6 flex items-center justify-center gap-2"
            style={{ animationDelay: "320ms" }}
          >
            <CreditCard className="w-3.5 h-3.5" style={{ color: "var(--text-dim)" }} />
            <span
              className="text-xs tracking-[0.06em]"
              style={{ color: "var(--text-dim)" }}
            >
              Credit card &bull; PayPal &bull; Crypto accepted
            </span>
          </div>

          {/* Trust indicator cards */}
          <div
            className="animate-fade-in-up mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
            style={{ animationDelay: "440ms" }}
          >
            {[
              {
                icon: ShieldCheck,
                label: "Third-Party Tested",
                sublabel: "Independent lab verification",
                color: "var(--green)",
                dim: "var(--green-dim)",
                border: "rgba(95,201,146,0.2)",
              },
              {
                icon: FlaskConical,
                label: "99%+ Purity",
                sublabel: "HPLC & mass spectrometry",
                color: "var(--blue)",
                dim: "var(--blue-dim)",
                border: "rgba(85,179,255,0.2)",
              },
              {
                icon: CreditCard,
                label: "Multiple Payment",
                sublabel: "Card, PayPal & crypto",
                color: "var(--yellow)",
                dim: "var(--yellow-dim)",
                border: "rgba(255,188,51,0.2)",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 p-5 rounded-[var(--radius-lg)]"
                style={{
                  background: "var(--card-surface)",
                  border: `1px solid var(--border-subtle)`,
                  boxShadow: "var(--shadow-ring)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center"
                  style={{ background: item.dim, border: `1px solid ${item.border}` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <span
                  className="text-sm font-semibold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.label}
                </span>
                <span className="text-xs" style={{ color: "var(--text-dim)" }}>
                  {item.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </section>
  );
}
