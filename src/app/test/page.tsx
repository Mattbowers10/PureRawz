import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { Categories } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ScienceSection } from "@/components/home/science-section";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";

function TestBanner() {
  return (
    <div
      role="banner"
      aria-label="Test mode indicator"
      style={{
        position: "sticky",
        top: "calc(var(--compliance-bar-height) + 57px)",
        zIndex: 70,
        background: "rgba(85,179,255,0.08)",
        borderBottom: "1px solid rgba(85,179,255,0.18)",
        padding: "9px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--blue)",
          }}
        >
          Test Variant
        </span>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { label: "Body", value: "Outfit → Inter" },
          { label: "Heading", value: "Geist → Syne" },
            { label: "Motion", value: "prefers-reduced-motion scoped" },
          ].map(({ label, value }) => (
            <span
              key={label}
              style={{ fontSize: "11px", color: "var(--text-tertiary)" }}
            >
              <span style={{ color: "var(--text-dim)" }}>{label}:</span>{" "}
              <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{value}</span>
            </span>
          ))}
        </div>
      </div>
      <Link
        href="/"
        style={{
          fontSize: "11px",
          color: "var(--text-dim)",
          textDecoration: "none",
          whiteSpace: "nowrap",
          transition: "color 0.15s",
        }}
      >
        ← Live site
      </Link>
    </div>
  );
}

export default function TestHome() {
  return (
    <>
      <TestBanner />
      <Hero />
      <TrustBar />
      <Categories />
      <FeaturedProducts />
      <ScienceSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
