import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Headphones,
  Lock,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { OpenConsultLink } from "@/components/ui/OpenConsult";

export const metadata: Metadata = {
  title: "Afzalliklar — Nega aynan PRO DUCT?",
  description:
    "100% original Apple va geyming texnikasi, 1 yildan 3 yilgacha rasmiy kafolat, bepul professional PC yig'ish va Toshkent bo'ylab 24 soatlik tezkor yetkazib berish.",
  alternates: { canonical: "/benefits" },
};

const MAIN_BENEFITS = [
  {
    icon: CheckCircle2,
    badge: "100% Kafolat",
    title: "Faqat Asl va Original Qurilmalar",
    description:
      "Bizda hech qanday qayta tiklangan (refurbished) yoki nusxa mahsulotlar yo'q. Barcha Apple, ASUS, NVIDIA, Lian Li, MSI qurilmalari zavod plombalari va xalqaro sertifikatlar bilan taqdim etiladi.",
  },
  {
    icon: ShieldCheck,
    badge: "Rasmiy Kafolat",
    title: "1 Yildan 3 Yilgacha To'liq Servis",
    description:
      "Har bir xarid uchun rasmiy muhrlangan kafolat taloni beriladi. Kafolat muddati davomida barcha servis, diagnostika va ehtiyot qismlarni bepul almashtirish kafolatlanadi.",
  },
  {
    icon: Cpu,
    badge: "Ekspert Yig'uv",
    title: "Professional PC Yig'ish & Stress-Test",
    description:
      "Maxsus kompyuterlar professional muhandislar tomonidan yig'iladi: ideal kabel-menejment, yuqori sifatli termopasta va topshirishdan oldin 24 soatlik uzluksiz stress-test.",
  },
  {
    icon: Truck,
    badge: "Ekspress Kuryer",
    title: "24 Soat Ichida Xavfsiz Yetkazish",
    description:
      "Toshkent shahri bo'ylab buyurtmangiz 24 soat ichida eshigingizgacha xavfsiz yetkaziladi. O'zbekistonning barcha viloyatlariga esa maxsus sug'urtalangan kuryerlik orqali jo'natiladi.",
  },
  {
    icon: RotateCcw,
    badge: "14 Kunlik Qoidalar",
    title: "Oson Qaytarish va Almashtirish",
    description:
      "Qurilma sizga ma'qul kelmasa yoki zavod nosozligi aniqlansa, 14 kun ichida hech qanday qiyinchiliksiz almashtirib beramiz yoki mablag'ingizni to'liq qaytarib beramiz.",
  },
  {
    icon: Lock,
    badge: "Shifrlangan & Ishonchli",
    title: "Xavfsiz va Qulay To'lov Usullari",
    description:
      "Click, Payme, Uzum Bank, naqd pul yoki yuridik shaxslar uchun bank hisob-fakturasi orqali to'lov qilishingiz mumkin. Hech qanday yashirin to'lovlar yoki ustamalar yo'q.",
  },
  {
    icon: Headphones,
    badge: "Doimiy Yordam",
    title: "Bepul Shaxsiy Maslahat va Qo'llab-quvvatlash",
    description:
      "Vazifalaringizga (og'ir o'yinlar, 3D render, arxitektura yoki ofis ishlari) to'liq mos keladigan optimal konfiguratsiyani tanlashda mutaxassislarimiz bepul yordam beradi.",
  },
  {
    icon: RefreshCw,
    badge: "Trade-In Tizimi",
    title: "Eski Qurilmani Yangisiga Yangilash",
    description:
      "Eski noutbuk yoki shaxsiy kompyuteringizni keltirib baholating va qo'shimcha to'lov evaziga eng so'nggi avlod texnikasiga ega bo'ling. Tez, qulay va manfaatli.",
  },
];

const TRUST_STATS = [
  { value: "5,000+", label: "Mamnun Xaridorlar", note: "O'zbekiston bo'ylab 3 yil ichida" },
  { value: "100%", label: "Asl Texnika", note: "Faqat original zavod partiyalari" },
  { value: "24 Soat", label: "Tezkor Yetkazish", note: "Toshkent shahri bo'ylab bepul" },
  { value: "0 so'm", label: "PC Yig'ish & Test", note: "Professional sovg'a sifatida" },
];

const STEPS = [
  {
    step: "01",
    title: "Qurilmani Tanlang",
    description:
      "Katalogimizdagi tayyor mahsulotlarni tanlang yoki PC Konfigurator orqali orzuingizdagi kompyuterni bir necha daqiqada yig'ing.",
  },
  {
    step: "02",
    title: "Tekshirib Qabul Qiling",
    description:
      "Kuryer mahsulotni yetkazib berganda, uni bemalol ochib, tekshirib, yoqib ko'rib, barcha parametrlari to'g'ri ekanligiga ishonch hosil qiling.",
  },
  {
    step: "03",
    title: "Uzoq Yillik Xotirjamlik",
    description:
      "Rasmiy kafolat taloni va doimiy texnik qo'llab-quvvatlash bilan yangi qurilmangizdan maroq bilan foydalaning.",
  },
];

export default function BenefitsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-20 sm:px-6 sm:pt-24 md:px-10 md:pb-28 md:pt-28">
      {/* ── Breadcrumb ── */}
      <nav aria-label="Yo'l" className="mb-6 flex items-center gap-1.5 text-xs text-ash">
        <TransitionLink href="/" className="transition-colors hover:text-fog">
          Bosh sahifa
        </TransitionLink>
        <ChevronRight className="size-3.5" />
        <span className="text-smoke">Afzalliklar</span>
      </nav>

      {/* ── Page Header ── */}
      <div className="mb-10 flex flex-col items-start gap-3 sm:gap-4 md:mb-16">
        <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide text-smoke sm:px-4">
          <Sparkles className="size-3.5 text-fog" />
          PRO DUCT Standartlari
        </span>

        <h1 className="text-[clamp(1.9rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-fog">
          Nega aynan PRO DUCT?
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-smoke sm:text-base md:text-lg">
          Biz shunchaki texnika sotmaymiz — biz sizga eng ishonchli xarid tajribasi, rasmiy kafolat, professional yordam va tezkor xizmatni taqdim etamiz. Har bir mijozimizning xotirjamligi biz uchun birinchi o&apos;rinda.
        </p>
      </div>

      {/* ── Trust Stats Row ── */}
      <div className="mb-14 grid grid-cols-2 gap-2.5 sm:gap-4 md:mb-16 lg:grid-cols-4">
        {TRUST_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-line bg-panel/60 p-4 text-center backdrop-blur-md sm:rounded-3xl sm:p-6"
          >
            <p className="font-mono text-xl font-bold tracking-tight text-fog sm:text-3xl md:text-4xl">
              {stat.value}
            </p>
            <h3 className="mt-1.5 text-xs font-semibold text-fog sm:mt-2 sm:text-sm">
              {stat.label}
            </h3>
            <p className="mt-0.5 text-[10px] text-smoke sm:mt-1 sm:text-xs">
              {stat.note}
            </p>
          </div>
        ))}
      </div>

      {/* ── Core Benefits Grid ── */}
      <div className="mb-20">
        <div className="mb-8">
          <span className="text-[11px] font-medium uppercase tracking-wider text-ash">
            Bizning Kafolatlarimiz
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-fog sm:text-3xl">
            Siz Uchun Yaratilgan Afzalliklar
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {MAIN_BENEFITS.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-panel/60 p-5 transition-all duration-300 hover:border-white/20 hover:bg-panel sm:rounded-3xl sm:p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-fog/5 text-fog transition-all duration-300 group-hover:scale-105 group-hover:bg-fog group-hover:text-ink sm:size-11 sm:rounded-2xl">
                    <item.icon className="size-5" />
                  </span>
                  <span className="rounded-full border border-line bg-panel-2 px-2.5 py-0.5 font-mono text-[10px] text-ash">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-semibold tracking-tight text-fog transition-colors sm:mt-5">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-smoke">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How It Works (3 Steps) ── */}
      <div className="mb-16 rounded-2xl border border-line bg-panel/70 p-5 backdrop-blur-md sm:mb-20 sm:rounded-3xl sm:p-10">
        <div className="mb-8 text-center sm:mb-10">
          <span className="text-[11px] font-medium uppercase tracking-wider text-ash">
            Oddiy va Shaffof
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-fog sm:text-3xl">
            Xarid Qilish Qanday Kechadi?
          </h2>
          <p className="mt-1 text-xs text-smoke sm:text-sm">
            Tanlashdan tortib yetkazib berishgacha — har bir qadamda yoningizdamiz
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="relative flex flex-col justify-between rounded-2xl border border-line/60 bg-panel/40 p-5 sm:p-6"
            >
              <div>
                <span className="font-mono text-2xl font-bold text-ash/40">
                  {s.step}
                </span>
                <h3 className="mt-2.5 text-base font-semibold text-fog sm:mt-3">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-smoke">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Call To Action ── */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-panel to-ink p-6 text-center sm:rounded-3xl sm:p-14">
        <div className="relative z-10 mx-auto max-w-xl">
          <h2 className="text-xl font-bold tracking-tight text-fog sm:text-3xl md:text-4xl">
            Orzuingizdagi texnikani tanlashga tayyormisiz?
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-smoke sm:text-sm">
            Katalogimizdagi yuzlab original mahsulotlar bilan tanishing yoki o&apos;zingizga mos maxsus geyming kompyuterini hisoblang.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
            <TransitionLink
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-fog px-6 py-3.5 text-xs font-semibold text-ink transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <span>Mahsulotlar Katalogi</span>
              <ArrowRight className="size-3.5" />
            </TransitionLink>

            <TransitionLink
              href="/custom-pc"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-panel-2 px-6 py-3.5 text-xs font-semibold text-fog transition-all hover:bg-fog/10"
            >
              <span>PC Konfigurator</span>
            </TransitionLink>

            <OpenConsultLink className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white/5 px-6 py-3.5 text-xs font-semibold text-fog transition-all hover:bg-white/10">
              <span>Savol Berish</span>
            </OpenConsultLink>
          </div>
        </div>
      </div>
    </div>
  );
}
