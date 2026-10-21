"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, withMotion } from "./gsap";
import { EASE } from "./motion";

/**
 * Generic scroll parallax. Any element inside `scope` with
 * `data-parallax="0.2"` drifts by that fraction of 100px (negative = opposite
 * direction) while its parent travels through the viewport.
 */
export function useParallax(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      return withMotion(root, ({ reduce, k }) => {
        if (reduce) return;

        gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-parallax]")).forEach((el) => {
          const speed = parseFloat(el.dataset.parallax ?? "0.2") * 100 * k;
          gsap.fromTo(
            el,
            { y: -speed },
            {
              y: speed,
              ease: EASE.none,
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });
      });
    },
    { scope },
  );
}
