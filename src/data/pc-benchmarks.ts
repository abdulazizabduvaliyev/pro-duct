import { PCPart } from "./pc-parts";

export type GameBenchmark = {
  id: string;
  name: string;
  category: string;
  resolution: string;
  percentage: number; // 0 to 100%
  fpsLabel: string;
  ratingLabel: string;
  ratingColor: "emerald" | "sky" | "amber";
  image: string;
};

export type RenderBenchmark = {
  id: string;
  name: string;
  suite: string;
  percentage: number; // 0 to 100%
  speedLabel: string;
  ratingLabel: string;
  ratingColor: "emerald" | "sky" | "amber";
};

export type CompatibilityStatus = {
  isCompatible: boolean;
  socketMatch: boolean;
  cpuSocket: "LGA1700" | "AM5" | "Unknown";
  moboSocket: "LGA1700" | "AM5" | "Unknown";
  psuSufficient: boolean;
  requiredWattage: number;
  availableWattage: number;
  warnings: string[];
  recommendations: string[];
};

/** Extracts CPU/Motherboard socket type */
export function getSocket(part?: PCPart | null): "LGA1700" | "AM5" | "Unknown" {
  if (!part) return "Unknown";
  const str = `${part.id} ${part.name} ${JSON.stringify(part.specs)}`.toLowerCase();
  if (str.includes("lga1700") || str.includes("z790") || str.includes("b760") || str.includes("i9") || str.includes("i7") || str.includes("i5")) {
    return "LGA1700";
  }
  if (str.includes("am5") || str.includes("b650") || str.includes("x670") || str.includes("ryzen")) {
    return "AM5";
  }
  return "Unknown";
}

/** Check compatibility between selected parts */
export function checkCompatibility(
  cpu?: PCPart | null,
  motherboard?: PCPart | null,
  psu?: PCPart | null,
  totalWattage = 500,
): CompatibilityStatus {
  const warnings: string[] = [];
  const recommendations: string[] = [];

  const cpuSocket = getSocket(cpu);
  const moboSocket = getSocket(motherboard);

  let socketMatch = true;
  if (cpuSocket !== "Unknown" && moboSocket !== "Unknown") {
    if (cpuSocket !== moboSocket) {
      socketMatch = false;
      warnings.push(
        `Soket mos kelmaydi: ${cpu?.name} (${cpuSocket}) protsessori ${motherboard?.name} (${moboSocket}) ona platasi bilan ishlamaydi!`
      );
      recommendations.push(
        cpuSocket === "LGA1700"
          ? "Intel LGA1700 (Z790 yoki B760) platasini tanlang."
          : "AMD AM5 (B650E yoki X670E) platasini tanlang."
      );
    }
  }

  const psuWattage = psu?.wattage || 750;
  // Recommended safe PSU is total wattage * 1.25 rounded to nearest 50
  const recommendedPSUWattage = Math.ceil((totalWattage * 1.25) / 50) * 50;
  const psuSufficient = psuWattage >= totalWattage;

  if (!psuSufficient) {
    warnings.push(
      `Quvvat yetarli emas: Tizim ~${totalWattage}W talab qiladi, tanlangan blok esa ${psuWattage}W!`
    );
    recommendations.push(`Kamida ${recommendedPSUWattage}W quvvat blokini tanlang.`);
  }

  const isCompatible = socketMatch && psuSufficient;

  return {
    isCompatible,
    socketMatch,
    cpuSocket,
    moboSocket,
    psuSufficient,
    requiredWattage: totalWattage,
    availableWattage: psuWattage,
    warnings,
    recommendations,
  };
}

/** Relative GPU performance tier (0 to 100) */
function getGpuTier(gpu?: PCPart | null): number {
  if (!gpu) return 40;
  const id = gpu.id.toLowerCase();
  if (id.includes("5090")) return 100;
  if (id.includes("5080")) return 86;
  if (id.includes("4080s")) return 76;
  if (id.includes("5070ti")) return 74;
  if (id.includes("4070s")) return 62;
  if (id.includes("5060")) return 50;
  if (id.includes("4060")) return 40;
  return 45;
}

/** Relative CPU gaming & render tier (0 to 100) */
function getCpuTier(cpu?: PCPart | null): { gaming: number; render: number } {
  if (!cpu) return { gaming: 70, render: 70 };
  const id = cpu.id.toLowerCase();
  if (id.includes("7800x3d")) return { gaming: 99, render: 88 };
  if (id.includes("7950x3d")) return { gaming: 98, render: 99 };
  if (id.includes("14900k")) return { gaming: 96, render: 100 };
  if (id.includes("14700k")) return { gaming: 90, render: 92 };
  if (id.includes("14600k")) return { gaming: 82, render: 80 };
  if (id.includes("7600x")) return { gaming: 78, render: 72 };
  return { gaming: 75, render: 75 };
}

/** Relative RAM tier */
function getRamTier(ram?: PCPart | null): number {
  if (!ram) return 80;
  const id = ram.id.toLowerCase();
  if (id.includes("64gb")) return 100;
  if (id.includes("32gb")) return 88;
  if (id.includes("16gb")) return 72;
  return 80;
}

/** Calculate Top 10 Games Benchmark Estimates */
export function calculateGameBenchmarks(
  gpu?: PCPart | null,
  cpu?: PCPart | null,
  ram?: PCPart | null,
): GameBenchmark[] {
  const gTier = getGpuTier(gpu);
  const { gaming: cTier } = getCpuTier(cpu);
  const rTier = getRamTier(ram);

  const calc = (gW: number, cW: number, rW: number) => {
    const raw = gTier * gW + cTier * cW + rTier * rW;
    return Math.min(99, Math.max(45, Math.round(raw)));
  };

  const getFpsAndRating = (score: number, baseFps: number): { fps: string; rating: string; color: "emerald" | "sky" | "amber" } => {
    const fps = Math.round((score / 100) * baseFps);
    if (score >= 90) return { fps: `${fps}+ FPS (Ultra 4K)`, rating: "Ultra Yuqori", color: "emerald" };
    if (score >= 75) return { fps: `${fps}+ FPS (1440p Max)`, rating: "A'lo", color: "sky" };
    return { fps: `${fps} FPS (1080p High)`, rating: "Yaxshi", color: "amber" };
  };

  const games = [
    {
      id: "cs2",
      name: "Counter-Strike 2 (CS2)",
      category: "eSport / FPS",
      resolution: "1440p / 1080p Competitive",
      score: calc(0.35, 0.60, 0.05),
      baseFps: 420,
    },
    {
      id: "dota2",
      name: "Dota 2",
      category: "MOBA / eSport",
      resolution: "4K Ultra Max",
      score: calc(0.30, 0.65, 0.05),
      baseFps: 320,
    },
    {
      id: "rdr2",
      name: "Red Dead Redemption 2",
      category: "Open World / AAA",
      resolution: "4K Ultra / 1440p Max",
      score: calc(0.68, 0.27, 0.05),
      baseFps: 145,
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk 2077: Phantom Liberty",
      category: "Ray Tracing / Path Tracing",
      resolution: "4K Ultra + Ray Tracing",
      score: calc(0.72, 0.23, 0.05),
      baseFps: 135,
    },
    {
      id: "gtav",
      name: "GTA V / GTA VI Ready",
      category: "Open World Action",
      resolution: "4K Ultra Graphics",
      score: calc(0.60, 0.35, 0.05),
      baseFps: 185,
    },
    {
      id: "valorant",
      name: "Valorant",
      category: "Tactical eSport",
      resolution: "1080p / 1440p High-Refresh",
      score: calc(0.25, 0.70, 0.05),
      baseFps: 550,
    },
    {
      id: "pubg",
      name: "PUBG: Battlegrounds",
      category: "Battle Royale",
      resolution: "1440p Ultra",
      score: calc(0.55, 0.40, 0.05),
      baseFps: 220,
    },
    {
      id: "fortnite",
      name: "Fortnite (Unreal Engine 5)",
      category: "Battle Royale / Lumen",
      resolution: "1440p / 4K Epic",
      score: calc(0.58, 0.37, 0.05),
      baseFps: 210,
    },
    {
      id: "apex",
      name: "Apex Legends",
      category: "Fast Battle Royale",
      resolution: "1440p Max Settings",
      score: calc(0.58, 0.37, 0.05),
      baseFps: 260,
    },
    {
      id: "warzone",
      name: "Call of Duty: Warzone",
      category: "Military FPS",
      resolution: "1440p / 4K Ultra",
      score: calc(0.62, 0.30, 0.08),
      baseFps: 195,
    },
  ];

  return games.map((g) => {
    const { fps, rating, color } = getFpsAndRating(g.score, g.baseFps);
    return {
      id: g.id,
      name: g.name,
      category: g.category,
      resolution: g.resolution,
      percentage: g.score,
      fpsLabel: fps,
      ratingLabel: rating,
      ratingColor: color,
      image: `/games/${g.id}.jpg`,
    };
  });
}

/** Calculate Render and Productivity Benchmark Estimates */
export function calculateRenderBenchmarks(
  gpu?: PCPart | null,
  cpu?: PCPart | null,
  ram?: PCPart | null,
): RenderBenchmark[] {
  const gTier = getGpuTier(gpu);
  const { render: cTier } = getCpuTier(cpu);
  const rTier = getRamTier(ram);

  const calc = (gW: number, cW: number, rW: number) => {
    const raw = gTier * gW + cTier * cW + rTier * rW;
    return Math.min(99, Math.max(45, Math.round(raw)));
  };

  const getRenderRating = (score: number): { speed: string; rating: string; color: "emerald" | "sky" | "amber" } => {
    if (score >= 90) return { speed: "Ultra Tezkor • 0 kechikish", rating: "Professional Studio", color: "emerald" };
    if (score >= 75) return { speed: "Juda tezkor • 4K Real-time", rating: "Katta loyihalar uchun", color: "sky" };
    return { speed: "Standart tezlik • 1080p/2K", rating: "Boshlang'ich studiya", color: "amber" };
  };

  const suites = [
    {
      id: "3d-render",
      name: "3D Rendering & Vizualizatsiya",
      suite: "Blender, Cinema 4D, Unreal Engine 5, V-Ray",
      score: calc(0.60, 0.35, 0.05),
    },
    {
      id: "video-edit",
      name: "4K / 8K Video Montaj & Kolor",
      suite: "Adobe Premiere Pro, DaVinci Resolve Studio, After Effects",
      score: calc(0.40, 0.45, 0.15),
    },
    {
      id: "ai-ml",
      name: "Sun'iy Intellekt & Neyrotarmoqlar",
      suite: "Stable Diffusion, ComfyUI, Local LLMs (Ollama), PyTorch",
      score: calc(0.75, 0.15, 0.10),
    },
    {
      id: "cad-arch",
      name: "Arxitektura & Muhandislik (CAD)",
      suite: "AutoCAD, Revit, 3ds Max, Lumion, SketchUp",
      score: calc(0.45, 0.45, 0.10),
    },
    {
      id: "stream-multitask",
      name: "4K 60FPS Jonli Efir & Multitask",
      suite: "OBS Studio NVENC AV1, Discord 4K, 30+ Chrome tablar",
      score: calc(0.40, 0.45, 0.15),
    },
  ];

  return suites.map((s) => {
    const { speed, rating, color } = getRenderRating(s.score);
    return {
      id: s.id,
      name: s.name,
      suite: s.suite,
      percentage: s.score,
      speedLabel: speed,
      ratingLabel: rating,
      ratingColor: color,
    };
  });
}
