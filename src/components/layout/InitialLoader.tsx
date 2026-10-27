"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/components/animations/gsap";
import { EASE, MQ } from "@/components/animations/motion";
import { forceUnlockScroll, getLenis, lockScroll, unlockScroll } from "@/lib/lenis";
import { useUI } from "@/lib/ui-state";
import { Logo } from "@/components/ui/Logo";
import { preloadMacbookModel } from "@/components/3d/Macbook3D";

/**
 * High-Performance Cinematic Preloader (Zero-Lag 120fps):
 * - Direct DOM & GPU transform updates (Zero React re-renders during loading)
 * - Emotional sequence: "PRO" animates in first, then "DUCT" smoothly unfolds
 * - Hardware-accelerated scaleX progress bar (no layout thrashing or CSS transitions)
 * - Cinematic curtain wipe reveal
 */
export function InitialLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBoxRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  const [hidden, setHidden] = useState(false);
  const { setInitialLoaded } = useUI();

  useEffect(() => {
    let unlocked = false;
    const unlock = () => {
      if (!unlocked) {
        unlocked = true;
        unlockScroll();
        forceUnlockScroll();
        getLenis()?.start();
      }
    };

    // If visitor requested reduced motion, bypass immediately
    if (window.matchMedia(MQ.reduce).matches) {
      const timer = window.setTimeout(() => {
        setInitialLoaded(true);
        setHidden(true);
        unlock();
      }, 0);
      return () => {
        window.clearTimeout(timer);
        unlock();
      };
    }

    lockScroll();

    const overlay = overlayRef.current;
    const content = contentRef.current;
    const glow = glowRef.current;
    const tagline = taglineRef.current;
    const progressBox = progressBoxRef.current;
    const bar = barRef.current;
    const counter = counterRef.current;
    const status = statusRef.current;

    if (!overlay || !content) {
      unlock();
      setInitialLoaded(true);
      setHidden(true);
      return;
    }

    let isComplete = false;
    const progressObj = { value: 0 };

    // Set initial hardware-accelerated transforms
    const proGroup = content.querySelector("[data-logo-pro]");
    const ductGroup = content.querySelector("[data-logo-duct]");
    const proLetters = content.querySelectorAll("[data-logo-letter-pro]");
    const ductLetters = content.querySelectorAll("[data-logo-letter-duct]");

    // Initial setup with GSAP
    if (proGroup) gsap.set(proGroup, { opacity: 0, scale: 0.8, y: 14, transformOrigin: "center center" });
    if (proLetters.length) gsap.set(proLetters, { opacity: 0, y: 16 });
    if (ductGroup) gsap.set(ductGroup, { opacity: 0, x: -32, transformOrigin: "left center" });
    if (ductLetters.length) gsap.set(ductLetters, { opacity: 0, y: 14 });
    if (glow) gsap.set(glow, { opacity: 0, scale: 0.7 });
    if (tagline) gsap.set(tagline, { opacity: 0, y: 12 });
    if (progressBox) gsap.set(progressBox, { opacity: 0, y: 10 });
    if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

    // ── 1. Master Cinematic Timeline ─────────────────────────
    const masterTl = gsap.timeline();

    // Step 1: PRO reveals with emotional spring
    masterTl
      .to(glow, {
        opacity: 0.65,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      }, 0.05)
      .to(proGroup, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.65,
        ease: "back.out(1.4)",
      }, 0.1)
      .to(proLetters, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
      }, 0.18)

      // Step 2: DUCT emerges smoothly from behind PRO
      .to(ductGroup, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power4.out",
      }, 0.5)
      .to(ductLetters, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.05,
        ease: "power3.out",
      }, 0.6)

      // Step 3: Tagline and Progress box glide in
      .to([tagline, progressBox], {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
      }, 0.75);

    // ── 2. Preload 3D Model During Opening Sequence ───────────
    preloadMacbookModel((percent) => {
      if (status && !isComplete && percent < 100) {
        status.textContent = `3D Model (${percent}%)`;
      }
    }).catch(() => {});

    // ── 3. Fluid Zero-Lag Progress Animation ─────────────────
    // Updates ONLY the DOM style.transform and textContent directly
    // Absolutely ZERO React re-renders = 100% pure 60/120fps smoothness!
    const progressTween = gsap.to(progressObj, {
      value: 100,
      duration: 1.6,
      ease: "power1.inOut",
      onUpdate: () => {
        const val = Math.min(100, progressObj.value);
        if (bar) {
          bar.style.transform = `scaleX(${Math.max(0.04, val / 100)})`;
        }
        if (counter) {
          counter.textContent = `${String(Math.round(val)).padStart(2, "0")}%`;
        }
      },
      onComplete: () => {
        finishExit();
      },
    });

    // Failsafe timeout
    const failsafe = window.setTimeout(() => {
      if (!isComplete) {
        progressTween.progress(1);
      }
    }, 2800);

    const finishExit = () => {
      if (isComplete) return;
      isComplete = true;
      window.clearTimeout(failsafe);

      // Status text update
      if (status) {
        status.textContent = "Tayyor";
        status.classList.remove("text-ash");
        status.classList.add("text-fog");
      }

      overlay.style.pointerEvents = "none";
      setInitialLoaded(true);

      const exitTl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          unlock();
          setHidden(true);
          ScrollTrigger.refresh();
        },
      });

      // Quick celebratory micro-pulse and clean curtain wipe
      exitTl
        .to(content, {
          scale: 1.025,
          duration: 0.18,
          ease: "power2.out",
        })
        .to(content, {
          opacity: 0,
          y: -24,
          scale: 0.98,
          duration: 0.35,
          ease: EASE.in,
        })
        .to(
          overlay,
          {
            yPercent: -100,
            duration: 0.8,
            ease: EASE.inOut,
          },
          "-=0.1",
        );
    };

    return () => {
      window.clearTimeout(failsafe);
      masterTl.kill();
      progressTween.kill();
      unlock();
    };
  }, [setInitialLoaded]);

  if (hidden) return null;

  return (
    <div
      id="initial-loader"
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[250] flex flex-col items-center justify-center bg-ink select-none overscroll-none"
      style={{ willChange: "transform" }}
    >
      {/* Ambient background atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(160,180,255,0.03)_40%,transparent_70%)] blur-3xl"
          style={{ willChange: "opacity, transform" }}
        />
        <div className="grid-lines absolute inset-0 opacity-20" />
      </div>

      {/* Center brand presentation */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center px-6" style={{ willChange: "transform, opacity" }}>
        {/* Animated Brand Logo */}
        <div className="relative">
          <Logo
            title="PRO DUCT"
            className="w-[min(68vw,340px)] h-auto drop-shadow-[0_16px_40px_rgba(0,0,0,0.95)]"
          />
        </div>

        {/* Micro brand tagline */}
        <div
          ref={taglineRef}
          className="mt-8 flex items-center gap-2.5 text-[11px] font-medium tracking-[0.28em] uppercase text-smoke"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-fog/70 animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-fog" />
          </span>
          <span>Premium Tech Store</span>
        </div>

        {/* Precision Hardware-Accelerated Progress Bar */}
        <div ref={progressBoxRef} className="mt-7 w-[min(72vw,280px)]">
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-line backdrop-blur-sm">
            {/* GPU-composited scaleX fill — ZERO reflows */}
            <div
              ref={barRef}
              className="size-full origin-left bg-fog shadow-[0_0_12px_rgba(255,255,255,0.95)]"
              style={{ transform: "scaleX(0.04)", willChange: "transform" }}
            />
          </div>

          <div className="mt-3.5 flex items-center justify-between text-[11px] font-mono tracking-widest text-smoke">
            <span ref={statusRef} className="uppercase text-ash text-[10px] transition-colors">
              Yuklanmoqda...
            </span>
            <span ref={counterRef} className="font-semibold text-fog tabular-nums text-[12px]">
              00%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
