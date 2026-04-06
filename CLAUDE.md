# PureRawz Web Redesign — Next.js Codebase

This is the **PureRawz** project. Not Prometheuz or any other project.

## Project Identity
- **Client:** PureRawz (purerawz.co) — research compounds vendor, Knoxville TN
- **Products:** SARMs, peptides, nootropics, merchandise
- **GitHub repo:** purerawz-web (separate from all other projects)
- **Deployment:** Vercel → purerawz.co

## Codebase
- **Stack:** Next.js 16, Tailwind CSS v4, TypeScript, Radix UI
- **Root:** `/Shared drives/Markhor/Pure Rawz/5. Web Development/PureRawz Claude Test/`
- **Preview server:** `purerawz-nextjs` on port 3000 (launch script at `/tmp/purz-next.sh`)

## Design System
- **Accent colors:** Crimson `#a00303` (SARMs), Blue `#55b3ff` (Peptides), Violet `#a78bfa` (Nootropics), Amber `#FFB347` (GLP-1), Emerald `#5fc992` (Research Protocols)
- **CSS variables:** `var(--red)`, `var(--surface)`, `var(--glass-border)`, `var(--foreground-muted)` etc.
- Dark theme only

## Key Pages Built
- `/` — Homepage
- `/sarms`, `/peptides`, `/nootropics` — Category landing pages (linked in nav)
- `/blog` — Research library with 5 SEO content pillars, search, sort, pillar filter
- `/blog/[slug]` — Individual post pages with Article JSON-LD + generateMetadata
- `/products` — Product catalog
- `/faq` — FAQ page

## SEO Content Pillars (blog)
1. **SARMs Research** — `#FF6B6B`
2. **Peptide Science** — `#55b3ff`
3. **GLP-1 & Metabolic** — `#FFB347`
4. **Nootropics & Cognitive** — `#a78bfa`
5. **Research Protocols** — `#5fc992`

## Project Context
- **Why:** PureRawz has a trust deficit, 90%+ branded organic traffic, poor public reviews. New site leads with trust, fixes SEO, meets FTC/FDA compliance for research-only vendors.
- **Core principles:** (1) trust-building, (2) non-branded SEO growth, (3) FTC/FDA compliance, (4) operational transparency

## Important Files
- `src/lib/blog.ts` — All blog posts and pillar definitions
- `src/lib/products.ts` — Product catalog data
- `src/components/layout/header.tsx` — Site navigation
- `src/components/layout/mobile-nav.tsx` — Mobile navigation
- `src/app/blog/blog-listing-client.tsx` — Blog page client component
