import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { Categories } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ScienceSection } from "@/components/home/science-section";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Categories />
      <FeaturedProducts />
      <ScienceSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
