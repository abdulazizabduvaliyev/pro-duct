"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Lang = "uz" | "ru";

export type LocalizedString = {
  uz: string;
  ru: string;
};

export const DICTIONARY = {
  nav: {
    catalog: { uz: "Kategoriyalar", ru: "Каталог" },
    customPc: { uz: "Tayyor PC-lar", ru: "Готовые ПК" },
    benefits: { uz: "Afzalliklar", ru: "Преимущества" },
    brands: { uz: "Brendlar", ru: "Бренды" },
    consult: { uz: "Konsultatsiya", ru: "Консультация" },
    search: { uz: "Qidirish", ru: "Поиск" },
    wishlist: { uz: "Tanlanganlar", ru: "Избранное" },
    cart: { uz: "Savat", ru: "Корзина" },
    menuClose: { uz: "Menyuni yopish", ru: "Закрыть меню" },
    menuOpen: { uz: "Menyuni ochish", ru: "Открыть меню" },
  },
  hero: {
    badge: { uz: "Premium Tech Store", ru: "Премиальный магазин техники" },
    title: { uz: "Texnologiya. Premium darajada.", ru: "Технологии. На премиальном уровне." },
    subtitle: {
      uz: "MacBook, iPhone, iPad va boshqa premium qurilmalar — ishonchli kafolat va tezkor yetkazib berish bilan.",
      ru: "MacBook, iPhone, iPad и другие премиальные устройства — с надежной гарантией и быстрой доставкой.",
    },
    catalogBtn: { uz: "Katalogni ko'rish", ru: "Смотреть каталог" },
    pcBtn: { uz: "Tayyor PC-lar", ru: "Готовые ПК" },
    consultBtn: { uz: "Konsultatsiya", ru: "Консультация" },
  },
  customPc: {
    breadcrumb: { uz: "Tayyor Gaming PC-lar", ru: "Готовые Gaming ПК" },
    badge: { uz: "Tayyor yig'ilgan kompyuterlar", ru: "Готовые собранные компьютеры" },
    title: { uz: "Tayyor PC korpuslari va yig'ilmalari.", ru: "Готовые ПК корпуса и сборки." },
    subtitle: {
      uz: "Har qanday vazifa — 4K o'yinlar, 3D render va montaj uchun professional yig'ilgan, to'liq sinovdan o'tgan tayyor tizimlar. Kerakli case ni tanlang va uning to'liq xususiyatlari, o'yin testlari hamda narxi bilan tanishing.",
      ru: "Для любых задач — 4K гейминг, 3D рендер и монтаж. Профессионально собранные, полностью протестированные готовые системы. Выберите нужный корпус и ознакомьтесь с его характеристиками, игровыми тестами и ценой.",
    },
    headerSubtitle: {
      uz: "O'zingiz qismlarni yig'ishingiz shart emas — har bir case professional darajada sozlangan va sinovdan o'tgan",
      ru: "Вам не нужно собирать по частям — каждый корпус профессионально настроен и протестирован",
    },
    warrantyBadge: { uz: "1 yil rasmiy kafolat", ru: "1 год официальной гарантии" },
    testedBadge: { uz: "100% Sinovdan o'tgan", ru: "100% Протестировано" },
    inStock: { uz: "Omborda mavjud", ru: "В наличии" },
    readyAssembled: { uz: "Tayyor Yig'ilgan", ru: "Готовая сборка" },
    detailsBtn: { uz: "Batafsil", ru: "Подробнее" },
    orderBtn: { uz: "Buyurtma berish", ru: "Оформить заказ" },
    consultBtn: { uz: "Konsultatsiya olish", ru: "Получить консультацию" },
    copySpecs: { uz: "Xususiyatlarni nusxalash", ru: "Скопировать характеристики" },
    copied: { uz: "Nusxalandi!", ru: "Скопировано!" },
    fullSpecsTitle: { uz: "To'liq Komplektatsiya (Xususiyatlar)", ru: "Полная комплектация (Характеристики)" },
    gameBenchmarksTitle: { uz: "O'yinlardagi FPS Ko'rsatkichlari", ru: "Игровые показатели FPS" },
    caseSpecsTitle: { uz: "Korpus Parametrlari", ru: "Параметры корпуса" },
    keyHighlightsTitle: { uz: "Asosiy Afzalliklar", ru: "Главные преимущества" },
    relatedTitle: { uz: "Boshqa tayyor tizimlar", ru: "Другие готовые системы" },
    categories: {
      all: { uz: "Barcha Case-lar", ru: "Все корпуса" },
      ultra: { uz: "Ultra 4K Gaming", ru: "Ultra 4K Гейминг" },
      esport: { uz: "KiberSport & 1440p", ru: "Киберспорт & 1440p" },
      creator: { uz: "Studio & 3D Dizayn", ru: "Студия & 3D Дизайн" },
      budget: { uz: "Hamyonbop Gaming", ru: "Доступный Гейминг" },
    },
    perks: {
      delivery: { uz: "Tezkor yetkazib berish (24 soat)", ru: "Быстрая доставка (24 часа)" },
      warranty: { uz: "1 Yillik rasmiy kafolat", ru: "1 Год официальной гарантии" },
      tested: { uz: "100% Sinovdan o'tgan", ru: "100% Протестировано" },
      setup: { uz: "Professional Sozlash", ru: "Профессиональная настройка" },
    },
    params: {
      formFactor: { uz: "Form-faktor", ru: "Форм-фактор" },
      glass: { uz: "Shisha turi", ru: "Тип стекла" },
      cooling: { uz: "Radiator sig'imi", ru: "Поддержка СВО" },
      fans: { uz: "Ventilyatorlar", ru: "Вентиляторы" },
      dimensions: { uz: "O'lchamlari", ru: "Габариты" },
      color: { uz: "Rangi", ru: "Цвет" },
    },
  },
  cart: {
    title: { uz: "Savat", ru: "Корзина" },
    emptyTitle: { uz: "Sizning savatingiz hozircha bo'sh", ru: "Ваша корзина пока пуста" },
    emptyDesc: { uz: "Katalogimizdan kerakli mahsulotlarni tanlab qo'shing", ru: "Выберите нужные товары из нашего каталога" },
    total: { uz: "Jami", ru: "Итого" },
    checkout: { uz: "Buyurtma berish", ru: "Оформить заказ" },
    clear: { uz: "Savatni tozalash", ru: "Очистить корзину" },
  },
  search: {
    placeholder: { uz: "Mahsulotlarni qidirish...", ru: "Поиск товаров..." },
    quickLinks: { uz: "Ommabop qidiruvlar", ru: "Популярные запросы" },
    noResults: { uz: "Hech narsa topilmadi", ru: "Ничего не найдено" },
  },
  consult: {
    title: { uz: "Mutaxassis konsultatsiyasi", ru: "Консультация специалиста" },
    subtitle: { uz: "Ma'lumotlaringizni qoldiring, 15 daqiqa ichida aloqaga chiqamiz", ru: "Оставьте заявку, свяжемся с вами в течение 15 минут" },
    nameLabel: { uz: "Ismingiz", ru: "Ваше имя" },
    phoneLabel: { uz: "Telefon raqamingiz", ru: "Номер телефона" },
    commentLabel: { uz: "Savolingiz yoki istagingiz", ru: "Ваш вопрос или пожелание" },
    sendBtn: { uz: "Yuborish", ru: "Отправить заявку" },
  },
  showcase: {
    badge: { uz: "Product showcase", ru: "Обзор продукта" },
    detailsBtn: { uz: "Batafsil ko'rish", ru: "Подробнее" },
    consultBtn: { uz: "Konsultatsiya", ru: "Консультация" },
  },
  footer: {
    tagline: {
      uz: "Premium texnika do'koni. Kompyuter, noutbuk, Apple qurilmalari, monitorlar va aksessuarlar — bir joyda.",
      ru: "Магазин премиальной техники. Компьютеры, ноутбуки, устройства Apple, мониторы и аксессуары — в одном месте.",
    },
    consultBtn: { uz: "Konsultatsiya olish", ru: "Получить консультацию" },
    catalog: { uz: "Katalog", ru: "Каталог" },
    company: { uz: "Sayt", ru: "Сайт" },
    allRights: { uz: "Barcha huquqlar himoyalangan.", ru: "Все права защищены." },
  },
  common: {
    home: { uz: "Bosh sahifa", ru: "Главная" },
    catalog: { uz: "Katalog", ru: "Каталог" },
    som: { uz: "so'm", ru: "сум" },
    lightMode: { uz: "Yorug' rejim", ru: "Светлая тема" },
    darkMode: { uz: "Qorong'i rejim", ru: "Темная тема" },
    theme: { uz: "Mavzu", ru: "Тема" },
    lang: { uz: "Til", ru: "Язык" },
  },
} as const;

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (input: string | LocalizedString, fallback?: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "pro-duct:lang";

let langSnapshot: Lang = "uz";
let langLoaded = false;
const langListeners = new Set<() => void>();

function applyLangDOM(next: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("lang", next);
}

function loadLang() {
  if (langLoaded || typeof window === "undefined") return;
  langLoaded = true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "uz" || saved === "ru") {
      langSnapshot = saved;
      applyLangDOM(saved);
    }
  } catch {
    /* ignore */
  }
}

function emitLang() {
  langListeners.forEach((l) => l());
}

function subscribeLang(listener: () => void) {
  loadLang();
  langListeners.add(listener);
  return () => langListeners.delete(listener);
}

function getLangSnapshot(): Lang {
  loadLang();
  return langSnapshot;
}

function getServerLangSnapshot(): Lang {
  return "uz";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribeLang, getLangSnapshot, getServerLangSnapshot);

  const setLang = useCallback((next: Lang) => {
    langSnapshot = next;
    applyLangDOM(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    emitLang();
  }, []);

  const toggleLang = useCallback(() => {
    setLang(langSnapshot === "uz" ? "ru" : "uz");
  }, [setLang]);

  const t = useCallback(
    (input: string | LocalizedString, fallback = ""): string => {
      if (typeof input === "object" && input !== null) {
        return (input[lang] || input.uz || "") as string;
      }

      const strInput: string = String(input);
      const keys = strInput.split(".");
      let current: unknown = DICTIONARY;
      for (const key of keys) {
        if (current && typeof current === "object" && key in current) {
          current = (current as Record<string, unknown>)[key];
        } else {
          return fallback || strInput;
        }
      }

      if (current && typeof current === "object" && lang in (current as Record<string, unknown>)) {
        const val = (current as Record<string, unknown>)[lang];
        return typeof val === "string" ? val : fallback || strInput;
      }

      return typeof current === "string" ? current : fallback || strInput;
    },
    [lang],
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t,
    }),
    [lang, setLang, toggleLang, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

