import { PC_PARTS, PCPart, PartCategory } from "./pc-parts";

export type ReadyCaseCategory = "all" | "ultra" | "esport" | "creator" | "budget";

export type ReadyCase = {
  id: string;
  slug: string;
  name: string; // Case model name
  buildTitle: string; // Build configuration name
  tagline: string;
  description: string;
  badge: string;
  badgeVariant?: "emerald" | "purple" | "sky" | "amber" | "rose";
  category: ReadyCaseCategory;
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  caseSpecs: {
    formFactor: string;
    glass: string;
    coolingSupport: string;
    fans: string;
    dimensions: string;
    color: string;
  };
  caseHighlights: string[];
  partIds: Record<PartCategory, string>;
  fpsHighlights: {
    game: string;
    fps: string;
    resolution: string;
  };
  inStock: boolean;
};

export const READY_CASE_CATEGORIES: Array<{ id: ReadyCaseCategory; label: string }> = [
  { id: "all", label: "Barcha Case-lar" },
  { id: "ultra", label: "Ultra 4K Gaming" },
  { id: "esport", label: "KiberSport & 1440p" },
  { id: "creator", label: "Studio & 3D Dizayn" },
  { id: "budget", label: "Hamyonbop Gaming" },
];

export const READY_CASES: ReadyCase[] = [
  {
    id: "case-hyte-y70-titan",
    slug: "hyte-y70-touch-infinite",
    name: "HYTE Y70 Touch Infinite",
    buildTitle: "Titan Ultimate 4K & AI Workstation",
    tagline: "14.5\" 2.5K o'rnatilgan sensorli displey • NVIDIA RTX 5090 32GB GDDR7",
    description:
      "Eng ilg'or kelajak texnologiyasi: korpusning burchagida joylashgan 14.5 dyuymli 2.5K sensorli ekran orqali tizim harorati, FPS va vidjetlarni kuzatib boring. NVIDIA GeForce RTX 5090 32GB va Intel Core i9-14900K bilan eng og'ir 4K o'yinlar hamda AI hisob-kitoblarida misli ko'rilmagan tezlik.",
    badge: "Flagship 2026",
    badgeVariant: "purple",
    category: "ultra",
    categoryLabel: "Ultra 4K & AI",
    price: 67800000,
    oldPrice: 72000000,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=1200&q=80",
    ],
    caseSpecs: {
      formFactor: "Mid-Tower Panoramic Corner",
      glass: "3 qismli choksiz toblangan shisha",
      coolingSupport: "Yon tomonda 360mm + Yuqorida 360mm",
      fans: "10 ta ventilyator joyi (4x o'rnatilgan)",
      dimensions: "470 x 320 x 470 mm",
      color: "Pitch Black & Onyx",
    },
    caseHighlights: [
      "14.5 dyuymli 688x2560 60Hz 10-point Multi-Touch sensorli ekran",
      "Ichki tizim holati (harorat, soat, animatsiya)ni real vaqtda ko'rsatish",
      "4-slotli GPU montaji uchun PCIe 4.0 tezyurar riser kabeli",
      "Panoramik shaffof dizayn — ichki premium qismlar to'liq ko'rinadi",
      "Kabel boshqaruvi uchun keng ikki kamerali alohida orqa bo'linma",
    ],
    partIds: {
      gpu: "gpu-rtx-5090",
      cpu: "cpu-i9-14900k",
      ram: "ram-64gb-dominator",
      storage: "ssd-kingston-fury-4tb",
      motherboard: "mb-asus-z790-dark-hero",
      cooling: "cool-nzxt-kraken-elite-360",
      psu: "psu-seasonic-1200w",
      case: "case-hyte-y70-touch",
    },
    fpsHighlights: {
      game: "Cyberpunk 2077 (4K Ultra Ray Tracing)",
      fps: "155+ FPS",
      resolution: "4K (3840x2160)",
    },
    inStock: true,
  },
  {
    id: "case-lianli-o11-evo-king",
    slug: "lian-li-o11-dynamic-evo",
    name: "Lian Li O11 Dynamic EVO RGB",
    buildTitle: "Ryzen 7 7800X3D + RTX 5080 King",
    tagline: "Ustunsiz panoramik ikki oynali shisha • Yuqori va pastki ARGB diffuzorlar",
    description:
      "Dunyodagi eng ommabop va chiroyli akvarium korpus: ustunsiz toblangan shisha panellar tufayli ichki detallar 100% ochiq ko'rinadi. Dunyoning eng yaxshi o'yin protsessori AMD Ryzen 7 7800X3D va yangi avlod NVIDIA GeForce RTX 5080 16GB GDDR7 juftligi har qanday o'yinda rekord FPS beradi.",
    badge: "Geymerlar Tanlovi",
    badgeVariant: "emerald",
    category: "ultra",
    categoryLabel: "Ultra Gaming",
    price: 43500000,
    oldPrice: 46900000,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    ],
    caseSpecs: {
      formFactor: "Dual-Chamber Mid-Tower",
      glass: "Ustunsiz (pillar-less) toblangan shisha",
      coolingSupport: "3x 360mm radiatorgacha",
      fans: "10x 120mm gacha ventilyatorlar",
      dimensions: "478 x 290 x 471 mm",
      color: "Anodlangan alyuminiy qora",
    },
    caseHighlights: [
      "Burchak ustunlarisiz choksiz 100% ochiq shaffof ko'rinish",
      "Yuqori va pastki qirralarda o'rnatilgan nozik ARGB yorug'lik chiziqlari",
      "Ikki kamerali tartib — simlar va quvvat bloki orqa xonada yashiringan",
      "3x 360mm suyuqlik sovutish radiatorlari uchun keng o'rin",
      "Past shovqin va maksimal havo oqimi uchun optimallashtirilgan",
    ],
    partIds: {
      gpu: "gpu-rtx-5080",
      cpu: "cpu-ryzen-7-7800x3d",
      ram: "ram-32gb-trident",
      storage: "ssd-samsung-990pro-2tb",
      motherboard: "mb-asus-b650e-f",
      cooling: "cool-nzxt-kraken-elite-360",
      psu: "psu-corsair-rm1000x",
      case: "case-lianli-o11-evo-rgb",
    },
    fpsHighlights: {
      game: "Counter-Strike 2 (Max Settings)",
      fps: "650+ FPS",
      resolution: "1440p QHD",
    },
    inStock: true,
  },
  {
    id: "case-nzxt-h9-flow-esport",
    slug: "nzxt-h9-flow-dual-chamber",
    name: "NZXT H9 Flow Dual-Chamber",
    buildTitle: "RTX 5070 Ti eSport Pro",
    tagline: "Choksiz toblangan oyna burchagi • Yuqori havo oqimli to'r panellar",
    description:
      "Kibersport va turnir darajasidagi barqarorlik: choksiz 90 darajali burchak oynasi orqali ichki qismlar nafis ko'rinadi, to'liq to'rli yuqori va yon panellar esa komponentlarni muzdek haroratda ushlab turadi. RTX 5070 Ti 16GB va Ryzen 7 7800X3D bilan 240Hz+ monitorlar uchun ideal yechim.",
    badge: "Kibersport",
    badgeVariant: "sky",
    category: "esport",
    categoryLabel: "Kibersport & 1440p",
    price: 32900000,
    oldPrice: 35500000,
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
    ],
    caseSpecs: {
      formFactor: "Dual-Chamber Mid-Tower",
      glass: "Ramkasiz 90° burchak toblangan shisha",
      coolingSupport: "3x 360mm radiator o'rni",
      fans: "4x 120mm Quiet Airflow o'rnatilgan",
      dimensions: "495 x 290 x 466 mm",
      color: "Matte Black",
    },
    caseHighlights: [
      "To'liq to'rli (perforated) yuqori va yon panellar orqali toza havo oqimi",
      "Katta videokartalar uchun keng va bemalol montaj xonasi",
      "Kabellarni qulay yashirish uchun keng orqa bo'linma va yo'naltiruvchilar",
      "Changdan himoya qiluvchi tozalanishi oson neylon filtrlar",
      "10 tagacha 120mm ventilyatorlarni qo'llab-quvvatlash",
    ],
    partIds: {
      gpu: "gpu-rtx-5070ti",
      cpu: "cpu-ryzen-7-7800x3d",
      ram: "ram-32gb-fury",
      storage: "ssd-samsung-990pro-2tb",
      motherboard: "mb-asus-b650e-f",
      cooling: "cool-deepcool-lt720",
      psu: "psu-corsair-rm1000x",
      case: "case-nzxt-h9-flow",
    },
    fpsHighlights: {
      game: "Valorant / Apex Legends",
      fps: "520+ FPS",
      resolution: "1440p Competitive",
    },
    inStock: true,
  },
  {
    id: "case-fractal-north-creator",
    slug: "fractal-design-north-wood",
    name: "Fractal Design North Wood",
    buildTitle: "Scandinavian Studio Creator",
    tagline: "Haqiqiy eman daraxti old paneli • Sokin Skandinav interyer dizayni",
    description:
      "Geyming RGB chiroqlaridan charchaganlar va haqiqiy estetikani qadrlaydiganlar uchun: old paneli haqiqiy tabiiy eman (Natural Oak) daraxtidan ishlangan. Intel Core i7-14700K (20 yadro) va RTX 4080 Super 16GB bilan 3D rendering, arxitektura, Cinema 4D va video montajda mutlaqo shovqinsiz ishlaydi.",
    badge: "Dizaynerlar Tanlovi",
    badgeVariant: "amber",
    category: "creator",
    categoryLabel: "Studio & Montaj",
    price: 31800000,
    oldPrice: 34200000,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80",
    ],
    caseSpecs: {
      formFactor: "Mid-Tower Studio",
      glass: "Qoraytirilgan toblangan shisha yon panel",
      coolingSupport: "Oldinda 360mm, yuqorida 240mm",
      fans: "2x 140mm Aspect PWM ventilyatorlar",
      dimensions: "447 x 215 x 469 mm",
      color: "Charcoal Black & Natural Oak",
    },
    caseHighlights: [
      "FSC-sertifikatlangan haqiqiy tabiiy eman yog'ochidan yasalgan old panjara",
      "Guruch (brass) tugma va detallar — har qanday zamonaviy ofisga yarashadi",
      "Ovoz izolyatsiyasi va shovqinsiz ishlashga yo'naltirilgan arxitektura",
      "3D modellashtirish, arxitektura va 4K montaj uchun ideal sokinlik",
      "DeepCool AK620 Digital displeyli sokin havo sovutgich",
    ],
    partIds: {
      gpu: "gpu-rtx-4080s",
      cpu: "cpu-i7-14700k",
      ram: "ram-64gb-dominator",
      storage: "ssd-samsung-990pro-2tb",
      motherboard: "mb-msi-z790-tomahawk",
      cooling: "cool-deepcool-ak620-digital",
      psu: "psu-bequiet-850w",
      case: "case-fractal-north",
    },
    fpsHighlights: {
      game: "Blender 3D & Unreal Engine 5",
      fps: "Real-time 4K",
      resolution: "Ultra Sokin Studio",
    },
    inStock: true,
  },
  {
    id: "case-deepcool-ch560-budget",
    slug: "deepcool-ch560-digital",
    name: "DeepCool CH560 Digital",
    buildTitle: "Next-Gen Smart Airflow",
    tagline: "Yon oynada harorat ko'rsatkichli displey • 4x ARGB o'rnatilgan kuler",
    description:
      "Hamyonbop narxda maksimal texnologiya: korpusning pastki oynasida real vaqtda protsessor va videokarta haroratini ko'rsatuvchi raqamli displey mavjud. Yangi avlod NVIDIA GeForce RTX 5060 8GB GDDR7 va AMD Ryzen 5 7600X bilan barcha zamonaviy o'yinlar 1080p va 1440p da silliq o'ynaladi.",
    badge: "Eng Ommabop",
    badgeVariant: "emerald",
    category: "budget",
    categoryLabel: "Hamyonbop Gaming",
    price: 17800000,
    oldPrice: 19500000,
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
    ],
    caseSpecs: {
      formFactor: "Mid-Tower High Airflow",
      glass: "Gibrid: toblangan shisha + pastki to'r panel",
      coolingSupport: "Oldinda 360mm, yuqorida 360mm",
      fans: "3x 140mm ARGB + 1x 120mm ARGB",
      dimensions: "458 x 230 x 471 mm",
      color: "Deep Black ARGB",
    },
    caseHighlights: [
      "CPU va GPU real-vaqtdagi haroratini ko'rsatib turuvchi raqamli displey",
      "Gibrid shisha va to'r kombinatsiyasi videokartani to'g'ridan-to'g'ri sovitadi",
      "Zavoddan 4 ta yorqin ARGB ventilyatorlar to'liq o'rnatilgan",
      "Hamyonbop narxda maksimal havo aylanishi va estetik ko'rinish",
      "Tezkor tozalash uchun qulay magnitli chang filtrlari",
    ],
    partIds: {
      gpu: "gpu-rtx-5060",
      cpu: "cpu-ryzen-5-7600x",
      ram: "ram-32gb-fury",
      storage: "ssd-samsung-990pro-1tb",
      motherboard: "mb-asus-b650e-f",
      cooling: "cool-deepcool-lt720",
      psu: "psu-deepcool-750w",
      case: "case-deepcool-ch560",
    },
    fpsHighlights: {
      game: "Cyberpunk 2077 / GTA V",
      fps: "115+ FPS",
      resolution: "1080p / 1440p DLSS",
    },
    inStock: true,
  },
  {
    id: "case-lianli-vision-white",
    slug: "lian-li-o11-vision-white",
    name: "Lian Li O11 Vision Pure White",
    buildTitle: "White Aesthetic Masterpiece",
    tagline: "3 tomonli to'liq toblangan oyna • Ustunsiz mutlaq oq dizayn",
    description:
      "Muzdek oppoq premium dizayn: yuqori, old va yon tomon to'liq qirrali toblangan oyna bilan qoplangan bo'lib, stolingiz ustida haqiqiy san'at asari kabi turadi. NVIDIA GeForce RTX 5080 16GB White OC, oppoq radiatorli ona plata va DDR5 xotiralar to'liq bir xil oppoq uslubda yig'ilgan.",
    badge: "Oq Estetika",
    badgeVariant: "sky",
    category: "ultra",
    categoryLabel: "Ultra White Gaming",
    price: 45900000,
    oldPrice: 48500000,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80",
    ],
    caseSpecs: {
      formFactor: "Full Panoramic Mid-Tower",
      glass: "3 tomonli to'liq qirrali toblangan oyna",
      coolingSupport: "Yon tomonda 360mm, pastda 360mm",
      fans: "8 ta ventilyator joyi",
      dimensions: "480 x 304 x 464 mm",
      color: "Snow White & Silver",
    },
    caseHighlights: [
      "Yuqori, old va yon tomon to'liq shaffof — hech qanday metall ustun yo'q",
      "Ichki barcha qismlar (GPU, RAM, AIO, PSU) oppoq rangda tanlangan",
      "Pastdan yuqoriga yo'naltirilgan toza vertikal havo aylanishi",
      "Stol ustida haqiqiy san'at asari kabi namoyon bo'luvchi dizayn",
      "Toza kabellar uchun ikki kamerali modulli oq korpus",
    ],
    partIds: {
      gpu: "gpu-rtx-5080",
      cpu: "cpu-i7-14700k",
      ram: "ram-32gb-trident",
      storage: "ssd-samsung-990pro-2tb",
      motherboard: "mb-asus-b650e-f",
      cooling: "cool-nzxt-kraken-elite-360",
      psu: "psu-corsair-rm1000x",
      case: "case-lianli-o11-evo-rgb",
    },
    fpsHighlights: {
      game: "Cyberpunk 2077 (4K DLSS)",
      fps: "130+ FPS",
      resolution: "4K UHD Max",
    },
    inStock: true,
  },
];

/** Helper to resolve parts map for a ready case */
export function getReadyCaseParts(c: ReadyCase): Record<PartCategory, PCPart> {
  const parts: Partial<Record<PartCategory, PCPart>> = {};
  for (const [cat, id] of Object.entries(c.partIds)) {
    const p = PC_PARTS[cat as PartCategory]?.find((item) => item.id === id);
    if (p) parts[cat as PartCategory] = p;
  }
  return parts as Record<PartCategory, PCPart>;
}

export function getReadyCase(slug: string): ReadyCase | undefined {
  return READY_CASES.find((c) => c.slug === slug || c.id === slug);
}

export function getRelatedCases(currentSlug: string, count = 3): ReadyCase[] {
  return READY_CASES.filter((c) => c.slug !== currentSlug).slice(0, count);
}
