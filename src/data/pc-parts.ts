export type PartCategory =
  | "gpu"
  | "cpu"
  | "ram"
  | "storage"
  | "motherboard"
  | "cooling"
  | "psu"
  | "case";

export type PCPart = {
  id: string;
  name: string;
  category: PartCategory;
  price: number; // in UZS
  tagline: string;
  badge?: string;
  wattage: number; // power consumption or rating
  specs: Record<string, string>;
  image?: string;
  highlight?: boolean;
};

export const PC_PARTS: Record<PartCategory, PCPart[]> = {
  gpu: [
    {
      id: "gpu-rtx-5090",
      name: "NVIDIA GeForce RTX 5090 32GB",
      category: "gpu",
      price: 34500000,
      tagline: "Ultra Extreme 4K Gaming & AI • GDDR7 • DLSS 4",
      badge: "Flagship 2026",
      wattage: 500,
      highlight: true,
      specs: {
        "VRAM": "32GB GDDR7",
        "Shina": "512-bit",
        "Taktik chastota": "2550 MHz",
        "Tavsiya PSU": "1000W+",
      },
    },
    {
      id: "gpu-rtx-5080",
      name: "NVIDIA GeForce RTX 5080 16GB",
      category: "gpu",
      price: 18900000,
      tagline: "High-End 4K Gaming • GDDR7 • Ray Tracing Ultra",
      badge: "Yangi",
      wattage: 380,
      highlight: true,
      specs: {
        "VRAM": "16GB GDDR7",
        "Shina": "256-bit",
        "Taktik chastota": "2620 MHz",
        "Tavsiya PSU": "850W",
      },
    },
    {
      id: "gpu-rtx-5070ti",
      name: "NVIDIA GeForce RTX 5070 Ti 16GB",
      category: "gpu",
      price: 13800000,
      tagline: "Elite 1440p / 4K • GDDR7 yuqori tezlik",
      badge: "Ommabop",
      wattage: 285,
      specs: {
        "VRAM": "16GB GDDR7",
        "Shina": "256-bit",
        "Taktik chastota": "2580 MHz",
        "Tavsiya PSU": "750W",
      },
    },
    {
      id: "gpu-rtx-5060",
      name: "NVIDIA GeForce RTX 5060 8GB",
      category: "gpu",
      price: 5900000,
      tagline: "Next-Gen 1080p & 1440p • Energiya tejamkor GDDR7",
      badge: "Eng yaxshi narx/sifat",
      wattage: 140,
      highlight: true,
      specs: {
        "VRAM": "8GB GDDR7",
        "Shina": "128-bit",
        "Taktik chastota": "2520 MHz",
        "Tavsiya PSU": "550W - 650W",
      },
    },
    {
      id: "gpu-rtx-4080s",
      name: "NVIDIA GeForce RTX 4080 Super 16GB",
      category: "gpu",
      price: 16200000,
      tagline: "4K Ray Tracing & 3D Rendering Pro",
      wattage: 320,
      specs: {
        "VRAM": "16GB GDDR6X",
        "Shina": "256-bit",
        "CUDA yadrolar": "10240",
        "Tavsiya PSU": "850W",
      },
    },
    {
      id: "gpu-rtx-4070s",
      name: "NVIDIA GeForce RTX 4070 Super 12GB",
      category: "gpu",
      price: 9800000,
      tagline: "Optimal 1440p High Refresh Gaming",
      wattage: 220,
      specs: {
        "VRAM": "12GB GDDR6X",
        "Shina": "192-bit",
        "CUDA yadrolar": "7168",
        "Tavsiya PSU": "650W",
      },
    },
    {
      id: "gpu-rtx-4060",
      name: "NVIDIA GeForce RTX 4060 8GB",
      category: "gpu",
      price: 4300000,
      tagline: "Hamyonbop eSport & Full HD Gaming",
      wattage: 115,
      specs: {
        "VRAM": "8GB GDDR6",
        "Shina": "128-bit",
        "DLSS": "DLSS 3 Frame Gen",
        "Tavsiya PSU": "500W",
      },
    },
  ],

  cpu: [
    {
      id: "cpu-i9-14900k",
      name: "Intel Core i9-14900K",
      category: "cpu",
      price: 7900000,
      tagline: "24 yadro (8P + 16E) • 6.0 GHz Turbo • 36MB Smart Cache",
      badge: "Flagship Intel",
      wattage: 253,
      highlight: true,
      specs: {
        "Yadrolar / Oqimlar": "24 / 32",
        "Maksimal chastota": "6.0 GHz",
        "Kesh xotira": "36MB Intel Smart Cache",
        "Soket": "LGA1700",
      },
    },
    {
      id: "cpu-ryzen-7-7800x3d",
      name: "AMD Ryzen 7 7800X3D",
      category: "cpu",
      price: 6200000,
      tagline: "8 yadro, 16 oqim • 96MB 3D V-Cache • Dunyodagi #1 o'yin protsessori",
      badge: "Eng zo'r gaming CPU",
      wattage: 120,
      highlight: true,
      specs: {
        "Yadrolar / Oqimlar": "8 / 16",
        "Maksimal chastota": "5.0 GHz",
        "L3 Kesh": "96MB 3D V-Cache",
        "Soket": "AM5",
      },
    },
    {
      id: "cpu-i7-14700k",
      name: "Intel Core i7-14700K",
      category: "cpu",
      price: 5600000,
      tagline: "20 yadro (8P + 12E) • 5.6 GHz • O'yin va montaj uchun ideal",
      wattage: 253,
      specs: {
        "Yadrolar / Oqimlar": "20 / 28",
        "Maksimal chastota": "5.6 GHz",
        "Kesh": "33MB",
        "Soket": "LGA1700",
      },
    },
    {
      id: "cpu-ryzen-9-7950x3d",
      name: "AMD Ryzen 9 7950X3D",
      category: "cpu",
      price: 8400000,
      tagline: "16 yadro, 32 oqim • 128MB kesh • Ekstremal ish stantsiyasi",
      wattage: 120,
      specs: {
        "Yadrolar / Oqimlar": "16 / 32",
        "Maksimal chastota": "5.7 GHz",
        "L3 Kesh": "128MB",
        "Soket": "AM5",
      },
    },
    {
      id: "cpu-i5-14600k",
      name: "Intel Core i5-14600K",
      category: "cpu",
      price: 3900000,
      tagline: "14 yadro (6P + 8E) • 5.3 GHz • Ajoyib quvvat/narx balansi",
      wattage: 181,
      specs: {
        "Yadrolar / Oqimlar": "14 / 20",
        "Maksimal chastota": "5.3 GHz",
        "Kesh": "24MB",
        "Soket": "LGA1700",
      },
    },
    {
      id: "cpu-ryzen-5-7600x",
      name: "AMD Ryzen 5 7600X",
      category: "cpu",
      price: 3100000,
      tagline: "6 yadro, 12 oqim • 5.3 GHz • Tejamkor AM5 platformasi",
      badge: "Hamyonbop",
      wattage: 105,
      specs: {
        "Yadrolar / Oqimlar": "6 / 12",
        "Maksimal chastota": "5.3 GHz",
        "L3 Kesh": "32MB",
        "Soket": "AM5",
      },
    },
  ],

  ram: [
    {
      id: "ram-64gb-dominator",
      name: "64GB (2x32GB) Corsair Dominator Titanium DDR5-6000",
      category: "ram",
      price: 3600000,
      tagline: "Premium alyuminiy radiator • RGB • CL30 past kechikish",
      badge: "Premium",
      wattage: 15,
      specs: {
        "Hajmi": "64GB (2 x 32GB)",
        "Turi": "DDR5",
        "Chastota": "6000 MHz",
        "Tayminglar": "CL30-36-36",
      },
    },
    {
      id: "ram-32gb-trident",
      name: "32GB (2x16GB) G.Skill Trident Z5 RGB DDR5-6400",
      category: "ram",
      price: 2100000,
      tagline: "Yuqori tezlikdagi o'yin xotirasi • Dinamik RGB chiroqlar",
      badge: "Ommabop",
      wattage: 10,
      highlight: true,
      specs: {
        "Hajmi": "32GB (2 x 16GB)",
        "Turi": "DDR5",
        "Chastota": "6400 MHz",
        "Tayminglar": "CL32",
      },
    },
    {
      id: "ram-32gb-fury",
      name: "32GB (2x16GB) Kingston Fury Beast DDR5-5600",
      category: "ram",
      price: 1650000,
      tagline: "Ishonchli va sovuq ishlaydigan qora radiatorli DDR5",
      wattage: 10,
      specs: {
        "Hajmi": "32GB (2 x 16GB)",
        "Turi": "DDR5",
        "Chastota": "5600 MHz",
        "Tayminglar": "CL36",
      },
    },
    {
      id: "ram-16gb-fury",
      name: "16GB (2x8GB) Kingston Fury Beast DDR5-5200",
      category: "ram",
      price: 950000,
      tagline: "Boshlang'ich DDR5 konfiguratsiyalari uchun",
      wattage: 8,
      specs: {
        "Hajmi": "16GB (2 x 8GB)",
        "Turi": "DDR5",
        "Chastota": "5200 MHz",
        "Tayminglar": "CL40",
      },
    },
  ],

  storage: [
    {
      id: "ssd-samsung-990pro-2tb",
      name: "2TB Samsung 990 PRO NVMe M.2 SSD",
      category: "storage",
      price: 2800000,
      tagline: "7450 MB/s o'qish, 6900 MB/s yozish • PCIe 4.0 flagmani",
      badge: "Eng tezkor",
      wattage: 8,
      highlight: true,
      specs: {
        "Hajm": "2TB (2000 GB)",
        "O'qish tezligi": "7450 MB/s",
        "Yozish tezligi": "6900 MB/s",
        "Kafolat": "5 yil",
      },
    },
    {
      id: "ssd-samsung-990pro-1tb",
      name: "1TB Samsung 990 PRO NVMe M.2 SSD",
      category: "storage",
      price: 1650000,
      tagline: "7450 MB/s o'qish tezligi • Tizim va o'yinlar uchun tezkor yuklanish",
      wattage: 7,
      specs: {
        "Hajm": "1TB (1000 GB)",
        "O'qish tezligi": "7450 MB/s",
        "Yozish tezligi": "6900 MB/s",
        "Kafolat": "5 yil",
      },
    },
    {
      id: "ssd-kingston-fury-4tb",
      name: "4TB Kingston Fury Renegade NVMe M.2",
      category: "storage",
      price: 5100000,
      tagline: "Ulkan hajm va 7300 MB/s tezlik • Geymerlar va dizaynerlar uchun",
      badge: "Maksimal hajm",
      wattage: 9,
      specs: {
        "Hajm": "4TB (4000 GB)",
        "O'qish tezligi": "7300 MB/s",
        "Yozish tezligi": "7000 MB/s",
        "Kafolat": "5 yil",
      },
    },
    {
      id: "ssd-kingston-nv2-1tb",
      name: "1TB Kingston NV2 PCIe 4.0 NVMe",
      category: "storage",
      price: 950000,
      tagline: "3500 MB/s • Tejamkor va ishonchli M.2 drayv",
      wattage: 5,
      specs: {
        "Hajm": "1TB",
        "O'qish tezligi": "3500 MB/s",
        "Yozish tezligi": "2100 MB/s",
        "Kafolat": "3 yil",
      },
    },
  ],

  motherboard: [
    {
      id: "mb-asus-z790-dark-hero",
      name: "ASUS ROG Maximus Z790 Dark Hero",
      category: "motherboard",
      price: 8900000,
      tagline: "Intel Z790 • 20+1 fazali quvvat • Wi-Fi 7 • PCIe 5.0 • Polymo yoritish",
      badge: "Flagship",
      wattage: 50,
      highlight: true,
      specs: {
        "Soket / Chipset": "LGA1700 / Z790",
        "Xotira": "4x DDR5 (8000+ MHz OC)",
        "M.2 slotlar": "5x M.2 (1x PCIe 5.0)",
        "Tarmoq": "Wi-Fi 7 + 2.5Gb LAN",
      },
    },
    {
      id: "mb-asus-b650e-f",
      name: "ASUS ROG Strix B650E-F Gaming WiFi",
      category: "motherboard",
      price: 4200000,
      tagline: "AMD AM5 • PCIe 5.0 videokarta va SSD qo'llab-quvvatlashi • Wi-Fi 6E",
      badge: "Ommabop AM5",
      wattage: 35,
      specs: {
        "Soket / Chipset": "AM5 / B650E",
        "Xotira": "4x DDR5 (6400+ MHz)",
        "M.2 slotlar": "3x M.2 (PCIe 5.0)",
        "Tarmoq": "Wi-Fi 6E + 2.5Gb LAN",
      },
    },
    {
      id: "mb-msi-z790-tomahawk",
      name: "MSI MAG Z790 Tomahawk WiFi",
      category: "motherboard",
      price: 3600000,
      tagline: "Intel LGA1700 • Qora monolit dizayn • 16+1+1 quvvat fazasi",
      wattage: 40,
      specs: {
        "Soket / Chipset": "LGA1700 / Z790",
        "Xotira": "4x DDR5 (7200+ MHz)",
        "M.2 slotlar": "4x PCIe 4.0 M.2",
        "Tarmoq": "Wi-Fi 6E + 2.5Gb LAN",
      },
    },
    {
      id: "mb-asus-tuf-b760",
      name: "ASUS TUF Gaming B760-Plus WiFi",
      category: "motherboard",
      price: 2600000,
      tagline: "Hamyonbop va harbiy standartdagi ishonchli Intel plata",
      wattage: 30,
      specs: {
        "Soket / Chipset": "LGA1700 / B760",
        "Xotira": "4x DDR5",
        "M.2 slotlar": "3x M.2",
        "Tarmoq": "Wi-Fi 6 + 2.5Gb LAN",
      },
    },
    {
      id: "mb-msi-b650-tomahawk",
      name: "MSI MAG B650 Tomahawk WiFi",
      category: "motherboard",
      price: 3200000,
      tagline: "AMD AM5 • Kuchli sovutish • 14+2+1 quvvat fazasi • Wi-Fi 6E",
      badge: "Tavsiya AM5",
      wattage: 35,
      specs: {
        "Soket / Chipset": "AM5 / B650",
        "Xotira": "4x DDR5 (6600+ MHz OC)",
        "M.2 slotlar": "3x M.2",
        "Tarmoq": "Wi-Fi 6E + 2.5Gb LAN",
      },
    },
    {
      id: "mb-asus-x670e-hero",
      name: "ASUS ROG Crosshair X670E Hero",
      category: "motherboard",
      price: 8400000,
      tagline: "Ekstremal AM5 flagmani • PCIe 5.0 • USB4 40Gbps • Polymo RGB",
      badge: "Flagship AM5",
      wattage: 50,
      specs: {
        "Soket / Chipset": "AM5 / X670E",
        "Xotira": "4x DDR5 (8000+ MHz OC)",
        "M.2 slotlar": "5x M.2 (PCIe 5.0)",
        "Tarmoq": "Wi-Fi 6E + 2.5Gb LAN",
      },
    },
  ],

  cooling: [
    {
      id: "cool-nzxt-kraken-elite-360",
      name: "NZXT Kraken Elite 360 RGB LCD",
      category: "cooling",
      price: 3800000,
      tagline: "2.36\" IPS displey (GIF va harorat ko'rsatish) • 360mm radiator • Sokin fitinglar",
      badge: "Premium LCD",
      wattage: 25,
      highlight: true,
      specs: {
        "Turi": "Suyuqlik sovutgichi (AIO 360mm)",
        "Displey": "2.36\" 640x640 60Hz LCD",
        "Ventilyatorlar": "3x 120mm RGB F-Series",
        "Moslik": "Intel LGA1700, AMD AM5/AM4",
      },
    },
    {
      id: "cool-corsair-h150i",
      name: "Corsair iCUE LINK H150i RGB 360mm",
      category: "cooling",
      price: 3100000,
      tagline: "Bitta kabelli iCUE LINK texnologiyasi • Yuqori bosimli sovutish",
      wattage: 20,
      specs: {
        "Turi": "Suyuqlik sovutgichi (AIO 360mm)",
        "Ventilyatorlar": "3x QX120 RGB",
        "Radiator": "360mm alyuminiy",
        "Boshqaruv": "iCUE dasturi",
      },
    },
    {
      id: "cool-deepcool-lt720",
      name: "DeepCool LT720 360mm High Performance",
      category: "cooling",
      price: 1950000,
      tagline: "Ko'zguli 3D Infinity Mirror nasos bloki • 300W TDP sovutish",
      badge: "Eng yaxshi narx",
      wattage: 18,
      specs: {
        "Turi": "Suyuqlik sovutgichi (AIO 360mm)",
        "Nasos": "4-avlod DeepCool nasosi",
        "Ventilyatorlar": "3x FK120 FDB",
        "TDP": "300W gacha",
      },
    },
    {
      id: "cool-deepcool-ak620-digital",
      name: "DeepCool AK620 Digital Havo Sovutgichi",
      category: "cooling",
      price: 1100000,
      tagline: "Harorat displeyli ikkita minorali radiator • 6 ta mis issiqlik trubkasi",
      wattage: 8,
      specs: {
        "Turi": "Havo sovutgichi (Air Cooler)",
        "Displey": "Real-time CPU temp / load",
        "Ventilyatorlar": "2x 120mm PWM FDB",
        "TDP": "260W gacha",
      },
    },
  ],

  psu: [
    {
      id: "psu-seasonic-1200w",
      name: "1200W Seasonic Prime TX-1200 Titanium ATX 3.0",
      category: "psu",
      price: 4200000,
      tagline: "80 Plus Titanium (94% samaradorlik) • PCIe 5.0 12V-2x6 kabel • 12 yil kafolat",
      badge: "Titanium sifat",
      wattage: 1200,
      highlight: true,
      specs: {
        "Quvvat": "1200 Watt",
        "Sertifikat": "80 PLUS Titanium",
        "Format": "ATX 3.0 / PCIe 5.0",
        "Modullilik": "To'liq modulli",
      },
    },
    {
      id: "psu-corsair-rm1000x",
      name: "1000W Corsair RM1000x Shift Gold ATX 3.0",
      category: "psu",
      price: 2700000,
      tagline: "Yon tomondan ulanadigan kabellar • Yapon kondensatorlari • 80+ Gold",
      badge: "Ommabop 1000W",
      wattage: 1000,
      specs: {
        "Quvvat": "1000 Watt",
        "Sertifikat": "80 PLUS Gold",
        "Format": "ATX 3.0",
        "Kafolat": "10 yil",
      },
    },
    {
      id: "psu-bequiet-850w",
      name: "850W be quiet! Pure Power 12 M Gold",
      category: "psu",
      price: 1850000,
      tagline: "Deyarli shovqinsiz Silent Wings ventilyatori • 12VHPWR kabel",
      wattage: 850,
      specs: {
        "Quvvat": "850 Watt",
        "Sertifikat": "80 PLUS Gold",
        "Format": "ATX 3.0",
        "Shovqin": "Super sokin",
      },
    },
    {
      id: "psu-deepcool-750w",
      name: "750W DeepCool PN750M 80+ Gold ATX 3.0",
      category: "psu",
      price: 1350000,
      tagline: "Zamonaviy ATX 3.0 va PCIe 5.0 kabel bilan hamyonbop 750W",
      wattage: 750,
      specs: {
        "Quvvat": "750 Watt",
        "Sertifikat": "80 PLUS Gold",
        "Modullilik": "To'liq modulli",
        "Kafolat": "5 yil",
      },
    },
  ],

  case: [
    {
      id: "case-lianli-o11-evo-rgb",
      name: "Lian Li O11 Dynamic EVO RGB",
      category: "case",
      price: 2500000,
      tagline: "Ustunsiz panoramik ikki oynali shisha • Yuqori va pastki RGB diffuzorlar",
      badge: "Top Tanlov",
      wattage: 0,
      highlight: true,
      specs: {
        "Panel": "Ikkita toblangan shisha",
        "Radiator mosligi": "3x 360mm gacha",
        "Videokarta uzunligi": "455mm gacha",
        "Rangi": "Qora / Oq anodlangan alyuminiy",
      },
    },
    {
      id: "case-nzxt-h9-flow",
      name: "NZXT H9 Flow Dual-Chamber",
      category: "case",
      price: 2300000,
      tagline: "Toza havo oqimi uchun to'rli panellar • 10 ta ventilyator joyi",
      badge: "Maksimal sovutish",
      wattage: 0,
      specs: {
        "Shisha": "Choksiz burchak oynasi",
        "Format": "Mid-Tower Dual Chamber",
        "Ventilyatorlar": "4x 120mm o'rnatilgan",
        "Radiator": "3x 360mm",
      },
    },
    {
      id: "case-fractal-north",
      name: "Fractal Design North (Yog'ochli / Wood Accent)",
      category: "case",
      price: 2400000,
      tagline: "Haqiqiy eman daraxti old paneli • Skandinav premium interyer dizayni",
      badge: "Noyob Dizayn",
      wattage: 0,
      specs: {
        "Old panel": "Haqiqiy eman (Natural Oak)",
        "Yon panel": "Toblangan to'q shisha",
        "Radiator": "360mm old, 240mm yuqori",
        "Estetika": "Minimalist premium mebel uslubi",
      },
    },
    {
      id: "case-hyte-y70-touch",
      name: "HYTE Y70 Touch Infinite",
      category: "case",
      price: 4900000,
      tagline: "14.5\" 2.5K o'rnatilgan sensorli displey • 3 qismli panoramik shisha",
      badge: "Kelajak dizayni",
      wattage: 0,
      specs: {
        "Ekran": "14.5\" 688x2560 60Hz 10-point Multi-Touch",
        "GPU": "4-slot vertikal o'rnatish PCIe 4.0 kabeli bilan",
        "Radiator": "360mm yon va yuqori",
        "Status": "Eksklyuziv",
      },
    },
    {
      id: "case-deepcool-ch560",
      name: "DeepCool CH560 Digital",
      category: "case",
      price: 1450000,
      tagline: "Havo oqimi + Yon oynada real-time CPU/GPU harorat displeyi",
      wattage: 0,
      specs: {
        "Displey": "Ikki tomonlama raqamli monitoring",
        "Ventilyatorlar": "3x 140mm ARGB + 1x 120mm ARGB",
        "Format": "Mid-Tower High Airflow",
        "Narxi": "Hamyonbop",
      },
    },
  ],
};

export type Preset = {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  description: string;
  parts: Record<PartCategory, string>;
  fps: {
    cyberpunk: string;
    cs2: string;
    render: string;
  };
};

export const PRESETS: Preset[] = [
  {
    id: "rtx-5090-titan",
    name: "RTX 5090 Titan Ultimate",
    tagline: "Chegarasiz 4K Gaming & AI Workstation",
    badge: "Maksimal Quvvat",
    description: "Intel Core i9-14900K va NVIDIA RTX 5090 32GB bilan 4K da hech qanday murosasiz o'ynash va 3D modellash uchun.",
    parts: {
      gpu: "gpu-rtx-5090",
      cpu: "cpu-i9-14900k",
      ram: "ram-64gb-dominator",
      storage: "ssd-kingston-fury-4tb",
      motherboard: "mb-asus-z790-dark-hero",
      cooling: "cool-nzxt-kraken-elite-360",
      psu: "psu-seasonic-1200w",
      case: "case-hyte-y70-touch",
    },
    fps: {
      cyberpunk: "4K Ultra Ray Tracing: 155+ FPS",
      cs2: "4K Max: 580+ FPS",
      render: "Blender / Premiere: Ekstremal tezkor",
    },
  },
  {
    id: "rtx-5080-gaming-king",
    name: "Ryzen 7 7800X3D + RTX 5080",
    tagline: "Dunyodagi eng zo'r o'yin konfiguratsiyasi",
    badge: "Geymerlar Tanlovi",
    description: "AMD 7800X3D va RTX 5080 16GB birlashmasi eng yuqori FPS va eng past freym kechikishini taqdim etadi.",
    parts: {
      gpu: "gpu-rtx-5080",
      cpu: "cpu-ryzen-7-7800x3d",
      ram: "ram-32gb-trident",
      storage: "ssd-samsung-990pro-2tb",
      motherboard: "mb-asus-b650e-f",
      cooling: "cool-nzxt-kraken-elite-360",
      psu: "psu-corsair-rm1000x",
      case: "case-lianli-o11-evo-rgb",
    },
    fps: {
      cyberpunk: "4K Ultra DLSS 4: 130+ FPS",
      cs2: "1440p: 650+ FPS",
      render: "A'lo darajada",
    },
  },
  {
    id: "rtx-5060-nextgen",
    name: "RTX 5060 Next-Gen Edition",
    tagline: "Zamonaviy 1080p / 1440p o'yinlar uchun yangi standart",
    badge: "Eng ommabop",
    description: "Yangi avlod RTX 5060 8GB GDDR7 va Ryzen 5 7600X protsessori bilan hamyonbop va uzoq yillik ishonchli yechim.",
    parts: {
      gpu: "gpu-rtx-5060",
      cpu: "cpu-ryzen-5-7600x",
      ram: "ram-32gb-fury",
      storage: "ssd-samsung-990pro-1tb",
      motherboard: "mb-asus-b650e-f",
      cooling: "cool-deepcool-lt720",
      psu: "psu-deepcool-750w",
      case: "case-nzxt-h9-flow",
    },
    fps: {
      cyberpunk: "1440p Ultra DLSS: 95+ FPS",
      cs2: "1080p: 480+ FPS",
      render: "Tez va barqaror",
    },
  },
  {
    id: "pro-creator-wood",
    name: "Fractal North Minimalist Creator",
    tagline: "Eman yog'ochli nafis studiya kompyuteri",
    badge: "Dizaynerlar uchun",
    description: "Haqiqiy yog'ochli Fractal North korpusi, kuchli i7-14700K va RTX 4070 Super bilan sokin va estetika markazi.",
    parts: {
      gpu: "gpu-rtx-4070s",
      cpu: "cpu-i7-14700k",
      ram: "ram-32gb-fury",
      storage: "ssd-samsung-990pro-2tb",
      motherboard: "mb-msi-z790-tomahawk",
      cooling: "cool-deepcool-ak620-digital",
      psu: "psu-bequiet-850w",
      case: "case-fractal-north",
    },
    fps: {
      cyberpunk: "1440p Ultra: 110+ FPS",
      cs2: "1440p: 450+ FPS",
      render: "4K Render / After Effects / DaVinci",
    },
  },
];

export const CATEGORY_INFO: Record<PartCategory, { label: string; icon: string; desc: string }> = {
  gpu: { label: "Videokarta", icon: "MonitorPlay", desc: "Grafika va o'yinlar quvvati" },
  cpu: { label: "Protsessor", icon: "Cpu", desc: "Tizimning asosiy yuragi" },
  ram: { label: "Tezkor xotira (RAM)", icon: "CircuitBoard", desc: "Ko'p vazifalilik tezligi" },
  storage: { label: "Doimiy xotira (SSD)", icon: "HardDrive", desc: "Yuklanish va saqlash tezligi" },
  motherboard: { label: "Ona plata", icon: "Layers", desc: "Barcha qismlarni bog'lovchi poydevor" },
  cooling: { label: "Sovutish tizimi", icon: "Fan", desc: "Harorat nazorati va sokinlik" },
  psu: { label: "Blok pitaniya (PSU)", icon: "Zap", desc: "Ishonchli va xavfsiz elektr ta'minoti" },
  case: { label: "Korpus (Case)", icon: "Box", desc: "Estetika, havo oqimi va dizayn" },
};
