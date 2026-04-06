"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  X,
  FlaskConical,
  Brain,
  Syringe,
  ShoppingBag,
  Beaker,
  FileCheck,
  BookOpen,
  HelpCircle,
  Info,
  Phone,
  Search,
} from "lucide-react";

const productLinks = [
  { name: "SARMs", href: "/sarms", icon: FlaskConical },
  { name: "Nootropics", href: "/nootropics", icon: Brain },
  { name: "Peptides", href: "/peptides", icon: Syringe },
  { name: "Merchandise", href: "/products?category=merchandise", icon: ShoppingBag },
  { name: "Research Support", href: "/products?category=support", icon: Beaker },
];

const otherLinks = [
  { name: "About Us", href: "/about", icon: Info },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "COA Library", href: "/resources", icon: FileCheck },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
  { name: "Contact", href: "/contact", icon: Phone },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm",
          "bg-[var(--background-secondary)] border-l border-[var(--border)]",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-crimson-700 to-crimson-600 flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">PURE<span className="gradient-text">RAWZ</span></span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--glass-border)]">
            <Search className="w-4 h-4 text-foreground-subtle" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-sm text-foreground placeholder:text-foreground-subtle outline-none w-full"
            />
          </div>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle px-3 mb-2">Products</p>
            <div className="space-y-0.5">
              {productLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground-muted hover:text-foreground hover:bg-[var(--surface)] transition-colors"
                >
                  <link.icon className="w-4 h-4 text-crimson-500" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px bg-[var(--border)] mx-3 my-3" />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle px-3 mb-2">Company</p>
            <div className="space-y-0.5">
              {otherLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground-muted hover:text-foreground hover:bg-[var(--surface)] transition-colors"
                >
                  <link.icon className="w-4 h-4 text-foreground-subtle" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-[var(--border)]">
          <Button className="w-full" size="lg">
            Shop All Products
          </Button>
        </div>
      </div>
    </>
  );
}
