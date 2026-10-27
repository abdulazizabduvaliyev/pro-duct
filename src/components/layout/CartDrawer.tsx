"use client";

import { useRef } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { store, useCart } from "@/lib/store";
import { useUI } from "@/lib/ui-state";
import { useI18n } from "@/lib/i18n";
import { useOverlay } from "@/components/animations/useOverlay";
import { ProductMedia } from "@/components/products/ProductMedia";
import { TransitionLink } from "./TransitionLink";

/** Slide-in cart. "Buyurtma berish" hands off to the order form (no online payment yet). */
export function CartDrawer() {
  const { cartOpen, setCartOpen, openConsult } = useUI();
  const { lines, count, total } = useCart();
  const { t } = useI18n();

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
      aria-label={t("cart.title")}
    >
      <div ref={backdrop} onClick={close} className="absolute inset-0 bg-black/60 opacity-0 backdrop-blur-sm" />

      <aside
        ref={panel}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col border-l border-white/10 bg-panel outline-none"
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">{t("cart.title")}</h2>
            <p className="text-xs text-ash sm:text-sm">{count > 0 ? `${count} ta mahsulot` : t("cart.emptyTitle")}</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Savatni yopish"
            className="flex size-9 items-center justify-center rounded-full text-smoke transition-colors hover:bg-fog/10 hover:text-fog sm:size-10"
          >
            <X className="size-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center sm:gap-5 sm:px-8">
            <div className="flex size-14 items-center justify-center rounded-full border border-line bg-white/5 sm:size-16">
              <ShoppingBag className="size-6 text-smoke sm:size-7" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-base font-medium sm:text-lg">{t("cart.emptyTitle")}</p>
              <p className="mt-1 text-xs text-smoke sm:text-sm">{t("cart.emptyDesc")}</p>
            </div>
            <TransitionLink
              href="/catalog"
              className="inline-flex h-10 items-center rounded-full bg-white px-5 text-xs font-medium text-black sm:h-11 sm:px-6 sm:text-sm"
            >
              {t("nav.catalog")}
            </TransitionLink>
          </div>
        ) : (
          <>
            <ul data-lenis-prevent className="flex-1 divide-y divide-line overflow-y-auto px-4 sm:px-6">
              {lines.map((line) => {
                const swatch = line.product.colors.find((c) => c.name === line.color)?.value;
                return (
                  <li key={line.key} className="flex gap-3 py-4 sm:gap-4 sm:py-5">
                    <TransitionLink
                      href={`/product/${line.product.slug}`}
                      className="surface relative block size-20 shrink-0 overflow-hidden rounded-xl p-1.5 sm:size-24 sm:rounded-2xl sm:p-2"
                    >
                      <div className="relative size-full">
                        <ProductMedia product={line.product} tone={swatch} sizes="96px" />
                      </div>
                    </TransitionLink>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2 sm:gap-3">
                        <div className="min-w-0">
                          <TransitionLink
                            href={`/product/${line.product.slug}`}
                            className="block truncate text-sm font-medium text-fog hover:text-fog/70 sm:text-[15px]"
                          >
                            {line.product.name}
                          </TransitionLink>
                          {line.color ? <p className="mt-0.5 text-xs text-ash">{line.color}</p> : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => store.removeLine(line.key)}
                          aria-label={`${line.product.name} — savatdan olib tashlash`}
                          className="text-ash transition-colors hover:text-rose-400"
                        >
                          <Trash2 className="size-4" strokeWidth={1.7} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3">
                        <div className="flex items-center rounded-full border border-line">
                          <button
                            type="button"
                            onClick={() => store.setQty(line.key, line.qty - 1)}
                            aria-label="Kamaytirish"
                            className="flex size-7 items-center justify-center text-smoke hover:text-fog sm:size-8"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-5 text-center text-xs tabular-nums sm:min-w-6 sm:text-sm">{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => store.setQty(line.key, line.qty + 1)}
                            aria-label="Ko'paytirish"
                            className="flex size-7 items-center justify-center text-smoke hover:text-fog sm:size-8"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold tabular-nums sm:text-[15px]">
                          {formatPrice(line.product.price * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="border-t border-line bg-panel px-4 pb-6 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-smoke sm:text-sm">{t("cart.total")}</span>
                <span className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">{formatPrice(total)}</span>
              </div>
              <p className="mt-1 text-[11px] text-ash sm:text-xs">
                {t({
                  uz: "Yetkazib berish va to'lov shartlari buyurtma vaqtida kelishiladi.",
                  ru: "Условия доставки и оплаты согласовываются при оформлении заказа.",
                })}
              </p>
              <button
                type="button"
                onClick={() =>
                  openConsult({
                    mode: "order",
                    subject: lines.map((l) => `${l.product.name} × ${l.qty}`).join(", "),
                  })
                }
                className="mt-3.5 inline-flex h-11 w-full items-center justify-center rounded-full bg-white text-sm font-medium text-black transition-colors hover:bg-white/90 sm:mt-4 sm:h-12"
              >
                {t("cart.checkout")}
              </button>
              <button
                type="button"
                onClick={() => store.clearCart()}
                className="mt-2 w-full py-1.5 text-xs text-ash transition-colors hover:text-fog sm:py-2"
              >
                {t("cart.clear")}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
