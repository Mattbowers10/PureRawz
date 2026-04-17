import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBundleBySlug, getAllBundles } from '@/lib/peptide-bundles'
import { BundleDetailClient } from './bundle-detail-client'

export function generateStaticParams() {
  return getAllBundles().map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const bundle = getBundleBySlug(slug)
  if (!bundle) return {}
  return {
    title: `${bundle.name} | Research Bundle | PureRawz`,
    description: bundle.tagline + ' For laboratory research use only.',
    openGraph: {
      title: `${bundle.name} | Research Bundle | PureRawz`,
      description: bundle.tagline + ' For laboratory research use only.',
      type: 'website',
    },
  }
}

export default async function BundlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const bundle = getBundleBySlug(slug)
  if (!bundle) notFound()
  return <BundleDetailClient bundle={bundle} />
}
