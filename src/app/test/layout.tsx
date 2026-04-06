import { Outfit, Geist } from "next/font/google";
import type { ReactNode } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function TestLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*
        Scoped prefers-reduced-motion rule.
        Targets [data-test-scope] so it only applies within this route.
        On the live site this would go in globals.css at the root level.
      */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-test-scope] *,
          [data-test-scope] *::before,
          [data-test-scope] *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
        /* Override display/heading font within test scope */
        [data-test-scope] .font-display-syne {
          font-family: ${geist.style.fontFamily} !important;
          letter-spacing: -0.02em;
        }
      `}</style>

      {/* Font override — Outfit replaces Inter for body, Manrope replaces Syne for headings */}
      <div data-test-scope="" style={{ fontFamily: outfit.style.fontFamily }}>
        {children}
      </div>
    </>
  );
}
