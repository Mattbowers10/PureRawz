"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { SearchOverlay } from "@/components/search/search-overlay";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  FlaskConical,
  Brain,
  Syringe,
  FileCheck,
  BookOpen,
  Info,
  ShieldCheck,
  Menu,
} from "lucide-react";

const productCategories = [
  {
    name: "SARMs",
    href: "/sarms",
    icon: FlaskConical,
    description: "Selective androgen receptor modulators",
    count: 4,
  },
  {
    name: "Peptides",
    href: "/peptides",
    icon: Syringe,
    description: "Research-grade peptide compounds",
    count: 4,
  },
  {
    name: "Nootropics",
    href: "/nootropics",
    icon: Brain,
    description: "Cognitive enhancement compounds",
    count: 4,
  },
];

const resourceLinks = [
  { name: "COA Library", href: "/resources", icon: FileCheck, desc: "Third-party batch test results" },
  { name: "Research Library", href: "/blog", icon: BookOpen, desc: "Compound overviews & studies" },
  { name: "About", href: "/about", icon: Info, desc: "Mission, lab, and standards" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openCart, itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openDropdown = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(name);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 80);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleDropdownKey = (e: React.KeyboardEvent, name: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDropdown(name);
    }
    if (e.key === "Escape") {
      setActiveDropdown(null);
    }
  };

  return (
    <>
      {/* Compliance announcement bar */}
      <div className="compliance-banner fixed top-0 left-0 right-0 z-[60]">
        <span className="hidden sm:inline">
          For research use only — not for human consumption &bull; All products independently COA verified
        </span>
        <span className="sm:hidden">
          For research use only — not for human consumption
        </span>
      </div>

      <header
        role="banner"
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
          "top-[var(--compliance-bar-height)]",
          scrolled
            ? [
                "py-0",
                "border-b border-[var(--border)]",
                "bg-[rgba(7,8,10,0.92)] backdrop-blur-[20px]",
              ].join(" ")
            : "py-0 bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between h-[56px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
              style={{
                background: "var(--red)",
                boxShadow: "var(--badge-glow-red)",
              }}
            >
              <FlaskConical className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-[15px] font-bold tracking-[0.04em]"
                style={{ color: "var(--text-primary)" }}
              >
                PURE<span style={{ color: "var(--red)" }}>RAWZ</span>
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.18em] mt-0.5"
                style={{ color: "var(--text-dim)" }}
              >
                Research Compounds
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5">

            {/* Products mega dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("products")}
              onMouseLeave={closeDropdown}
            >
              <button
                className={cn(
                  "nav-link flex items-center gap-1",
                  activeDropdown === "products" && "text-[var(--text-primary)]"
                )}
                aria-expanded={activeDropdown === "products"}
                aria-haspopup="true"
                onClick={() => toggleDropdown("products")}
                onKeyDown={(e) => handleDropdownKey(e, "products")}
              >
                Products
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform duration-200",
                    activeDropdown === "products" && "rotate-180"
                  )}
                />
              </button>

              {activeDropdown === "products" && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 animate-scale-in"
                  style={{ transformOrigin: "top center" }}
                  onMouseEnter={() => openDropdown("products")}
                  onMouseLeave={closeDropdown}
                >
                  <div
                    className="rounded-[var(--radius-xl)] p-4 min-w-[440px]"
                    style={{
                      background: "var(--card-raised)",
                      border: "1px solid var(--border-subtle)",
                      boxShadow: "var(--shadow-float)",
                    }}
                  >
                    {/* Category grid */}
                    <div className="grid grid-cols-1 gap-1">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] transition-all duration-150 group/item"
                          style={{ color: "var(--text-secondary)" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "var(--surface-100)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                          }}
                        >
                          <div
                            className="w-9 h-9 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0"
                            style={{
                              background: "var(--red-dim)",
                              border: "1px solid rgba(160,3,3,0.2)",
                            }}
                          >
                            <cat.icon className="w-4 h-4" style={{ color: "var(--red)" }} />
                          </div>
                          <div className="flex-1">
                            <div
                              className="text-sm font-600 leading-none mb-0.5"
                              style={{ color: "var(--text-primary)", fontWeight: 600 }}
                            >
                              {cat.name}
                            </div>
                            <div className="text-xs" style={{ color: "var(--text-dim)" }}>
                              {cat.description}
                            </div>
                          </div>
                          <div
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: "var(--surface-100)",
                              color: "var(--text-muted)",
                              border: "1px solid var(--border-subtle)",
                            }}
                          >
                            {cat.count}
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Divider + View All */}
                    <div
                      className="mt-3 pt-3 flex items-center justify-between"
                      style={{ borderTop: "1px solid var(--border)" }}
                    >
                      <Link
                        href="/products"
                        className="text-xs font-600 transition-colors"
                        style={{ color: "var(--red)", fontWeight: 600 }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.opacity = "0.75";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.opacity = "1";
                        }}
                      >
                        View All Products →
                      </Link>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3" style={{ color: "var(--green)" }} />
                        <span className="text-xs" style={{ color: "var(--text-dim)" }}>
                          All COA verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("resources")}
              onMouseLeave={closeDropdown}
            >
              <button
                className={cn(
                  "nav-link flex items-center gap-1",
                  activeDropdown === "resources" && "text-[var(--text-primary)]"
                )}
                aria-expanded={activeDropdown === "resources"}
                aria-haspopup="true"
                onClick={() => toggleDropdown("resources")}
                onKeyDown={(e) => handleDropdownKey(e, "resources")}
              >
                Resources
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform duration-200",
                    activeDropdown === "resources" && "rotate-180"
                  )}
                />
              </button>

              {activeDropdown === "resources" && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 animate-scale-in"
                  style={{ transformOrigin: "top center" }}
                  onMouseEnter={() => openDropdown("resources")}
                  onMouseLeave={closeDropdown}
                >
                  <div
                    className="rounded-[var(--radius-xl)] p-3 min-w-[280px]"
                    style={{
                      background: "var(--card-raised)",
                      border: "1px solid var(--border-subtle)",
                      boxShadow: "var(--shadow-float)",
                    }}
                  >
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-[var(--radius-md)] transition-all duration-150"
                        style={{ color: "var(--text-secondary)" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "var(--surface-100)";
                          (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                        }}
                      >
                        <link.icon
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: "var(--red)" }}
                        />
                        <div>
                          <div className="text-sm font-medium" style={{ color: "inherit" }}>
                            {link.name}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>
                            {link.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="nav-link">About</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Right: utility icons + cart */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              className="btn-icon hidden sm:inline-flex"
              aria-label="Search (⌘K)"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Account */}
            <Link href="/account" className="btn-icon hidden sm:inline-flex" aria-label="Account">
              <User className="w-4.5 h-4.5" />
            </Link>

            {/* Cart */}
            <button
              className="btn-icon relative"
              aria-label={`Cart — ${itemCount} items`}
              onClick={openCart}
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center leading-none"
                  style={{ background: "var(--red)", boxShadow: "var(--badge-glow-red)" }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="btn-icon lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
