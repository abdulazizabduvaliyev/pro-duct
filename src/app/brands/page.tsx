import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { OpenConsultLink } from "@/components/ui/OpenConsult";
import { BrandLogo } from "@/components/ui/BrandLogo";

export const metadata: Metadata = {
  title: "Rasmiy Brendlar — PRO DUCT",
  description:
    "Apple, NVIDIA, ASUS ROG, Samsung, Intel, AMD, Lian Li, NZXT, Corsair, Dell, LG va Logitech rasmiy texnologiya brendlari va 100% original mahsulotlar.",
  alternates: { canonical: "/brands" },
};

type BrandItem = {
  name: string;
  slug: string;
  tagline: string;
  category: string;
  specialty: string;
  href: string;
  badge?: string;
  featured?: boolean;
};

const BRANDS_LIST: BrandItem[] = [
  {
    name: "Apple",
    slug: "apple",
    tagline: "MacBook Pro, iPhone 16 Pro, iPad Pro, Apple Watch va AirPods",
    category: "Flagman Ekosistema",
    specialty: "M3/M4 chiplar, Retina XDR displeylar va mukammal macOS/iOS integratsiyasi.",
    href: "/catalog?brand=apple",
    badge: "Top Flagman",
    featured: true,
  },
  {
    name: "NVIDIA",
    slug: "nvidia",
    tagline: "GeForce RTX 5090, RTX 5080, RTX 5060 va Blackwell arxitekturasi",
    category: "Grafika & Sun'iy Intellekt",
    specialty: "DLSS 4, nurlar kuzatuvi (Ray Tracing) va AI renderlashda dunyo yetakchisi.",
    href: "/custom-pc",
    badge: "Eng Kuchli GPU",
    featured: true,
  },
  {
    name: "ASUS & ROG",
    slug: "asus",
    tagline: "Republic of Gamers (ROG), TUF Gaming va ProArt seriyalari",
    category: "Geyming & Komponentlar",
    specialty: "Kuchli ona platalar, tezkor geyming monitorlar va flagman videokartalar.",
    href: "/catalog?brand=asus",
    badge: "Geymerlar Tanlovi",
    featured: true,
  },
  {
    name: "Samsung",
    slug: "samsung",
    tagline: "990 PRO NVMe SSD, Odyssey OLED monitorlar va Galaxy qurilmalari",
    category: "Xotira & Ekranlar",
    specialty: "7450 MB/s o'qish tezligiga ega PCIe 4.0 SSD va 240Hz OLED displeylar.",
    href: "/catalog?brand=samsung",
    badge: "Tezkor SSD",
  },
  {
    name: "AMD",
    slug: "amd",
    tagline: "Ryzen 7 7800X3D, Ryzen 9 7950X3D va AM5 ekotizimi",
    category: "Protsessorlar",
    specialty: "3D V-Cache texnologiyasi bilan o'yinlar uchun dunyodagi eng zo'r FPS.",
    href: "/custom-pc",
    badge: "Geyming CPU",
  },
  {
    name: "Intel",
    slug: "intel",
    tagline: "Core i9-14900K, i7-14700K va i5-14600K 14-avlod",
    category: "Protsessorlar",
    specialty: "Yuqori 6.0 GHz gacha chastota va 24 yadroli gibrid arxitektura.",
    href: "/custom-pc",
    badge: "6.0 GHz Flagman",
  },
  {
    name: "Lian Li",
    slug: "lianli",
    tagline: "O11 Dynamic EVO RGB, Galahad II LCD va Strimer kabellari",
    category: "Premium Korpuslar",
    specialty: "Panoramali shisha dizayn va eng yuqori havo oqimi samaradorligi.",
    href: "/custom-pc",
    badge: "Premium Estetika",
  },
  {
    name: "NZXT",
    slug: "nzxt",
    tagline: "Kraken Elite 360 LCD, H9 Flow va minimalistik geyming stansiyalar",
    category: "Sovutish & Dizayn",
    specialty: "Haqiqiy vaqtda harorat monitoring qiluvchi LCD ekranli suv sovutish tizimlari.",
    href: "/custom-pc",
  },
  {
    name: "Dell & Alienware",
    slug: "dell",
    tagline: "XPS 13/16, UltraSharp 4K IPS Black va Alienware displeylari",
    category: "Noutbuk & Monitor",
    specialty: "Ranglarni 100% to'g'ri ko'rsatuvchi professional monitorlar.",
    href: "/catalog?brand=dell",
  },
  {
    name: "Corsair",
    slug: "corsair",
    tagline: "Dominator Titanium DDR5, RM1000x Shift ATX 3.0 quvvat bloklari",
    category: "RAM & Blok Pitaniya",
    specialty: "Yuqori chastotali sovutgichli tezkor xotira va 80+ Gold/Platinum quvvat.",
    href: "/custom-pc",
  },
  {
    name: "Logitech & G",
    slug: "logitech",
    tagline: "G Pro X Superlight 2, MX Master 3S va Pro mexanik klaviaturalar",
    category: "Periferiya & Aksessuarlar",
    specialty: "Kiber-sport chempionlari tanlovi: 4KHz/8KHz polling rate va aniq sensorlar.",
    href: "/catalog?brand=logitech",
  },
  {
    name: "LG Electronics",
    slug: "lg",
    tagline: "UltraGear OLED 240Hz/360Hz geyming va UltraFine monitorlar",
    category: "OLED Displeylar",
    specialty: "0.03ms javob vaqti va cheksiz kontrastga ega geymerlik ekranlari.",
    href: "/catalog?brand=lg",
  },
];

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-24 md:px-10 md:pt-28">
      {/* ── Breadcrumb ── */}
      <nav aria-label="Yo'l" className="mb-6 flex items-center gap-1.5 text-xs text-ash">
        <TransitionLink href="/" className="transition-colors hover:text-white">
          Bosh sahifa
        </TransitionLink>
        <ChevronRight className="size-3.5" />
        <span className="text-smoke">Brendlar</span>
      </nav>

      {/* ── Page Header ── */}
      <div className="mb-12 flex flex-col items-start gap-4 md:mb-16">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-smoke">
          <Award className="size-3.5 text-white" />
          Rasmiy Hamkorlar & Ishlab Chiqaruvchilar
        </span>

        <h1 className="text-3xl font-semibold tracking-[-0.035em] text-fog sm:text-4xl md:text-5xl lg:text-6xl">
          Dunyoning Yetakchi Texnologiya Brendlari
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-smoke sm:text-base md:text-lg">
          Biz faqat jahon miqyosida tan olingan, o&apos;z sohasining eng ilg&apos;or flagmanlari bilan ishlaymiz. Har bir qurilma to&apos;g&apos;ridan-to&apos;g&apos;ri ishlab chiqaruvchi zavod plombalari va rasmiy xalqaro kafolati bilan yetkaziladi.
        </p>
      </div>

      {/* ── Quality Guarantees Bar ── */}
      <div className="mb-16 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-panel/60 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white">
            <CheckCircle2 className="size-5" />
          </span>
          <div>
            <h4 className="text-xs font-semibold text-white">100% Original Zavod Sifati</h4>
            <p className="text-[11px] text-smoke">Hech qanday nusxa yoki ochilgan mahsulot yo&apos;q</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-panel/60 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <h4 className="text-xs font-semibold text-white">Rasmiy Servis Kafolati</h4>
            <p className="text-[11px] text-smoke">Ishlab chiqaruvchi xalqaro standartlari asosida</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-panel/60 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white">
            <Globe2 className="size-5" />
          </span>
          <div>
            <h4 className="text-xs font-semibold text-white">To&apos;g&apos;ridan-To&apos;g&apos;ri Yetkazib Berish</h4>
            <p className="text-[11px] text-smoke">AQSh, Yevropa va Osiyo rasmiy distribyutorlaridan</p>
          </div>
        </div>
      </div>

      {/* ── Brands Directory Grid ── */}
      <div className="mb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-ash">
              Katalogdagi Brendlar
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Barcha Ishonchli Hamkorlarimiz
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-smoke sm:block">
            {BRANDS_LIST.length} ta yetakchi brend
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS_LIST.map((brand) => (
            <TransitionLink
              key={brand.slug}
              href={brand.href}
              className="group flex flex-col justify-between rounded-3xl border border-line bg-panel/60 p-6 transition-all duration-300 hover:border-white/20 hover:bg-panel"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-white/5 text-fog transition-all duration-300 group-hover:scale-105 group-hover:border-white/30 group-hover:bg-white group-hover:text-black">
                      <BrandLogo brand={brand.slug} className="size-6 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-ash">
                        {brand.category}
                      </span>
                      <h3 className="mt-0.5 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-fog sm:text-2xl">
                        {brand.name}
                      </h3>
                    </div>
                  </div>

                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-white/5 text-smoke transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>

                <p className="mt-3 text-xs font-medium text-smoke/90">
                  {brand.tagline}
                </p>

                <p className="mt-2 text-[11px] leading-relaxed text-ash">
                  {brand.specialty}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4 text-xs">
                {brand.badge ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-smoke">
                    {brand.badge}
                  </span>
                ) : (
                  <span className="text-[11px] text-ash">Original Partiya</span>
                )}
                <span className="flex items-center gap-1 font-medium text-fog group-hover:text-white">
                  <span>Mahsulotlarni ko&apos;rish</span>
                  <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>

      {/* ── Bottom Call To Action ── */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-[#141418] to-ink p-8 text-center sm:p-14">
        <div className="relative z-10 mx-auto max-w-xl">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-smoke">
            <Sparkles className="size-3.5 text-white" />
            Maxsus Buyurtma & Eksklyuziv
          </span>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Sizga kerakli modelni topa olmadingizmi?
          </h2>

          <p className="mt-3 text-xs leading-relaxed text-smoke sm:text-sm">
            Biz istalgan brenddagi eksklyuziv yoki kam uchraydigan konfiguratsiyalarni to&apos;g&apos;ridan-to&apos;g&apos;ri buyurtma asosida eng qisqa muddatda keltirib beramiz.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <OpenConsultLink className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98]">
              <span>Ekspert bilan bog&apos;lanish</span>
              <ArrowRight className="size-3.5" />
            </OpenConsultLink>

            <TransitionLink
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white/5 px-6 py-3.5 text-xs font-semibold text-fog transition-all hover:bg-white/10"
            >
              <span>Barcha Mahsulotlar</span>
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
