"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Check,
  ChevronRight,
  Cpu,
  Flame,
  HardDrive,
  Layers,
  MonitorPlay,
  RotateCcw,
  Send,
  ShieldCheck,
  Truck,
  Zap,
  Copy,
} from "lucide-react";
import { ReadyCase, getReadyCaseParts, getRelatedCases } from "@/data/ready-cases";
import { CATEGORY_INFO, PartCategory } from "@/data/pc-parts";
import { calculateGameBenchmarks, calculateRenderBenchmarks } from "@/data/pc-benchmarks";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Button } from "@/components/ui/Button";
import { OpenConsult } from "@/components/ui/OpenConsult";
import { Price } from "@/components/ui/Price";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReadyCaseCard } from "./ReadyCaseCard";
import { useI18n } from "@/lib/i18n";

export function ReadyCaseDetail({ readyCase }: { readyCase: ReadyCase }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { lang, t } = useI18n();

  const parts = useMemo(() => getReadyCaseParts(readyCase), [readyCase]);
  const relatedCases = useMemo(() => getRelatedCases(readyCase.slug, 3), [readyCase.slug]);

  // Dynamic game & render benchmarks
  const gameBenchmarks = useMemo(() => {
    return calculateGameBenchmarks(parts.gpu, parts.cpu, parts.ram);
  }, [parts.gpu, parts.cpu, parts.ram]);

  const renderBenchmarks = useMemo(() => {
    return calculateRenderBenchmarks(parts.gpu, parts.cpu, parts.ram);
  }, [parts.gpu, parts.cpu, parts.ram]);

  const formatPrice = (amount: number): string => {
    return (
      new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "uz-UZ").format(amount) +
      " " +
      t("common.som")
    );
  };

  const perks = [
    { icon: Truck, label: t("customPc.perks.delivery") },
    { icon: ShieldCheck, label: t("customPc.perks.warranty") },
    { icon: RotateCcw, label: t("customPc.perks.tested") },
  ] as const;

  // Generate full text for Telegram or clipboard
  const getSpecsText = () => {
    return (
      `🖥️ PRO-DUCT — ${readyCase.name} (${readyCase.buildTitle})\n\n` +
      `📦 ${t("customPc.params.formFactor")}: ${readyCase.name} (${readyCase.caseSpecs.formFactor}, ${readyCase.caseSpecs.color})\n` +
      `🎮 Videokarta: ${parts.gpu?.name}\n` +
      `🧠 Protsessor: ${parts.cpu?.name}\n` +
      `🔌 Ona plata: ${parts.motherboard?.name}\n` +
      `⚡ RAM: ${parts.ram?.name}\n` +
      `💾 SSD: ${parts.storage?.name}\n` +
      `❄️ Sovutish: ${parts.cooling?.name}\n` +
      `🔋 Blok pitaniya: ${parts.psu?.name}\n\n` +
      `⚡ FPS: ${readyCase.fpsHighlights.game} — ${readyCase.fpsHighlights.fps}\n` +
      `🛡️ Kafolat: 1 yil rasmiy kafolat\n` +
      `🚚 Yetkazib berish: 24 soat ichida (Toshkent bo'ylab bepul)\n` +
      `💵 Narxi: ${formatPrice(readyCase.price)}`
    );
  };

  const handleOrder = () => {
    const greeting =
      lang === "ru"
        ? "Здравствуйте! Я хочу заказать этот готовый компьютер:\n\n"
        : "Assalomu alaykum! Men ushbu tayyor kompyuterni buyurtma qilmoqchiman:\n\n";
    const text = encodeURIComponent(`${greeting}${getSpecsText()}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getSpecsText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentImage = readyCase.images[activeImageIdx] || readyCase.image;

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-20 sm:px-6 sm:pt-24 md:px-10 md:pt-28">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Yo'l" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-ash sm:mb-8 sm:text-[13px]">
          <TransitionLink href="/" className="transition-colors hover:text-white">
            {t("common.home")}
          </TransitionLink>
          <ChevronRight className="size-3.5" />
          <TransitionLink href="/custom-pc" className="transition-colors hover:text-white">
            {t("customPc.breadcrumb")}
          </TransitionLink>
          <ChevronRight className="size-3.5" />
          <span className="text-smoke">{readyCase.name}</span>
        </nav>

        {/* Product-style Split Layout */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Image Gallery (Sticky) */}
          <div className="lg:sticky lg:top-28 lg:col-span-7 lg:self-start">
            <div className="flex flex-col gap-4">
              {/* Main Photo View */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-[#141418] to-[#08080a] shadow-2xl">
                {!imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentImage}
                    alt={readyCase.name}
                    onError={() => setImgError(true)}
                    className="size-full object-cover transition-all duration-500"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center p-10 text-center">
                    <Box className="size-16 text-white/20" />
                    <span className="mt-3 text-sm text-smoke">{readyCase.name}</span>
                  </div>
                )}

                {/* Badges on Image */}
                <div className="absolute left-4 top-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    {readyCase.badge}
                  </span>

                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md">
                    {t("customPc.inStock")}
                  </span>
                </div>
              </div>

              {/* Thumbnail Selector */}
              {readyCase.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {readyCase.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveImageIdx(idx);
                        setImgError(false);
                      }}
                      className={`relative aspect-[16/10] w-24 overflow-hidden rounded-xl border transition-all ${
                        activeImageIdx === idx
                          ? "border-white ring-2 ring-white/20 scale-105"
                          : "border-line opacity-60 hover:opacity-100 hover:border-white/40"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="" className="size-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Case Info & Details */}
          <div className="flex flex-col gap-6 sm:gap-7 lg:col-span-5">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ash">
                <span>{readyCase.categoryLabel}</span>
                <span className="text-smoke">•</span>
                <span className="text-smoke">{readyCase.caseSpecs.formFactor}</span>
              </div>
              <h1 className="mt-2 text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-fog">
                {readyCase.name}
              </h1>
              <p className="mt-1.5 text-base font-medium text-fog sm:text-lg">
                {readyCase.buildTitle}
              </p>
              <p className="mt-2 text-sm text-smoke">
                {readyCase.tagline}
              </p>
            </div>

            {/* Price & Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-y border-line/60 py-4">
              <Price price={readyCase.price} oldPrice={readyCase.oldPrice} size="lg" />
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {t("customPc.readyAssembled")}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-smoke sm:text-base">
              {readyCase.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  size="lg"
                  magnetic
                  onClick={handleOrder}
                  wrapperClassName="flex-1"
                  className="w-full text-xs sm:text-sm"
                  icon={<Send className="size-4 sm:size-[18px]" />}
                >
                  {t("customPc.orderBtn")}
                </Button>

                <button
                  type="button"
                  onClick={handleCopy}
                  title={t("customPc.copySpecs")}
                  className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-white/5 text-fog transition-all hover:bg-white/10 active:scale-95 sm:size-14"
                >
                  {copied ? <Check className="size-5 text-emerald-400" /> : <Copy className="size-5" />}
                </button>
              </div>

              <OpenConsult
                variant="secondary"
                size="lg"
                subject={`${readyCase.name} (${readyCase.buildTitle})`}
                wrapperClassName="w-full"
                className="w-full"
              >
                {t("customPc.consultBtn")}
              </OpenConsult>
            </div>

            {/* Perks */}
            <ul className="grid grid-cols-3 gap-2">
              {perks.map(({ icon: Icon, label }) => (
                <li key={label} className="surface flex flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center text-xs text-smoke">
                  <Icon className="size-5 text-fog" strokeWidth={1.6} />
                  {label}
                </li>
              ))}
            </ul>

            {/* Key Highlights */}
            <div>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ash">
                {t("customPc.keyHighlightsTitle")}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {readyCase.caseHighlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-fog/90">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-fog/10 text-fog">
                      <Check className="size-3" strokeWidth={2.4} />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Specifications Section */}
            <div>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ash">
                {t("customPc.fullSpecsTitle")}
              </h2>
              <dl className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-panel/40">
                {(
                  [
                    "case",
                    "gpu",
                    "cpu",
                    "motherboard",
                    "ram",
                    "storage",
                    "cooling",
                    "psu",
                  ] as PartCategory[]
                ).map((cat) => {
                  const part = parts[cat];
                  const info = CATEGORY_INFO[cat];
                  if (!part) return null;

                  return (
                    <div key={cat} className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                      <dt className="flex items-center gap-2 text-xs font-medium text-ash">
                        {cat === "case" && <Box className="size-3.5 text-cyan-400" />}
                        {cat === "gpu" && <MonitorPlay className="size-3.5 text-sky-400" />}
                        {cat === "cpu" && <Cpu className="size-3.5 text-amber-400" />}
                        {cat === "motherboard" && <Layers className="size-3.5 text-indigo-400" />}
                        {cat === "ram" && <Zap className="size-3.5 text-emerald-400" />}
                        {cat === "storage" && <HardDrive className="size-3.5 text-purple-400" />}
                        {cat === "cooling" && <Flame className="size-3.5 text-rose-400" />}
                        {cat === "psu" && <Zap className="size-3.5 text-yellow-400" />}
                        <span>{info.label}</span>
                      </dt>
                      <dd className="text-sm font-semibold text-fog sm:text-right">
                        {part.name}
                        <span className="block text-[11px] font-normal text-smoke">
                          {part.tagline.split("•")[0]}
                        </span>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            {/* Game Benchmarks */}
            <div>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ash">
                {t("customPc.gameBenchmarksTitle")}
              </h2>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {gameBenchmarks.slice(0, 6).map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center gap-3 rounded-2xl border border-line/60 bg-panel/40 p-3"
                  >
                    <div className="relative aspect-[16/9] w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#121217]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={game.image}
                        alt={game.name}
                        className="size-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <span className="truncate text-xs font-bold text-fog">{game.name}</span>
                        <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
                          {game.fpsLabel.split(" ")[0]} {game.fpsLabel.split(" ")[1]}
                        </span>
                      </div>
                      <span className="text-[10px] text-ash block">{game.resolution}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3D Rendering & Content Creation */}
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {renderBenchmarks.map((suite) => (
                  <div key={suite.id} className="rounded-xl border border-line/50 bg-panel/30 p-2.5">
                    <span className="text-xs font-semibold text-fog block truncate">{suite.name}</span>
                    <span className="text-[10px] text-ash block truncate mt-0.5">{suite.suite}</span>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-sky-400">{suite.percentage}%</span>
                      <span className="text-[10px] text-smoke">{suite.ratingLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Parameters */}
            <div>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ash">
                {t("customPc.caseSpecsTitle")}
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-line/50 bg-panel/30 p-3">
                  <span className="text-[10px] uppercase text-ash block">{t("customPc.params.formFactor")}</span>
                  <span className="font-medium text-fog">{readyCase.caseSpecs.formFactor}</span>
                </div>
                <div className="rounded-xl border border-line/50 bg-panel/30 p-3">
                  <span className="text-[10px] uppercase text-ash block">{t("customPc.params.glass")}</span>
                  <span className="font-medium text-fog">{readyCase.caseSpecs.glass}</span>
                </div>
                <div className="rounded-xl border border-line/50 bg-panel/30 p-3">
                  <span className="text-[10px] uppercase text-ash block">{t("customPc.params.cooling")}</span>
                  <span className="font-medium text-fog">{readyCase.caseSpecs.coolingSupport}</span>
                </div>
                <div className="rounded-xl border border-line/50 bg-panel/30 p-3">
                  <span className="text-[10px] uppercase text-ash block">{t("customPc.params.fans")}</span>
                  <span className="font-medium text-fog">{readyCase.caseSpecs.fans}</span>
                </div>
                <div className="rounded-xl border border-line/50 bg-panel/30 p-3">
                  <span className="text-[10px] uppercase text-ash block">{t("customPc.params.dimensions")}</span>
                  <span className="font-medium text-fog">{readyCase.caseSpecs.dimensions}</span>
                </div>
                <div className="rounded-xl border border-line/50 bg-panel/30 p-3">
                  <span className="text-[10px] uppercase text-ash block">{t("customPc.params.color")}</span>
                  <span className="font-medium text-fog">{readyCase.caseSpecs.color}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Ready Cases Section */}
      {relatedCases.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-24 border-t border-line/60">
          <SectionHeading eyebrow={t("common.catalog")} title={t("customPc.relatedTitle")} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCases.map((c) => (
              <ReadyCaseCard key={c.id} readyCase={c} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
