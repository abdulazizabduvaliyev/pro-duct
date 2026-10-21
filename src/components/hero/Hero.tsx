"use client";

import { useRef } from "react";
import { ArrowRight, BatteryFull, Cpu, MonitorSmartphone, Wrench } from "lucide-react";
import { gsap, useGSAP, withMotion } from "@/components/animations/gsap";
import { EASE } from "@/components/animations/motion";
import { Macbook3D } from "@/components/3d/Macbook3D";
import { Button } from "@/components/ui/Button";
import { OpenConsult } from "@/components/ui/OpenConsult";
import { SplitWords } from "@/components/ui/SplitWords";

const chips = [
  { icon: MonitorSmartphone, label: "Yorqin ekran", pos: "left-[3%] top-[26%] lg:left-[6%]", delay: "0s" },
  { icon: Cpu, label: "Kuchli protsessor", pos: "right-[2%] top-[16%] lg:right-[5%]", delay: "1.4s" },
  { icon: BatteryFull, label: "Kun bo'yi batareya", pos: "right-[8%] bottom-[26%] lg:right-[12%]", delay: "2.6s" },
] as const;

/**
 * Hero (TZ §3/§4): cinematic page-load entrance (stagger + blur/opacity, product
 * scale 1.15 → 1) and a three-layer scroll parallax — background, product and
 * text all travel at different speeds.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      return withMotion(el, ({ reduce, k }) => {
        const words = q(".split-word");
        const fades = q("[data-hero='fade']");
        const product = q("[data-hero='product']");
        const chipEls = q("[data-hero='chip']");

        if (reduce) {
          gsap.set(words, { opacity: 1, y: 0 });
          gsap.set([fades, product, chipEls], { opacity: 1 });
          return;
        }

        // ── Page load ─────────────────────────────────────────────
        const intro = gsap.timeline({ defaults: { ease: EASE.cinematic }, delay: 0.2 });
        intro
          .fromTo(q("[data-hero='glow']"), { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 2.4 }, 0)
          .fromTo(
            fades,
            { y: 28 * k, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.12, clearProps: "filter" },
            0.1,
          )
          .fromTo(
            words,
            { y: 32 * k, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.3, stagger: 0.08, clearProps: "filter" },
            0.15,
          )
          .fromTo(
            product,
            { scale: 1.15, y: 90 * k, opacity: 0, filter: "blur(14px)" },
            { scale: 1, y: 0, opacity: 1, filter: "blur(0px)", duration: 2, clearProps: "filter" },
            0.35,
          )
          .fromTo(
            chipEls,
            { y: 24, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: EASE.pop },
            1.3,
          );

        // ── Scroll parallax: each layer moves at its own speed ────
        gsap
          .timeline({
            defaults: { ease: EASE.none },
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 },
          })
          .to(q("[data-layer='bg']"), { yPercent: 24 * k }, 0)
          .to(q("[data-layer='text']"), { yPercent: -26 * k, opacity: 0.05 }, 0)
          .to(q("[data-layer='product']"), { yPercent: -9 * k, scale: 1 + 0.07 * k }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden pb-20 pt-20 md:pb-28 md:pt-24" aria-label="Bosh qism">
      {/* background layer */}
      <div data-layer="bg" aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-hero="glow" className="absolute inset-0">
          <div className="absolute left-1/2 top-[-12%] h-[72%] w-[120%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(255_255_255/0.16),transparent)] blur-2xl" />
          <div className="absolute left-[-10%] top-[30%] h-[60%] w-[55%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(120_130_255/0.12),transparent)] blur-3xl" />
          <div className="absolute bottom-[-6%] right-[-10%] h-[55%] w-[60%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(255_255_255/0.08),transparent)] blur-3xl" />
        </div>
        <div className="grid-lines absolute inset-0" />
        <div className="noise absolute inset-0" />
      </div>

      {/* text layer */}
      <div data-layer="text" className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 text-center">
        <span
          data-hero="fade"
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-smoke"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-white/70 [animation:pulse-ring_2s_ease-out_infinite]" />
            <span className="relative inline-flex size-1.5 rounded-full bg-white" />
          </span>
          Premium Tech Store
        </span>

        <SplitWords
          as="h1"
          text="Texnologiya. Premium darajada."
          className="mt-6 block text-[clamp(2.15rem,7.5vw,7rem)] font-semibold leading-[1.08] tracking-[-0.04em] sm:mt-7"
          wordClassName="text-fade"
        />

        <p data-hero="fade" className="mt-5 max-w-xl text-sm leading-relaxed text-smoke sm:mt-7 sm:text-base md:text-xl">
          MacBook, iPhone, iPad va boshqa premium qurilmalar — ishonchli kafolat va tezkor yetkazib berish bilan.
        </p>

        <div data-hero="fade" className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-2.5 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
          <Button href="/catalog" size="lg" magnetic icon={<ArrowRight className="size-4" />} className="w-full sm:w-auto">
            Katalogni ko&apos;rish
          </Button>
          <Button href="/custom-pc" variant="secondary" size="lg" magnetic icon={<Wrench className="size-4" />} className="w-full sm:w-auto">
            PC Konfigurator
          </Button>
          <OpenConsult variant="ghost" size="lg" magnetic className="w-full sm:w-auto">
            Konsultatsiya
          </OpenConsult>
        </div>
      </div>

      {/* product layer */}
      <div data-layer="product" className="relative z-0 mx-auto mt-10 w-full max-w-[1000px] px-2 sm:px-0 md:-mt-2">
        <div data-hero="product" className="relative aspect-[4/3] w-full">
          <Macbook3D mode="hero" interactive priority />
        </div>

        {chips.map(({ icon: Icon, label, pos, delay }) => (
          <div key={label} data-hero="chip" className={`pointer-events-none absolute hidden md:block ${pos}`}>
            <div className="float-slow glass pointer-events-auto flex items-center gap-2.5 rounded-full py-2 pl-2.5 pr-4 text-[13px] font-medium text-fog" style={{ animationDelay: delay }}>
              <span className="flex size-7 items-center justify-center rounded-full bg-white/10">
                <Icon className="size-3.5" strokeWidth={1.8} />
              </span>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* melt into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-graphite to-transparent" />
    </section>
  );
}
