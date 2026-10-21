export type Brand = {
  slug: string;
  name: string;
};

// Brand names are shown as plain typography — no trademarked logos are used.
export const brands: Brand[] = [
  { slug: "apple", name: "Apple" },
  { slug: "samsung", name: "Samsung" },
  { slug: "dell", name: "Dell" },
  { slug: "asus", name: "ASUS" },
  { slug: "lenovo", name: "Lenovo" },
  { slug: "lg", name: "LG" },
  { slug: "logitech", name: "Logitech" },
];

export function getBrand(slug: string) {
  return brands.find((b) => b.slug === slug);
}
