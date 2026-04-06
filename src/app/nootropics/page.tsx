import type { Metadata } from "next";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageClient } from "@/components/category/category-page-client";
import { ArrowRight, ShieldCheck, FlaskConical, Microscope, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Buy Nootropics Online | Research-Grade Cognitive Compounds | PureRawz",
  description:
    "Buy research-grade nootropics online. Noopept, Alpha GPC, Aniracetam, Phenylpiracetam and more. 99%+ purity, COA-verified, third-party tested. For research purposes only.",
  keywords: [
    "buy nootropics online",
    "nootropics for sale",
    "Noopept for sale",
    "Alpha GPC for sale",
    "research nootropics",
    "cognitive research compounds",
    "racetam research",
    "nootropics USA",
  ],
  openGraph: {
    title: "Buy Nootropics Online | 99%+ Purity | PureRawz",
    description:
      "Research-grade nootropics: Noopept, Alpha GPC, Aniracetam, Phenylpiracetam. COA-verified, third-party tested. For research purposes only.",
    type: "website",
  },
};

const highlights = [
  {
    icon: ShieldCheck,
    title: "HPLC Verified",
    body: "Every nootropic batch is independently verified by HPLC chromatography to confirm identity and purity before shipment.",
  },
  {
    icon: FlaskConical,
    title: "99%+ Purity",
    body: "Research-grade purity standards on all compounds. No fillers, no binders — pure active compound with full documentation.",
  },
  {
    icon: Microscope,
    title: "COA on Every Batch",
    body: "Full Certificate of Authenticity documenting third-party lab results. Accessible online by batch number.",
  },
  {
    icon: Zap,
    title: "Same-Day Dispatch",
    body: "Orders placed before 2PM EST ship the same day in discreet, tamper-evident packaging.",
  },
];

const faqs = [
  {
    q: "What are nootropics?",
    a: "Nootropics are compounds studied for their effects on cognitive function, neuroprotection, and neurological signaling pathways. Research nootropics include racetam-class compounds (Noopept, Aniracetam, Phenylpiracetam), cholinergic precursors (Alpha GPC), and other compounds that modulate neurotransmitter systems. They are used in laboratory settings to study memory, cognition, and neuroprotective mechanisms.",
  },
  {
    q: "What is the difference between Noopept and racetams?",
    a: "Noopept is a synthetic dipeptide nootropic structurally distinct from classical racetams. It is estimated to be significantly more potent by weight and has a faster onset. Both Noopept and racetams (like Aniracetam and Phenylpiracetam) modulate glutamate receptor activity, but Noopept also has documented effects on BDNF and NGF — neurotrophic factors studied in neuroplasticity research.",
  },
  {
    q: "What purity are your nootropics?",
    a: "All PureRawz nootropics are verified at 99%+ purity by independent third-party laboratories. Each batch ships with a Certificate of Authenticity documenting the HPLC results and confirming compound identity.",
  },
  {
    q: "What forms are nootropics available in?",
    a: "Nootropics in our catalog are available in powder form (for precise research dosing) and capsule form (Alpha GPC). Powder forms are verified by weight; capsule forms are verified per-capsule by independent analysis.",
  },
  {
    q: "How should nootropic powders be stored?",
    a: "Store nootropic powders in a cool, dry environment away from direct sunlight, heat, and moisture. Keep containers tightly sealed. Most research-grade nootropic powders are stable at room temperature for the duration indicated on the COA when properly stored.",
  },
];

const categorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Research Nootropics — Cognitive Research Compounds",
  description:
    "Research-grade nootropics for sale: Noopept, Alpha GPC, Aniracetam, Phenylpiracetam. COA-verified, 99%+ purity.",
  url: "https://purerawz.co/nootropics",
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

export default function NootropicsPage() {
  const nootropicProducts = getProductsByCategory("nootropics");

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
            <span className="text-foreground-muted">Nootropics</span>
          </nav>

          {/* Hero */}
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#a78bfa" }}>
              Research Compounds
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-5">
              Buy Nootropics Online
            </h1>
            <p className="text-lg text-foreground-muted leading-relaxed">
              Research-grade nootropics and cognitive enhancement compounds — COA-verified, 99%+ purity,
              third-party tested. Used by researchers worldwide for cognitive neuroscience research,
              neurotransmitter pathway studies, and neuroprotection research. For research purposes only.
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
                  style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.15)" }}
                >
                  <h.icon className="w-5 h-5" style={{ color: "#a78bfa" }} />
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
                Nootropic Products
                <span className="ml-2 text-base font-normal text-foreground-subtle">({nootropicProducts.length})</span>
              </h2>
              <Link
                href="/products?category=nootropics"
                className="flex items-center gap-1 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
              >
                View in catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <CategoryPageClient products={nootropicProducts} />
          </div>

          {/* About Nootropics */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-5">About Research Nootropics</h2>
            <div className="space-y-4 text-foreground-muted leading-relaxed">
              <p>
                Nootropic compounds represent a broad category of substances studied for their interactions
                with neurotransmitter systems, neuroprotective mechanisms, and cognitive signaling pathways.
                They are widely used in neuroscience research to investigate memory formation, synaptic plasticity,
                and neuronal function.
              </p>
              <p>
                Our nootropics catalog includes <strong className="text-foreground">Noopept</strong>, a highly
                potent synthetic dipeptide with documented BDNF and NGF modulation properties;{" "}
                <strong className="text-foreground">Alpha GPC</strong>, the most bioavailable choline precursor
                studied for cholinergic neurotransmission;{" "}
                <strong className="text-foreground">Aniracetam</strong>, a fat-soluble ampakine studied for AMPA
                receptor modulation and anxiolytic properties; and{" "}
                <strong className="text-foreground">Phenylpiracetam</strong>, an enhanced racetam derivative with
                a broader receptor activity profile.
              </p>
              <p>
                All PureRawz nootropics are research-grade quality, independently verified by HPLC analysis,
                and ship with complete Certificates of Authenticity.
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
