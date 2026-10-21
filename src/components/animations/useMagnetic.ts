"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "./gsap";
import { MQ } from "./motion";

/**
 * Magnetic buttons (TZ §4): when the cursor comes near the element it is
 * gently pulled towards it, and eases back when the cursor leaves.
 * No-op on touch devices and with reduced motion.
 */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.35, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (!window.matchMedia(MQ.fine).matches || window.matchMedia(MQ.reduce).matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    let inside = false;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const radius = Math.max(r.width, r.height) * 0.9;
      const near = Math.hypot(dx, dy) < radius;

      if (near) {
        inside = true;
        xTo(dx * strength);
        yTo(dy * strength);
      } else if (inside) {
        inside = false;
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength, enabled]);
}
