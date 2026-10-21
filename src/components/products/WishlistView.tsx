"use client";

import { useRef } from "react";
import { Heart } from "lucide-react";
import { products } from "@/data/products";
import { useHydrated } from "@/lib/hydrated";
import { useWishlist } from "@/lib/store";
import { gsap, useGSAP } from "@/components/animations/gsap";
import { EASE, MQ } from "@/components/animations/motion";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/ui/SplitWords";
import { ProductCard } from "./ProductCard";

export function WishlistView() {
  const hydrated = useHydrated();
  const { ids } = useWishlist();
  const page = useRef<HTMLDivElement>(null);
  const list = ids.flatMap((id) => products.filter((p) => p.slug === id));

  useGSAP(
    () => {
      if (window.matchMedia(MQ.reduce).matches) {
        gsap.set(page.current?.querySelectorAll(".split-word") ?? [], { yPercent: 0 });
        return;
      }
      gsap.fromTo(
        page.current?.querySelectorAll(".split-word") ?? [],
        { yPercent: 118 },
        { yPercent: 0, duration: 1.2, ease: EASE.cinematic, stagger: 0.08, delay: 0.25 },
      );
    },
    { scope: page },
  );

  return (
    <div ref={page} className="mx-auto min-h-[80svh] max-w-[1440px] px-4 pb-24 pt-24 sm:px-6 md:px-10 md:pt-36">
      <SplitWords
        as="h1"
        text="Tanlanganlar."
        className="block text-[clamp(2.1rem,6vw,5rem)] font-semibold leading-none tracking-[-0.045em]"
        wordClassName="text-fade"
      />

      {!hydrated ? null : list.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center sm:mt-20 sm:gap-5">
          <div className="flex size-14 items-center justify-center rounded-full border border-line bg-white/5 sm:size-16">
            <Heart className="size-6 text-smoke sm:size-7" strokeWidth={1.5} />
          </div>
          <p className="text-lg font-medium sm:text-xl">Hozircha hech narsa tanlanmagan</p>
          <p className="max-w-sm text-xs text-smoke sm:text-sm">Mahsulot kartasidagi yurak belgisini bosib, yoqqanlarini shu yerda saqlang.</p>
          <Button href="/catalog">Katalogga o&apos;tish</Button>
        </div>
      ) : (
        <ul className="mt-10 grid gap-3.5 sm:mt-12 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
