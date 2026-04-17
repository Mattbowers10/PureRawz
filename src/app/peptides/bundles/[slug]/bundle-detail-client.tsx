'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ShoppingCart,
  ChevronRight,
  ExternalLink,
  FlaskConical,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Package,
  Layers,
} from 'lucide-react'
import type { PeptideBundle } from '@/lib/peptide-bundles'
import { useCart } from '@/context/cart-context'
import type { Product } from '@/lib/products'

/* ─── Compound formulas / MW lookup ──────────────────────────────── */
const COMPOUND_META: Record<
  string,
  { formula: string; mw: string; sequence?: string; researchAreas: string[] }
> = {
  'BPC-157': {
    formula: 'C₆₂H₉₈N₁₆O₂₂',
    mw: '1,419.5 g/mol',
    sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
    researchAreas: ['Tissue cytoprotection', 'GI tract signaling', 'Angiogenesis', 'CNS neuroprotection'],
  },
  'TB-500': {
    formula: 'C₂₁₂H₃₅₀N₅₆O₇₈S',
    mw: '4,963.5 g/mol',
    sequence: 'Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu',
    researchAreas: ['Actin polymerization', 'Wound healing', 'Anti-inflammatory signaling', 'Stem cell mobilization'],
  },
  'PT-141': {
    formula: 'C₅₀H₆₈N₁₄O₁₀',
    mw: '1,025.2 g/mol',
    sequence: 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH',
    researchAreas: ['MC3R / MC4R agonism', 'Central neuroendocrine signaling', 'Dopaminergic pathway studies'],
  },
  'GHK-Cu': {
    formula: 'C₁₄H₂₃CuN₆O₄',
    mw: '403.9 g/mol',
    sequence: 'Gly-His-Lys · Cu²⁺',
    researchAreas: ['Gene expression modulation', 'Collagen synthesis', 'Antioxidant enzyme induction', 'DNA repair'],
  },
  'CJC-1295': {
    formula: 'C₁₅₂H₂₅₂N₄₂O₄₂S',
    mw: '3,367.9 g/mol',
    sequence:
      'Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg',
    researchAreas: ['GHRH receptor binding', 'Pulsatile GH secretion', 'IGF-1 axis research'],
  },
  Ipamorelin: {
    formula: 'C₃₈H₄₉N₉O₅',
    mw: '711.8 g/mol',
    sequence: 'Aib-His-D-2Nal-D-Phe-Lys-NH₂',
    researchAreas: ['Ghrelin receptor selectivity', 'GH secretagogue research', 'HPA axis independence studies'],
  },
}

/* ─── Helpers ──────────────────────────────────────────────────────── */
function hex(color: string, alpha: number): string {
  // Convert #rrggbb to rgba
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

/* ─── Section label ────────────────────────────────────────────────── */
function SectionLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
      style={{ color }}
    >
      {children}
    </p>
  )
}

/* ─── Compound stack visual (hero right column) ────────────────────── */
function CompoundStackVisual({ bundle }: { bundle: PeptideBundle }) {
  return (
    <div className="relative flex flex-col gap-3">
      {bundle.compounds.map((c, i) => (
        <div key={c.code} className="relative">
          {/* connecting line between cards */}
          {i < bundle.compounds.length - 1 && (
            <div
              className="absolute left-8 bottom-0 translate-y-full w-px h-3 z-10"
              style={{ background: `linear-gradient(to bottom, ${c.color}60, ${bundle.compounds[i + 1].color}60)` }}
            />
          )}
          <div
            className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'var(--card-raised)',
              boxShadow: `0 0 0 1px ${hex(c.color, 0.18)}, 0 8px 24px ${hex(c.color, 0.08)}`,
            }}
          >
            {/* top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${c.color}70, transparent)` }}
            />
            <div className="p-5 flex items-start gap-4">
              {/* color indicator */}
              <div
                className="mt-0.5 w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  background: c.color,
                  boxShadow: `0 0 0 3px ${hex(c.color, 0.2)}, 0 0 8px ${hex(c.color, 0.5)}`,
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className="font-display-syne font-bold text-base leading-none"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
                  >
                    {c.code}
                  </span>
                  <span
                    className="font-display-syne font-bold text-sm"
                    style={{ color: c.color }}
                  >
                    {c.quantity}×{c.unit}
                  </span>
                </div>
                <p className="text-[11px] mb-2" style={{ color: 'var(--text-dim)' }}>
                  {c.name}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: hex(c.color, 0.1),
                      color: c.color,
                      border: `1px solid ${hex(c.color, 0.25)}`,
                    }}
                  >
                    {c.purity} purity
                  </span>
                </div>
                <p className="mt-2 text-[10px] leading-snug" style={{ color: 'var(--text-dim)' }}>
                  {c.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pathway connector decoration */}
      <svg
        className="absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-32 opacity-30 pointer-events-none"
        viewBox="0 0 20 128"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 10 0 C 10 32, 10 96, 10 128"
          stroke={bundle.accentColor}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <circle key={i} cx="10" cy={128 * t} r="2" fill={bundle.accentColor} />
        ))}
      </svg>
    </div>
  )
}

/* ─── Mechanism flow diagram ───────────────────────────────────────── */
function MechanismFlow({ bundle }: { bundle: PeptideBundle }) {
  return (
    <div className="relative">
      {bundle.mechanismSteps.map((step, i) => (
        <div key={i} className="relative flex gap-4 pb-0">
          {/* Left: connector track */}
          <div className="flex flex-col items-center w-8 shrink-0">
            {/* dot */}
            <div
              className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-mono text-[10px] font-bold"
              style={{
                background: hex(step.color, 0.15),
                border: `1px solid ${hex(step.color, 0.4)}`,
                color: step.color,
                boxShadow: `0 0 12px ${hex(step.color, 0.2)}`,
              }}
            >
              {i + 1}
            </div>
            {/* SVG line to next step */}
            {i < bundle.mechanismSteps.length - 1 && (
              <svg
                width="2"
                height="64"
                viewBox="0 0 2 64"
                className="mt-1"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={step.color} stopOpacity="0.5" />
                    <stop
                      offset="100%"
                      stopColor={bundle.mechanismSteps[i + 1].color}
                      stopOpacity="0.2"
                    />
                  </linearGradient>
                </defs>
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="64"
                  stroke={`url(#grad-${i})`}
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
              </svg>
            )}
          </div>

          {/* Right: step content */}
          <div
            className="flex-1 mb-6 rounded-xl p-4 overflow-hidden relative"
            style={{
              background: 'var(--card-surface)',
              boxShadow: `0 0 0 1px ${hex(step.color, 0.12)}`,
            }}
          >
            {/* subtle top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, ${step.color}50, transparent)` }}
            />
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                style={{
                  background: hex(step.color, 0.1),
                  color: step.color,
                  border: `1px solid ${hex(step.color, 0.25)}`,
                }}
              >
                {step.compound}
              </span>
              <span
                className="font-mono text-[10px]"
                style={{ color: 'var(--text-dim)' }}
              >
                → {step.receptor}
              </span>
            </div>
            <p
              className="text-sm font-medium mb-1.5 leading-snug"
              style={{ color: 'var(--text-secondary)' }}
            >
              {step.pathway}
            </p>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              {step.outcome}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Citation card ────────────────────────────────────────────────── */
function CitationCard({
  citation,
  accentColor,
}: {
  citation: PeptideBundle['citations'][0]
  accentColor: string
}) {
  return (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: 'var(--card-surface)',
        boxShadow: 'var(--shadow-ring)',
        borderTop: `2px solid ${hex(accentColor, 0.3)}`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className="font-mono text-[9px] font-bold px-2 py-0.5 rounded"
          style={{
            background: hex(accentColor, 0.1),
            color: accentColor,
            border: `1px solid ${hex(accentColor, 0.25)}`,
          }}
        >
          PMID {citation.pmid}
        </span>
        <ExternalLink
          className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
          style={{ color: accentColor }}
        />
      </div>
      <p
        className="text-[11px] font-semibold leading-snug mb-1.5 line-clamp-3"
        style={{ color: 'var(--text-secondary)' }}
      >
        {citation.title}
      </p>
      <p className="text-[10px] mb-1" style={{ color: 'var(--text-dim)' }}>
        {citation.authors}
      </p>
      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
        <em>{citation.journal}</em> · {citation.year}
      </p>
    </a>
  )
}

/* ─── Compound detail card ─────────────────────────────────────────── */
function CompoundDetailCard({
  compound,
  accentColor,
}: {
  compound: PeptideBundle['compounds'][0]
  accentColor: string
}) {
  const meta = COMPOUND_META[compound.code]

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--card-raised)',
        boxShadow: `0 0 0 1px ${hex(compound.color, 0.2)}, var(--shadow-raise)`,
        borderTop: `2px solid ${hex(compound.color, 0.5)}`,
      }}
    >
      <div className="p-6">
        {/* header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3
              className="font-display-syne font-bold text-xl mb-1"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
            >
              {compound.code}
            </h3>
            <p className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
              {compound.name}
            </p>
          </div>
          <div className="text-right">
            <div
              className="font-display-syne font-bold text-lg"
              style={{ color: compound.color, letterSpacing: '-0.02em' }}
            >
              {compound.purity}
            </div>
            <div className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              purity
            </div>
          </div>
        </div>

        {/* formula / MW */}
        {meta && (
          <div
            className="font-mono text-[11px] inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4"
            style={{
              background: hex(compound.color, 0.08),
              color: compound.color,
              border: `1px solid ${hex(compound.color, 0.2)}`,
            }}
          >
            <span>{meta.formula}</span>
            <span style={{ color: hex(compound.color, 0.5) }}>·</span>
            <span>{meta.mw}</span>
          </div>
        )}

        {/* role badge */}
        <div className="mb-4">
          <span
            className="text-[10px] font-medium px-2.5 py-1 rounded-full"
            style={{
              background: hex(compound.color, 0.1),
              color: compound.color,
              border: `1px solid ${hex(compound.color, 0.2)}`,
            }}
          >
            {compound.role}
          </span>
        </div>

        {/* sequence */}
        {meta?.sequence && (
          <div className="mb-4">
            <p
              className="text-[9px] uppercase tracking-[0.15em] mb-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              Sequence
            </p>
            <p
              className="font-mono text-[10px] leading-relaxed break-all"
              style={{ color: 'var(--text-secondary)' }}
            >
              {meta.sequence}
            </p>
          </div>
        )}

        {/* research areas */}
        {meta?.researchAreas && (
          <div>
            <p
              className="text-[9px] uppercase tracking-[0.15em] mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Research Areas
            </p>
            <div className="flex flex-wrap gap-1.5">
              {meta.researchAreas.map((area) => (
                <span
                  key={area}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    color: 'var(--text-secondary)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Main client component ────────────────────────────────────────── */
export function BundleDetailClient({ bundle }: { bundle: PeptideBundle }) {
  const { addItem, openCart } = useCart()
  const [added, setAdded] = useState(false)

  // Create a synthetic bundle product for the cart
  function handleAddToCart() {
    const bundleProduct: Product = {
      id: `bundle-${bundle.slug}`,
      name: bundle.name,
      slug: bundle.slug,
      category: 'Research Bundles',
      categorySlug: 'bundles',
      description: bundle.tagline,
      shortDescription: bundle.tagline,
      price: bundle.price,
      originalPrice: bundle.comparePrice,
      rating: 0,
      reviewCount: 0,
      badge: bundle.badgeLabel,
      inStock: true,
      sku: `PR-BUNDLE-${bundle.slug.toUpperCase()}`,
      concentration: '',
      form: 'Bundle',
      volume: '',
      purity: '',
      coaBatch: '',
      researchUse: bundle.researchDomain,
      features: bundle.compounds.map((c) => `${c.code} ${c.quantity}×${c.unit} — ${c.purity} purity`),
      relatedIds: [],
    }
    addItem(bundleProduct)
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="relative overflow-hidden">
      {/* Page atmosphere — accent color tint */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse at 70% 0%, ${bundle.accentGlow} 0%, transparent 55%), radial-gradient(ellipse at 15% 85%, ${hex(bundle.accentColor, 0.04)} 0%, transparent 50%)`,
        }}
      />

      <div className="pt-16 lg:pt-24 pb-32">
        <div className="container">

          {/* ── BREADCRUMB ──────────────────────────────────────────── */}
          <nav className="flex items-center gap-1.5 mb-10 text-[11px]" aria-label="Breadcrumb">
            {[
              { label: 'Peptides', href: '/peptides' },
              { label: 'Research Bundles', href: '/peptides/bundles' },
              { label: bundle.name, href: '#' },
            ].map((crumb, i, arr) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {crumb.href === '#' ? (
                  <span style={{ color: bundle.accentColor }}>{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:opacity-80"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    {crumb.label}
                  </Link>
                )}
                {i < arr.length - 1 && (
                  <ChevronRight className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                )}
              </span>
            ))}
          </nav>

          {/* ── HERO ────────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: headline / pricing / CTA */}
              <div>
                {/* badges row */}
                <div className="flex flex-wrap items-center gap-2.5 mb-6">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                    style={{
                      background: hex(bundle.accentColor, 0.12),
                      color: bundle.accentColor,
                      border: `1px solid ${hex(bundle.accentColor, 0.28)}`,
                    }}
                  >
                    {bundle.badgeLabel}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      color: 'var(--text-dim)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    For Research Use Only
                  </span>
                </div>

                {/* research domain */}
                <p
                  className="text-[10px] uppercase tracking-[0.18em] mb-4"
                  style={{ color: hex(bundle.accentColor, 0.8) }}
                >
                  {bundle.researchDomain}
                </p>

                {/* headline */}
                <h1
                  className="font-display-syne font-bold leading-none mb-5"
                  style={{
                    fontSize: 'clamp(32px, 4.5vw, 60px)',
                    letterSpacing: '-0.035em',
                    color: 'var(--text-primary)',
                  }}
                >
                  {bundle.name}
                </h1>

                {/* tagline */}
                <p
                  className="text-lg leading-relaxed mb-6 max-w-lg"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {bundle.tagline}
                </p>

                <p
                  className="text-sm leading-relaxed mb-10 max-w-lg"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {bundle.heroDescription}
                </p>

                {/* pricing + CTA */}
                <div
                  className="inline-flex flex-col gap-4 p-6 rounded-2xl mb-6"
                  style={{
                    background: 'var(--card-raised)',
                    boxShadow: `0 0 0 1px ${hex(bundle.accentColor, 0.2)}, 0 20px 60px ${hex(bundle.accentColor, 0.06)}`,
                  }}
                >
                  <div className="flex items-end gap-3">
                    <span
                      className="font-display-syne font-bold"
                      style={{
                        fontSize: '48px',
                        color: bundle.accentColor,
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                      }}
                    >
                      ${bundle.price}
                    </span>
                    <span
                      className="text-xl line-through pb-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      ${bundle.comparePrice}
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded pb-1"
                      style={{
                        background: hex(bundle.accentColor, 0.12),
                        color: bundle.accentColor,
                      }}
                    >
                      Save ${bundle.comparePrice - bundle.price}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                    style={{
                      background: bundle.accentColor,
                      color: '#040507',
                      boxShadow: `0 0 28px ${bundle.accentGlow}, 0 4px 12px rgba(0,0,0,0.3)`,
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {added ? 'Added to Cart!' : 'Add Bundle to Cart'}
                  </button>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      COA verified · HPLC tested · Lyophilized for stability
                    </span>
                  </div>
                </div>

                {/* compound count badge */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full"
                    style={{
                      background: 'var(--card-surface)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <FlaskConical className="w-3 h-3" style={{ color: bundle.accentColor }} />
                    {bundle.compounds.length} research compounds
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full"
                    style={{
                      background: 'var(--card-surface)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <Package className="w-3 h-3" style={{ color: bundle.accentColor }} />
                    {bundle.accessories.length} accessories included
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full"
                    style={{
                      background: 'var(--card-surface)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <BookOpen className="w-3 h-3" style={{ color: bundle.accentColor }} />
                    {bundle.citations.length} citations
                  </span>
                </div>
              </div>

              {/* Right: compound stack visual */}
              <div className="lg:pt-12">
                <CompoundStackVisual bundle={bundle} />
              </div>
            </div>
          </section>

          {/* ── WHAT'S INCLUDED ─────────────────────────────────────── */}
          <section className="mb-24">
            <div className="mb-8">
              <SectionLabel color={bundle.accentColor}>Bundle Contents</SectionLabel>
              <h2
                className="font-display-syne font-bold text-3xl sm:text-4xl"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
              >
                What&apos;s Included
              </h2>
            </div>

            {/* Compound cards */}
            <div className="mb-8">
              <p
                className="text-[10px] uppercase tracking-[0.15em] mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                Research Compounds
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bundle.compounds.map((c) => (
                  <div
                    key={c.code}
                    className="rounded-xl p-4 relative overflow-hidden"
                    style={{
                      background: 'var(--card-surface)',
                      boxShadow: `0 0 0 1px ${hex(c.color, 0.2)}`,
                      borderTop: `2px solid ${hex(c.color, 0.5)}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-display-syne font-bold text-base"
                        style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
                      >
                        {c.code}
                      </span>
                      <span
                        className="font-display-syne font-bold text-sm"
                        style={{ color: c.color }}
                      >
                        ×{c.quantity}
                      </span>
                    </div>
                    <p className="text-[11px] mb-3" style={{ color: 'var(--text-dim)' }}>
                      {c.name}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span
                        className="font-mono text-[10px] px-2 py-0.5 rounded"
                        style={{
                          background: hex(c.color, 0.08),
                          color: c.color,
                          border: `1px solid ${hex(c.color, 0.2)}`,
                        }}
                      >
                        {c.unit}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          color: 'var(--text-secondary)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        {c.purity} purity
                      </span>
                    </div>
                    <p className="mt-2.5 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      {c.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessories */}
            <div className="mb-10">
              <p
                className="text-[10px] uppercase tracking-[0.15em] mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                Accessories &amp; Extras
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {bundle.accessories.map((acc) => (
                  <div
                    key={acc.name}
                    className="rounded-xl p-4 flex items-start gap-3"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                      style={{
                        background:
                          acc.type === 'merch'
                            ? 'rgba(255,255,255,0.05)'
                            : hex(bundle.accentColor, 0.08),
                      }}
                    >
                      {acc.type === 'merch' ? (
                        <Layers
                          className="w-3.5 h-3.5"
                          style={{ color: 'var(--text-dim)' }}
                        />
                      ) : (
                        <Package
                          className="w-3.5 h-3.5"
                          style={{ color: bundle.accentColor }}
                        />
                      )}
                    </div>
                    <div>
                      <p
                        className="text-[11px] font-semibold mb-1"
                        style={{
                          color: acc.type === 'merch' ? 'var(--text-dim)' : 'var(--text-secondary)',
                        }}
                      >
                        {acc.name}
                      </p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        {acc.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA strip */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl p-6"
              style={{
                background: 'var(--card-raised)',
                boxShadow: `0 0 0 1px ${hex(bundle.accentColor, 0.18)}`,
              }}
            >
              <div className="flex items-end gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: 'var(--text-muted)' }}>
                    Bundle Price
                  </p>
                  <div className="flex items-end gap-3">
                    <span
                      className="font-display-syne font-bold text-3xl"
                      style={{ color: bundle.accentColor, letterSpacing: '-0.03em', lineHeight: 1 }}
                    >
                      ${bundle.price}
                    </span>
                    <span className="text-lg line-through pb-0.5" style={{ color: 'var(--text-muted)' }}>
                      ${bundle.comparePrice}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
                style={{
                  background: bundle.accentColor,
                  color: '#040507',
                  boxShadow: `0 0 24px ${bundle.accentGlow}`,
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? 'Added!' : 'Add Bundle to Cart'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* ── RESEARCH RATIONALE ──────────────────────────────────── */}
          <section className="mb-24">
            <div className="mb-8">
              <SectionLabel color={bundle.accentColor}>Scientific Basis</SectionLabel>
              <h2
                className="font-display-syne font-bold text-3xl sm:text-4xl"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
              >
                Research Rationale
              </h2>
            </div>

            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
              {/* Left: rationale prose */}
              <div className="lg:col-span-3 space-y-6">
                {bundle.scientificRationale.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm leading-[1.85] tracking-[0.1px]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Right: mechanism flow */}
              <div className="lg:col-span-2">
                <div
                  className="rounded-2xl p-6 sticky top-24"
                  style={{
                    background: 'var(--card-surface)',
                    boxShadow: `0 0 0 1px ${hex(bundle.accentColor, 0.15)}, 0 20px 60px ${hex(bundle.accentColor, 0.05)}`,
                    borderTop: `2px solid ${hex(bundle.accentColor, 0.4)}`,
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.18em] mb-5"
                    style={{ color: bundle.accentColor }}
                  >
                    Mechanism Flow
                  </p>
                  <MechanismFlow bundle={bundle} />
                </div>
              </div>
            </div>
          </section>

          {/* ── LITERATURE FOUNDATION ───────────────────────────────── */}
          <section className="mb-24">
            <div className="mb-8">
              <SectionLabel color={bundle.accentColor}>Primary Literature</SectionLabel>
              <h2
                className="font-display-syne font-bold text-3xl sm:text-4xl"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
              >
                Literature Foundation
              </h2>
              <p className="mt-3 text-sm" style={{ color: 'var(--text-dim)' }}>
                Click any citation to view on PubMed.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bundle.citations.map((citation) => (
                <CitationCard
                  key={citation.pmid}
                  citation={citation}
                  accentColor={bundle.accentColor}
                />
              ))}
            </div>
          </section>

          {/* ── COMPOUND DETAIL CARDS ───────────────────────────────── */}
          <section className="mb-24">
            <div className="mb-8">
              <SectionLabel color={bundle.accentColor}>Compound Profiles</SectionLabel>
              <h2
                className="font-display-syne font-bold text-3xl sm:text-4xl"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
              >
                Compound Detail
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bundle.compounds.map((c) => (
                <CompoundDetailCard key={c.code} compound={c} accentColor={bundle.accentColor} />
              ))}
            </div>
          </section>

          {/* ── COMPLIANCE FOOTER ───────────────────────────────────── */}
          <section>
            <div
              className="rounded-2xl p-6 space-y-3"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4" style={{ color: 'var(--text-dim)' }} />
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: 'var(--text-dim)' }}
                >
                  Research Use Only — Compliance Notice
                </p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text-dim)' }}>Not for human or animal consumption.</strong>{' '}
                {bundle.researchDisclaimer}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text-dim)' }}>Literature references.</strong>{' '}
                Citations provided on this page are sourced from peer-reviewed publications indexed in
                PubMed. They are provided for research context and background only. PureRawz does not
                claim that any cited study validates or endorses any specific use of its products.
                Researchers are responsible for independent evaluation of all referenced literature.
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text-dim)' }}>Regulatory status.</strong>{' '}
                Regulatory information on this page reflects the compounds&apos; research-compound status at the
                time of publication and does not constitute legal or regulatory advice. Researchers should
                independently verify applicable regulations in their jurisdiction before procuring or using
                any compound.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
