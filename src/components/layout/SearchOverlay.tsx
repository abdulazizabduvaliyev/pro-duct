"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { categories, getCategory } from "@/data/categories";
import { getBrand } from "@/data/brands";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useUI } from "@/lib/ui-state";
import { useI18n } from "@/lib/i18n";
import { useOverlay } from "@/components/animations/useOverlay";
import { ProductMedia } from "@/components/products/ProductMedia";
import { TransitionLink } from "./TransitionLink";

function matches(q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  return products
    .filter((p) =>
      [p.name, p.tagline, getBrand(p.brand)?.name ?? "", getCategory(p.category)?.name ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    )
    .slice(0, 6);
}

/** Full-screen search. Open with the nav icon, "/" or ⌘/Ctrl + K. */
export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const results = useMemo(() => matches(query), [query]);

  const root = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const close = () => {
    setSearchOpen(false);
    setQuery("");
  };
  useOverlay({ open: searchOpen, onClose: close, root, backdrop, panel, from: "top", focusRef: input });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  return (
    <div ref={root} inert={!searchOpen} className="fixed inset-0 z-[95] hidden" role="dialog" aria-modal="true" aria-label="Qidirish">
      <div ref={backdrop} onClick={close} className="absolute inset-0 bg-ink/85 opacity-0 backdrop-blur-2xl" />

      <div ref={panel} tabIndex={-1} className="relative mx-auto flex max-h-full w-full max-w-3xl flex-col px-4 pt-[6vh] outline-none sm:px-6 sm:pt-[10vh] md:pt-[12vh]">
        <div className="glass flex items-center gap-2.5 rounded-full px-4 py-1 sm:gap-3 sm:px-5 sm:py-1.5">
          <Search className="size-4.5 shrink-0 text-smoke sm:size-5" strokeWidth={1.8} />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            aria-label={t("nav.search")}
            className="h-11 w-full bg-transparent text-sm text-fog outline-none placeholder:text-ash sm:h-12 sm:text-base md:text-lg"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Yopish"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-smoke transition-colors hover:bg-fog/10 hover:text-fog sm:size-9"
          >
            <X className="size-4.5 sm:size-5" />
          </button>
        </div>

        <div data-lenis-prevent className="mt-3.5 min-h-0 flex-1 overflow-y-auto pb-8 sm:mt-4 sm:pb-10">
          {query.trim() === "" ? (
            <div className="px-2 pt-3 sm:pt-4">
              <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.14em] text-ash sm:mb-3">
                {t("nav.catalog")}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map((c) => (
                  <TransitionLink
                    key={c.slug}
                    href={`/catalog?category=${c.slug}`}
                    className="rounded-full border border-line bg-white/4 px-3.5 py-1.5 text-xs text-fog/90 transition-colors hover:bg-white/10 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {c.name}
                  </TransitionLink>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="px-3 pt-8 text-center text-xs text-smoke sm:text-sm">
              «{query}» — {t("search.noResults")}.
            </p>
          ) : (
            <ul className="glass overflow-hidden rounded-2xl sm:rounded-3xl">
              {results.map((p) => (
                <li key={p.slug} className="border-b border-line last:border-b-0">
                  <TransitionLink
                    href={`/product/${p.slug}`}
                    className="group flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-white/6 sm:gap-4 sm:px-4 sm:py-3"
                  >
                    <div className="relative size-12 shrink-0 sm:size-16">
                      <ProductMedia product={p} sizes="64px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-fog sm:text-base">{p.name}</p>
                      <p className="truncate text-xs text-ash sm:text-sm">
                        {getBrand(p.brand)?.name} · {getCategory(p.category)?.name}
                      </p>
                    </div>
                    <span className="hidden text-xs text-smoke sm:block sm:text-sm">{formatPrice(p.price)}</span>
                    <ArrowUpRight className="size-3.5 text-ash transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-4" />
                  </TransitionLink>
                </li>
              ))}
              <li>
                <TransitionLink
                  href={`/catalog?q=${encodeURIComponent(query.trim())}`}
                  className="flex items-center justify-center px-4 py-3.5 text-xs text-smoke transition-colors hover:text-fog sm:py-4 sm:text-sm"
                >
                  Katalogda barcha natijalarni ko&apos;rish
                </TransitionLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
