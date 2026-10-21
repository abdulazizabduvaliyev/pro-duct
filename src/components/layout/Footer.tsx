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
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 md:px-10 md:pt-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <TransitionLink href="/" aria-label="PRO DUCT — bosh sahifa" className="inline-block">
              <Logo title="PRO DUCT" className="h-10 w-auto" />
            </TransitionLink>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-smoke">
              Premium texnika do&apos;koni. Kompyuter, noutbuk, Apple qurilmalari, monitorlar va aksessuarlar — bir joyda.
            </p>
            <OpenConsultLink className="mt-6 inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm font-medium text-fog transition-colors hover:bg-white hover:text-black">
              Konsultatsiya olish
            </OpenConsultLink>
          </div>

          <nav aria-label="Katalog" className="md:col-span-3 md:col-start-6">
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.14em] text-ash">Katalog</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <TransitionLink href={`/catalog?category=${cat.slug}`} className={linkCls}>
                    {cat.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Kompaniya" className="md:col-span-2">
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.14em] text-ash">Sayt</h3>
            <ul className="flex flex-col gap-3">
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

          <div className="md:col-span-3">
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.14em] text-ash">Aloqa</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={c.phoneHref} className={linkCls}>
                  {c.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${c.email}`} className={linkCls}>
                  {c.email}
                </a>
              </li>
              <li>
                <a href={c.telegram} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Telegram · {c.telegramLabel}
                </a>
              </li>
              <li className="text-sm text-smoke">{c.address}</li>
              <li className="text-sm text-ash">{c.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-ash md:flex-row md:items-start md:justify-between">
          <p>© {year} PRO DUCT. Barcha huquqlar himoyalangan.</p>
          <p className="max-w-xl md:text-right">
            Apple, MacBook, iPhone, iPad, Apple Watch, AirPods va boshqa brend nomlari tegishli egalarining savdo belgilaridir.
          </p>
        </div>
      </div>
    </footer>
  );
}
