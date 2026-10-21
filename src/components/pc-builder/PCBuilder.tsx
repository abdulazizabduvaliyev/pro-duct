"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Flame,
  Gamepad2,
  HardDrive,
  Layers,
  MonitorPlay,
  Send,
  ShieldCheck,
  Zap,
  Copy,
} from "lucide-react";
import {
  CATEGORY_INFO,
  PC_PARTS,
  PCPart,
  PartCategory,
  PRESETS,
  Preset,
} from "@/data/pc-parts";
import {
  calculateGameBenchmarks,
  calculateRenderBenchmarks,
  checkCompatibility,
  getSocket,
} from "@/data/pc-benchmarks";
import { PCCase3D, PC_RGB_THEMES, RGBTheme } from "@/components/3d/PCCase3D";

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
}

// Group categories for an intuitive 3-step mental model
const COMPONENT_GROUPS = [
  {
    title: "1. Asosiy Quvvat",
    subtitle: "Videokarta va protsessor — o'yinlar va ish tezligi asosi",
    categories: ["gpu", "cpu"] as PartCategory[],
  },
  {
    title: "2. Xotira va Plata",
    subtitle: "Ona plata, tezkor DDR5 RAM va yuqori tezlikdagi NVMe SSD",
    categories: ["motherboard", "ram", "storage"] as PartCategory[],
  },
  {
    title: "3. Sovutish va Korpus",
    subtitle: "Sokin sovutish tizimi, quvvat bloki va zamonaviy korpus",
    categories: ["cooling", "psu", "case"] as PartCategory[],
  },
];

export function PCBuilder() {
  // Initial selection from flagship preset
  const [selected, setSelected] = useState<Record<PartCategory, string>>({
    gpu: "gpu-rtx-5080",
    cpu: "cpu-ryzen-7-7800x3d",
    ram: "ram-32gb-trident",
    storage: "ssd-samsung-990pro-2tb",
    motherboard: "mb-asus-b650e-f",
    cooling: "cool-nzxt-kraken-elite-360",
    psu: "psu-corsair-rm1000x",
    case: "case-lianli-o11-evo-rgb",
  });

  const [activeRgb, setActiveRgb] = useState<RGBTheme>(PC_RGB_THEMES[0]);
  const [benchmarkTab, setBenchmarkTab] = useState<"games" | "render">("games");
  const [copied, setCopied] = useState(false);

  // Map IDs to actual part objects
  const selectedParts = useMemo(() => {
    const map: Partial<Record<PartCategory, PCPart>> = {};
    for (const [cat, id] of Object.entries(selected)) {
      const part = PC_PARTS[cat as PartCategory]?.find((p) => p.id === id);
      if (part) map[cat as PartCategory] = part;
    }
    return map as Record<PartCategory, PCPart>;
  }, [selected]);

  // Total price
  const totalPrice = useMemo(() => {
    return Object.values(selectedParts).reduce((sum, part) => sum + (part?.price || 0), 0);
  }, [selectedParts]);

  // Total estimated wattage
  const totalWattage = useMemo(() => {
    const raw = Object.entries(selectedParts).reduce((sum, [cat, part]) => {
      if (!part) return sum;
      if (cat === "psu") return sum;
      return sum + (part.wattage || 0);
    }, 0);
    // Add motherboard + fans base load (~75W)
    return raw + 75;
  }, [selectedParts]);

  // Compatibility engine
  const compatibility = useMemo(() => {
    return checkCompatibility(
      selectedParts.cpu,
      selectedParts.motherboard,
      selectedParts.psu,
      totalWattage,
    );
  }, [selectedParts.cpu, selectedParts.motherboard, selectedParts.psu, totalWattage]);

  // Benchmarks
  const gameBenchmarks = useMemo(() => {
    return calculateGameBenchmarks(
      selectedParts.gpu,
      selectedParts.cpu,
      selectedParts.ram,
    );
  }, [selectedParts.gpu, selectedParts.cpu, selectedParts.ram]);

  const renderBenchmarks = useMemo(() => {
    return calculateRenderBenchmarks(
      selectedParts.gpu,
      selectedParts.cpu,
      selectedParts.ram,
    );
  }, [selectedParts.gpu, selectedParts.cpu, selectedParts.ram]);

  // Average scores
  const avgGameScore = useMemo(() => {
    if (!gameBenchmarks.length) return 85;
    return Math.round(
      gameBenchmarks.reduce((s, g) => s + g.percentage, 0) / gameBenchmarks.length,
    );
  }, [gameBenchmarks]);

  const avgRenderScore = useMemo(() => {
    if (!renderBenchmarks.length) return 80;
    return Math.round(
      renderBenchmarks.reduce((s, r) => s + r.percentage, 0) / renderBenchmarks.length,
    );
  }, [renderBenchmarks]);

  // Part selector change
  const handleSelectPart = (category: PartCategory, partId: string) => {
    setSelected((prev) => ({
      ...prev,
      [category]: partId,
    }));
  };

  // Preset applicator
  const applyPreset = (preset: Preset) => {
    setSelected(preset.parts);
  };

  // Auto-fix compatibility
  const handleAutoFix = () => {
    if (!compatibility.socketMatch && selectedParts.cpu) {
      const cpuSock = getSocket(selectedParts.cpu);
      const matchMobo = PC_PARTS.motherboard.find((m) => getSocket(m) === cpuSock);
      if (matchMobo) {
        setSelected((prev) => ({ ...prev, motherboard: matchMobo.id }));
      }
    }
    if (!compatibility.psuSufficient) {
      const matchPsu = PC_PARTS.psu.find((p) => p.wattage >= totalWattage + 150);
      if (matchPsu) {
        setSelected((prev) => ({ ...prev, psu: matchPsu.id }));
      }
    }
  };

  // Generate specs text
  const getSpecsText = () => {
    return (
      `🖥️ PRO-DUCT Maxsus Gaming PC Konfiguratsiyasi:\n\n` +
      `• Videokarta: ${selectedParts.gpu?.name}\n` +
      `• Protsessor: ${selectedParts.cpu?.name}\n` +
      `• Ona plata: ${selectedParts.motherboard?.name}\n` +
      `• RAM: ${selectedParts.ram?.name}\n` +
      `• SSD: ${selectedParts.storage?.name}\n` +
      `• Sovutish: ${selectedParts.cooling?.name}\n` +
      `• Blok pitaniya: ${selectedParts.psu?.name}\n` +
      `• Korpus: ${selectedParts.case?.name}\n\n` +
      `⚡ O'yin ko'rsatkichi: ${avgGameScore}% Ultra (CS2, Dota 2, RDR2)\n` +
      `🎬 Render quvvati: ${avgRenderScore}%\n` +
      `💵 Jami narxi: ${formatPrice(totalPrice)}`
    );
  };

  // Direct order
  const handleOrder = () => {
    const message = encodeURIComponent(
      `Assalomu alaykum! Men ushbu maxsus kompyuterni buyurtma qilmoqchiman:\n\n${getSpecsText()}`,
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${message}`, "_blank");
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(getSpecsText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check socket compatibility for motherboards / CPUs
  const isCompatibleOption = (cat: PartCategory, p: PCPart) => {
    if (cat === "motherboard" && selectedParts.cpu) {
      const cpuSock = getSocket(selectedParts.cpu);
      const moboSock = getSocket(p);
      if (cpuSock !== "Unknown" && moboSock !== "Unknown") {
        return cpuSock === moboSock;
      }
    }
    if (cat === "cpu" && selectedParts.motherboard) {
      const moboSock = getSocket(selectedParts.motherboard);
      const cpuSock = getSocket(p);
      if (moboSock !== "Unknown" && cpuSock !== "Unknown") {
        return moboSock === cpuSock;
      }
    }
    if (cat === "psu") {
      return p.wattage >= totalWattage - (selectedParts.psu?.wattage || 0) + 100;
    }
    return true;
  };

  return (
    <div className="flex flex-col gap-12">
      {/* ── 1. Minimalist Top Bar: Presets & Compatibility ── */}
      <div className="flex flex-col gap-4 border-b border-line pb-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-[11px] font-medium tracking-wider text-ash uppercase">
              Tayyor Konfiguratsiyalar
            </span>
            <p className="text-xs text-smoke">
              Bir bosishda optimal qismlarni tanlang yoki o&apos;zingiz o&apos;zgartiring
            </p>
          </div>

          {/* Compatibility Pill */}
          {compatibility.isCompatible ? (
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-300 sm:self-auto">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              <span>100% Mos keladi</span>
              <span className="text-emerald-500/60">•</span>
              <span className="font-mono text-[11px] text-emerald-400">~{totalWattage}W</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 sm:self-auto">
              <AlertTriangle className="size-3.5 text-amber-400" />
              <span>Moslik ogohlantirishi</span>
              <button
                type="button"
                onClick={handleAutoFix}
                className="ml-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold text-black transition-transform hover:scale-105 active:scale-95"
              >
                To&apos;g&apos;rilash
              </button>
            </div>
          )}
        </div>

        {/* Minimal Preset Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {PRESETS.map((preset) => {
            const isActive = Object.entries(preset.parts).every(
              ([cat, id]) => selected[cat as PartCategory] === id,
            );

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "border-white bg-white text-black shadow-md"
                    : "border-line bg-panel text-smoke hover:border-white/20 hover:text-white"
                }`}
              >
                <span>{preset.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                    isActive
                      ? "bg-black/10 text-black font-semibold"
                      : "bg-white/5 text-ash"
                  }`}
                >
                  {preset.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. Main Builder: Left (3D PC Showcase) & Right (Clean Selection) ── */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: 3D PC Visualizer & Instant Checkout (Sticky) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 flex flex-col gap-4">
            {/* 3D Model Card */}
            <div className="relative overflow-hidden rounded-3xl border border-line bg-panel p-5 shadow-2xl">
              {/* Top Bar inside 3D Card */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-ash">
                    3D Model • 360° Burang
                  </span>
                  <h3 className="text-sm font-semibold text-fog">
                    {selectedParts.case?.name.split(" ")[0]} {selectedParts.case?.name.split(" ")[1]}
                  </h3>
                </div>

                {/* Minimal RGB Dots */}
                <div className="flex items-center gap-1.5 rounded-full border border-line bg-black/50 p-1">
                  {PC_RGB_THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      type="button"
                      title={theme.name}
                      onClick={() => setActiveRgb(theme)}
                      className={`size-3.5 rounded-full transition-all ${
                        activeRgb.name === theme.name
                          ? "scale-125 ring-2 ring-white ring-offset-1 ring-offset-black"
                          : "opacity-50 hover:opacity-100"
                      }`}
                      style={{ background: theme.color }}
                    />
                  ))}
                </div>
              </div>

              {/* 3D WebGL Canvas */}
              <div className="relative my-4 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-[#141418] to-[#08080a]">
                <PCCase3D activeRgb={activeRgb} />
              </div>

              {/* Quick Specs Glance */}
              <div className="grid grid-cols-3 gap-2 border-t border-line/60 pt-3">
                <div className="rounded-xl border border-line/40 bg-black/30 p-2 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-ash">
                    Videokarta
                  </span>
                  <p className="truncate font-mono text-xs font-bold text-white">
                    {selectedParts.gpu?.name.replace("NVIDIA GeForce ", "")}
                  </p>
                </div>
                <div className="rounded-xl border border-line/40 bg-black/30 p-2 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-ash">
                    O&apos;yin Quvvati
                  </span>
                  <p className="font-mono text-xs font-bold text-emerald-400">
                    {avgGameScore}% Ultra
                  </p>
                </div>
                <div className="rounded-xl border border-line/40 bg-black/30 p-2 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-ash">
                    Render Tezligi
                  </span>
                  <p className="font-mono text-xs font-bold text-sky-400">
                    {avgRenderScore}%
                  </p>
                </div>
              </div>
            </div>

            {/* Price & Checkout Card */}
            <div className="rounded-3xl border border-line bg-panel p-5 shadow-xl">
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-ash">
                    Jami Qiymat
                  </span>
                  <p className="mt-0.5 text-2xl font-bold tracking-tight text-white">
                    {formatPrice(totalPrice)}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  <ShieldCheck className="size-3.5" />
                  <span>1 yil kafolat</span>
                </div>
              </div>

              <div className="mt-3.5 space-y-1.5 text-xs text-smoke">
                <div className="flex justify-between">
                  <span>Professional yig&apos;ish & test:</span>
                  <span className="font-medium text-emerald-400">Bepul (0 so&apos;m)</span>
                </div>
                <div className="flex justify-between">
                  <span>Yetkazib berish (Toshkent):</span>
                  <span className="font-medium text-white">24 soat ichida</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleOrder}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
                >
                  <Send className="size-3.5" />
                  Buyurtma Berish
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  title="Konfiguratsiyani nusxalash"
                  className="flex items-center justify-center rounded-xl border border-line bg-white/5 px-3 py-3 text-xs font-medium text-fog transition-all hover:bg-white/10"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean, Grouped Part Selectors */}
        <div className="flex flex-col gap-8 lg:col-span-7">
          {COMPONENT_GROUPS.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur-md"
            >
              <div className="mb-5 border-b border-line pb-3">
                <h3 className="text-base font-semibold tracking-tight text-white">
                  {group.title}
                </h3>
                <p className="text-xs text-smoke">{group.subtitle}</p>
              </div>

              <div className="space-y-4">
                {group.categories.map((cat) => {
                  const info = CATEGORY_INFO[cat];
                  const currentPart = selectedParts[cat];
                  const partsList = PC_PARTS[cat];

                  return (
                    <div
                      key={cat}
                      className="rounded-2xl border border-line/60 bg-black/30 p-3.5 transition-colors hover:border-white/20"
                    >
                      {/* Category Label & Price */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="flex size-6 items-center justify-center rounded-lg bg-white/5 text-ash">
                            {cat === "cpu" && <Cpu className="size-3.5" />}
                            {cat === "gpu" && <MonitorPlay className="size-3.5" />}
                            {cat === "motherboard" && <Layers className="size-3.5" />}
                            {cat === "ram" && <Zap className="size-3.5" />}
                            {cat === "storage" && <HardDrive className="size-3.5" />}
                            {cat === "cooling" && <Flame className="size-3.5" />}
                            {cat === "psu" && <Zap className="size-3.5" />}
                            {cat === "case" && <Layers className="size-3.5" />}
                          </span>
                          <span className="font-semibold text-fog">
                            {info.label}
                          </span>
                        </div>

                        <span className="font-mono font-medium text-smoke">
                          {currentPart ? formatPrice(currentPart.price) : "—"}
                        </span>
                      </div>

                      {/* Clean Dropdown */}
                      <div className="relative mt-2.5">
                        <select
                          value={currentPart?.id || ""}
                          onChange={(e) => handleSelectPart(cat, e.target.value)}
                          className="w-full appearance-none rounded-xl border border-white/10 bg-[#0c0c10] px-3.5 py-2.5 pr-10 text-xs font-medium text-white shadow-sm transition-all focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                        >
                          {partsList.map((p) => {
                            const compatible = isCompatibleOption(cat, p);
                            const isCurrent = p.id === currentPart?.id;
                            const priceDiff = p.price - (currentPart?.price || 0);
                            const priceDiffStr =
                              priceDiff === 0
                                ? ""
                                : priceDiff > 0
                                ? ` (+${formatPrice(priceDiff)})`
                                : ` (-${formatPrice(Math.abs(priceDiff))})`;

                            return (
                              <option
                                key={p.id}
                                value={p.id}
                                disabled={!compatible && !isCurrent}
                                className="bg-[#121217] py-1 text-white"
                              >
                                {!compatible
                                  ? `✕ [Mos emas] ${p.name}`
                                  : `${p.name} — ${formatPrice(p.price)}${priceDiffStr}`}
                              </option>
                            );
                          })}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ash" />
                      </div>

                      {/* Sub-tagline */}
                      {currentPart && (
                        <p className="mt-2 text-[11px] text-smoke/90 line-clamp-1">
                          {currentPart.tagline}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Performance Showcase: Top 10 Games & 3D Render (Minimalist, No Gradient) ── */}
      <div className="rounded-3xl border border-line bg-panel p-6 shadow-xl sm:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-ash">
              Unumdorlik Sinovi
            </span>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Bu Kompyuter Nimalarga Qodir?
            </h2>
            <p className="mt-0.5 text-xs text-smoke">
              Tanlangan videokarta va protsessor quvvatiga ko&apos;ra hisoblangan o&apos;rtacha FPS va render tezligi
            </p>
          </div>

          {/* Minimal Tab Switcher */}
          <div className="flex items-center rounded-full border border-line bg-black/40 p-1">
            <button
              type="button"
              onClick={() => setBenchmarkTab("games")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                benchmarkTab === "games"
                  ? "bg-white text-black shadow-sm"
                  : "text-smoke hover:text-white"
              }`}
            >
              <Gamepad2 className="size-3.5" />
              <span>Top 10 O&apos;yinlar</span>
              <span className="font-mono text-[11px] opacity-75">({avgGameScore}%)</span>
            </button>
            <button
              type="button"
              onClick={() => setBenchmarkTab("render")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                benchmarkTab === "render"
                  ? "bg-white text-black shadow-sm"
                  : "text-smoke hover:text-white"
              }`}
            >
              <Flame className="size-3.5" />
              <span>3D Render & Montaj</span>
              <span className="font-mono text-[11px] opacity-75">({avgRenderScore}%)</span>
            </button>
          </div>
        </div>

        {/* Clean Content Grid */}
        <div className="mt-6">
          {benchmarkTab === "games" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {gameBenchmarks.map((game) => (
                <div
                  key={game.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line/60 bg-black/30 p-3.5 transition-all hover:border-white/20 hover:bg-black/50 sm:p-4"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {/* Game Cover Art on Left Side */}
                    <div className="relative aspect-[16/9] w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#121217] sm:w-28">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={game.image}
                        alt={game.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Game Info & Stats */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="truncate text-sm font-semibold text-white">
                            {game.name}
                          </h4>
                          <p className="mt-0.5 truncate text-[11px] text-smoke">
                            {game.resolution}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="font-mono text-sm font-bold text-white sm:text-base">
                            {game.fpsLabel.split(" ")[0]} {game.fpsLabel.split(" ")[1]}
                          </span>
                          <p className="mt-0.5 font-mono text-[10px] text-smoke">
                            {game.percentage}% quvvat
                          </p>
                        </div>
                      </div>

                      {/* Clean Solid Progress Bar (No Gradient) */}
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-white transition-all duration-500"
                          style={{ width: `${game.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {renderBenchmarks.map((suite) => (
                <div
                  key={suite.id}
                  className="group rounded-2xl border border-line/60 bg-black/30 p-4 transition-colors hover:border-white/20 hover:bg-black/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {suite.name}
                      </h4>
                      <p className="mt-0.5 text-xs text-smoke line-clamp-1">
                        {suite.suite}
                      </p>
                    </div>

                    <span className="shrink-0 font-mono text-xs font-bold text-white">
                      {suite.percentage}%
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-smoke">{suite.speedLabel}</span>
                    <span className="font-medium text-white">{suite.ratingLabel}</span>
                  </div>

                  {/* Clean Solid Progress Bar (No Gradient) */}
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-500"
                      style={{ width: `${suite.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
