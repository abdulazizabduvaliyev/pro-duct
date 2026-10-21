import { categories } from "@/data/categories";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { OpenConsultLink } from "@/components/ui/OpenConsult";
import { TransitionLink } from "./TransitionLink";

const linkCls = "text-sm text-smoke transition-colors duration-300 hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();
  const c = site.contacts;

  return (
    <footer className="relative border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-12 sm:px-6 md:px-10 md:pt-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <TransitionLink href="/" aria-label="PRO DUCT — bosh sahifa" className="inline-block">
              <Logo title="PRO DUCT" className="h-9 w-auto sm:h-10" />
            </TransitionLink>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-smoke">
              Premium texnika do&apos;koni. Kompyuter, noutbuk, Apple qurilmalari, monitorlar va aksessuarlar — bir joyda.
            </p>
            <OpenConsultLink className="mt-5 inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm font-medium text-fog transition-colors hover:bg-white hover:text-black">
              Konsultatsiya olish
            </OpenConsultLink>
          </div>

          <nav aria-label="Katalog" className="lg:col-span-3 lg:col-start-5">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ash">Katalog</h3>
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

          <nav aria-label="Kompaniya" className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ash">Sayt</h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <TransitionLink href="/custom-pc" className={linkCls}>
                  PC Konfigurator
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/catalog" className={linkCls}>
                  Barcha mahsulotlar
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/benefits" className={linkCls}>
                  Afzalliklar
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/brands" className={linkCls}>
                  Brendlar
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/wishlist" className={linkCls}>
                  Tanlanganlar
                </TransitionLink>
              </li>
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ash">Aloqa & Ijtimoiy Tarmoqlar</h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={c.phoneHref} className="text-sm font-medium text-fog transition-colors hover:text-white">
                  📞 {c.phone}
                </a>
              </li>
              <li>
                <a href={c.telegramSupport} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Savollar uchun: <span className="text-fog hover:text-white">{c.telegramSupportLabel}</span>
                </a>
              </li>
              <li>
                <a href={c.telegram} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Telegram kanal: <span className="text-fog hover:text-white">{c.telegramLabel}</span>
                </a>
              </li>
              <li>
                <a href={c.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Instagram: <span className="text-fog hover:text-white">{c.instagramLabel}</span>
                </a>
              </li>
              <li>
                <a href={c.youtube} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  YouTube: <span className="text-fog hover:text-white">{c.youtubeLabel}</span>
                </a>
              </li>
              <li>
                <a
                  href={c.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs leading-relaxed text-smoke transition-colors hover:text-white"
                >
                  📍 {c.address}
                </a>
              </li>
              <li className="text-xs text-ash">🕒 {c.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ash sm:flex-row sm:items-center sm:justify-between md:mt-16 md:pt-8">
          <p>© {year} PRO DUCT. Barcha huquqlar himoyalangan.</p>
          <p className="max-w-xl sm:text-right">
            Apple, MacBook, iPhone, iPad, Apple Watch, AirPods va boshqa brend nomlari tegishli egalarining savdo belgilaridir.
          </p>
        </div>
      </div>
    </footer>
  );
}
