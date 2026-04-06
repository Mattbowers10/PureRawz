import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Package, RefreshCcw, Clock, Globe, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Returns | PureRawz Research Compounds",
  description:
    "PureRawz shipping policy: same-day dispatch, domestic and international shipping, tracking, and our 30-day return policy for research compounds.",
  openGraph: {
    title: "Shipping & Returns | PureRawz",
    description:
      "Same-day dispatch, domestic and international shipping, discreet packaging, and 30-day returns on unopened items.",
    type: "website",
  },
};

const highlights = [
  { icon: Clock, title: "Same-Day Dispatch", body: "Orders before 2PM EST ship the same business day." },
  { icon: Package, title: "Discreet Packaging", body: "Plain outer packaging, no branding or product indication." },
  { icon: Globe, title: "International Shipping", body: "We ship worldwide. Delivery times vary by destination." },
  { icon: Shield, title: "30-Day Returns", body: "Unopened items accepted within 30 days of delivery." },
];

const domesticRates = [
  { service: "USPS First Class", timeframe: "3–5 business days", rate: "From $4.99" },
  { service: "USPS Priority Mail", timeframe: "1–3 business days", rate: "From $8.99" },
  { service: "UPS Ground", timeframe: "1–5 business days", rate: "From $9.99" },
  { service: "UPS 2-Day Air", timeframe: "2 business days", rate: "From $19.99" },
  { service: "Free Shipping", timeframe: "3–5 business days", rate: "Orders over $99" },
];

const internationalRates = [
  { region: "Canada", timeframe: "5–10 business days", rate: "From $14.99" },
  { region: "United Kingdom", timeframe: "7–14 business days", rate: "From $19.99" },
  { region: "European Union", timeframe: "7–14 business days", rate: "From $19.99" },
  { region: "Australia / NZ", timeframe: "10–21 business days", rate: "From $24.99" },
  { region: "Rest of World", timeframe: "10–30 business days", rate: "Calculated at checkout" },
];

export default function ShippingPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--red)" }}>
            Policies
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-5">
            Shipping &amp; Returns
          </h1>
          <p className="text-lg text-foreground-muted leading-relaxed max-w-2xl">
            We work hard to get your research compounds to you quickly and safely.
            Questions? <Link href="/contact" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "var(--red)" }}>Contact us.</Link>
          </p>
        </div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {highlights.map((h) => (
            <div key={h.title} className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)]">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--red-dim)", border: "1px solid rgba(160,3,3,0.15)" }}
              >
                <h.icon className="w-5 h-5" style={{ color: "var(--red)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">{h.title}</p>
                <p className="text-xs text-foreground-muted">{h.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dispatch Policy */}
        <section className="mb-14" id="dispatch">
          <h2 className="text-xl font-bold text-foreground mb-4">Order Processing & Dispatch</h2>
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            <p>
              Orders placed before <strong className="text-foreground">2:00 PM EST</strong> on business days
              (Monday–Friday, excluding US federal holidays) are processed and dispatched the same day.
            </p>
            <p>
              Orders placed after 2:00 PM EST, or on weekends and holidays, will be dispatched the next
              business day.
            </p>
            <p>
              You will receive a shipping confirmation email with tracking information once your order has
              been dispatched. Tracking updates may take up to 24 hours to appear in the carrier&apos;s system.
            </p>
            <p>
              Temperature-sensitive compounds (lyophilized peptides) are packaged with insulated materials
              and ice packs to maintain compound integrity during transit.
            </p>
          </div>
        </section>

        {/* Domestic Shipping */}
        <section className="mb-14" id="domestic">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5" style={{ color: "var(--red)" }} />
            Domestic Shipping (USA)
          </h2>
          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] overflow-hidden mb-4">
            <div className="grid grid-cols-3 gap-4 px-5 py-3 border-b border-[var(--border)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">Service</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">Timeframe</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">Rate</span>
            </div>
            {domesticRates.map((row, i) => (
              <div
                key={row.service}
                className={`grid grid-cols-3 gap-4 px-5 py-3 ${i < domesticRates.length - 1 ? "border-b border-[var(--border)]" : ""}`}
              >
                <span className="text-sm text-foreground">{row.service}</span>
                <span className="text-sm text-foreground-muted">{row.timeframe}</span>
                <span className="text-sm font-medium" style={{ color: i === domesticRates.length - 1 ? "var(--green)" : "var(--text-primary)" }}>{row.rate}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-foreground-subtle">
            Shipping rates are calculated at checkout based on order weight and destination ZIP code.
            Estimated delivery times are business days and do not include the dispatch day.
          </p>
        </section>

        {/* International Shipping */}
        <section className="mb-14" id="international">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" style={{ color: "var(--red)" }} />
            International Shipping
          </h2>
          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] overflow-hidden mb-4">
            <div className="grid grid-cols-3 gap-4 px-5 py-3 border-b border-[var(--border)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">Region</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">Timeframe</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">From</span>
            </div>
            {internationalRates.map((row, i) => (
              <div
                key={row.region}
                className={`grid grid-cols-3 gap-4 px-5 py-3 ${i < internationalRates.length - 1 ? "border-b border-[var(--border)]" : ""}`}
              >
                <span className="text-sm text-foreground">{row.region}</span>
                <span className="text-sm text-foreground-muted">{row.timeframe}</span>
                <span className="text-sm text-foreground">{row.rate}</span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl border text-sm text-foreground-muted leading-relaxed" style={{ borderColor: "rgba(255,188,51,0.2)", background: "rgba(255,188,51,0.05)" }}>
            <strong className="text-foreground">Customs & Import Note:</strong> International customers are solely
            responsible for understanding and complying with the import regulations in their country.
            PureRawz cannot be held responsible for orders delayed, seized, or destroyed by customs authorities.
            Customs duties and taxes, where applicable, are the responsibility of the recipient.
          </div>
        </section>

        {/* Returns */}
        <section className="mb-14" id="returns">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <RefreshCcw className="w-5 h-5" style={{ color: "var(--red)" }} />
            Return Policy
          </h2>
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            <p>
              We accept returns on <strong className="text-foreground">unopened, undamaged products</strong> within
              <strong className="text-foreground"> 30 days</strong> of the delivery date.
            </p>
            <p>
              Due to the nature of research chemicals and to protect the integrity of our products for other
              researchers, <strong className="text-foreground">opened products cannot be returned</strong> under any
              circumstances.
            </p>
            <p>
              To initiate a return, email <a href="mailto:support@purerawz.co" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "var(--red)" }}>support@purerawz.co</a> with
              your order number and reason for return. We will provide a return shipping address and instructions.
              Return shipping costs are the responsibility of the customer unless the return is due to our error.
            </p>
            <p>
              Refunds are processed within 5–7 business days of receiving the returned item and confirming
              it is in original condition. Refunds are issued to the original payment method.
            </p>
          </div>
        </section>

        {/* Damaged/Wrong Orders */}
        <section className="mb-14" id="damaged">
          <h2 className="text-xl font-bold text-foreground mb-4">Damaged or Incorrect Orders</h2>
          <div className="space-y-3 text-sm text-foreground-muted leading-relaxed">
            <p>
              If you receive a damaged or incorrect product, please contact us within{" "}
              <strong className="text-foreground">7 days of delivery</strong> at{" "}
              <a href="mailto:support@purerawz.co" className="underline underline-offset-2 hover:opacity-70" style={{ color: "var(--red)" }}>support@purerawz.co</a>.
            </p>
            <p>
              Include your order number and clear photos of the damaged or incorrect item and packaging.
              We will arrange a replacement or full refund at our discretion, at no additional cost to you.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="p-10 rounded-3xl border border-[var(--glass-border)] bg-[var(--surface)] text-center">
          <h2 className="text-xl font-bold text-foreground mb-3">Questions about your order?</h2>
          <p className="text-sm text-foreground-muted mb-6">
            Our team is available to help with shipping questions, tracking, returns, and more.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: "var(--red)", boxShadow: "0 0 20px rgba(160,3,3,0.35)" }}
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
