"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { categories } from "@/data/categories";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { OpenConsultLink } from "@/components/ui/OpenConsult";
import { InstagramIcon, TelegramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { TransitionLink } from "./TransitionLink";
import { useI18n } from "@/lib/i18n";

const linkCls = "text-sm text-smoke transition-colors duration-300 hover:text-fog";

export function Footer() {
  const year = new Date().getFullYear();
  const c = site.contacts;
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-12 sm:px-6 md:px-10 md:pt-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <TransitionLink href="/" aria-label="PRO DUCT — bosh sahifa" className="inline-block">
              <Logo title="PRO DUCT" className="h-9 w-auto sm:h-10" />
            </TransitionLink>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-smoke">
              {t("footer.tagline")}
            </p>
            <OpenConsultLink className="mt-5 inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm font-medium text-fog transition-colors hover:bg-fog hover:text-ink">
              {t("footer.consultBtn")}
            </OpenConsultLink>
          </div>

          <nav aria-label={t("footer.catalog")} className="lg:col-span-3 lg:col-start-5">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ash">
              {t("footer.catalog")}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <TransitionLink href={`/catalog?category=${cat.slug}`} className={linkCls}>
                    {cat.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.company")} className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ash">
              {t("footer.company")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <TransitionLink href="/custom-pc" className={linkCls}>
                  {t("nav.customPc")}
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/catalog" className={linkCls}>
                  {t("nav.catalog")}
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/benefits" className={linkCls}>
                  {t("nav.benefits")}
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/brands" className={linkCls}>
                  {t("nav.brands")}
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/wishlist" className={linkCls}>
                  {t("nav.wishlist")}
                </TransitionLink>
              </li>
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ash">
              {t({ uz: "Aloqa & Ijtimoiy Tarmoqlar", ru: "Контакты & Соцсети" })}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={c.phoneHref} className="inline-flex items-center gap-2.5 text-sm font-medium text-fog transition-colors hover:text-fog/75">
                  <Phone className="size-4 shrink-0 text-smoke" strokeWidth={1.8} />
                  <span>{c.phone}</span>
                </a>
              </li>
              <li>
                <a href={c.telegramSupport} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 text-sm text-smoke transition-colors hover:text-fog">
                  <TelegramIcon className="size-4 shrink-0 text-sky-400" />
                  <span>{t({ uz: "Savollar uchun:", ru: "По вопросам:" })}</span>
                  <span className="font-medium text-fog group-hover:text-fog">{c.telegramSupportLabel}</span>
                </a>
              </li>
              <li>
                <a href={c.telegram} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 text-sm text-smoke transition-colors hover:text-fog">
                  <TelegramIcon className="size-4 shrink-0 text-sky-400" />
                  <span>{t({ uz: "Telegram kanal:", ru: "Telegram канал:" })}</span>
                  <span className="font-medium text-fog group-hover:text-fog">{c.telegramLabel}</span>
                </a>
              </li>
              <li>
                <a href={c.instagram} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 text-sm text-smoke transition-colors hover:text-fog">
                  <InstagramIcon className="size-4 shrink-0 text-pink-400" />
                  <span>Instagram:</span>
                  <span className="font-medium text-fog group-hover:text-fog">{c.instagramLabel}</span>
                </a>
              </li>
              <li>
                <a href={c.youtube} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 text-sm text-smoke transition-colors hover:text-fog">
                  <YoutubeIcon className="size-4 shrink-0 text-red-500" />
                  <span>YouTube:</span>
                  <span className="font-medium text-fog group-hover:text-fog">{c.youtubeLabel}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-xs text-smoke">
                <MapPin className="size-4 shrink-0 text-smoke" strokeWidth={1.8} />
                <span>{c.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-6 text-xs text-ash sm:flex-row">
          <p>© {year} PRO DUCT. {t("footer.allRights")}</p>
          <div className="flex items-center gap-2 text-smoke">
            <Clock className="size-3.5 shrink-0 text-ash" strokeWidth={1.8} />
            <span>{c.hours}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
