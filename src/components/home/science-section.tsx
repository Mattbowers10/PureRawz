"use client";

import Link from "next/link";
import { ShieldCheck, Microscope, FileCheck, FlaskConical, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FlaskConical,
    title: "Sourced with Precision",
    description:
      "Every compound is sourced from vetted, GMP-compliant facilities with full supply-chain traceability.",
  },
  {
    number: "02",
    icon: Microscope,
    title: "Independent Lab Verification",
    description:
      "Third-party labs confirm identity, purity, and concentration via HPLC and Mass Spectrometry on every batch.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Full Documentation",
    description:
      "Every order ships with a Certificate of Analysis containing detailed quantitative lab results.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "99%+ Purity Standard",
    description:
      "Our minimum threshold is stricter than the industry average. If it doesn't pass, it doesn't ship.",
  },
];

export function ScienceSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute left-[-200px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(160,3,3,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — content */}
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-4"
              style={{ color: "var(--red)" }}
            >
              Our Process
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-none mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Science-Driven{" "}
              <span className="gradient-text">Quality Assurance</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              We hold ourselves to the highest standards in the industry. Every compound in
              our catalog goes through a rigorous multi-step verification process before
              it ever reaches your lab.
            </p>

            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-pill)] text-sm font-semibold transition-opacity hover:opacity-80"
              style={{
                background: "var(--card-raised)",
                color: "var(--text-primary)",
                boxShadow: "var(--shadow-raise)",
              }}
            >
              View COA Library
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — steps */}
          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group flex gap-4 p-5 rounded-[var(--radius-xl)] transition-all duration-300"
                style={{
                  background: "var(--card-surface)",
                  boxShadow: "var(--shadow-ring)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--card-raised)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-raise-sm)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--card-surface)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-ring)";
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{
                    background: "var(--red-dim)",
                    border: "1px solid rgba(160,3,3,0.18)",
                  }}
                >
                  <step.icon className="w-5 h-5" style={{ color: "var(--red)" }} />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span
                      className="text-[10px] font-mono font-semibold"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {step.number}
                    </span>
                    <h3
                      className="text-sm font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
