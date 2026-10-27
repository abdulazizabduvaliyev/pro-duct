"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Heart, Menu, Moon, Phone, Search, ShoppingBag, Sun, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useCart, useWishlist } from "@/lib/store";
import { useUI } from "@/lib/ui-state";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { gsap, ScrollTrigger, useGSAP, withMotion } from "@/components/animations/gsap";
import { DUR, EASE, STAGGER } from "@/components/animations/motion";
import { useOverlay } from "@/components/animations/useOverlay";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, TelegramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { TransitionLink } from "./TransitionLink";

function CountBadge({ count }: { count: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(count);

  useEffect(() => {
    if (count > prev.current && ref.current) {
      gsap.fromTo(ref.current, { scale: 0.4 }, { scale: 1, duration: 0.6, ease: EASE.pop });
    }
    prev.current = count;
  }, [count]);

  if (count <= 0) return null;
  return (
    <span
      ref={ref}
      className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-fog px-1 text-[10px] font-bold leading-none text-ink shadow-sm"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

const iconBtn =
  "relative flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full text-fog/85 transition-colors duration-300 hover:bg-fog/10 hover:text-fog";

/**
 * Navbar transform (TZ §4): transparent full-width bar → compact floating dark
 * glass pill with blur once the page is scrolled.
 */
export function Navbar() {
  const header = useRef<HTMLElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useI18n();
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { setCartOpen, setSearchOpen, menuOpen, setMenuOpen, openConsult } = useUI();

  const navItems = [
    { href: "/catalog", label: t("nav.catalog") },
    { href: "/custom-pc", label: t("nav.customPc") },
    { href: "/benefits", label: t("nav.benefits") },
    { href: "/brands", label: t("nav.brands") },
  ];

  useGSAP(
    () => {
      const root = header.current;
      const bar = shell.current;
      const glass = bg.current;
      if (!root || !bar || !glass) return;

      return withMotion(root, ({ reduce, mobile }) => {
        const items = root.querySelectorAll("[data-nav-in]");

        if (reduce) {
          gsap.set(items, { opacity: 1, y: 0, clearProps: "filter" });
        } else {
          gsap.fromTo(
            items,
            { y: -18, opacity: 0, filter: "blur(10px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: DUR.base,
              ease: EASE.out,
              stagger: STAGGER.tight,
              delay: 0.15,
              clearProps: "filter",
            },
          );
        }

        const compact = gsap
          .timeline({ paused: true, defaults: { duration: 0.55, ease: EASE.out } })
          .to(bar, { height: mobile ? 52 : 56, maxWidth: 1160, marginTop: mobile ? 8 : 10, borderRadius: 999 }, 0)
          .to(glass, { opacity: 1 }, 0);

        const go = (forward: boolean) => {
          if (reduce) compact.progress(forward ? 1 : 0);
          else if (forward) compact.play();
          else compact.reverse();
        };

        if (typeof window !== "undefined" && window.scrollY > 40) {
          compact.progress(1);
        }

        ScrollTrigger.create({
          start: 40,
          end: "max",
          onEnter: () => go(true),
          onLeaveBack: () => go(false),
        });
      });
    },
    { scope: header },
  );

  return (
    <>
      <header ref={header} className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center px-2 sm:px-3">
        <div
          ref={shell}
          className="pointer-events-auto relative flex h-16 sm:h-20 w-full max-w-[1440px] items-center justify-between gap-2 px-3 sm:gap-3 sm:px-5 md:px-7"
        >
          <span
            ref={bg}
            aria-hidden
            className={cn(
              "absolute inset-0 -z-10 rounded-[inherit] border border-line bg-ink/75 opacity-0 shadow-lg shadow-black/5 backdrop-blur-2xl backdrop-saturate-150 transition-opacity dark:bg-ink/70 dark:shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)]",
              menuOpen && "!opacity-0",
            )}
          />

          <TransitionLink
            href="/"
            aria-label="PRO DUCT — bosh sahifa"
            data-nav-in
            onClick={() => {
              if (menuOpen) setMenuOpen(false);
            }}
            className="block shrink-0"
          >
            <Logo title="" className="h-6 w-auto sm:h-7 md:h-8" />
          </TransitionLink>

          <nav aria-label="Asosiy" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = item.href === pathname;
                return (
                  <li key={item.href} data-nav-in>
                    <TransitionLink
                      href={item.href}
                      className={cn(
                        "rounded-full px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-300 hover:bg-fog/10 hover:text-fog",
                        active ? "text-fog font-semibold bg-fog/10" : "text-fog/70",
                      )}
                    >
                      {item.label}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
            {/* Search */}
            <button
              type="button"
              data-nav-in
              onClick={() => setSearchOpen(true)}
              aria-label={t("nav.search")}
              title={t("nav.search")}
              className={cn(iconBtn, menuOpen && "max-lg:hidden")}
            >
              <Search className="size-[17px] sm:size-[18px]" strokeWidth={1.8} />
            </button>

            {/* Wishlist */}
            <TransitionLink
              href="/wishlist"
              data-nav-in
              aria-label={t("nav.wishlist")}
              title={t("nav.wishlist")}
              className={cn(iconBtn, menuOpen && "max-lg:hidden")}
            >
              <Heart className="size-[17px] sm:size-[18px]" strokeWidth={1.8} />
              <CountBadge count={wishCount} />
            </TransitionLink>

            {/* Cart */}
            <button
              type="button"
              data-nav-in
              onClick={() => setCartOpen(true)}
              aria-label={t("nav.cart")}
              title={t("nav.cart")}
              className={cn(iconBtn, menuOpen && "max-lg:hidden")}
            >
              <ShoppingBag className="size-[17px] sm:size-[18px]" strokeWidth={1.8} />
              <CountBadge count={cartCount} />
            </button>

            {/* Language Switcher Pill (hidden on small mobile; available inside mobile menu) */}
            <div
              data-nav-in
              className={cn(
                "hidden sm:flex items-center rounded-full border border-line bg-panel/60 p-0.5",
                menuOpen && "max-lg:hidden",
              )}
            >
              <button
                type="button"
                onClick={() => setLang("uz")}
                title="O'zbekcha"
                className={cn(
                  "rounded-full px-2 py-1 text-[11px] font-bold transition-all",
                  lang === "uz"
                    ? "bg-fog text-ink shadow-sm"
                    : "text-ash hover:text-fog",
                )}
              >
                UZ
              </button>
              <button
                type="button"
                onClick={() => setLang("ru")}
                title="Русский"
                className={cn(
                  "rounded-full px-2 py-1 text-[11px] font-bold transition-all",
                  lang === "ru"
                    ? "bg-fog text-ink shadow-sm"
                    : "text-ash hover:text-fog",
                )}
              >
                RU
              </button>
            </div>

            {/* Theme Toggle Button (hidden on small mobile; available inside mobile menu) */}
            <button
              type="button"
              data-nav-in
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("common.lightMode") : t("common.darkMode")}
              title={theme === "dark" ? t("common.lightMode") : t("common.darkMode")}
              className={cn(iconBtn, "hidden sm:flex", menuOpen && "max-lg:hidden")}
            >
              {theme === "dark" ? (
                <Sun className="size-[17px] sm:size-[18px] text-amber-300 transition-transform duration-300 hover:rotate-45" strokeWidth={1.8} />
              ) : (
                <Moon className="size-[17px] sm:size-[18px] text-sky-400 transition-transform duration-300 hover:-rotate-12" strokeWidth={1.8} />
              )}
            </button>

            {/* Consultation CTA */}
            <button
              type="button"
              data-nav-in
              onClick={() => openConsult()}
              className="ml-1.5 hidden h-9 items-center rounded-full bg-fog px-4 text-[13px] font-semibold text-ink transition-colors hover:bg-fog/85 xl:inline-flex"
            >
              {t("nav.consult")}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              data-nav-in
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(iconBtn, "lg:hidden", menuOpen && "bg-fog/10 text-fog")}
            >
              {menuOpen ? <X className="size-5" strokeWidth={1.8} /> : <Menu className="size-5" strokeWidth={1.8} />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu />
    </>
  );
}

function MobileMenu() {
  const { menuOpen, setMenuOpen, openConsult } = useUI();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useI18n();
  const { count: wishCount } = useWishlist();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const close = () => setMenuOpen(false);
  useOverlay({ open: menuOpen, onClose: close, root, backdrop, panel, from: "top" });

  useGSAP(
    () => {
      if (!menuOpen || !panel.current) return;
      const items = panel.current.querySelectorAll("[data-menu-item]");
      gsap.fromTo(
        items,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: EASE.out, stagger: 0.06, delay: 0.15 },
      );
    },
    { dependencies: [menuOpen], scope: panel },
  );

  const navItems = [
    { href: "/catalog", label: t("nav.catalog") },
    { href: "/custom-pc", label: t("nav.customPc") },
    { href: "/benefits", label: t("nav.benefits") },
    { href: "/brands", label: t("nav.brands") },
  ];

  return (
    <div
      ref={root}
      id="mobile-menu"
      inert={!menuOpen}
      className="fixed inset-0 z-[55] hidden lg:!hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menyu"
    >
      <div ref={backdrop} onClick={close} className="absolute inset-0 bg-ink/90 opacity-0 backdrop-blur-2xl dark:bg-ink/95" />
      <div
        ref={panel}
        tabIndex={-1}
        className="no-scrollbar relative flex h-full min-h-[100dvh] flex-col justify-between overflow-y-auto px-5 pb-8 pt-20 outline-none sm:px-8 sm:pb-10 sm:pt-24"
      >
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Mobile Theme & Language Row */}
          <div data-menu-item className="flex items-center justify-between border-b border-line pb-4 pt-1">
            <div className="flex items-center gap-1 rounded-full border border-line bg-panel p-1">
              <button
                type="button"
                onClick={() => setLang("uz")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-bold transition-all",
                  lang === "uz" ? "bg-fog text-ink shadow-sm" : "text-smoke hover:text-fog",
                )}
              >
                O&apos;zbekcha
              </button>
              <button
                type="button"
                onClick={() => setLang("ru")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-bold transition-all",
                  lang === "ru" ? "bg-fog text-ink shadow-sm" : "text-smoke hover:text-fog",
                )}
              >
                Русский
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1.5 text-xs font-semibold text-fog transition-colors hover:bg-fog/10"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="size-4 text-amber-300" />
                  <span>{t("common.lightMode")}</span>
                </>
              ) : (
                <>
                  <Moon className="size-4 text-sky-400" />
                  <span>{t("common.darkMode")}</span>
                </>
              )}
            </button>
          </div>

          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = item.href === pathname;
              return (
                <li key={item.href} data-menu-item>
                  <TransitionLink
                    href={item.href}
                    onClick={close}
                    className={cn(
                      "flex items-center justify-between py-2.5 text-2xl font-semibold tracking-[-0.03em] transition-colors sm:py-3.5 sm:text-3xl",
                      active ? "text-fog font-bold" : "text-smoke hover:text-fog",
                    )}
                  >
                    <span>{item.label}</span>
                    {active && <span className="size-2 rounded-full bg-fog" />}
                  </TransitionLink>
                </li>
              );
            })}
            <li data-menu-item>
              <TransitionLink
                href="/wishlist"
                onClick={close}
                className={cn(
                  "flex items-center justify-between py-2.5 text-2xl font-semibold tracking-[-0.03em] transition-colors sm:py-3.5 sm:text-3xl",
                  pathname === "/wishlist" ? "text-fog font-bold" : "text-smoke hover:text-fog",
                )}
              >
                <span>{t("nav.wishlist")}</span>
                {wishCount > 0 ? (
                  <span className="flex min-w-[22px] items-center justify-center rounded-full bg-fog px-1.5 text-xs font-bold text-ink">
                    {wishCount}
                  </span>
                ) : pathname === "/wishlist" ? (
                  <span className="size-2 rounded-full bg-fog" />
                ) : null}
              </TransitionLink>
            </li>
          </ul>
        </div>

        <div data-menu-item className="mt-8 flex flex-col gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => {
              close();
              openConsult();
            }}
            className="inline-flex h-12 items-center justify-center rounded-full bg-fog text-sm font-semibold text-ink transition-transform active:scale-95 sm:h-14 sm:text-base"
          >
            {t("nav.consult")}
          </button>
          <a href={site.contacts.phoneHref} className="inline-flex items-center justify-center gap-2 text-center text-sm font-medium text-fog transition-colors hover:text-fog/70">
            <Phone className="size-4 shrink-0 text-smoke" strokeWidth={1.8} />
            <span>{site.contacts.phone}</span>
          </a>
          <div className="flex items-center justify-center gap-3.5 text-xs text-smoke">
            <a href={site.contacts.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-fog">
              <TelegramIcon className="size-3.5 text-sky-400" />
              <span>Telegram</span>
            </a>
            <span className="text-ash/60">·</span>
            <a href={site.contacts.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-fog">
              <InstagramIcon className="size-3.5 text-pink-400" />
              <span>Instagram</span>
            </a>
            <span className="text-ash/60">·</span>
            <a href={site.contacts.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-fog">
              <YoutubeIcon className="size-3.5 text-red-500" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
