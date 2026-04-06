"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. R. Martinez",
    role: "Research Director",
    rating: 5,
    text: "The quality and consistency of PureRawz compounds have been exceptional. The COAs provide the documentation we need for our research protocols.",
    initials: "RM",
  },
  {
    name: "K. Thompson",
    role: "Independent Researcher",
    rating: 5,
    text: "Fast shipping, excellent purity, and genuine certificates of analysis. PureRawz has become our go-to supplier for research peptides.",
    initials: "KT",
  },
  {
    name: "Lab Solutions Inc.",
    role: "Research Laboratory",
    rating: 5,
    text: "We've tested multiple suppliers and PureRawz consistently delivers the highest purity compounds with proper documentation.",
    initials: "LS",
  },
  {
    name: "J. Chen",
    role: "Graduate Researcher",
    rating: 5,
    text: "Outstanding support and product quality. The detailed lab reports that come with every order give us full confidence in our research.",
    initials: "JC",
  },
  {
    name: "BioTech Research Co.",
    role: "Contract Research Org",
    rating: 5,
    text: "PureRawz sets the standard for research chemical suppliers. Their commitment to third-party testing is exactly what this industry needs.",
    initials: "BR",
  },
  {
    name: "S. Williams",
    role: "Pharmacology Researcher",
    rating: 4,
    text: "Reliable, consistent, and professional. The nootropics line is particularly impressive in terms of purity and documentation.",
    initials: "SW",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute right-[-100px] top-1/3 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(160,3,3,0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container relative">
        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-3"
            style={{ color: "var(--red)" }}
          >
            Testimonials
          </p>
          <h2
            className="font-display-syne text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
          >
            Trusted by Researchers{" "}
            <span className="gradient-text-glow">Worldwide</span>
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            See what the research community says about our products and documentation standards.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="relative p-6 rounded-[var(--radius-xl)] flex flex-col"
              style={{
                background: "var(--card-surface)",
                boxShadow: "var(--shadow-ring)",
              }}
            >
              {/* Quote icon */}
              <Quote
                className="w-5 h-5 mb-4 opacity-30"
                style={{ color: "var(--red)" }}
                aria-hidden="true"
              />

              {/* Stars */}
              <div
                className="flex items-center gap-0.5 mb-3"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className="w-3.5 h-3.5"
                    style={{
                      color: si < t.rating ? "var(--yellow)" : "var(--text-muted)",
                      fill: si < t.rating ? "var(--yellow)" : "transparent",
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-sm leading-relaxed flex-1 mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: "var(--red-dim)",
                    border: "1px solid rgba(160,3,3,0.2)",
                    color: "var(--red)",
                  }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold leading-none mb-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
