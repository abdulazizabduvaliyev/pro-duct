"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { brands, getBrand } from "@/data/brands";
import { categories, getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/components/animations/gsap";
import { EASE, MQ } from "@/components/animations/motion";
import { SplitWords } from "@/components/ui/SplitWords";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "new";

type Filters = {
  category: string;
  brand: string;
  q: string;
  sort: Sort;
  stock: boolean;
};

const SORTS: Array<{ value: Sort; label: string }> = [
  { value: "featured", label: "Tavsiya etilgan" },
  { value: "new", label: "Yangilari" },
  { value: "price-asc", label: "Arzonroq" },
  { value: "price-desc", label: "Qimmatroq" },
];

const DEFAULTS: Filters = { category: "", brand: "", q: "", sort: "featured", stock: false };

function parse(sp: URLSearchParams): Filters {
  const sort = sp.get("sort") as Sort | null;
  return {
    category: sp.get("category") ?? "",
    brand: sp.get("brand") ?? "",
    q: sp.get("q") ?? "",
    sort: SORTS.some((s) => s.value === sort) ? (sort as Sort) : "featured",
    stock: sp.get("stock") === "1",
  };
}

function serialize(f: Filters) {
  const p = new URLSearchParams();
  if (f.category) p.set("category", f.category);
  if (f.brand) p.set("brand", f.brand);
  if (f.q) p.set("q", f.q);
  if (f.sort !== "featured") p.set("sort", f.sort);
  if (f.stock) p.set("stock", "1");
  return p.toString();
}

const chip =
  "shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-300";
const chipOn = "border-fog bg-fog text-ink shadow-sm";
const chipOff = "border-line bg-panel text-fog/80 hover:bg-fog/10 hover:text-fog";

/**
 * Catalogue with category / brand filtering, search, sorting and availability.
 * Filters live in local state and mirror to the URL (shareable links); a change
 * made elsewhere (nav search, category tiles) is picked up through the URL.
 */
export function CatalogView() {
  const sp = useSearchParams();
  const urlKey = sp.toString();

  const [filters, setFilters] = useState<Filters>(() => parse(sp));
  const [seen, setSeen] = useState(urlKey);
  const [written, setWritten] = useState(urlKey);

  // URL changed from outside this component → adopt it (derived-state pattern).
  if (urlKey !== seen) {
    setSeen(urlKey);
    if (urlKey !== written) {
      setFilters(parse(sp));
      setWritten(urlKey);
    }
  }

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    const key = serialize(next);
    setFilters(next);
    setWritten(key);
    window.history.replaceState(null, "", key ? `?${key}` : window.location.pathname);
  };

  const list = useMemo(() => {
    const needle = filters.q.trim().toLowerCase();
    const out = products.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.brand && p.brand !== filters.brand) return false;
      if (filters.stock && p.stock === "out") return false;
      if (needle) {
        const hay = [p.name, p.tagline, getBrand(p.brand)?.name, getCategory(p.category)?.name].join(" ").toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });

    switch (filters.sort) {
      case "price-asc":
        return [...out].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...out].sort((a, b) => b.price - a.price);
      case "new":
        return [...out].sort((a, b) => Number(b.badge === "Yangi") - Number(a.badge === "Yangi"));
      default:
        return [...out].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
  }, [filters]);

  const active =
    !!filters.category || !!filters.brand || !!filters.q || filters.stock || filters.sort !== DEFAULTS.sort;

  const grid = useRef<HTMLUListElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const listKey = list.map((p) => p.slug).join("|");

  // page entrance
  useGSAP(
    () => {
      if (window.matchMedia(MQ.reduce).matches) {
        gsap.set(page.current?.querySelectorAll(".split-word") ?? [], { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        page.current?.querySelectorAll(".split-word") ?? [],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: EASE.cinematic, stagger: 0.08, delay: 0.1, clearProps: "filter" },
      );
      gsap.fromTo(
        page.current?.querySelectorAll("[data-hero]") ?? [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: EASE.out, stagger: 0.1, delay: 0.2, clearProps: "filter" },
      );
    },
    { scope: page },
  );

  // grid entrance whenever the result set changes
  useGSAP(
    () => {
      const items = grid.current?.children;
      if (!items?.length || window.matchMedia(MQ.reduce).matches) return;
      gsap.fromTo(
        items,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: EASE.out, stagger: 0.05, clearProps: "transform,opacity" },
      );
    },
    { dependencies: [listKey], scope: grid },
  );

  return (
    <div ref={page} className="mx-auto max-w-[1440px] px-4 pb-24 pt-20 sm:px-6 sm:pt-24 md:px-10 md:pt-28">
      <div>
        <span data-hero className="glass inline-flex rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-smoke">
          Katalog
        </span>
        <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-end sm:justify-between">
          <SplitWords
            as="h1"
            text="Barcha mahsulotlar."
            className="block text-[clamp(1.9rem,6vw,5rem)] font-semibold leading-none tracking-[-0.04em]"
            wordClassName="text-fade"
          />
          <p data-hero className="text-sm text-smoke" aria-live="polite">
            {list.length} ta mahsulot
          </p>
        </div>
      </div>

      {/* filters */}
      <div data-hero className="glass sticky top-[68px] z-30 mt-6 rounded-[24px] p-2.5 sm:top-[76px] sm:mt-10 sm:rounded-[28px] sm:p-4">
        <div className="flex flex-col gap-2.5 md:flex-row md:items-center">
          <label className="relative block md:w-80">
            <span className="sr-only">Qidirish</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ash" strokeWidth={1.8} />
            <input
              value={filters.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Qidirish…"
              className="h-10 w-full rounded-full border border-line bg-white/5 pl-9 pr-4 text-xs text-fog outline-none transition-colors placeholder:text-ash focus:border-white/30 sm:h-11 sm:pl-10 sm:text-sm"
            />
          </label>

          <div className="no-scrollbar -mx-2.5 flex flex-1 items-center gap-1.5 overflow-x-auto px-2.5 sm:mx-0 sm:gap-2 sm:px-0">
            <button type="button" onClick={() => update({ category: "" })} className={cn(chip, "py-1.5 text-xs sm:py-2 sm:text-[13px]", !filters.category ? chipOn : chipOff)}>
              Barchasi
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => update({ category: filters.category === c.slug ? "" : c.slug })}
                aria-pressed={filters.category === c.slug}
                className={cn(chip, "py-1.5 text-xs sm:py-2 sm:text-[13px]", filters.category === c.slug ? chipOn : chipOff)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2.5 flex flex-col gap-2.5 border-t border-line/60 pt-2.5 sm:mt-3 sm:gap-3 sm:border-line sm:pt-3 md:flex-row md:items-center md:justify-between">
          <div className="no-scrollbar -mx-2.5 flex items-center gap-1.5 overflow-x-auto px-2.5 sm:mx-0 sm:gap-2 sm:px-0">
            <span className="mr-1 flex shrink-0 items-center gap-1.5 text-xs text-ash">
              <SlidersHorizontal className="size-3.5" /> Brend
            </span>
            {brands.map((b) => (
              <button
                key={b.slug}
                type="button"
                onClick={() => update({ brand: filters.brand === b.slug ? "" : b.slug })}
                aria-pressed={filters.brand === b.slug}
                className={cn(chip, "py-1.5 text-xs", filters.brand === b.slug ? chipOn : chipOff)}
              >
                {b.name}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center justify-between gap-2 sm:justify-start">
            <button
              type="button"
              onClick={() => update({ stock: !filters.stock })}
              aria-pressed={filters.stock}
              className={cn(chip, "py-1.5 text-xs", filters.stock ? chipOn : chipOff)}
            >
              Faqat mavjud
            </button>
            <label className="relative">
              <span className="sr-only">Saralash</span>
              <select
                value={filters.sort}
                onChange={(e) => update({ sort: e.target.value as Sort })}
                className="h-8.5 appearance-none rounded-full border border-line bg-white/5 pl-3.5 pr-7 text-xs font-medium text-fog outline-none transition-colors hover:bg-white/10 focus:border-white/30 sm:h-9 sm:pl-4 sm:pr-8"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value} className="bg-panel text-fog">
                    {s.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-ash">▾</span>
            </label>
            {active ? (
              <button
                type="button"
                onClick={() => update({ ...DEFAULTS })}
                className="inline-flex h-8.5 items-center gap-1 rounded-full px-2.5 text-xs text-smoke transition-colors hover:text-fog sm:h-9 sm:px-3"
              >
                <X className="size-3.5" /> Tozalash
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* results */}
      {list.length === 0 ? (
        <div className="mt-20 flex flex-col items-center gap-4 text-center sm:mt-24">
          <p className="text-xl font-semibold tracking-tight sm:text-2xl">Hech narsa topilmadi</p>
          <p className="max-w-sm text-sm text-smoke">Filtrlarni o&apos;zgartirib ko&apos;ring yoki boshqa so&apos;z bilan qidiring.</p>
          <button
            type="button"
            onClick={() => update({ ...DEFAULTS })}
            className="mt-2 inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-medium text-black"
          >
            Filtrlarni tozalash
          </button>
        </div>
      ) : (
        <ul ref={grid} className="mt-6 grid gap-3.5 sm:mt-8 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <li key={p.slug}>
              <ProductCard product={p} priority={i < 4} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
