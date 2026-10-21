"use client";

import { useRef } from "react";
import { ArrowRight, BadgePercent, Lock, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { useReveal } from "@/components/animations/useReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/layout/TransitionLink";

// TODO: replace the generic wording with the store's real terms (days, regions, warranty length…).
const benefits = [
  {
    icon: Truck,
    title: "Yetkazib berish",
    text: "Buyurtmangizni qulay manzilingizga tezkor va ehtiyotkorlik bilan yetkazamiz.",
  },
  {
    icon: ShieldCheck,
    title: "Kafolat",
    text: "Barcha qurilmalarga kafolat beriladi — xarid xotirjam bo'lishi uchun.",
  },
  {
    icon: RotateCcw,
    title: "Qaytarish",
    text: "Qurilma mos kelmasa, shartlarga muvofiq qaytarish yoki almashtirish mumkin.",
  },
  {
    icon: Lock,
    title: "Xavfsiz to'lov",
    text: "To'lov ma'lumotlaringiz himoyalangan. Qulay to'lov usullaridan birini tanlang.",
  },
  {
    icon: BadgePercent,
    title: "Narx afzalliklari",
    text: "Halol narxlar, vaqti-vaqti bilan chegirmalar va maxsus takliflar.",
  },
] as const;

export function Benefits() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="benefits" ref={root} className="relative scroll-mt-24 border-y border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <SectionHeading
          eyebrow="Afzalliklar"
          title="Xarid — oddiy va ishonchli."
          description="Tanlashdan olishgacha — har bir qadamda yoningizdamiz."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:mt-20 md:grid-cols-2 lg:grid-cols-6">
          {benefits.map((b, i) => (
            <li
              key={b.title}
              data-reveal
              className={`group relative bg-graphite p-7 transition-colors duration-500 hover:bg-panel md:p-9 ${
                i < 2 ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-white/5 text-fog transition-all duration-500 group-hover:scale-110 group-hover:border-white/25 group-hover:bg-white group-hover:text-black">
                <b.icon className="size-5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-smoke">{b.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <TransitionLink
            href="/benefits"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-6 py-3 text-xs font-medium text-fog transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <span>Barcha afzalliklar va kafolatlar bilan tanishish</span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
