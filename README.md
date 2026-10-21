# PRO DUCT — Premium Tech Store

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · `@gsap/react`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Struktura

```
src/
├─ app/                 sahifalar: / , /catalog , /product/[slug] , /wishlist , SEO fayllar
├─ components/
│  ├─ animations/       motion.ts (easing/timing tokenlari), gsap.ts, useReveal, useParallax, useMagnetic, useOverlay
│  ├─ layout/           Navbar, Footer, PageTransition, TransitionLink, SmoothScroll, CartDrawer, SearchOverlay, ConsultModal
│  ├─ hero/ categories/ products/ sections/ ui/
├─ data/                products.ts, categories.ts, brands.ts   ← SAMPLE ma'lumotlar
├─ lib/                 utils, site (kontaktlar), store (savat/wishlist), lenis, lead (forma yuborish), logo-data
└─ styles/globals.css
```

## Animatsiya tizimi (TZ §4)

Barcha animatsiya `components/animations/motion.ts` dagi bitta easing/duration/stagger tizimidan foydalanadi.
Desktop / tablet / mobile uchun `withMotion()` (gsap.matchMedia) har xil intensivlik beradi, `prefers-reduced-motion`
da esa hamma narsa animatsiyasiz ko'rinadi. Boshlang'ich "yashirin" holatlar faqat `<html class="anim">` bo'lganda
qo'llanadi (layout.tsx dagi kichik inline script) — JS yo'q bo'lsa kontent yo'qolmaydi.

## Almashtirish kerak bo'lgan joylar (TODO)

- `src/data/products.ts` — **namuna** mahsulotlar, narxlar va xususiyatlar. Haqiqiy katalog yoki API bilan almashtiring.
  Haqiqiy render rasmlarni `public/products/` ga tashlab, mahsulotda `images: ["/products/x.webp"]` deb ko'rsating —
  shunda ichki SVG illyustratsiya o'rniga `next/image` ishlaydi.
- `src/lib/site.ts` — telefon, Telegram, email, manzil, ish vaqti, domen (hozir placeholder).
- `NEXT_PUBLIC_LEAD_ENDPOINT` (`.env.local`) — konsultatsiya/buyurtma formasi yuboriladigan URL.
  O'rnatilmaguncha so'rovlar **hech qayerga yuborilmaydi** (`src/lib/lead.ts`).
- `src/components/sections/Benefits.tsx` — yetkazib berish/kafolat/qaytarish matnlari umumiy; real shartlarni yozing.
- Footer'da Maxfiylik siyosati / Foydalanish shartlari sahifalari yo'q.

## Logo

`public/logo.svg` (lockup), `public/logo-avatar.svg` (640×640, fon bilan), `src/app/icon.svg` (favicon),
`src/lib/logo-data.ts` (harflar alohida path — GSAP bilan animatsiya qilish uchun, `<Logo />` komponenti).
