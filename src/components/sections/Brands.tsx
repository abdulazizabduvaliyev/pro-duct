"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { useReveal } from "@/components/animations/useReveal";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Brands() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="brands" ref={root} className="relative mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        align="center"
        eyebrow="Brendlar"
        title="Ishonchli brendlar. Bir joyda."
        description="Apple va dunyoning yetakchi texnologiya brendlari mahsulotlari."
      />

      <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-20 md:gap-4 lg:grid-cols-4">
        {brands.map((b, i) => {
          const count = products.filter((p) => p.brand === b.slug).length;
          return (
            <li key={b.slug} data-reveal className={cn(i === 0 && "col-span-2")}>
              <TransitionLink
                href={`/catalog?brand=${b.slug}`}
                className={cn(
                  "group relative flex h-28 flex-col items-center justify-center overflow-hidden rounded-[28px] border border-line text-ash transition-all duration-500 ease-apple hover:border-white/25 hover:bg-white/5 hover:text-white md:h-40",
                  i === 0 && "text-fog",
                )}
              >
                <div className="flex items-center gap-3">
                  <BrandLogo
                    brand={b.slug}
                    className={cn(
                      "shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:text-white",
                      i === 0 ? "size-7 text-smoke md:size-9" : "size-5 text-ash md:size-6",
                    )}
                  />
                  <span className={cn("font-semibold tracking-[-0.04em]", i === 0 ? "text-3xl md:text-5xl" : "text-xl md:text-2xl")}>
                    {b.name}
                  </span>
                </div>
                <span className="mt-2 text-xs text-ash transition-colors duration-500 group-hover:text-smoke">
                  {count} ta mahsulot
                </span>
              </TransitionLink>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 flex justify-center">
        <TransitionLink
          href="/brands"
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-6 py-3 text-xs font-medium text-fog transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <span>Barcha rasmiy hamkor brendlar bilan tanishish</span>
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </TransitionLink>
      </div>
    </section>
  );
}
