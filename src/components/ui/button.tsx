"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * PureRawz Button System — macOS-native shadow hierarchy
 *
 * Design principles (from DESIGN.md):
 * - Primary: Pill shape (86px radius), raised neumorphic shadow, white text
 * - Ghost: Concave/inset shadow — pressed-in look, lower visual weight
 * - CTA: Semi-transparent white background, dark text — for light-on-dark CTAs
 * - Hover: opacity transition (not color swap) — signature PureRawz pattern
 * - Active: Inset press shadow simulating physical press
 */

const buttonVariants = cva(
  // Base
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-semibold tracking-wide cursor-pointer select-none",
    "transition-all duration-150",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary — raised neumorphic pill, white text
        // Hover: lifts further. Active: presses in.
        primary: [
          "bg-[var(--card-raised)] text-[var(--text-primary)]",
          "rounded-[var(--radius-pill)]",
          "border-0",
          "[box-shadow:6px_6px_14px_rgba(0,0,0,0.55),_-3px_-3px_8px_rgba(255,255,255,0.05),_inset_0_1px_0_rgba(255,255,255,0.07)]",
          "hover:[box-shadow:8px_8px_18px_rgba(0,0,0,0.65),_-4px_-4px_10px_rgba(255,255,255,0.06),_inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-px",
          "active:[box-shadow:inset_4px_4px_10px_rgba(0,0,0,0.55),_inset_-2px_-2px_6px_rgba(255,255,255,0.04)] active:translate-y-0",
        ].join(" "),

        // Ghost — concave inset, gray text, lower weight
        ghost: [
          "bg-transparent text-[var(--text-dim)]",
          "rounded-[var(--radius-pill)]",
          "border border-[var(--border-subtle)]",
          "[box-shadow:inset_3px_3px_8px_rgba(0,0,0,0.5),_inset_-2px_-2px_5px_rgba(255,255,255,0.04)]",
          "hover:text-[var(--text-primary)] hover:border-[var(--border-mid)] hover:opacity-90",
        ].join(" "),

        // CTA — semi-transparent white, dark text (hero CTA)
        cta: [
          "bg-[hsla(0,0%,100%,0.85)] text-[#18191a]",
          "rounded-[var(--radius-pill)]",
          "border-0",
          "hover:bg-white",
        ].join(" "),

        // Outline — rectangular secondary action
        outline: [
          "bg-transparent text-[var(--text-secondary)]",
          "rounded-[var(--radius-sm)]",
          "border border-[var(--border-subtle)]",
          "hover:bg-[var(--surface-200)] hover:text-[var(--text-primary)] hover:border-[var(--border-mid)]",
        ].join(" "),

        // Destructive
        destructive: [
          "bg-[var(--red-dim)] text-[var(--red)]",
          "rounded-[var(--radius-sm)]",
          "border border-[rgba(160,3,3,0.3)]",
          "[box-shadow:0_0_10px_rgba(160,3,3,0.15)]",
          "hover:opacity-80",
        ].join(" "),

        // Link
        link: [
          "text-[var(--blue)] underline-offset-4 rounded-sm",
          "hover:underline hover:text-[var(--text-primary)]",
        ].join(" "),

        // Icon-only ghost (no bg, just hover surface)
        icon: [
          "text-[var(--text-tertiary)]",
          "rounded-[var(--radius-sm)]",
          "border-0 bg-transparent",
          "hover:text-[var(--text-primary)] hover:bg-[var(--surface-200)]",
        ].join(" "),

        // Glow — crimson red CTA with glow shadow (alias for pages using old variant)
        glow: [
          "bg-[var(--red)] text-white",
          "rounded-[var(--radius-pill)]",
          "border-0",
          "[box-shadow:0_0_10px_rgba(160,3,3,0.25),_0_0_20px_rgba(160,3,3,0.08),_inset_0_1px_0_rgba(160,3,3,0.2)]",
          "hover:opacity-85 hover:-translate-y-px",
          "active:opacity-95 active:translate-y-0",
        ].join(" "),

        // Secondary — muted surface, rectangular (alias for pages using old variant)
        secondary: [
          "bg-[var(--surface-100)] text-[var(--text-secondary)]",
          "rounded-[var(--radius-sm)]",
          "border border-[var(--border-subtle)]",
          "[box-shadow:var(--shadow-inset)]",
          "hover:text-[var(--text-primary)] hover:border-[var(--border-mid)]",
        ].join(" "),
      },
      size: {
        sm:      "h-9  px-4  text-sm   [&_svg]:size-3.5",
        default: "h-11 px-6  text-sm   [&_svg]:size-4",
        lg:      "h-12 px-8  text-base [&_svg]:size-4",
        xl:      "h-14 px-10 text-base [&_svg]:size-5",
        icon:    "h-10 w-10 text-sm   [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
