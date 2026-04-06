import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GradientBackground } from "@/components/layout/gradient-bg";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Buy Research Chemicals Online | PureRawz — 99%+ Purity Guaranteed",
    template: "%s | PureRawz",
  },
  description:
    "Research-grade SARMs, peptides, and nootropics. COA-verified, independent lab tested. 99%+ purity guaranteed. For research purposes only.",
  keywords: [
    "research chemicals",
    "sarms for sale",
    "buy sarms online",
    "peptides for sale",
    "buy peptides online",
    "nootropics",
    "COA verified",
    "third-party tested",
    "research compounds",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PureRawz",
    title: "Buy Research Chemicals Online | PureRawz — 99%+ Purity Guaranteed",
    description:
      "Research-grade SARMs, peptides, and nootropics. COA-verified, independent lab tested.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Research Chemicals Online | PureRawz",
    description:
      "Research-grade SARMs, peptides, and nootropics. COA-verified, independent lab tested.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PureRawz",
  url: "https://purerawz.co",
  logo: "https://purerawz.co/logo.png",
  description:
    "Premium research-grade SARMs, peptides, and nootropics. COA-verified, third-party tested. For research purposes only.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@purerawz.co",
    contactType: "customer service",
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PureRawz",
  url: "https://purerawz.co",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://purerawz.co/products?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-crimson-700 focus:text-white focus:text-sm focus:font-medium focus:outline-none"
          >
            Skip to main content
          </a>
          <GradientBackground />
          <Header />
          <main id="main-content" className="min-h-screen" role="main">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
