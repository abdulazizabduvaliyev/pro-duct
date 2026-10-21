import type Lenis from "lenis";

/**
 * Module-level handle on the Lenis instance so any component (page
 * transitions, modals, anchors) can scroll or lock scrolling without prop
 * drilling.
 */
let instance: Lenis | null = null;
let locks = 0;

export function setLenis(next: Lenis | null) {
  instance = next;
  if (next && locks > 0) next.stop();
}

export function getLenis() {
  return instance;
}

export function scrollToTop(immediate = false) {
  if (instance) instance.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
}

export function scrollToTarget(target: string | number | HTMLElement, immediate = false) {
  if (instance) {
    instance.scrollTo(target, { immediate, offset: -72 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "instant" : "smooth" });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  el?.scrollIntoView({ behavior: immediate ? "instant" : "smooth" });
}

/** Reference-counted scroll lock for drawers, modals and the mobile menu. */
export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    instance?.stop();
    document.documentElement.classList.add("is-locked");
  }
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    instance?.start();
    document.documentElement.classList.remove("is-locked");
  }
}

export function forceUnlockScroll() {
  locks = 0;
  instance?.start();
  document.documentElement.classList.remove("is-locked");
}
