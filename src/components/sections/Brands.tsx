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
import { useI18n } from "@/lib/i18n";

export function Brands() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const { t } = useI18n();

  return (
    <section id="brands" ref={root} className="relative mx-auto max-w-[1440px] scroll-mt-24 px-4 py-16 sm:px-6 md:px-10 md:py-36">
      <SectionHeading
        align="center"
        eyebrow={t({ uz: "Brendlar", ru: "Бренды" })}
        title={t({ uz: "Ishonchli brendlar. Bir joyda.", ru: "Надежные бренды. В одном месте." })}
        description={t({
          uz: "Apple va dunyoning yetakchi texnologiya brendlari mahsulotlari.",
          ru: "Продукция Apple и ведущих мировых технологических брендов.",
        })}
      />

      <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:mt-20 md:gap-4 lg:grid-cols-4">
        {brands.map((b, i) => {
          const count = products.filter((p) => p.brand === b.slug).length;
          return (
            <li key={b.slug} data-reveal className={cn(i === 0 && "col-span-2")}>
              <TransitionLink
                href={`/catalog?brand=${b.slug}`}
                className={cn(
                  "group relative flex h-24 flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-panel/50 text-fog transition-all duration-300 ease-apple hover:border-line-strong hover:bg-panel sm:h-28 sm:rounded-[28px] md:h-40",
                  i === 0 && "bg-panel/75",
                )}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <BrandLogo
                    brand={b.slug}
                    className={cn(
                      "shrink-0 transition-all duration-300 group-hover:scale-110",
                      i === 0 ? "size-6 text-fog sm:size-7 md:size-9" : "size-5 text-smoke group-hover:text-fog sm:size-6 md:size-7",
                    )}
                  />
                  <span className={cn("font-semibold tracking-[-0.04em] text-fog", i === 0 ? "text-2xl sm:text-3xl md:text-5xl" : "text-base sm:text-xl md:text-2xl")}>
                    {b.name}
                  </span>
                </div>
                <span className="mt-1.5 text-[11px] text-smoke transition-colors duration-300 group-hover:text-fog sm:mt-2 sm:text-xs">
                  {count} {t({ uz: "ta mahsulot", ru: "товаров" })}
                </span>
              </TransitionLink>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex justify-center sm:mt-12">
        <TransitionLink
          href="/brands"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-line bg-panel-2 px-5 py-2.5 text-center text-xs font-medium text-fog transition-all hover:border-line-strong hover:bg-fog/10 hover:text-fog sm:px-6 sm:py-3"
        >
          <span>{t({ uz: "Barcha rasmiy brendlar bilan tanishish", ru: "Посмотреть все официальные бренды" })}</span>
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </TransitionLink>
      </div>
    </section>
  );
}
