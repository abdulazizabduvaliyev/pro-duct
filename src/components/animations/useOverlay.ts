"use client";

import { useEffect, useRef, type RefObject } from "react";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { gsap, useGSAP } from "./gsap";
import { DUR, EASE, MQ } from "./motion";

type Side = "right" | "center" | "top";

type Options = {
  open: boolean;
  onClose: () => void;
  root: RefObject<HTMLElement | null>;
  backdrop: RefObject<HTMLElement | null>;
  panel: RefObject<HTMLElement | null>;
  from?: Side;
  /** Element to focus once open. Falls back to the panel itself. */
  focusRef?: RefObject<HTMLElement | null>;
};

const FROM: Record<Side, gsap.TweenVars> = {
  right: { xPercent: 100 },
  center: { y: 40, scale: 0.96, opacity: 0 },
  top: { yPercent: -8, opacity: 0 },
};

/**
 * Shared open/close animation for drawers, modals and overlays: backdrop fade,
 * panel slide/scale, scroll lock (Lenis-aware), Esc to close, focus handling.
 * The root element must be `hidden` by default (`display: none` via class).
 */
export function useOverlay({ open, onClose, root, backdrop, panel, from = "center", focusRef }: Options) {
  const mounted = useRef(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  // Callers pass a fresh `onClose` every render; keep the latest in a ref so the
  // open/close effect below doesn't re-run (and steal focus) on every keystroke.
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useGSAP(
    () => {
      const r = root.current;
      const b = backdrop.current;
      const p = panel.current;
      if (!r || !b || !p) return;

      const reduce = window.matchMedia(MQ.reduce).matches;
      const fromVars = FROM[from];

      if (open) {
        gsap.killTweensOf([r, b, p]);
        gsap.set(r, { display: "block" });
        if (reduce) {
          gsap.set(b, { opacity: 1 });
          gsap.set(p, { clearProps: "all" });
          return;
        }
        gsap.fromTo(b, { opacity: 0 }, { opacity: 1, duration: DUR.fast, ease: "power2.out" });
        gsap.fromTo(
          p,
          { ...fromVars },
          { xPercent: 0, yPercent: 0, y: 0, scale: 1, opacity: 1, duration: 0.85, ease: EASE.cinematic },
        );
      } else if (mounted.current) {
        gsap.killTweensOf([b, p]);
        const done = () => {
          gsap.set(r, { clearProps: "display" });
        };
        if (reduce) {
          done();
          return;
        }
        gsap.to(p, { ...fromVars, duration: 0.5, ease: EASE.in });
        gsap.to(b, { opacity: 0, duration: DUR.fast, delay: 0.1, ease: "power2.in", onComplete: done });
      }
    },
    { dependencies: [open, from], scope: root },
  );

  // scroll lock + focus + Esc
  useEffect(() => {
    if (!open) {
      mounted.current = true;
      return;
    }
    mounted.current = true;
    lockScroll();
    lastFocus.current = document.activeElement as HTMLElement | null;

    const focusTimer = window.setTimeout(() => {
      (focusRef?.current ?? panel.current)?.focus({ preventScroll: true });
    }, 120);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      unlockScroll();
      lastFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open, focusRef, panel]);
}
