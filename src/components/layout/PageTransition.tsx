"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/components/animations/gsap";
import { EASE, MQ } from "@/components/animations/motion";
import { lockScroll, scrollToTarget, scrollToTop, unlockScroll } from "@/lib/lenis";
import { useUI } from "@/lib/ui-state";
import { Logo } from "@/components/ui/Logo";

type Ctx = { navigate: (href: string) => void };

const PageTransitionContext = createContext<Ctx>({
  navigate: (href) => {
    window.location.assign(href);
  },
});

export const usePageTransition = () => useContext(PageTransitionContext);

type Phase = "idle" | "covering" | "revealing";

/**
 * Page transition (TZ §4): a dark overlay wipes up, the route changes while it
 * covers the screen, then it lifts away to reveal the new page.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setCartOpen, setSearchOpen, setMenuOpen, closeConsult } = useUI();

  const overlay = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const phase = useRef<Phase>("idle");
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const pendingHash = useRef("");
  const lastPath = useRef(pathname);
  const failsafe = useRef<number | undefined>(undefined);

  const closeAll = useCallback(() => {
    setCartOpen(false);
    setSearchOpen(false);
    setMenuOpen(false);
    closeConsult();
  }, [setCartOpen, setSearchOpen, setMenuOpen, closeConsult]);

  const reveal = useCallback(() => {
    if (phase.current !== "covering") return;
    phase.current = "revealing";
    window.clearTimeout(failsafe.current);
    timeline.current?.kill();

    const el = overlay.current;
    const logo = mark.current;
    if (!el || !logo) {
      phase.current = "idle";
      unlockScroll();
      return;
    }

    gsap.to(logo, { opacity: 0, y: -16, duration: 0.3, ease: EASE.in });
    gsap.to(el, {
      yPercent: -100,
      duration: 0.85,
      delay: 0.2,
      ease: EASE.inOut,
      onComplete: () => {
        gsap.set(el, { display: "none" });
        phase.current = "idle";
        unlockScroll();
      },
    });
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const target = `${url.pathname}${url.search}${url.hash}`;

      // Same page: just scroll (hash) or swap the query string (filters) — no wipe.
      if (url.pathname === window.location.pathname) {
        if (url.search !== window.location.search) {
          closeAll();
          router.push(target, { scroll: false });
          scrollToTop();
        } else if (url.hash) {
          closeAll();
          scrollToTarget(url.hash);
        } else {
          closeAll();
          scrollToTop();
        }
        return;
      }

      if (phase.current !== "idle") return;
      closeAll();
      pendingHash.current = url.hash;

      const el = overlay.current;
      const logo = mark.current;
      if (window.matchMedia(MQ.reduce).matches || !el || !logo) {
        router.push(target);
        return;
      }

      phase.current = "covering";
      lockScroll();
      gsap.killTweensOf([el, logo]);
      gsap.set(el, { display: "flex", yPercent: 100 });
      gsap.set(logo, { opacity: 0, y: 24 });

      timeline.current = gsap
        .timeline()
        .to(el, { yPercent: 0, duration: 0.7, ease: EASE.inOut })
        .to(logo, { opacity: 1, y: 0, duration: 0.45, ease: EASE.out }, "-=0.3")
        .add(() => router.push(target));

      // never leave the visitor stuck behind the overlay
      window.clearTimeout(failsafe.current);
      failsafe.current = window.setTimeout(reveal, 4500);
    },
    [router, closeAll, reveal],
  );

  // Route actually changed → reset scroll under the overlay, then lift it.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    scrollToTop(true);
    const hash = pendingHash.current;
    pendingHash.current = "";

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (hash) scrollToTarget(hash, true);
    });

    reveal();
    const late = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(late);
    };
  }, [pathname, reveal]);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <div
        ref={overlay}
        aria-hidden
        style={{ display: "none" }}
        className="fixed inset-0 z-[200] items-center justify-center bg-ink"
      >
        <div ref={mark} className="opacity-0">
          <Logo title="" className="w-[min(60vw,320px)]" />
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}
