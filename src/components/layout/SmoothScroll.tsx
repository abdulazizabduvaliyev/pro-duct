"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/components/animations/gsap";
import { MQ } from "@/components/animations/motion";
import { setLenis } from "@/lib/lenis";

/** Lenis smooth scrolling (TZ §4), driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    if (window.matchMedia(MQ.reduce).matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
    const tick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    return () => {
      gsap.ticker.remove(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
