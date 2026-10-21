"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, withMotion } from "./gsap";
import { DUR, EASE, STAGGER } from "./motion";

type RevealOptions = {
  /** Which children to reveal. Defaults to `[data-reveal]`. */
  selector?: string;
  /** Start distance in px (scaled down on tablet/mobile). */
  y?: number;
  start?: string;
  stagger?: number;
};

/**
 * Scroll reveal (TZ §4): items fade in from `y: 80 → 0`, `opacity 0 → 1`,
 * staggered per row as they enter the viewport.
 * Elements are hidden up-front by the `.anim [data-reveal]` rule in globals.css.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, options: RevealOptions = {}) {
  const { selector = "[data-reveal]", y = 80, start = "top 88%", stagger = STAGGER.base } = options;

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      return withMotion(root, ({ reduce, k }) => {
        const els = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(selector));
        if (!els.length) return;

        if (reduce) {
          gsap.set(els, { opacity: 1, y: 0 });
          return;
        }

        gsap.set(els, { y: y * k });

        ScrollTrigger.batch(els, {
          start,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: DUR.slow,
              ease: EASE.out,
              stagger,
              overwrite: true,
            }),
        });
      });
    },
    { scope },
  );
}
