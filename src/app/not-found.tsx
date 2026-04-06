import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FlaskConical, ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="relative inline-flex mb-8">
          <div className="w-24 h-24 rounded-2xl bg-crimson-700/10 flex items-center justify-center">
            <FlaskConical className="w-12 h-12 text-crimson-500" />
          </div>
          <span className="absolute -top-2 -right-2 text-5xl font-bold text-foreground-subtle/20">
            ?
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground mb-3">
          4<span className="gradient-text">0</span>4
        </h1>
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Compound Not Found
        </h2>
        <p className="text-foreground-muted mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          It might have been removed from our catalog or the URL may be
          incorrect.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="glow" asChild>
            <Link href="/" className="gap-1.5">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/products" className="gap-1.5">
              <Search className="w-4 h-4" />
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
