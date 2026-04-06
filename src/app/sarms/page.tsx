import type { Metadata } from "next";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageClient } from "@/components/category/category-page-client";
import { ArrowRight, ShieldCheck, FlaskConical, Microscope, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Buy SARMs Online | Selective Androgen Receptor Modulators | PureRawz",
  description:
    "Buy research-grade SARMs online. RAD-140, LGD-4033, MK-677, S-4 Andarine and more. 99%+ purity, COA-verified, third-party tested. Domestic shipping. For research purposes only.",
  keywords: [
    "buy SARMs online",
    "SARMs for sale",
    "RAD-140 for sale",
    "LGD-4033 for sale",
    "MK-677 for sale",
    "selective androgen receptor modulators",
    "research grade SARMs",
    "SARMs USA",
  ],
  openGraph: {
    title: "Buy SARMs Online | 99%+ Purity | PureRawz",
    description:
      "Research-grade SARMs: RAD-140, LGD-4033, MK-677, S-4. COA-verified, third-party tested. For research purposes only.",
    type: "website",
  },
};

const highlights = [
  {
    icon: ShieldCheck,
    title: "Third-Party Tested",
    body: "Every SARM batch is independently verified by HPLC and mass spectrometry before it ships.",
  },
  {
    icon: FlaskConical,
    title: "99%+ Purity",
    body: "Our strict sourcing standards mean you get consistently high-purity compounds, batch after batch.",
  },
  {
    icon: Microscope,
    title: "COA on Every Order",
    body: "Full Certificate of Authenticity included with each order, accessible online by batch number.",
  },
  {
    icon: Zap,
    title: "Same-Day Dispatch",
    body: "Orders placed before 2PM EST ship the same day in discreet, tamper-evident packaging.",
  },
];

const faqs = [
  {
    q: "What are SARMs?",
    a: "Selective Androgen Receptor Modulators (SARMs) are a class of compounds that selectively bind to androgen receptors in specific tissues — primarily muscle and bone. Unlike traditional androgens, SARMs are designed to produce tissue-selective effects, making them valuable tools for research into anabolic signaling, muscle wasting conditions, and bone density.",
  },
  {
    q: "What is the purity of your SARMs?",
    a: "All PureRawz SARMs are verified at 99%+ purity by independent third-party laboratories using HPLC and mass spectrometry. Each batch ships with a Certificate of Authenticity documenting the specific test results.",
  },
  {
    q: "Are your SARMs for human consumption?",
    a: "No. All products sold by PureRawz are strictly for laboratory research purposes only and are not intended for human or veterinary consumption. By purchasing, you confirm you are a qualified researcher and will use the compounds only in a research setting.",
  },
  {
    q: "What forms are SARMs available in?",
    a: "PureRawz SARMs are available in liquid solution form (typically 30mL dropper bottles at various concentrations) for easy dosing in research protocols. Some compounds may also be available as raw powder.",
  },
  {
    q: "How should SARMs be stored?",
    a: "Store liquid SARMs at room temperature, away from direct sunlight and moisture. Do not freeze. Raw powder SARMs should be stored in a cool, dry environment in sealed containers. Properly stored compounds remain stable for the duration indicated on the COA.",
  },
];

const categorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SARMs — Selective Androgen Receptor Modulators",
  description:
    "Research-grade SARMs for sale: RAD-140, LGD-4033, MK-677, S-4 Andarine and more. COA-verified, 99%+ purity.",
  url: "https://purerawz.co/sarms",
  provider: {
    "@type": "Organization",
    name: "PureRawz",
    url: "https://purerawz.co",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function SARMsPage() {
  const sarmsProducts = getProductsByCategory("sarms");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pt-32 lg:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-foreground-subtle mb-8" aria-label="Breadcrumb">
            <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground-muted">SARMs</span>
          </nav>

          {/* Hero */}
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--red)" }}>
              Research Compounds
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-5">
              Buy SARMs Online
            </h1>
            <p className="text-lg text-foreground-muted leading-relaxed">
              Research-grade Selective Androgen Receptor Modulators — COA-verified, 99%+ purity, third-party tested.
              Used by researchers worldwide for androgen receptor binding studies, anabolic pathway research,
              and tissue-selective modulation studies. For research purposes only.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="p-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)]"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "var(--red-dim)", border: "1px solid rgba(160,3,3,0.15)" }}
                >
                  <h.icon className="w-5 h-5" style={{ color: "var(--red)" }} />
                </div>
                <h2 className="text-sm font-semibold text-foreground mb-1">{h.title}</h2>
                <p className="text-xs text-foreground-muted leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>

          {/* Products */}
          <div className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                SARMs Products
                <span className="ml-2 text-base font-normal text-foreground-subtle">({sarmsProducts.length})</span>
              </h2>
              <Link
                href="/products?category=sarms"
                className="flex items-center gap-1 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
              >
                View in catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <CategoryPageClient products={sarmsProducts} />
          </div>

          {/* About SARMs */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-5">About SARMs Research</h2>
            <div className="space-y-4 text-foreground-muted leading-relaxed">
              <p>
                Selective Androgen Receptor Modulators (SARMs) represent one of the most active areas of
                pharmacological research in recent years. Their mechanism — selectively binding to androgen
                receptors in muscle and bone while minimizing activity in other tissues — makes them powerful
                tools for studying androgen receptor biology and anabolic signaling pathways.
              </p>
              <p>
                Key compounds in our SARMs catalog include <strong className="text-foreground">RAD-140 (Testolone)</strong>,
                which demonstrates high androgen receptor affinity; <strong className="text-foreground">LGD-4033 (Ligandrol)</strong>,
                one of the most extensively clinically studied SARMs;{" "}
                <strong className="text-foreground">MK-677 (Ibutamoren)</strong>, a ghrelin mimetic with GH secretagogue properties;
                and <strong className="text-foreground">S-4 (Andarine)</strong>, a foundational partial-agonist SARM for tissue-selectivity studies.
              </p>
              <p>
                All PureRawz SARMs are sourced from GMP-compliant facilities, verified by independent HPLC
                and mass spectrometry analysis, and shipped with full Certificates of Authenticity.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <div
                  key={q}
                  className="p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)]"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-2">{q}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
