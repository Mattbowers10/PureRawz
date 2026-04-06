import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  FlaskConical,
  Target,
  Users,
  ShieldCheck,
  Microscope,
  Globe,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about PureRawz — our mission, our commitment to quality, and why researchers trust us for premium research compounds.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Quality",
    description:
      "Every product undergoes rigorous third-party testing. We never compromise on purity or documentation standards.",
  },
  {
    icon: Microscope,
    title: "Science-First Approach",
    description:
      "Our catalog is curated by researchers, for researchers. We prioritize compounds with strong research backing.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We listen to our research community. Product development and improvements are guided by real researcher feedback.",
  },
  {
    icon: Globe,
    title: "Industry Leadership",
    description:
      "Setting new standards for transparency and compliance in the research chemical industry.",
  },
];

const stats = [
  { value: "50,000+", label: "Orders Fulfilled" },
  { value: "100+", label: "Research Compounds" },
  { value: "99%+", label: "Purity Standard" },
  { value: "24/7", label: "Customer Support" },
];

export default function AboutPage() {
  return (
    <div className="pt-32 lg:pt-40">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-crimson-500 uppercase tracking-wider mb-3">
            About PureRawz
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Raising the Standard for{" "}
            <span className="gradient-text">Research Compounds</span>
          </h1>
          <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
            PureRawz was founded with a single mission: to provide the research community
            with the highest quality compounds, backed by full transparency and rigorous
            third-party verification.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-foreground-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-crimson-700/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-crimson-500" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <div className="space-y-4 text-foreground-muted leading-relaxed">
              <p>
                The research chemical industry has long suffered from a lack of standardization
                and transparency. PureRawz exists to change that.
              </p>
              <p>
                We believe researchers deserve to know exactly what they&apos;re working with.
                That&apos;s why every compound in our catalog comes with a Certificate of
                Authenticity featuring detailed third-party lab analysis — including HPLC
                purity testing and mass spectrometry verification.
              </p>
              <p>
                From sourcing to shipping, every step of our process is designed to ensure
                you receive the highest quality compounds for your research.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-crimson-950/30 to-[var(--background-secondary)] border border-[var(--glass-border)] p-10 flex items-center justify-center min-h-[400px]">
            <FlaskConical className="w-32 h-32 text-crimson-700/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-secondary)] via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 text-center text-sm text-foreground-subtle italic">
              Product imagery coming soon
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-crimson-500 uppercase tracking-wider mb-3">
            Our Values
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            What Drives Us
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 stagger-children">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] backdrop-blur-sm hover:border-[var(--glass-border-hover)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-crimson-700/10 flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-crimson-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center p-12 rounded-3xl bg-[var(--surface)] border border-[var(--glass-border)]">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
            Browse our full catalog of research compounds or reach out to our team
            with any questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="glow" size="lg" className="group">
              <span>Shop Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="secondary" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
