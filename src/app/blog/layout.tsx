import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay updated with the latest research insights, compound guides, and industry news from PureRawz.",
  openGraph: {
    title: "Blog | PureRawz",
    description:
      "Research insights, compound guides, and industry news for the scientific community.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
