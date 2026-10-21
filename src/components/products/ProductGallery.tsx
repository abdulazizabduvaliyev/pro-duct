"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/components/animations/gsap";
import { EASE, MQ } from "@/components/animations/motion";
import type { ArtView } from "./ProductArt";
import { ProductMedia } from "./ProductMedia";

const ART_VIEWS: ArtView[] = ["front", "angle", "detail"];

type Props = {
  product: Product;
  tone?: string;
  index: number;
  onIndex: (i: number) => void;
};

/**
 * Premium gallery: large stage with pointer-driven depth, thumbnails and
 * arrows. Shows real renders when `product.images` exists, otherwise three
 * views (front / angle / detail) of the built-in illustration.
 */
export function ProductGallery({ product, tone, index, onIndex }: Props) {
  const count = product.images?.length || ART_VIEWS.length;
  const stage = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  const go = (i: number) => onIndex((i + count) % count);

  // slide-in on change
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (!inner.current || window.matchMedia(MQ.reduce).matches) return;
      gsap.fromTo(
        inner.current,
        { opacity: 0, scale: 0.94, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: EASE.out },
      );
    },
    { dependencies: [index], scope: stage },
  );

  // pointer depth
  useEffect(() => {
    const el = stage.current;
    const art = inner.current;
    if (!el || !art) return;
    if (!window.matchMedia(MQ.fine).matches || window.matchMedia(MQ.reduce).matches) return;

    const rx = gsap.quickTo(art, "rotationX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(art, "rotationY", { duration: 0.8, ease: "power3.out" });
    const px = gsap.quickTo(art, "x", { duration: 0.8, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      ry(nx * 10);
      rx(-ny * 8);
      px(nx * 14);
    };
    const leave = () => {
      rx(0);
      ry(0);
      px(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const view = ART_VIEWS[index] ?? "front";

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div
        ref={stage}
        className="surface relative aspect-[4/3] overflow-hidden rounded-[24px] [perspective:1100px] sm:rounded-[36px]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.1),transparent)]"
        />
        <div ref={inner} className="relative h-full w-full p-6 will-change-transform [transform-style:preserve-3d] sm:p-8 md:p-12">
          <div className="relative h-full w-full">
            <ProductMedia
              product={product}
              tone={tone}
              view={view}
              imageIndex={index}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Oldingi rasm"
              className="glass absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-fog transition-colors hover:bg-white/15 sm:left-4 sm:size-11"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Keyingi rasm"
              className="glass absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-fog transition-colors hover:bg-white/15 sm:right-4 sm:size-11"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onIndex(i)}
              aria-label={`${i + 1}-rasm`}
              aria-current={i === index}
              className={cn(
                "surface relative aspect-[4/3] overflow-hidden rounded-2xl p-2 transition-all duration-300",
                i === index ? "border-white/60 opacity-100" : "opacity-55 hover:opacity-100",
              )}
            >
              <div className="relative h-full w-full">
                <ProductMedia product={product} tone={tone} view={ART_VIEWS[i] ?? "front"} imageIndex={i} sizes="120px" />
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
