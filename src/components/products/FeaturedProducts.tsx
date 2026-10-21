"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useReveal } from "@/components/animations/useReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "./ProductCard";

const featured = products.filter((p) => p.featured).slice(0, 8);

export function FeaturedProducts() {
  const root = useRef<HTMLElement>(null);
  useReveal(root, { y: 80 });

  return (
    <section id="featured" ref={root} className="relative mx-auto max-w-[1440px] scroll-mt-24 px-4 py-16 sm:px-6 md:px-10 md:py-36">
      <SectionHeading
        eyebrow="Tanlangan mahsulotlar"
        title="Eng ko'p tanlanganlar."
        description="Mijozlarimiz eng ko'p tanlaydigan premium qurilmalar."
        action={
          <Button href="/catalog" variant="secondary" icon={<ArrowRight className="size-4" />}>
            Barchasini ko&apos;rish
          </Button>
        }
      />

      <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:gap-4 sm:px-6 md:mx-0 md:mt-20 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
        {featured.map((p, i) => (
          <li key={p.slug} data-reveal className="w-[74%] shrink-0 snap-center sm:w-[50%] md:w-auto">
            <ProductCard product={p} priority={i < 2} />
          </li>
        ))}
      </ul>
    </section>
  );
}
