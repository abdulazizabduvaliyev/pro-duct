"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, withMotion } from "@/components/animations/gsap";
import { DUR, EASE, STAGGER } from "@/components/animations/motion";
import { SplitWords } from "./SplitWords";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
};

/** Section title block: pill eyebrow, word-by-word headline, supporting copy. */
export function SectionHeading({ eyebrow, title, description, align = "left", action, className }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      return withMotion(el, ({ reduce, k }) => {
        const words = el.querySelectorAll(".split-word");
        const rest = el.querySelectorAll("[data-sh]");

        if (reduce) {
          gsap.set(words, { yPercent: 0 });
          gsap.set(rest, { opacity: 1, y: 0 });
          return;
        }

        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          })
          .fromTo(
            words,
            { yPercent: 118 },
            { yPercent: 0, duration: DUR.slow, ease: EASE.cinematic, stagger: STAGGER.tight },
            0,
          )
          .fromTo(
            rest,
            { opacity: 0, y: 24 * k },
            { opacity: 1, y: 0, duration: DUR.base, ease: EASE.out, stagger: STAGGER.base },
            0.1,
          );
      });
    },
    { scope: root },
  );

  const centered = align === "center";

  return (
    <div
      ref={root}
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        centered && "items-center text-center md:flex-col md:items-center md:justify-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", centered && "mx-auto")}>
        {eyebrow ? (
          <span
            data-sh
            className="mb-5 inline-flex items-center rounded-full border border-line bg-white/4 px-3.5 py-1.5 text-xs font-medium tracking-wide text-smoke"
          >
            {eyebrow}
          </span>
        ) : null}
        <SplitWords
          as="h2"
          text={title}
          className="block text-[clamp(1.75rem,5.5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-fog"
        />
        {description ? (
          <p
            data-sh
            className="mt-3.5 max-w-xl text-sm leading-relaxed text-smoke sm:mt-5 sm:text-base md:text-lg"
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div data-sh>
          {action}
        </div>
      ) : null}
    </div>
  );
}
