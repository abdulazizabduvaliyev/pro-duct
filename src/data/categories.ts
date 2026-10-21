/** Which illustration `ProductArt` draws for an item. */
export type ArtKind =
  | "laptop"
  | "phone"
  | "tablet"
  | "watch"
  | "earbuds"
  | "monitor"
  | "pc"
  | "minipc"
  | "keyboard"
  | "mouse";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  kind: ArtKind;
  /** Hue (0–360) of the screen glow in illustrations. */
  accent: number;
};

export const categories: Category[] = [
  { slug: "macbook", name: "MacBook", tagline: "Kuchli va yengil noutbuklar", kind: "laptop", accent: 262 },
  { slug: "iphone", name: "iPhone", tagline: "Smartfonlar", kind: "phone", accent: 212 },
  { slug: "ipad", name: "iPad", tagline: "Planshetlar", kind: "tablet", accent: 330 },
  { slug: "watch", name: "Watch", tagline: "Aqlli soatlar", kind: "watch", accent: 150 },
  { slug: "airpods", name: "AirPods", tagline: "Simsiz quloqchinlar", kind: "earbuds", accent: 200 },
  { slug: "monitor", name: "Monitor", tagline: "Ish va o'yin uchun displeylar", kind: "monitor", accent: 190 },
  { slug: "pc", name: "PC", tagline: "Stol kompyuterlari", kind: "pc", accent: 285 },
  { slug: "accessories", name: "Aksessuarlar", tagline: "Klaviatura, sichqoncha va boshqalar", kind: "keyboard", accent: 35 },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
