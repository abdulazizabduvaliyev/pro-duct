"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { getBrand } from "@/data/brands";
import { isBuyable, stockLabel, type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { store } from "@/lib/store";
import { gsap } from "@/components/animations/gsap";
import { EASE, MQ } from "@/components/animations/motion";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Price } from "@/components/ui/Price";
import { ProductMedia } from "./ProductMedia";
import { WishlistButton } from "./WishlistButton";

type Props = {
  product: Product;
  priority?: boolean;
  className?: string;
};

/**
 * Premium product card. Hover (fine pointers only): card lifts, the render
 * scales and tilts towards the cursor, a soft glow + shadow fades in.
 */
export function ProductCard({ product, priority, className }: Props) {
  const root = useRef<HTMLElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const buyable = isBuyable(product);
  const brand = getBrand(product.brand);

  useEffect(() => {
    const el = root.current;
    const artEl = art.current;
    const glowEl = glow.current;
    if (!el || !artEl || !glowEl) return;
    if (!window.matchMedia(MQ.fine).matches || window.matchMedia(MQ.reduce).matches) return;

    const rx = gsap.quickTo(artEl, "rotationX", { duration: 0.7, ease: "power3.out" });
    const ry = gsap.quickTo(artEl, "rotationY", { duration: 0.7, ease: "power3.out" });

    const enter = () => {
      gsap.to(el, { y: -8, duration: 0.6, ease: EASE.out });
      gsap.to(artEl, { scale: 1.07, duration: 0.9, ease: EASE.out });
      gsap.to(glowEl, { opacity: 1, duration: 0.5 });
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      ry((px - 0.5) * 10);
      rx(-(py - 0.5) * 7);
    };
    const leave = () => {
      gsap.to(el, { y: 0, duration: 0.7, ease: EASE.out });
      gsap.to(artEl, { scale: 1, duration: 0.8, ease: EASE.out });
      gsap.to(glowEl, { opacity: 0, duration: 0.5 });
      rx(0);
      ry(0);
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf([el, artEl, glowEl]);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const quickAdd = () => {
    store.addToCart(product.slug, { color: product.colors[0]?.name });
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article
      ref={root}
      className={cn("group/card surface spot relative flex h-full flex-col overflow-hidden rounded-[28px]", className)}
    >
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95),inset_0_0_0_1px_rgb(255_255_255/0.14)]"
      />

      <TransitionLink href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0 z-10 rounded-[inherit]" />

      <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex items-start justify-between">
        <div className="flex flex-wrap gap-1.5">
          {product.badge ? (
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold tracking-wide text-black">
              {product.badge}
            </span>
          ) : null}
          {product.stock === "low" ? (
            <span className="rounded-full border border-line bg-black/40 px-2.5 py-1 text-[11px] font-medium text-smoke backdrop-blur-md">
              {stockLabel.low}
            </span>
          ) : null}
        </div>
        <div className="pointer-events-auto">
          <WishlistButton slug={product.slug} name={product.name} size="sm" />
        </div>
      </div>

      <div className="relative aspect-[5/4] px-6 pt-12 [perspective:900px]">
        <div ref={art} className="relative h-full w-full will-change-transform [transform-style:preserve-3d]">
          <ProductMedia product={product} priority={priority} />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-3 px-6 pb-6 pt-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ash">{brand?.name}</p>
          <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-fog">{product.name}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-smoke">{product.tagline}</p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <Price price={product.price} oldPrice={product.oldPrice} />
        </div>

        <button
          type="button"
          onClick={quickAdd}
          disabled={!buyable}
          className={cn(
            "relative z-20 mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 ease-apple",
            "disabled:cursor-not-allowed disabled:border disabled:border-line disabled:bg-transparent disabled:text-ash",
            added ? "bg-white text-black" : "bg-white/10 text-fog hover:bg-white hover:text-black",
            "md:translate-y-1 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100",
            !buyable && "md:opacity-100",
          )}
        >
          {!buyable ? (
            stockLabel.out
          ) : added ? (
            <>
              <Check className="size-4" /> Savatga qo&apos;shildi
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" /> {product.stock === "preorder" ? "Buyurtma berish" : "Savatga"}
            </>
          )}
        </button>
      </div>
    </article>
  );
}
