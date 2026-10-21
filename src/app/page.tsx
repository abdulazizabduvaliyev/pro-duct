import { Categories } from "@/components/categories/Categories";
import { Hero } from "@/components/hero/Hero";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { ProductShowcase } from "@/components/products/ProductShowcase";
import { Benefits } from "@/components/sections/Benefits";
import { Brands } from "@/components/sections/Brands";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Benefits />
      <FeaturedProducts />
      <ProductShowcase />
      <Brands />
      <CtaSection />
    </>
  );
}
