import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions | PureRawz",
  description:
    "Answers to common questions about PureRawz research compounds — ordering, shipping, purity testing, COAs, storage, and more.",
  openGraph: {
    title: "FAQ | PureRawz Research Compounds",
    description:
      "Frequently asked questions about ordering, purity testing, COAs, shipping, and storage of research compounds.",
    type: "website",
  },
};

const sections = [
  {
    title: "Products & Quality",
    faqs: [
      {
        q: "What purity are your compounds?",
        a: "All PureRawz compounds meet a minimum 99%+ purity standard, verified by independent third-party laboratories using HPLC (High-Performance Liquid Chromatography) and/or mass spectrometry. The specific purity percentage for each batch is documented in the Certificate of Authenticity (COA) that ships with every order.",
      },
      {
        q: "What is a Certificate of Authenticity (COA)?",
        a: "A Certificate of Authenticity (COA) is a document produced by an independent third-party laboratory that provides analytical verification of a compound's identity and purity. It typically includes the compound name, batch number, test methods used (HPLC, MS, etc.), purity result, and the lab's accreditation details. Every PureRawz product ships with a COA.",
      },
      {
        q: "How are your compounds tested?",
        a: "Our compounds are tested by independent accredited laboratories using industry-standard analytical methods. SARMs and nootropics are primarily verified by HPLC chromatography. Peptides are verified by both HPLC and mass spectrometry — mass spectrometry confirms the molecular weight and sequence, while HPLC confirms the purity percentage.",
      },
      {
        q: "What is the difference between SARMs, peptides, and nootropics?",
        a: "SARMs (Selective Androgen Receptor Modulators) are compounds that selectively bind to androgen receptors, primarily studied for muscle and bone tissue applications. Peptides are short amino acid chains that act as biological signaling molecules, studied across a wide range of regenerative and hormonal pathways. Nootropics are compounds studied for their effects on cognitive function, neurotransmitter systems, and neuroprotection.",
      },
      {
        q: "Are your products pharmaceutical grade?",
        a: "Our compounds are produced to research-grade standards, which in many cases equals or exceeds pharmaceutical purity specifications. All compounds are sourced from GMP-compliant facilities where applicable and verified by independent analysis before sale.",
      },
    ],
  },
  {
    title: "Ordering",
    faqs: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, debit cards, and cryptocurrency. All transactions are processed through secure, encrypted payment gateways. Contact our support team if you have questions about a specific payment method.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Orders can be modified or cancelled within 1 hour of placement, provided they have not yet been processed for fulfillment. Contact support@purerawz.co as soon as possible if you need to make changes. Once an order has been dispatched, it cannot be cancelled.",
      },
      {
        q: "Is there a minimum order?",
        a: "There is no minimum order amount. You can purchase a single item or as many as you need for your research protocols.",
      },
      {
        q: "Do you offer bulk / wholesale pricing?",
        a: "Yes. Researchers and institutions requiring larger quantities may qualify for volume pricing. Contact support@purerawz.co with your requirements and we'll provide a custom quote.",
      },
    ],
  },
  {
    title: "Shipping",
    faqs: [
      {
        q: "How fast do you ship?",
        a: "Orders placed before 2PM EST Monday–Friday are dispatched the same day. Orders placed after 2PM or on weekends ship the next business day. You'll receive tracking information via email once your order ships.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship internationally. Delivery times vary by destination. Customers are responsible for understanding and complying with the import regulations in their country. We cannot be held responsible for orders seized by customs.",
      },
      {
        q: "How is packaging handled?",
        a: "All orders are shipped in discreet, plain packaging with no external branding indicating the contents. Temperature-sensitive compounds (such as lyophilized peptides) are packaged with appropriate insulated materials and ice packs where required.",
      },
      {
        q: "What are your shipping rates?",
        a: "Domestic US shipping rates are calculated at checkout based on order weight and destination. Free shipping is available on qualifying domestic orders over a minimum threshold. See our Shipping & Returns page for full details.",
      },
    ],
  },
  {
    title: "Storage & Handling",
    faqs: [
      {
        q: "How should liquid SARMs be stored?",
        a: "Store liquid SARMs at room temperature, away from direct sunlight, heat, and moisture. Do not freeze liquid solutions. Once opened, reseal tightly after each use. Properly stored liquid SARMs remain stable for the period indicated on the COA.",
      },
      {
        q: "How should lyophilized peptides be stored?",
        a: "Lyophilized (freeze-dried) peptides should be stored at -20°C (freezer) for long-term storage, or at 4°C (refrigerator) for short-term use up to a few weeks. Keep away from light and moisture. Once reconstituted, peptide solutions should be refrigerated and used promptly.",
      },
      {
        q: "How should nootropic powders be stored?",
        a: "Store nootropic powders in a cool, dry environment away from direct sunlight, heat, and moisture. Keep containers tightly sealed. Most research-grade nootropic powders are stable at room temperature when properly stored for the duration indicated on the COA.",
      },
    ],
  },
  {
    title: "Returns & Compliance",
    faqs: [
      {
        q: "What is your return policy?",
        a: "We accept returns on unopened, undamaged products within 30 days of delivery. Products that have been opened cannot be returned due to the nature of research chemicals. Contact support@purerawz.co to initiate a return. See our Shipping & Returns page for full details.",
      },
      {
        q: "What is your refund policy for damaged or incorrect orders?",
        a: "If you receive a damaged or incorrect product, contact us within 7 days of delivery with photos of the issue. We will issue a full replacement or refund at our discretion.",
      },
      {
        q: "Are your products for human consumption?",
        a: "No. All products sold by PureRawz are strictly for laboratory research purposes only. They are not intended for human or veterinary consumption, self-administration, or any use outside of a controlled research environment. By purchasing, you confirm you are a qualified researcher and will use products only in a research setting.",
      },
      {
        q: "Is it legal to buy research compounds?",
        a: "The legal status of research compounds varies by country, state, and specific compound. It is the buyer's sole responsibility to understand and comply with all applicable laws and regulations in their jurisdiction. PureRawz sells exclusively to verified researchers for legitimate research purposes.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: sections.flatMap(({ faqs }) =>
    faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pt-32 lg:pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--red)" }}>
              Support
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-5">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-foreground-muted leading-relaxed max-w-2xl">
              Everything you need to know about our products, ordering process, shipping, and more.
              Can&apos;t find your answer?{" "}
              <Link href="/contact" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: "var(--red)" }}>
                Contact our team.
              </Link>
            </p>
          </div>

          {/* Table of contents */}
          <nav className="mb-16 p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)]" aria-label="FAQ sections">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle mb-4">Jump to section</p>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.title}>
                  <a
                    href={`#${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-foreground-subtle group-hover:translate-x-0.5 transition-transform" style={{ color: "var(--red)" }} />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* FAQ Sections */}
          <div className="space-y-16">
            {sections.map((section) => (
              <div
                key={section.title}
                id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              >
                <h2 className="text-xl font-bold text-foreground mb-6 pb-3 border-b border-[var(--border)]">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.faqs.map(({ q, a }) => (
                    <details
                      key={q}
                      className="group p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] open:border-[var(--glass-border-hover)]"
                    >
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <h3 className="text-sm font-semibold text-foreground pr-4">{q}</h3>
                        <span
                          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-transform group-open:rotate-45"
                          style={{ background: "var(--red-dim)", color: "var(--red)" }}
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-4 text-sm text-foreground-muted leading-relaxed">{a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 p-10 rounded-3xl border border-[var(--glass-border)] bg-[var(--surface)] text-center">
            <h2 className="text-xl font-bold text-foreground mb-3">Still have questions?</h2>
            <p className="text-sm text-foreground-muted mb-6">
              Our research support team is here to help with any questions about our compounds or your order.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: "var(--red)", boxShadow: "0 0 20px rgba(160,3,3,0.35)" }}
            >
              Contact Support <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
