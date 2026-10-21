"use client";

import { useRef, useState } from "react";
import { Check, ChevronRight, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { getBrand } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { getRelated, isBuyable, stockLabel, type Product, type Stock } from "@/data/products";
import { cn } from "@/lib/utils";
import { store } from "@/lib/store";
import { useUI } from "@/lib/ui-state";
import { gsap, useGSAP, withMotion } from "@/components/animations/gsap";
import { EASE } from "@/components/animations/motion";
import { useReveal } from "@/components/animations/useReveal";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Button } from "@/components/ui/Button";
import { OpenConsult } from "@/components/ui/OpenConsult";
import { Price } from "@/components/ui/Price";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "./ProductCard";
import { ProductGallery } from "./ProductGallery";
import { WishlistButton } from "./WishlistButton";

const dot: Record<Stock, string> = {
  in: "bg-emerald-400",
  low: "bg-amber-300",
  preorder: "bg-sky-300",
  out: "bg-ash",
};

const perks = [
  { icon: Truck, label: "Tezkor yetkazib berish" },
  { icon: ShieldCheck, label: "Kafolat" },
  { icon: RotateCcw, label: "Qaytarish imkoniyati" },
] as const;

export function ProductDetail({ product }: { product: Product }) {
  const root = useRef<HTMLDivElement>(null);
  const related = useRef<HTMLElement>(null);
  const { setCartOpen } = useUI();

  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [slide, setSlide] = useState(0);

  const color = product.colors[colorIdx];
  const brand = getBrand(product.brand);
  const category = getCategory(product.category);
  const buyable = isBuyable(product);
  const more = getRelated(product, 4);

  useReveal(related);

  // entrance: gallery rises + settles, info column staggers in
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      return withMotion(el, ({ reduce, k }) => {
        const items = q("[data-hero]");
        if (reduce) {
          gsap.set(items, { opacity: 1 });
          return;
        }
        gsap.fromTo(
          q("[data-hero='stage']"),
          { opacity: 0, scale: 0.94, y: 60 * k, filter: "blur(12px)" },
          { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.6, ease: EASE.cinematic, delay: 0.15, clearProps: "filter" },
        );
        gsap.fromTo(
          q("[data-hero='info']"),
          { opacity: 0, y: 32 * k },
          { opacity: 1, y: 0, duration: 1.1, ease: EASE.out, stagger: 0.08, delay: 0.25 },
        );
        gsap.fromTo(q("[data-hero='crumb']"), { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.1 });
      });
    },
    { scope: root },
  );

  const add = () => {
    store.addToCart(product.slug, { color: color?.name, qty });
    setCartOpen(true);
  };

  return (
    <>
      <div ref={root} className="mx-auto max-w-[1440px] px-5 pb-8 pt-24 md:px-10 md:pt-28">
        <nav data-hero="crumb" aria-label="Yo'l" className="mb-8 flex flex-wrap items-center gap-1.5 text-[13px] text-ash">
          <TransitionLink href="/catalog" className="transition-colors hover:text-white">
            Katalog
          </TransitionLink>
          <ChevronRight className="size-3.5" />
          <TransitionLink href={`/catalog?category=${product.category}`} className="transition-colors hover:text-white">
            {category?.name}
          </TransitionLink>
          <ChevronRight className="size-3.5" />
          <span className="text-smoke">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div data-hero="stage" className="lg:sticky lg:top-28 lg:col-span-7 lg:self-start">
            <ProductGallery product={product} tone={color?.value} index={slide} onIndex={setSlide} />
          </div>

          <div className="flex flex-col gap-7 lg:col-span-5">
            <div data-hero="info">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ash">
                <TransitionLink href={`/catalog?brand=${product.brand}`} className="transition-colors hover:text-white">
                  {brand?.name}
                </TransitionLink>
                {product.badge ? (
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold tracking-wide text-black">
                    {product.badge}
                  </span>
                ) : null}
              </div>
              <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                {product.name}
              </h1>
              <p className="mt-3 text-lg text-smoke">{product.tagline}</p>
            </div>

            <div data-hero="info" className="flex flex-wrap items-center justify-between gap-4">
              <Price price={product.price} oldPrice={product.oldPrice} size="lg" />
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/4 px-3.5 py-1.5 text-xs font-medium text-fog/90">
                <span className={cn("size-1.5 rounded-full", dot[product.stock])} />
                {stockLabel[product.stock]}
              </span>
            </div>

            <p data-hero="info" className="leading-relaxed text-smoke">
              {product.description}
            </p>

            {product.colors.length > 1 ? (
              <div data-hero="info">
                <p className="text-sm text-smoke">
                  Rang: <span className="font-medium text-fog">{color?.name}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-3" role="radiogroup" aria-label="Rang">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      type="button"
                      role="radio"
                      aria-checked={i === colorIdx}
                      aria-label={c.name}
                      onClick={() => setColorIdx(i)}
                      className={cn(
                        "size-10 rounded-full border-2 p-0.5 transition-all duration-300",
                        i === colorIdx ? "border-white" : "border-transparent hover:border-white/40",
                      )}
                    >
                      <span className="block size-full rounded-full ring-1 ring-inset ring-white/20" style={{ background: c.value }} />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div data-hero="info" className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-14 items-center rounded-full border border-line bg-white/4">
                  <button
                    type="button"
                    onClick={() => setQty((n) => Math.max(1, n - 1))}
                    aria-label="Kamaytirish"
                    className="flex size-12 items-center justify-center text-smoke transition-colors hover:text-white"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-8 text-center text-[15px] font-medium tabular-nums">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((n) => Math.min(20, n + 1))}
                    aria-label="Ko'paytirish"
                    className="flex size-12 items-center justify-center text-smoke transition-colors hover:text-white"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>

                <Button
                  size="lg"
                  magnetic
                  onClick={add}
                  disabled={!buyable}
                  wrapperClassName="flex-1"
                  className="w-full"
                  icon={<ShoppingBag className="size-[18px]" />}
                >
                  {buyable ? (product.stock === "preorder" ? "Buyurtma berish" : "Savatga qo'shish") : "Tugagan"}
                </Button>

                <WishlistButton slug={product.slug} name={product.name} className="size-14 shrink-0" />
              </div>

              <OpenConsult variant="secondary" size="lg" subject={`${product.name}${color ? ` (${color.name})` : ""}`} wrapperClassName="w-full" className="w-full">
                Konsultatsiya olish
              </OpenConsult>
            </div>

            <ul data-hero="info" className="grid grid-cols-3 gap-2">
              {perks.map(({ icon: Icon, label }) => (
                <li key={label} className="surface flex flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center text-xs text-smoke">
                  <Icon className="size-5 text-fog" strokeWidth={1.6} />
                  {label}
                </li>
              ))}
            </ul>

            <div data-hero="info">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ash">Asosiy afzalliklar</h2>
              <ul className="flex flex-col gap-2.5">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[15px] text-fog/90">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Check className="size-3" strokeWidth={2.4} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div data-hero="info">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ash">Xususiyatlar</h2>
              <dl className="divide-y divide-line overflow-hidden rounded-3xl border border-line">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex items-start justify-between gap-6 px-5 py-3.5 text-sm">
                    <dt className="text-smoke">{s.label}</dt>
                    <dd className="text-right font-medium text-fog">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <section ref={related} className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeading eyebrow="Tavsiya" title="Sizga yoqishi mumkin." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {more.map((p) => (
            <li key={p.slug} data-reveal>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
