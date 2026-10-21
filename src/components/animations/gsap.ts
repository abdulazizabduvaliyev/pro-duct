import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DUR, EASE, INTENSITY, MQ } from "./motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({ ease: EASE.out, duration: DUR.base });

export { gsap, ScrollTrigger, useGSAP };

export type MotionContext = {
  desktop: boolean;
  tablet: boolean;
  mobile: boolean;
  /** `prefers-reduced-motion: reduce` — skip movement, show final state. */
  reduce: boolean;
  /** 1 on desktop, lower on tablet/mobile. Multiply distances by it. */
  k: number;
};

/**
 * `gsap.matchMedia` wrapper that hands the callback a ready-made device
 * profile. Returns a cleanup function — return it from `useGSAP`.
 *
 *   useGSAP(() => withMotion(root.current, ({ reduce, k }) => { ... }), { scope: root });
 */
export function withMotion(
  scope: Element | null | undefined,
  fn: (ctx: MotionContext) => void | (() => void),
) {
  const mm = gsap.matchMedia(scope ?? undefined);
  mm.add(
    {
      desktop: MQ.desktop,
      tablet: MQ.tablet,
      mobile: MQ.mobile,
      reduce: MQ.reduce,
    },
    (ctx) => {
      const c = (ctx.conditions ?? {}) as Record<string, boolean>;
      const desktop = !!c.desktop;
      const tablet = !!c.tablet;
      const mobile = !!c.mobile;
      return fn({
        desktop,
        tablet,
        mobile,
        reduce: !!c.reduce,
        k: desktop ? INTENSITY.desktop : tablet ? INTENSITY.tablet : INTENSITY.mobile,
      });
    },
  );
  return () => mm.revert();
}
