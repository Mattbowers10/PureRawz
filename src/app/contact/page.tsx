import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the PureRawz team. We're here to help with orders, product questions, and research support.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Our team typically responds within 24 hours.",
    detail: "support@purerawz.co",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team in real time.",
    detail: "Available during business hours",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "Monday through Friday",
    detail: "9:00 AM — 6:00 PM EST",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Based in the United States",
    detail: "Shipping nationwide & internationally",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-crimson-500 uppercase tracking-wider mb-3">
            Contact Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            We&apos;re Here to{" "}
            <span className="gradient-text">Help</span>
          </h1>
          <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
            Have a question about an order, a product, or need research support?
            Our team is ready to assist.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6">Send Us a Message</h2>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input placeholder="How can we help?" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className="flex w-full rounded-xl bg-[var(--surface)] px-4 py-3 text-sm text-foreground border border-[var(--glass-border)] backdrop-blur-sm placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-crimson-700/50 focus:border-crimson-700/50 transition-all duration-200 resize-none"
                  />
                </div>

                <Button variant="glow" size="lg" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact methods */}
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--glass-border)] backdrop-blur-sm hover:border-[var(--glass-border-hover)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-crimson-700/10 flex items-center justify-center shrink-0">
                    <method.icon className="w-5 h-5 text-crimson-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{method.title}</h3>
                    <p className="text-xs text-foreground-muted mt-0.5">{method.description}</p>
                    <p className="text-sm text-foreground mt-2 font-medium">{method.detail}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* FAQ prompt */}
            <div className="p-5 rounded-2xl bg-crimson-700/5 border border-crimson-700/10">
              <h3 className="text-sm font-semibold text-foreground mb-2">Common Questions?</h3>
              <p className="text-xs text-foreground-muted mb-3">
                Check our FAQ section for quick answers to common questions about orders,
                shipping, and products.
              </p>
              <Button variant="outline" size="sm">
                View FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
