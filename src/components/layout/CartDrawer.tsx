"use client";

import { useRef } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { store, useCart } from "@/lib/store";
import { useUI } from "@/lib/ui-state";
import { useOverlay } from "@/components/animations/useOverlay";
import { ProductMedia } from "@/components/products/ProductMedia";
import { TransitionLink } from "./TransitionLink";

/** Slide-in cart. "Buyurtma berish" hands off to the order form (no online payment yet). */
export function CartDrawer() {
  const { cartOpen, setCartOpen, openConsult } = useUI();
  const { lines, count, total } = useCart();

  const root = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);

  const close = () => setCartOpen(false);
  useOverlay({ open: cartOpen, onClose: close, root, backdrop, panel, from: "right" });

  return (
    <div
      ref={root}
      inert={!cartOpen}
      className="fixed inset-0 z-[90] hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Savat"
    >
      <div ref={backdrop} onClick={close} className="absolute inset-0 bg-black/60 opacity-0 backdrop-blur-sm" />

      <aside
        ref={panel}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col border-l border-white/10 bg-panel outline-none"
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Savat</h2>
            <p className="text-sm text-ash">{count > 0 ? `${count} ta mahsulot` : "Hozircha bo'sh"}</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Savatni yopish"
            className="flex size-10 items-center justify-center rounded-full text-smoke transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full border border-line bg-white/5">
              <ShoppingBag className="size-7 text-smoke" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-lg font-medium">Savat bo&apos;sh</p>
              <p className="mt-1 text-sm text-smoke">Katalogdan o&apos;zingizga mos qurilmani tanlang.</p>
            </div>
            <TransitionLink
              href="/catalog"
              className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-medium text-black"
            >
              Katalogga o&apos;tish
            </TransitionLink>
          </div>
        ) : (
          <>
            <ul data-lenis-prevent className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((line) => {
                const swatch = line.product.colors.find((c) => c.name === line.color)?.value;
                return (
                  <li key={line.key} className="flex gap-4 py-5">
                    <TransitionLink
                      href={`/product/${line.product.slug}`}
                      className="surface relative block size-24 shrink-0 overflow-hidden rounded-2xl p-2"
                    >
                      <div className="relative size-full">
                        <ProductMedia product={line.product} tone={swatch} sizes="96px" />
                      </div>
                    </TransitionLink>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <TransitionLink
                            href={`/product/${line.product.slug}`}
                            className="block truncate text-[15px] font-medium text-fog hover:text-white"
                          >
                            {line.product.name}
                          </TransitionLink>
                          {line.color ? <p className="mt-0.5 text-xs text-ash">{line.color}</p> : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => store.removeLine(line.key)}
                          aria-label={`${line.product.name} — savatdan olib tashlash`}
                          className="text-ash transition-colors hover:text-white"
                        >
                          <Trash2 className="size-4" strokeWidth={1.7} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full border border-line">
                          <button
                            type="button"
                            onClick={() => store.setQty(line.key, line.qty - 1)}
                            aria-label="Kamaytirish"
                            className="flex size-8 items-center justify-center text-smoke hover:text-white"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-6 text-center text-sm tabular-nums">{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => store.setQty(line.key, line.qty + 1)}
                            aria-label="Ko'paytirish"
                            className="flex size-8 items-center justify-center text-smoke hover:text-white"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-[15px] font-semibold tabular-nums">
                          {formatPrice(line.product.price * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="border-t border-line bg-panel px-6 pb-6 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-smoke">Jami</span>
                <span className="text-2xl font-semibold tracking-tight tabular-nums">{formatPrice(total)}</span>
              </div>
              <p className="mt-1 text-xs text-ash">Yetkazib berish va to&apos;lov shartlari buyurtma vaqtida kelishiladi.</p>
              <button
                type="button"
                onClick={() =>
                  openConsult({
                    mode: "order",
                    subject: lines.map((l) => `${l.product.name} × ${l.qty}`).join(", "),
                  })
                }
                className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Buyurtma berish
              </button>
              <button
                type="button"
                onClick={() => store.clearCart()}
                className="mt-2 w-full py-2 text-xs text-ash transition-colors hover:text-fog"
              >
                Savatni tozalash
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
