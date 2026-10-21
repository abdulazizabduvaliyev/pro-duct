"use client";

import { useRef, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { useReveal } from "@/components/animations/useReveal";
import { ProductArt } from "@/components/products/ProductArt";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tones: Record<string, string> = {
  macbook: "#c9ccd2",
  iphone: "#b9b2a8",
  ipad: "#d6d8dc",
  watch: "#3a3a3d",
  airpods: "#f0f0f2",
  monitor: "#d6d8dc",
  pc: "#2a2a2e",
  accessories: "#d6d8dc",
};

function onMove(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
  e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
}

export function Categories() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="categories" ref={root} className="relative mx-auto max-w-[1440px] scroll-mt-24 px-4 py-16 sm:px-6 md:px-10 md:py-36">
      <SectionHeading
        eyebrow="Kategoriyalar"
        title="Kerakli qurilmani tez toping."
        description="Noutbukdan aksessuargacha — hammasi tartibli toifalarda."
      />

      <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-3 md:mt-20 md:gap-5 lg:grid-cols-4">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.slug).length;
          const wide = i === 0 || i === 7;
          return (
            <li key={c.slug} data-reveal className={wide ? "lg:col-span-2" : undefined}>
              <TransitionLink
                href={`/catalog?category=${c.slug}`}
                onPointerMove={onMove}
                className="group surface spot relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl p-4 transition-colors duration-500 hover:border-white/20 sm:min-h-[260px] sm:rounded-[28px] sm:p-6 md:min-h-[300px] md:p-7"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight sm:text-xl md:text-2xl">{c.name}</h3>
                    <p className="mt-1 hidden max-w-[16rem] text-sm text-smoke sm:block">{c.tagline}</p>
                  </div>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-smoke transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black sm:size-9">
                    <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:rotate-12 sm:size-4" />
                  </span>
                </div>

                <div className={wide ? "relative mx-auto mt-4 w-[78%] md:w-[52%]" : "relative mx-auto mt-4 w-[88%] md:w-[80%]"}>
                  <div className="transition-transform duration-700 ease-apple group-hover:-translate-y-2 group-hover:scale-[1.06]">
                    <ProductArt kind={c.kind} tone={tones[c.slug]} accent={c.accent} className="h-auto w-full" />
                  </div>
                </div>

                <p className="mt-2 text-xs text-ash">{count} ta mahsulot</p>
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
