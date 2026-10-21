/**
 * Motion tokens — the single source of truth for easing, timing and
 * breakpoints. Every animation in the project reads from here so the whole
 * site moves with the same rhythm (TZ §5).
 */

export const EASE = {
  /** Default "settle" curve for reveals and cards. */
  out: "power3.out",
  /** Softer, for small UI (badges, icons). */
  soft: "power2.out",
  /** Cinematic entrance — long tail. */
  cinematic: "expo.out",
  /** Symmetric, for page transitions and overlays. */
  inOut: "expo.inOut",
  /** Exit curve. */
  in: "power3.in",
  /** Tiny overshoot for micro-interactions. */
  pop: "back.out(1.8)",
  /** Scrubbed animations must not ease. */
  none: "none",
} as const;

export const DUR = {
  fast: 0.4,
  base: 0.8,
  slow: 1.1,
  cinematic: 1.7,
} as const;

export const STAGGER = {
  tight: 0.05,
  base: 0.09,
  loose: 0.16,
} as const;

/** Media queries used by `withMotion` (see gsap.ts). */
export const MQ = {
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  mobile: "(max-width: 767px)",
  fine: "(hover: hover) and (pointer: fine)",
} as const;

/** How strongly distances/scales are applied per device class. */
export const INTENSITY = {
  desktop: 1,
  tablet: 0.7,
  mobile: 0.45,
} as const;
