"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { getProduct } from "@/data/products";
import { gsap, useGSAP, withMotion } from "@/components/animations/gsap";
import { EASE } from "@/components/animations/motion";
import { Button } from "@/components/ui/Button";
import { OpenConsult } from "@/components/ui/OpenConsult";
import { Price } from "@/components/ui/Price";
import { SplitWords } from "@/components/ui/SplitWords";
import { Macbook3D } from "@/components/3d/Macbook3D";

const stepCopy = [
  "Har bir detal — ish va dam olish uchun qulaylik yaratadi.",
  "Kundalik vazifalardan og'ir loyihalargacha — hammasiga tayyor.",
  "Uzoq vaqt ishonchli xizmat qilishi uchun puxta tayyorlangan.",
];

/**
 * Product Showcase (TZ §4): the flagship is pinned full-screen and scroll
 * progress drives 3D rotation, scale, and translateX/Y while feature callouts swap.
 * On mobile (or reduced motion) it stays a normal, readable section.
 */
export function ProductShowcase() {
  const root = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef(0);
  const product = getProduct("macbook-pro-14");

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      return withMotion(el, ({ reduce, mobile }) => {
        if (reduce) return;

        const prod = q("[data-sc='product']");
        const steps = q("[data-sc='step']");

        // Phones: keep the flow, give the product a light scroll-driven turn.
        if (mobile) {
          gsap.fromTo(
            prod,
            { scale: 0.8, opacity: 0.4 },
            {
              scale: 1,
              opacity: 1,
              ease: EASE.none,
              scrollTrigger: {
                trigger: prod[0],
                start: "top 88%",
                end: "center 50%",
                scrub: true,
                onUpdate: (self) => {
                  scrollProgressRef.current = self.progress;
                },
              },
            },
          );
          steps.forEach((s) =>
            gsap.from(s, {
              opacity: 0,
              y: 36,
              duration: 0.9,
              ease: EASE.out,
              scrollTrigger: { trigger: s, start: "top 90%", once: true },
            }),
          );
          return;
        }

        // Tablet / desktop: pinned, scrubbed stage.
        el.classList.add("sc-pinned");
        const intro = q("[data-sc='intro']");
        const cta = q("[data-sc='cta']");
        const glow = q("[data-sc='glow']");
        const bar = q("[data-sc='bar'] > span");

        gsap.set(steps, { yPercent: -50, opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: EASE.none },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=460%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              scrollProgressRef.current = self.progress;
            },
          },
        });

        tl.fromTo(
          prod,
          { scale: 0.65, yPercent: 8, opacity: 0.15 },
          { scale: 0.95, yPercent: 0, opacity: 1, duration: 1.2, ease: "power1.out" },
          0,
        )
          .fromTo(glow, { scale: 0.6, opacity: 0 }, { scale: 1.25, opacity: 1, duration: 9 }, 0)
          .to(bar, { scaleX: 1, duration: 9 }, 0)
          .to(intro, { opacity: 0, y: -50, duration: 0.8 }, 0.8)
          // ── 1. Step 1 (Left card, enters left to right) ───────────
          // Product swings right, card slides in from left to right
          .to(prod, { xPercent: 28, scale: 1, duration: 1 }, 1.0)
          .fromTo(
            steps[0],
            { opacity: 0, x: -70, yPercent: -50 },
            { opacity: 1, x: 0, yPercent: -50, duration: 0.6, ease: "power2.out" },
            1.2,
          )
          // Long comfortable hold in middle of screen (1.8 to 3.2)
          .to(steps[0], { opacity: 0, x: -50, yPercent: -50, duration: 0.4, ease: "power2.in" }, 3.2)
          // ── 2. Step 2 (Right card, enters right to left) ──────────
          // Product swings left, card slides in from right to left
          .to(prod, { xPercent: -28, scale: 1.08, duration: 1 }, 3.2)
          .fromTo(
            steps[1],
            { opacity: 0, x: 70, yPercent: -50 },
            { opacity: 1, x: 0, yPercent: -50, duration: 0.6, ease: "power2.out" },
            3.6,
          )
          // Long comfortable hold in middle of screen (4.2 to 5.6)
          .to(steps[1], { opacity: 0, x: 50, yPercent: -50, duration: 0.4, ease: "power2.in" }, 5.6)
          // ── 3. Step 3 (Left card, enters left to right) ───────────
          // Product swings back right, card slides in from left to right
          .to(prod, { xPercent: 24, scale: 1.14, duration: 1 }, 5.6)
          .fromTo(
            steps[2],
            { opacity: 0, x: -70, yPercent: -50 },
            { opacity: 1, x: 0, yPercent: -50, duration: 0.6, ease: "power2.out" },
            6.0,
          )
          // Long comfortable hold in middle of screen (6.6 to 7.8)
          .to(steps[2], { opacity: 0, x: -50, yPercent: -50, duration: 0.4, ease: "power2.in" }, 7.8)
          // ── Finale — centred, call to action ───────────────────────
          .to(prod, { xPercent: 0, scale: 1.02, yPercent: -6, duration: 0.9 }, 7.9)
          .fromTo(cta, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 8.4);

        return () => el.classList.remove("sc-pinned");
      });
    },
    { scope: root },
  );

  if (!product) return null;

  return (
    <section
      id="showcase"
      ref={root}
      className="relative isolate overflow-hidden bg-ink py-24 md:py-32"
      aria-label={`${product.name} — taqdimot`}
    >
      <div
        data-sc="glow"
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(1100px,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.13),rgb(255_255_255/0.03)_55%,transparent)]"
      />

      <div className="sc-stage relative mx-auto flex max-w-[1440px] flex-col items-center px-5 md:px-10">
        <div data-sc="intro" className="sc-intro text-center">
          <span className="glass inline-flex rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-smoke">
            Product showcase
          </span>
          <SplitWords
            as="h2"
            text={product.name}
            className="mt-6 block text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-[1.06] tracking-[-0.045em]"
            wordClassName="text-fade"
          />
          <p className="mx-auto mt-5 max-w-md text-base text-smoke md:text-lg">{product.tagline}</p>
        </div>

        <div className="sc-product relative mx-auto mt-12 w-[min(900px,100%)]">
          <div data-sc="product" className="relative aspect-[4/3] w-full will-change-transform">
            <Macbook3D mode="showcase" scrollProgressRef={scrollProgressRef} />
          </div>
        </div>
      </div>

      <ul className="sc-steps mx-auto mt-12 grid max-w-5xl gap-4 px-5 md:grid-cols-3">
        {product.highlights.slice(0, 3).map((h, i) => (
          <li
            key={h}
            data-sc="step"
            data-side={i % 2 === 0 ? "left" : "right"}
            className="sc-step surface rounded-2xl p-5 md:p-6 [.sc-pinned_&]:border [.sc-pinned_&]:border-white/10 [.sc-pinned_&]:bg-black/60 [.sc-pinned_&]:backdrop-blur-xl [.sc-pinned_&]:shadow-2xl"
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-6 items-center justify-center rounded-full border border-white/15 bg-white/10 font-mono text-[11px] font-semibold text-white">
                0{i + 1}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-ash">
                MacBook Pro M3
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.025em] text-white md:text-xl">
              {h}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-smoke">
              {stepCopy[i]}
            </p>
          </li>
        ))}
      </ul>

      <div data-sc="cta" className="sc-cta mx-auto mt-12 flex flex-col items-center gap-5 px-5 text-center">
        <Price price={product.price} oldPrice={product.oldPrice} size="lg" className="justify-center" />
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button href={`/product/${product.slug}`} size="lg" magnetic icon={<ArrowRight className="size-4" />}>
            Batafsil ko&apos;rish
          </Button>
          <OpenConsult variant="secondary" size="lg" subject={product.name}>
            Konsultatsiya
          </OpenConsult>
        </div>
      </div>

      <div data-sc="bar" aria-hidden className="sc-bar">
        <span />
      </div>
    </section>
  );
}
