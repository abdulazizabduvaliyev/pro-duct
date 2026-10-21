export const site = {
  name: "PRO DUCT",
  // TODO: replace with the real production domain before launch.
  url: "https://pro-duct.uz",
  title: "PRO DUCT — Premium Tech Store",
  description:
    "PRO DUCT — kompyuter, noutbuk, Apple qurilmalari, monitorlar va aksessuarlar sotuvchi premium texnika do'koni.",
  keywords: [
    "PRO DUCT",
    "premium tech store",
    "MacBook",
    "iPhone",
    "iPad",
    "Apple Watch",
    "AirPods",
    "monitor",
    "noutbuk",
    "kompyuter",
  ],
  // TODO: replace every placeholder below with the real contact details.
  contacts: {
    phone: "+998 00 000 00 00",
    phoneHref: "tel:+998000000000",
    telegram: "https://t.me/",
    telegramLabel: "@pro_duct",
    email: "hello@example.com",
    address: "Toshkent, O'zbekiston",
    hours: "Har kuni 09:00 — 21:00",
  },
  nav: [
    { href: "/catalog", label: "Kategoriyalar" },
    { href: "/custom-pc", label: "PC Konfigurator" },
    { href: "/benefits", label: "Afzalliklar" },
    { href: "/brands", label: "Brendlar" },
  ],
} as const;
