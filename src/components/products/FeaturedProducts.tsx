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
    <section id="featured" ref={root} className="relative mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36">
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

      <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:mt-20 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
        {featured.map((p, i) => (
          <li key={p.slug} data-reveal className="w-[78%] shrink-0 snap-center sm:w-[56%] md:w-auto">
            <ProductCard product={p} priority={i < 2} />
          </li>
        ))}
      </ul>
    </section>
  );
}
