"use client";

import { useMemo, useState } from "react";
import { ChevronRight, MonitorPlay, ShieldCheck, Truck, Wrench } from "lucide-react";
import { READY_CASES, ReadyCaseCategory } from "@/data/ready-cases";
import { ReadyCaseCard } from "./ReadyCaseCard";
import { useI18n } from "@/lib/i18n";
import { TransitionLink } from "@/components/layout/TransitionLink";

export function PCBuilder() {
  const [selectedCategory, setSelectedCategory] = useState<ReadyCaseCategory>("all");
  const { t } = useI18n();

  const categories: Array<{ id: ReadyCaseCategory; label: string }> = [
    { id: "all", label: t("customPc.categories.all") },
    { id: "ultra", label: t("customPc.categories.ultra") },
    { id: "esport", label: t("customPc.categories.esport") },
    { id: "creator", label: t("customPc.categories.creator") },
    { id: "budget", label: t("customPc.categories.budget") },
  ];

  // Filter cases based on category
  const filteredCases = useMemo(() => {
    if (selectedCategory === "all") return READY_CASES;
    return READY_CASES.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col gap-10">
      {/* ── Breadcrumb Navigation ── */}
      <nav aria-label="Yo'l" className="-mb-4 flex items-center gap-1.5 text-xs text-ash">
        <TransitionLink href="/" className="transition-colors hover:text-fog">
          {t("common.home")}
        </TransitionLink>
        <ChevronRight className="size-3.5" />
        <span className="text-smoke">{t("customPc.breadcrumb")}</span>
      </nav>

      {/* ── Page Heading ── */}
      <div className="flex flex-col items-start gap-3">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-smoke">
          <MonitorPlay className="size-3.5 text-fog" />
          {t("customPc.badge")}
        </span>

        <h1 className="text-3xl font-semibold tracking-[-0.035em] text-fog sm:text-4xl md:text-5xl">
          {t("customPc.title")}
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-smoke md:text-base">
          {t("customPc.subtitle")}
        </p>
      </div>

      {/* ── 1. Category Filter Tabs ── */}
      <div className="flex flex-col gap-4 border-b border-line pb-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-ash">
              {t("customPc.badge")}
            </span>
            <p className="text-xs text-smoke">
              {t("customPc.headerSubtitle")}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 sm:self-auto">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span>{t("customPc.warrantyBadge")}</span>
            <span className="text-emerald-500/60">•</span>
            <span className="text-emerald-400">{t("customPc.testedBadge")}</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 pt-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? READY_CASES.length
                : READY_CASES.filter((c) => c.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "border-fog bg-fog text-ink shadow-md"
                    : "border-line bg-panel text-smoke hover:border-line-strong hover:text-fog"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                    isActive ? "bg-ink/10 font-bold text-ink" : "bg-panel-2 text-ash"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. Case Cards Grid ── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCases.map((c) => (
          <ReadyCaseCard key={c.id} readyCase={c} />
        ))}
      </div>

      {/* ── 3. Guarantee & Service Features Banner ── */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-line/60 pt-8">
        <div className="flex items-start gap-3.5 rounded-2xl border border-line/50 bg-panel/50 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-emerald-400">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-fog">{t("customPc.perks.warranty")}</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-smoke">
              {t({
                uz: "Barcha qismlar yangi, original va rasmiy kafolat bilan taqdim etiladi.",
                ru: "Все компоненты новые, оригинальные и поставляются с официальной гарантией.",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 rounded-2xl border border-line/50 bg-panel/50 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sky-400">
            <Truck className="size-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-fog">{t("customPc.perks.delivery")}</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-smoke">
              {t({
                uz: "Toshkent shahri bo'ylab bepul va O'zbekiston viloyatlariga tezkor yetkazish.",
                ru: "Бесплатная доставка по Ташкенту и быстрая доставка по всем регионам Узбекистана.",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 rounded-2xl border border-line/50 bg-panel/50 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-amber-400">
            <Wrench className="size-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-fog">{t("customPc.perks.setup")}</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-smoke">
              {t({
                uz: "Windows 11 Pro, drayverlar, BIOS yangilanishi va stress-testlar tayyor holatda.",
                ru: "Windows 11 Pro, драйверы, обновление BIOS и стресс-тесты под ключ.",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
