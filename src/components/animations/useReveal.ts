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
  const { selector = "[data-reveal]", y = 80, start = "top 90%", stagger = STAGGER.base } = options;

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

        const winH = typeof window !== "undefined" ? window.innerHeight : 800;
        const pending: HTMLElement[] = [];

        // Check if elements are already in/near viewport to reveal immediately
        els.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < winH * 0.92) {
            gsap.set(el, { opacity: 1, y: 0 });
          } else {
            gsap.set(el, { y: y * k, opacity: 0 });
            pending.push(el);
          }
        });

        if (!pending.length) return;

        // Use ScrollTrigger.batch for below-the-fold elements
        ScrollTrigger.batch(pending, {
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
          onEnterBack: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: DUR.slow,
              ease: EASE.out,
              stagger,
              overwrite: true,
            }),
        });

        // Fail-safe native IntersectionObserver: ensures elements ALWAYS reveal on mobile momentum scroll
        let io: IntersectionObserver | null = null;
        if (typeof IntersectionObserver !== "undefined") {
          io = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: DUR.slow,
                    ease: EASE.out,
                    overwrite: "auto",
                  });
                  io?.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.05, rootMargin: "0px 0px 80px 0px" },
          );

          pending.forEach((el) => io?.observe(el));
        }

        return () => {
          io?.disconnect();
        };
      });
    },
    { scope },
  );
}
