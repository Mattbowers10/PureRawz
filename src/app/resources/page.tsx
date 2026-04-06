import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  FileCheck,
  Download,
  ChevronDown,
  ShieldCheck,
  BookOpen,
  Truck,
  CreditCard,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access Certificates of Authenticity, FAQ, shipping information, and research guidelines from PureRawz.",
};

const mockCOAs = [
  { product: "RAD-140 (Testolone)", batch: "PR-RAD-2026-03A", date: "March 2026", purity: "99.2%" },
  { product: "BPC-157", batch: "PR-BPC-2026-03A", date: "March 2026", purity: "99.5%" },
  { product: "MK-677 (Ibutamoren)", batch: "PR-MK6-2026-03A", date: "March 2026", purity: "99.1%" },
  { product: "Noopept", batch: "PR-NOP-2026-02A", date: "Feb 2026", purity: "99.4%" },
  { product: "LGD-4033 (Ligandrol)", batch: "PR-LGD-2026-02A", date: "Feb 2026", purity: "99.3%" },
  { product: "PT-141", batch: "PR-PT1-2026-02A", date: "Feb 2026", purity: "99.6%" },
  { product: "GHK-Cu", batch: "PR-GHK-2026-01A", date: "Jan 2026", purity: "99.2%" },
  { product: "TB-500", batch: "PR-TB5-2026-01A", date: "Jan 2026", purity: "99.4%" },
];

const faqs = [
  {
    q: "Are your products tested by third-party labs?",
    a: "Yes. Every batch of every product is tested by independent, accredited third-party laboratories. Test results are available as downloadable COAs in our resource library.",
  },
  {
    q: "What is a Certificate of Authenticity (COA)?",
    a: "A COA is a document from an independent laboratory confirming the identity, purity, and concentration of a compound. Our COAs include HPLC purity analysis and mass spectrometry verification.",
  },
  {
    q: "Are your products intended for human consumption?",
    a: "No. All PureRawz products are sold strictly for research, educational, and scientific purposes only. They are not intended for human consumption.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept various payment methods for your convenience. Details are available at checkout.",
  },
  {
    q: "What is your shipping policy?",
    a: "We offer same-day processing on orders placed before 2 PM EST. Free shipping is available on orders over $100. International shipping is available to select countries.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a satisfaction guarantee. If you receive a damaged or incorrect product, contact our support team within 14 days of delivery for a resolution.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-crimson-500 uppercase tracking-wider mb-3">
            Resources
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Transparency &amp;{" "}
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
            Access Certificates of Authenticity, shipping information, and answers
            to common questions.
          </p>
        </div>

        {/* COA Section */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-crimson-700/10 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-crimson-500" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Certificates of Authenticity</h2>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
              <Input placeholder="Search COAs..." className="pl-10" />
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] backdrop-blur-sm overflow-hidden">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[var(--border)] text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
              <div className="col-span-4">Product</div>
              <div className="col-span-3">Batch Number</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Purity</div>
              <div className="col-span-2 text-right">Download</div>
            </div>

            {/* Table rows */}
            {mockCOAs.map((coa, i) => (
              <div
                key={coa.batch}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 hover:bg-[var(--surface-hover)] transition-colors ${
                  i < mockCOAs.length - 1 ? "border-b border-[var(--border)]" : ""
                }`}
              >
                <div className="sm:col-span-4 font-medium text-sm text-foreground">{coa.product}</div>
                <div className="sm:col-span-3 text-sm text-foreground-muted font-mono">{coa.batch}</div>
                <div className="sm:col-span-2 text-sm text-foreground-muted">{coa.date}</div>
                <div className="sm:col-span-1">
                  <Badge variant="success">{coa.purity}</Badge>
                </div>
                <div className="sm:col-span-2 sm:text-right">
                  <Button variant="ghost" size="sm" className="gap-1.5 text-crimson-500 hover:text-crimson-400">
                    <Download className="w-3.5 h-3.5" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-crimson-700/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-crimson-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3 stagger-children">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] backdrop-blur-sm overflow-hidden hover:border-[var(--glass-border-hover)] transition-all duration-300"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
                  <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-foreground-subtle shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-sm text-foreground-muted leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section id="shipping" className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: Truck, title: "Shipping Policy", desc: "Same-day processing. Free shipping on orders over $100. International shipping available." },
            { icon: CreditCard, title: "Payment Options", desc: "Multiple secure payment methods accepted. All transactions are encrypted and protected." },
            { icon: ShieldCheck, title: "Quality Guarantee", desc: "99%+ purity standard. If a product doesn't meet our standards, we'll make it right." },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] backdrop-blur-sm hover:border-[var(--glass-border-hover)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-crimson-700/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-crimson-500" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
