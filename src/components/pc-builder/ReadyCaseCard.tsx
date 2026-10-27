"use client";

import { useState } from "react";
import { Box, Cpu, Eye, Gamepad2, HardDrive, MonitorPlay, Zap } from "lucide-react";
import { ReadyCase, getReadyCaseParts } from "@/data/ready-cases";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { useI18n } from "@/lib/i18n";

export function ReadyCaseCard({ readyCase }: { readyCase: ReadyCase }) {
  const [imgError, setImgError] = useState(false);
  const { lang, t } = useI18n();
  const parts = getReadyCaseParts(readyCase);

  const formatPrice = (amount: number): string => {
    return (
      new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "uz-UZ").format(amount) +
      " " +
      t("common.som")
    );
  };

  return (
    <TransitionLink
      href={`/custom-pc/${readyCase.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-panel/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/40 hover:shadow-2xl"
    >
      {/* Card Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-b from-[#141418] to-[#08080a]">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={readyCase.image}
            alt={readyCase.name}
            onError={() => setImgError(true)}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center p-6 text-center">
            <Box className="size-12 text-white/30" />
            <span className="mt-2 text-xs font-medium text-fog">{readyCase.name}</span>
          </div>
        )}

        {/* Subtle vignette gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute left-3.5 top-3.5 right-3.5 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-md">
            {readyCase.badge}
          </span>

          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-medium text-emerald-300 backdrop-blur-md">
            {t("customPc.readyAssembled")}
          </span>
        </div>

        {/* Bottom Game FPS Highlight Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs backdrop-blur-md rounded-xl bg-black/60 border border-white/10 px-3 py-1.5">
          <div className="flex items-center gap-1.5 text-fog truncate">
            <Gamepad2 className="size-3.5 text-sky-400 shrink-0" />
            <span className="truncate text-[11px]">{readyCase.fpsHighlights.game.split("(")[0]}</span>
          </div>
          <span className="font-mono text-[11px] font-bold text-emerald-400 shrink-0">
            {readyCase.fpsHighlights.fps}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Case Title */}
          <h3 className="text-base font-bold tracking-tight text-fog group-hover:text-sky-400 transition-colors">
            {readyCase.name}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-ash line-clamp-1">
            {readyCase.buildTitle}
          </p>
          <p className="mt-2 text-[11px] text-smoke line-clamp-2">
            {readyCase.tagline}
          </p>

          {/* Key Components Chips */}
          <div className="mt-4 grid grid-cols-2 gap-1.5 text-[11px]">
            <div className="rounded-lg border border-line/60 bg-black/40 px-2.5 py-1.5 flex items-center gap-1.5">
              <MonitorPlay className="size-3 text-sky-400 shrink-0" />
              <span className="truncate text-fog">
                {parts.gpu?.name.replace("NVIDIA GeForce ", "")}
              </span>
            </div>
            <div className="rounded-lg border border-line/60 bg-black/40 px-2.5 py-1.5 flex items-center gap-1.5">
              <Cpu className="size-3 text-amber-400 shrink-0" />
              <span className="truncate text-fog">
                {parts.cpu?.name.split(" ")[0]} {parts.cpu?.name.split(" ")[1]} {parts.cpu?.name.split(" ")[2] || ""}
              </span>
            </div>
            <div className="rounded-lg border border-line/60 bg-black/40 px-2.5 py-1.5 flex items-center gap-1.5">
              <Zap className="size-3 text-emerald-400 shrink-0" />
              <span className="truncate text-fog">
                {parts.ram?.specs["Hajmi"] || "32GB DDR5"}
              </span>
            </div>
            <div className="rounded-lg border border-line/60 bg-black/40 px-2.5 py-1.5 flex items-center gap-1.5">
              <HardDrive className="size-3 text-purple-400 shrink-0" />
              <span className="truncate text-fog">
                {parts.storage?.specs["Hajmi"] || "2TB NVMe"}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-4">
          <div>
            {readyCase.oldPrice && (
              <span className="block font-mono text-[10px] text-ash line-through">
                {formatPrice(readyCase.oldPrice)}
              </span>
            )}
            <span className="font-mono text-base font-bold text-fog">
              {formatPrice(readyCase.price)}
            </span>
          </div>

          <span className="flex items-center gap-1.5 rounded-xl border border-line bg-white/5 px-3.5 py-2 text-xs font-semibold text-fog transition-all group-hover:bg-fog group-hover:text-ink">
            <Eye className="size-3.5" />
            <span>{t("customPc.detailsBtn")}</span>
          </span>
        </div>
      </div>
    </TransitionLink>
  );
}
