import type { ArtKind } from "./categories";

export type Stock = "in" | "low" | "preorder" | "out";

export type Product = {
  slug: string;
  name: string;
  brand: string; // brand slug
  category: string; // category slug
  kind: ArtKind;
  tagline: string;
  description: string;
  /** Price in so'm. */
  price: number;
  oldPrice?: number;
  stock: Stock;
  badge?: string;
  colors: Array<{ name: string; value: string }>;
  /** Hue (0–360) of the illustrated screen glow. */
  accent: number;
  highlights: string[];
  specs: Array<{ label: string; value: string }>;
  featured?: boolean;
  /** The flagship used in the home-page product showcase. */
  showcase?: boolean;
  /**
   * Real product renders (transparent PNG/WebP, ideally ≥1600px) dropped into
   * /public/products/. When set they replace the built-in illustration.
   */
  images?: string[];
};

/**
 * ⚠️  SAMPLE DATA — names, prices, stock and specs below are placeholders so the
 * UI can be built and tested. Replace with the real catalogue (or fetch from
 * your API) before launch. Prices are in so'm.
 */
const SPACE = { name: "Space Black", value: "#2a2a2e" };
const SILVER = { name: "Silver", value: "#d6d8dc" };
const STARLIGHT = { name: "Starlight", value: "#e6ddd1" };
const MIDNIGHT = { name: "Midnight", value: "#1f2733" };
const BLUE = { name: "Blue", value: "#7390b5" };
const TITAN = { name: "Natural Titanium", value: "#b9b2a8" };
const BLACK_TITAN = { name: "Black Titanium", value: "#3a3a3d" };
const WHITE = { name: "White", value: "#f0f0f2" };
const GRAPHITE = { name: "Graphite", value: "#4a4a4f" };

export const products: Product[] = [
  // ───────────────────────── MacBook
  {
    slug: "macbook-air-13",
    name: 'MacBook Air 13"',
    brand: "apple",
    category: "macbook",
    kind: "laptop",
    tagline: "Eng yengil. Kun bo'yi ishlaydi.",
    description:
      "Kundalik ish, o'qish va ijod uchun ideal noutbuk: ingichka korpus, sokin ishlash va uzoq batareya.",
    price: 14990000,
    stock: "in",
    badge: "Yangi",
    colors: [SILVER, STARLIGHT, MIDNIGHT, SPACE],
    accent: 215,
    featured: true,
    highlights: ["Ingichka alyuminiy korpus", "Sokin ishlash — ventilyatorsiz", "Uzoq batareya quvvati"],
    specs: [
      { label: "Ekran", value: '13.6" Liquid Retina' },
      { label: "Protsessor", value: "Apple Silicon" },
      { label: "Xotira", value: "16 GB" },
      { label: "Saqlash", value: "256 GB SSD" },
      { label: "Og'irligi", value: "~1.2 kg" },
    ],
  },
  {
    slug: "macbook-pro-14",
    name: 'MacBook Pro 14"',
    brand: "apple",
    category: "macbook",
    kind: "laptop",
    tagline: "Professional ish uchun yaratilgan.",
    description:
      "Montaj, dasturlash va dizayn kabi og'ir vazifalar uchun kuchli protsessor, yorqin ekran va keng port to'plami.",
    price: 24990000,
    oldPrice: 26490000,
    stock: "in",
    badge: "Hit",
    colors: [SPACE, SILVER],
    accent: 262,
    featured: true,
    showcase: true,
    highlights: ["Ultra yorqin ekran", "Professional portlar to'plami", "Kuchli sovutish tizimi"],
    specs: [
      { label: "Ekran", value: '14.2" Liquid Retina XDR' },
      { label: "Protsessor", value: "Apple Silicon Pro" },
      { label: "Xotira", value: "24 GB" },
      { label: "Saqlash", value: "512 GB SSD" },
      { label: "Portlar", value: "3× Thunderbolt, HDMI, SD karta" },
    ],
  },
  {
    slug: "macbook-pro-16",
    name: 'MacBook Pro 16"',
    brand: "apple",
    category: "macbook",
    kind: "laptop",
    tagline: "Eng katta ekran. Eng katta quvvat.",
    description: "Katta loyihalar uchun eng keng ekran va eng yuqori samaradorlik.",
    price: 32990000,
    stock: "low",
    colors: [SPACE, SILVER],
    accent: 300,
    highlights: ["16 dyuymli kengaytirilgan ekran", "Maksimal samaradorlik", "Dolzarb ovoz tizimi"],
    specs: [
      { label: "Ekran", value: '16.2" Liquid Retina XDR' },
      { label: "Protsessor", value: "Apple Silicon Max" },
      { label: "Xotira", value: "36 GB" },
      { label: "Saqlash", value: "1 TB SSD" },
    ],
  },

  // ───────────────────────── iPhone
  {
    slug: "iphone-pro",
    name: "iPhone Pro",
    brand: "apple",
    category: "iphone",
    kind: "phone",
    tagline: "Pro kamera. Pro tezlik.",
    description: "Titan korpus, ilg'or kamera tizimi va kun bo'yi yetadigan batareya.",
    price: 15990000,
    stock: "in",
    badge: "Yangi",
    colors: [TITAN, BLACK_TITAN, WHITE],
    accent: 212,
    featured: true,
    highlights: ["Titan korpus", "Pro kamera tizimi", "Yorqin ProMotion ekran"],
    specs: [
      { label: "Ekran", value: '6.3" Super Retina XDR, 120 Hz' },
      { label: "Kamera", value: "48 MP asosiy + ultra keng + tele" },
      { label: "Saqlash", value: "256 GB" },
      { label: "Ulanish", value: "USB-C, 5G" },
    ],
  },
  {
    slug: "iphone-pro-max",
    name: "iPhone Pro Max",
    brand: "apple",
    category: "iphone",
    kind: "phone",
    tagline: "Eng katta ekran. Eng uzoq batareya.",
    description: "Eng katta ekran va rekord darajadagi batareya muddati.",
    price: 18490000,
    oldPrice: 19290000,
    stock: "in",
    colors: [TITAN, BLACK_TITAN, WHITE],
    accent: 190,
    featured: true,
    highlights: ["Eng katta ekran", "Eng uzoq batareya muddati", "Pro darajadagi video"],
    specs: [
      { label: "Ekran", value: '6.9" Super Retina XDR, 120 Hz' },
      { label: "Kamera", value: "48 MP asosiy + ultra keng + tele" },
      { label: "Saqlash", value: "256 GB" },
      { label: "Ulanish", value: "USB-C, 5G" },
    ],
  },
  {
    slug: "iphone-base",
    name: "iPhone",
    brand: "apple",
    category: "iphone",
    kind: "phone",
    tagline: "Hamma uchun ajoyib tanlov.",
    description: "Yorqin ekran, yaxshi kamera va ishonchli ishlash — kundalik foydalanish uchun.",
    price: 11490000,
    stock: "in",
    colors: [BLUE, WHITE, SPACE],
    accent: 340,
    highlights: ["Yorqin OLED ekran", "Ikki kamerali tizim", "Tezkor zaryadlash"],
    specs: [
      { label: "Ekran", value: '6.1" Super Retina XDR' },
      { label: "Kamera", value: "48 MP + ultra keng" },
      { label: "Saqlash", value: "128 GB" },
      { label: "Ulanish", value: "USB-C, 5G" },
    ],
  },

  // ───────────────────────── iPad
  {
    slug: "ipad-pro-13",
    name: 'iPad Pro 13"',
    brand: "apple",
    category: "ipad",
    kind: "tablet",
    tagline: "Planshet emas — ishchi stansiya.",
    description: "Eng yupqa korpus, ajoyib OLED ekran va noutbuk darajasidagi quvvat.",
    price: 17990000,
    stock: "in",
    badge: "Yangi",
    colors: [SPACE, SILVER],
    accent: 330,
    featured: true,
    highlights: ["Tandem OLED ekran", "Ultra yupqa korpus", "Pencil Pro qo'llab-quvvatlashi"],
    specs: [
      { label: "Ekran", value: '13" Ultra Retina XDR' },
      { label: "Saqlash", value: "256 GB" },
      { label: "Kamera", value: "12 MP + LiDAR" },
      { label: "Ulanish", value: "Wi-Fi 7, USB-C" },
    ],
  },
  {
    slug: "ipad-air-11",
    name: 'iPad Air 11"',
    brand: "apple",
    category: "ipad",
    kind: "tablet",
    tagline: "Yengil. Tezkor. Rang-barang.",
    description: "O'qish, chizish va ish uchun muvozanatli planshet.",
    price: 9990000,
    stock: "in",
    colors: [BLUE, STARLIGHT, SPACE],
    accent: 280,
    featured: true,
    highlights: ["Liquid Retina ekran", "Yengil korpus", "Pencil Pro bilan mos"],
    specs: [
      { label: "Ekran", value: '11" Liquid Retina' },
      { label: "Saqlash", value: "128 GB" },
      { label: "Kamera", value: "12 MP" },
      { label: "Ulanish", value: "Wi-Fi 6E, USB-C" },
    ],
  },
  {
    slug: "ipad-11",
    name: 'iPad 11"',
    brand: "apple",
    category: "ipad",
    kind: "tablet",
    tagline: "Kundalik hayot uchun.",
    description: "Dars, kino va oddiy ishlar uchun qulay narxdagi planshet.",
    price: 6490000,
    stock: "preorder",
    colors: [BLUE, SILVER],
    accent: 18,
    highlights: ["Katta va yorqin ekran", "Ishonchli ishlash", "Qulay narx"],
    specs: [
      { label: "Ekran", value: '11" Liquid Retina' },
      { label: "Saqlash", value: "128 GB" },
      { label: "Kamera", value: "12 MP" },
    ],
  },

  // ───────────────────────── Watch
  {
    slug: "apple-watch-ultra",
    name: "Apple Watch Ultra",
    brand: "apple",
    category: "watch",
    kind: "watch",
    tagline: "Eng bardoshli. Eng ilg'or.",
    description: "Titan korpus, uzoq batareya va sport hamda sayohat uchun ilg'or sensorlar.",
    price: 9490000,
    stock: "in",
    colors: [TITAN, BLACK_TITAN],
    accent: 30,
    featured: true,
    highlights: ["Titan korpus", "Uzoq batareya", "Aniq GPS"],
    specs: [
      { label: "Korpus", value: "49 mm titan" },
      { label: "Ekran", value: "Doimiy yoniq Retina" },
      { label: "Suvga chidamliligi", value: "100 m" },
    ],
  },
  {
    slug: "apple-watch-series",
    name: "Apple Watch Series",
    brand: "apple",
    category: "watch",
    kind: "watch",
    tagline: "Salomatlik va faollik nazoratida.",
    description: "Kundalik faollik, uyqu va yurak ritmini kuzatadigan aqlli soat.",
    price: 5190000,
    oldPrice: 5690000,
    stock: "in",
    colors: [SPACE, SILVER, STARLIGHT],
    accent: 150,
    highlights: ["Salomatlik sensorlari", "Yorqin doimiy ekran", "Tez zaryadlash"],
    specs: [
      { label: "Korpus", value: "42 / 46 mm alyuminiy" },
      { label: "Ekran", value: "Doimiy yoniq Retina" },
      { label: "Suvga chidamliligi", value: "50 m" },
    ],
  },

  // ───────────────────────── AirPods
  {
    slug: "airpods-pro",
    name: "AirPods Pro",
    brand: "apple",
    category: "airpods",
    kind: "earbuds",
    tagline: "Shovqinni o'chiring. Musiqani his qiling.",
    description: "Faol shovqinni bartaraf etish va fazoviy ovozli ilg'or quloqchinlar.",
    price: 3190000,
    stock: "in",
    badge: "Hit",
    colors: [WHITE],
    accent: 200,
    featured: true,
    highlights: ["Faol shovqin bekor qilish", "Fazoviy audio", "MagSafe zaryad g'ilofi"],
    specs: [
      { label: "Shovqinni bartaraf etish", value: "Faol (ANC)" },
      { label: "Batareya", value: "Quloqchinda ~6 soat, g'ilof bilan ko'proq" },
      { label: "Ulanish", value: "Bluetooth, USB-C" },
    ],
  },
  {
    slug: "airpods-4",
    name: "AirPods 4",
    brand: "apple",
    category: "airpods",
    kind: "earbuds",
    tagline: "Qulay. Yengil. Har kuni.",
    description: "Kundalik foydalanish uchun yengil va qulay quloqchinlar.",
    price: 1990000,
    stock: "in",
    colors: [WHITE],
    accent: 260,
    highlights: ["Yangi qulay shakl", "Aniq ovoz", "Ixcham zaryad g'ilofi"],
    specs: [
      { label: "Batareya", value: "Quloqchinda ~5 soat" },
      { label: "Ulanish", value: "Bluetooth, USB-C" },
    ],
  },

  // ───────────────────────── Monitor
  {
    slug: "studio-display",
    name: 'Studio Display 27"',
    brand: "apple",
    category: "monitor",
    kind: "monitor",
    tagline: "5K aniqlik. Ichki kamera va dinamiklar.",
    description: "Dizayn va montaj uchun ajoyib aniqlik va rang berish.",
    price: 19990000,
    stock: "low",
    colors: [SILVER],
    accent: 195,
    featured: true,
    highlights: ["5K Retina ekran", "Ichki kamera va mikrofonlar", "Olti dinamikli tizim"],
    specs: [
      { label: "Diagonal", value: '27"' },
      { label: "Aniqlik", value: "5120 × 2880" },
      { label: "Yorqinlik", value: "600 nit" },
      { label: "Ulanish", value: "Thunderbolt 3" },
    ],
  },
  {
    slug: "dell-ultrasharp-27",
    name: 'Dell UltraSharp 27" 4K',
    brand: "dell",
    category: "monitor",
    kind: "monitor",
    tagline: "Ofis va dizayn uchun aniq rang.",
    description: "Keng rang qamrovi va qulay stendga ega 4K ish monitori.",
    price: 5990000,
    stock: "in",
    colors: [GRAPHITE],
    accent: 170,
    highlights: ["4K aniqlik", "Aniq rang berish", "USB-C orqali ulanish"],
    specs: [
      { label: "Diagonal", value: '27"' },
      { label: "Aniqlik", value: "3840 × 2160" },
      { label: "Panel", value: "IPS" },
    ],
  },
  {
    slug: "lg-ultragear-27",
    name: 'LG UltraGear 27"',
    brand: "lg",
    category: "monitor",
    kind: "monitor",
    tagline: "O'yin uchun tezkor javob.",
    description: "Yuqori yangilanish chastotasi va tezkor javob vaqtiga ega o'yin monitori.",
    price: 4290000,
    oldPrice: 4790000,
    stock: "in",
    badge: "Chegirma",
    colors: [SPACE],
    accent: 320,
    highlights: ["Yuqori yangilanish chastotasi", "Tezkor javob vaqti", "Adaptiv sinxronizatsiya"],
    specs: [
      { label: "Diagonal", value: '27"' },
      { label: "Aniqlik", value: "2560 × 1440" },
      { label: "Chastota", value: "165 Hz" },
    ],
  },
  {
    slug: "samsung-odyssey-oled",
    name: "Samsung Odyssey OLED",
    brand: "samsung",
    category: "monitor",
    kind: "monitor",
    tagline: "Chuqur qora. Jonli ranglar.",
    description: "OLED panelli, ajoyib kontrastli premium o'yin monitori.",
    price: 11990000,
    stock: "preorder",
    colors: [SPACE],
    accent: 140,
    highlights: ["OLED panel", "Cheksiz kontrast", "Juda tezkor javob"],
    specs: [
      { label: "Panel", value: "OLED" },
      { label: "Aniqlik", value: "2560 × 1440" },
      { label: "Chastota", value: "240 Hz" },
    ],
  },

  // ───────────────────────── PC
  {
    slug: "lenovo-legion-tower",
    name: "Lenovo Legion Tower",
    brand: "lenovo",
    category: "pc",
    kind: "pc",
    tagline: "O'yin va ijod uchun quvvat.",
    description: "Kuchli videokarta va yaxshi sovutishga ega shisha panelli stol kompyuteri.",
    price: 21990000,
    stock: "in",
    colors: [SPACE],
    accent: 285,
    featured: true,
    highlights: ["Kuchli videokarta", "Shisha yon panel", "Kengaytirish imkoniyati"],
    specs: [
      { label: "Protsessor", value: "Yuqori darajadagi ko'p yadroli" },
      { label: "Videokarta", value: "Diskret o'yin GPU" },
      { label: "Xotira", value: "32 GB" },
      { label: "Saqlash", value: "1 TB NVMe" },
    ],
  },
  {
    slug: "mac-mini",
    name: "Mac mini",
    brand: "apple",
    category: "pc",
    kind: "minipc",
    tagline: "Kichik quti. Katta imkoniyat.",
    description: "Ixcham korpusdagi kuchli stol kompyuteri — har qanday stolga sig'adi.",
    price: 8990000,
    stock: "in",
    colors: [SILVER],
    accent: 235,
    highlights: ["Ixcham korpus", "Sokin ishlash", "Kam energiya sarfi"],
    specs: [
      { label: "Protsessor", value: "Apple Silicon" },
      { label: "Xotira", value: "16 GB" },
      { label: "Saqlash", value: "256 GB SSD" },
    ],
  },

  // ───────────────────────── Accessories
  {
    slug: "magic-keyboard",
    name: "Magic Keyboard",
    brand: "apple",
    category: "accessories",
    kind: "keyboard",
    tagline: "Simsiz. Ixcham. Aniq.",
    description: "Qayta zaryadlanuvchi simsiz klaviatura — Mac va iPad bilan ishlaydi.",
    price: 2190000,
    stock: "in",
    colors: [SILVER, SPACE],
    accent: 35,
    highlights: ["Simsiz ulanish", "Qayta zaryadlanuvchi batareya", "Yoqimli bosish"],
    specs: [
      { label: "Ulanish", value: "Bluetooth, USB-C" },
      { label: "Batareya", value: "Bir necha hafta" },
    ],
  },
  {
    slug: "logitech-mx-master",
    name: "Logitech MX Master",
    brand: "logitech",
    category: "accessories",
    kind: "mouse",
    tagline: "Ish uchun eng yaxshi sichqoncha.",
    description: "Ergonomik shakl va aniq g'ildirakka ega premium sichqoncha.",
    price: 1290000,
    stock: "in",
    badge: "Hit",
    colors: [GRAPHITE, WHITE],
    accent: 25,
    featured: true,
    highlights: ["Ergonomik shakl", "Tezkor g'ildirak", "Bir necha qurilma bilan ishlaydi"],
    specs: [
      { label: "Ulanish", value: "Bluetooth, qabul qilgich" },
      { label: "Batareya", value: "~70 kungacha" },
    ],
  },
  {
    slug: "logitech-mx-keys",
    name: "Logitech MX Keys",
    brand: "logitech",
    category: "accessories",
    kind: "keyboard",
    tagline: "Yozish uchun aniq klaviatura.",
    description: "Orqa yoritgichli, qulay tugmali ish klaviaturasi.",
    price: 1490000,
    stock: "out",
    colors: [GRAPHITE],
    accent: 45,
    highlights: ["Orqa yoritgich", "Bir necha qurilma bilan ishlaydi", "Qulay tugmalar"],
    specs: [
      { label: "Ulanish", value: "Bluetooth, qabul qilgich" },
      { label: "Yoritgich", value: "Aqlli orqa yoritgich" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, limit = 4) {
  const same = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const rest = products.filter((p) => p.slug !== product.slug && p.category !== product.category);
  return [...same, ...rest].slice(0, limit);
}

export const stockLabel: Record<Stock, string> = {
  in: "Mavjud",
  low: "Oz qoldi",
  preorder: "Buyurtma bo'yicha",
  out: "Tugagan",
};

export function isBuyable(p: Product) {
  return p.stock !== "out";
}
