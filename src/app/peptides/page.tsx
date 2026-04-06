import type { Metadata } from "next";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageClient } from "@/components/category/category-page-client";
import { ArrowRight, ShieldCheck, FlaskConical, Microscope, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Buy Peptides Online | Research-Grade Peptides | PureRawz",
  description:
    "Buy research-grade peptides online. BPC-157, TB-500, PT-141, GHK-Cu and more. 99%+ purity, COA-verified, third-party tested. Lyophilized for stability. For research purposes only.",
  keywords: [
    "buy peptides online",
    "peptides for sale",
    "BPC-157 for sale",
    "TB-500 for sale",
    "research peptides",
    "peptides USA",
    "lyophilized peptides",
    "GHK-Cu for sale",
  ],
  openGraph: {
    title: "Buy Peptides Online | 99%+ Purity | PureRawz",
    description:
      "Research-grade peptides: BPC-157, TB-500, PT-141, GHK-Cu. COA-verified, lyophilized for stability. For research purposes only.",
    type: "website",
  },
};

const highlights = [
  {
    icon: ShieldCheck,
    title: "MS & HPLC Verified",
    body: "Peptide identity and purity confirmed by both mass spectrometry and HPLC — two independent analytical methods.",
  },
  {
    icon: FlaskConical,
    title: "Lyophilized for Stability",
    body: "All lyophilized peptides are freeze-dried under controlled conditions for maximum stability and shelf life.",
  },
  {
    icon: Microscope,
    title: "Sequence Confirmed",
    body: "Amino acid sequence integrity verified on each batch. COA documentation available for every order.",
  },
  {
    icon: Zap,
    title: "Same-Day Dispatch",
    body: "Orders placed before 2PM EST ship the same day in discreet, tamper-evident, temperature-controlled packaging.",
  },
];

const faqs = [
  {
    q: "What are research peptides?",
    a: "Research peptides are short chains of amino acids used in laboratory studies to investigate biological signaling pathways. Peptides like BPC-157, TB-500, and GHK-Cu have been studied for their roles in tissue repair, regeneration, inflammation modulation, and gene expression — among many other applications.",
  },
  {
    q: "What does lyophilized mean?",
    a: "Lyophilization (freeze-drying) is a preservation process that removes moisture from the peptide under vacuum. This increases stability, extends shelf life, and makes the compound easier to transport. Lyophilized peptides are typically reconstituted with sterile water or bacteriostatic water before use in research protocols.",
  },
  {
    q: "What is the purity of your peptides?",
    a: "All PureRawz peptides are verified at 99%+ purity by independent laboratories using both HPLC and mass spectrometry. Mass spectrometry confirms the molecular weight and sequence; HPLC confirms purity percentage. Both results are included in the Certificate of Authenticity.",
  },
  {
    q: "How should peptides be stored?",
    a: "Lyophilized peptides should be stored at -20°C (freezer) for long-term storage, or at 4°C (refrigerator) for short-term use. Keep away from light and moisture. Once reconstituted, peptide solutions should be refrigerated and used within the timeframe specified in your research protocol.",
  },
  {
    q: "Are your peptides for human use?",
    a: "No. All PureRawz peptides are strictly for laboratory research use only. They are not intended for human or veterinary consumption, self-administration, or any use outside of a controlled research environment.",
  },
];

const categorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Research Peptides",
  description:
    "Research-grade peptides for sale: BPC-157, TB-500, PT-141, GHK-Cu. COA-verified, 99%+ purity, lyophilized.",
  url: "https://purerawz.co/peptides",
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

export default function PeptidesPage() {
  const peptideProducts = getProductsByCategory("peptides");

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
            <span className="text-foreground-muted">Peptides</span>
          </nav>

          {/* Hero */}
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#55b3ff" }}>
              Research Compounds
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-5">
              Buy Peptides Online
            </h1>
            <p className="text-lg text-foreground-muted leading-relaxed">
              Research-grade peptides — lyophilized for stability, COA-verified, 99%+ purity.
              Used by researchers worldwide for regenerative pathway studies, tissue repair research,
              receptor signaling studies, and more. For research purposes only.
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
                  style={{ background: "rgba(85,179,255,0.08)", border: "1px solid rgba(85,179,255,0.15)" }}
                >
                  <h.icon className="w-5 h-5" style={{ color: "#55b3ff" }} />
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
                Peptide Products
                <span className="ml-2 text-base font-normal text-foreground-subtle">({peptideProducts.length})</span>
              </h2>
              <Link
                href="/products?category=peptides"
                className="flex items-center gap-1 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
              >
                View in catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <CategoryPageClient products={peptideProducts} />
          </div>

          {/* About Peptides */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-5">About Research Peptides</h2>
            <div className="space-y-4 text-foreground-muted leading-relaxed">
              <p>
                Peptides are short chains of amino acids that act as biological signaling molecules in the body.
                Research peptides have become indispensable tools in modern life science research, offering
                highly specific activity with well-characterized mechanisms of action.
              </p>
              <p>
                Our peptide catalog includes <strong className="text-foreground">BPC-157</strong> (Body Protection
                Compound-157), studied extensively for cytoprotective and regenerative properties;{" "}
                <strong className="text-foreground">TB-500</strong>, a Thymosin Beta-4 analog involved in actin
                polymerization and tissue repair signaling; <strong className="text-foreground">PT-141</strong>{" "}
                (Bremelanotide), studied for melanocortin receptor pathway research; and{" "}
                <strong className="text-foreground">GHK-Cu</strong>, a copper tripeptide researched for its
                effects on gene expression and tissue remodeling.
              </p>
              <p>
                All PureRawz peptides are synthesized to research-grade standards, verified by independent
                mass spectrometry and HPLC analysis, lyophilized for stability, and shipped with full
                Certificates of Authenticity.
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
