"use client";

import Link from "next/link";
import {
  FlaskConical,
  ArrowRight,
  Shield,
  Truck,
  BadgeCheck,
  HeadphonesIcon,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const productLinks = [
  { name: "SARMs", href: "/products?category=sarms" },
  { name: "Nootropics", href: "/products?category=nootropics" },
  { name: "Peptides", href: "/products?category=peptides" },
  { name: "Merchandise", href: "/products?category=merchandise" },
  { name: "Research Support", href: "/products?category=support" },
  { name: "All Products", href: "/products" },
];

const resourceLinks = [
  { name: "COA Library", href: "/resources" },
  { name: "Research Library", href: "/blog" },
  { name: "FAQ", href: "/resources#faq" },
  { name: "Shipping & Returns", href: "/resources#shipping" },
  { name: "Research Guidelines", href: "/resources#guidelines" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Disclaimer", href: "/disclaimer" },
];

const trustFeatures = [
  { icon: Shield,          label: "Third-Party Tested",    desc: "Independent lab verification" },
  { icon: BadgeCheck,      label: "COA on Every Batch",    desc: "Full certificate of analysis" },
  { icon: Truck,           label: "Fast Discreet Shipping", desc: "Domestic & international" },
  { icon: HeadphonesIcon,  label: "Research Support",      desc: "Expert team available" },
];

export function Footer() {
  return (
    <footer
      className="relative"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* ── Trust bar ── */}
      <div style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--card-surface)" }}>
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
            {trustFeatures.map((feat) => (
              <div key={feat.label} className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--red-dim)",
                    border: "1px solid rgba(160,3,3,0.15)",
                    boxShadow: "var(--shadow-ring)",
                  }}
                >
                  <feat.icon className="w-5 h-5" style={{ color: "var(--red)" }} />
                </div>
                <div>
                  <div
                    className="text-sm font-semibold leading-none mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {feat.label}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-dim)" }}>
                    {feat.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand + Newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 group mb-6 w-fit">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: "var(--red)",
                  boxShadow: "var(--badge-glow-red)",
                }}
              >
                <FlaskConical className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-[15px] font-bold tracking-[0.04em]"
                  style={{ color: "var(--text-primary)" }}
                >
                  PURE<span style={{ color: "var(--red)" }}>RAWZ</span>
                </span>
                <span
                  className="text-[9px] uppercase tracking-[0.18em] mt-0.5"
                  style={{ color: "var(--text-dim)" }}
                >
                  Research Compounds
                </span>
              </div>
            </Link>

            <p
              className="text-sm leading-relaxed mb-8 max-w-[300px]"
              style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
            >
              Premium research compounds backed by rigorous third-party testing and full certificates of analysis. For research purposes only.
            </p>

            {/* Newsletter */}
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-3"
                style={{ color: "var(--text-tertiary)" }}
              >
                Research Updates
              </p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address for research updates
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full h-11 px-3 text-sm rounded-[var(--radius-md)] transition-all"
                    style={{
                      background: "var(--surface-100)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                      outline: "none",
                      boxShadow: "var(--shadow-inset)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--red)";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(160,3,3,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.boxShadow = "var(--shadow-inset)";
                    }}
                  />
                </div>
                <button
                  aria-label="Subscribe to research updates"
                  className="h-11 w-11 flex items-center justify-center rounded-[var(--radius-md)] transition-opacity hover:opacity-75 shrink-0"
                  style={{
                    background: "var(--red)",
                    color: "#fff",
                    boxShadow: "var(--badge-glow-red)",
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] mt-2.5" style={{ color: "var(--text-dim)" }}>
                Compound updates &amp; exclusive research offers.
              </p>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h4
              className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-6"
              style={{ color: "var(--text-tertiary)" }}
            >
              Products
            </h4>
            <ul className="space-y-4">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-opacity hover:opacity-60"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h4
              className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-6"
              style={{ color: "var(--text-tertiary)" }}
            >
              Resources
            </h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-opacity hover:opacity-60"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3">
            <h4
              className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-6"
              style={{ color: "var(--text-tertiary)" }}
            >
              Company
            </h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-opacity hover:opacity-60"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <a
                href="mailto:support@purerawz.co"
                className="flex items-center gap-2.5 text-xs transition-opacity hover:opacity-70"
                style={{ color: "var(--text-dim)" }}
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                support@purerawz.co
              </a>
              <div
                className="flex items-center gap-2.5 text-xs"
                style={{ color: "var(--text-dim)" }}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                United States
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px]" style={{ color: "var(--text-dim)" }}>
              &copy; {new Date().getFullYear()} PureRawz. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" style={{ color: "var(--green)" }} />
              <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>
                All products sold for research purposes only — not for human consumption.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
