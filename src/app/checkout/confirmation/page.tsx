"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Package,
  ArrowRight,
  Mail,
  Truck,
  ShieldCheck,
  FileText,
} from "lucide-react";

export default function ConfirmationPage() {
  const orderNumber = `PR-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Success icon */}
        <div className="relative inline-flex mb-8">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center animate-scale-in">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3 animate-fade-in-up">
          Order Confirmed!
        </h1>
        <p className="text-foreground-muted mb-2 animate-fade-in-up">
          Thank you for your order. Your research compounds are on their way.
        </p>
        <p className="text-sm text-foreground-subtle mb-10 animate-fade-in-up">
          Order number:{" "}
          <span className="font-mono font-semibold text-foreground">
            {orderNumber}
          </span>
        </p>

        {/* What happens next */}
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] backdrop-blur-sm p-6 sm:p-8 mb-8 text-left animate-fade-in-up">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            What happens next?
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-crimson-700/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-crimson-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-0.5">
                  Order Confirmation Email
                </h3>
                <p className="text-sm text-foreground-muted">
                  You&apos;ll receive a confirmation email with your order
                  details and tracking information once shipped.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-crimson-700/10 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 text-crimson-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-0.5">
                  Order Processing
                </h3>
                <p className="text-sm text-foreground-muted">
                  Our team will pick, verify, and carefully package your
                  order within 1 business day.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-crimson-700/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-crimson-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-0.5">
                  COA Included
                </h3>
                <p className="text-sm text-foreground-muted">
                  Every product ships with its Certificate of Authenticity
                  confirming third-party purity testing results.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-crimson-700/10 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-crimson-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-0.5">
                  Shipping & Delivery
                </h3>
                <p className="text-sm text-foreground-muted">
                  Your order will be shipped in discreet packaging. Track
                  your delivery using the link in your confirmation email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="flex items-center justify-center gap-6 mb-10 animate-fade-in-up">
          <span className="flex items-center gap-1.5 text-xs text-foreground-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Secure Transaction
          </span>
          <span className="flex items-center gap-1.5 text-xs text-foreground-subtle">
            <Package className="w-3.5 h-3.5 text-blue-400" />
            Discreet Shipping
          </span>
          <span className="flex items-center gap-1.5 text-xs text-foreground-subtle">
            <FileText className="w-3.5 h-3.5 text-crimson-500" />
            COA Verified
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up">
          <Button variant="glow" asChild>
            <Link href="/products" className="gap-1.5">
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        {/* Research disclaimer */}
        <p className="text-[11px] text-foreground-subtle mt-12 max-w-md mx-auto leading-relaxed">
          All products are sold strictly for research, educational, and
          scientific purposes only. Not for human consumption. Must be 18+ to
          purchase. By completing this purchase, you agree to our Terms of
          Service and Research Use Policy.
        </p>
      </div>
    </div>
  );
}
