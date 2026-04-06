import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our catalog of premium research-grade SARMs, Nootropics, and Peptides. All products third-party tested with Certificates of Authenticity.",
  openGraph: {
    title: "Products | PureRawz",
    description:
      "Browse premium research-grade SARMs, Nootropics, and Peptides backed by third-party testing.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
