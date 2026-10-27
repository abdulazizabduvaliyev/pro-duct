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
      className="absolute -right-0.5 -top-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold leading-[18px] text-black"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

const iconBtn =
  "relative flex size-10 items-center justify-center rounded-full text-fog/85 transition-colors duration-300 hover:bg-fog/10 hover:text-fog";

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

      return withMotion(root, ({ reduce }) => {
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
          .to(bar, { height: 56, maxWidth: 1160, marginTop: 10, borderRadius: 999 }, 0)
          .to(glass, { opacity: 1 }, 0);

        const go = (forward: boolean) => {
          if (reduce) compact.progress(forward ? 1 : 0);
          else if (forward) compact.play();
          else compact.reverse();
        };

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
          className="pointer-events-auto relative flex h-20 w-full max-w-[1440px] items-center justify-between gap-3 px-3 sm:px-5 md:px-7"
        >
          <span
            ref={bg}
            aria-hidden
            className="absolute inset-0 -z-10 rounded-[inherit] border border-white/10 bg-ink/65 opacity-0 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)] backdrop-blur-2xl backdrop-saturate-150"
          />

          <TransitionLink href="/" aria-label="PRO DUCT — bosh sahifa" data-nav-in className="block shrink-0">
            <Logo title="" className="h-7 w-auto md:h-8" />
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

          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Search */}
            <button
              type="button"
              data-nav-in
              onClick={() => setSearchOpen(true)}
              aria-label={t("nav.search")}
              title={t("nav.search")}
              className={iconBtn}
            >
              <Search className="size-[18px]" strokeWidth={1.8} />
            </button>

            {/* Wishlist */}
            <TransitionLink
              href="/wishlist"
              data-nav-in
              aria-label={t("nav.wishlist")}
              title={t("nav.wishlist")}
              className={iconBtn}
            >
              <Heart className="size-[18px]" strokeWidth={1.8} />
              <CountBadge count={wishCount} />
            </TransitionLink>

            {/* Cart */}
            <button
              type="button"
              data-nav-in
              onClick={() => setCartOpen(true)}
              aria-label={t("nav.cart")}
              title={t("nav.cart")}
              className={iconBtn}
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.8} />
              <CountBadge count={cartCount} />
            </button>

            {/* Language Switcher Pill */}
            <div data-nav-in className="flex items-center rounded-full border border-line bg-panel/60 p-0.5">
              <button
                type="button"
                onClick={() => setLang("uz")}
                title="O'zbekcha"
                className={cn(
                  "rounded-full px-2 py-1 text-[11px] font-bold transition-all",
                  lang === "uz"
                    ? "bg-white text-black shadow-sm"
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
                    ? "bg-white text-black shadow-sm"
                    : "text-ash hover:text-fog",
                )}
              >
                RU
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              data-nav-in
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("common.lightMode") : t("common.darkMode")}
              title={theme === "dark" ? t("common.lightMode") : t("common.darkMode")}
              className={iconBtn}
            >
              {theme === "dark" ? (
                <Sun className="size-[18px] text-amber-300 transition-transform duration-300 hover:rotate-45" strokeWidth={1.8} />
              ) : (
                <Moon className="size-[18px] text-sky-400 transition-transform duration-300 hover:-rotate-12" strokeWidth={1.8} />
              )}
            </button>

            {/* Consultation CTA */}
            <button
              type="button"
              data-nav-in
              onClick={() => openConsult()}
              className="ml-1.5 hidden h-9 items-center rounded-full bg-white px-4 text-[13px] font-semibold text-black transition-colors hover:bg-white/85 xl:inline-flex"
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
              className={cn(iconBtn, "lg:hidden")}
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
      <div ref={backdrop} onClick={close} className="absolute inset-0 bg-ink/90 opacity-0 backdrop-blur-2xl" />
      <div
        ref={panel}
        tabIndex={-1}
        className="no-scrollbar relative flex min-h-full flex-col justify-between overflow-y-auto px-6 pb-10 pt-24 outline-none sm:pt-28"
      >
        <div className="flex flex-col gap-6">
          {/* Mobile Theme & Language Row */}
          <div data-menu-item className="flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-1 rounded-full border border-line bg-panel p-1">
              <button
                type="button"
                onClick={() => setLang("uz")}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-bold transition-all",
                  lang === "uz" ? "bg-white text-black" : "text-smoke",
                )}
              >
                O&apos;zbekcha
              </button>
              <button
                type="button"
                onClick={() => setLang("ru")}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-bold transition-all",
                  lang === "ru" ? "bg-white text-black" : "text-smoke",
                )}
              >
                Русский
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1.5 text-xs font-semibold text-fog"
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

          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <li key={item.href} data-menu-item>
                <TransitionLink
                  href={item.href}
                  onClick={close}
                  className="block py-2 text-2xl font-semibold tracking-[-0.03em] text-fog transition-colors hover:text-fog/70 sm:py-3 sm:text-4xl"
                >
                  {item.label}
                </TransitionLink>
              </li>
            ))}
            <li data-menu-item>
              <TransitionLink
                href="/wishlist"
                onClick={close}
                className="block py-2 text-2xl font-semibold tracking-[-0.03em] text-fog transition-colors hover:text-fog/70 sm:py-3 sm:text-4xl"
              >
                {t("nav.wishlist")}
              </TransitionLink>
            </li>
          </ul>
        </div>

        <div data-menu-item className="mt-8 flex flex-col gap-3">
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
