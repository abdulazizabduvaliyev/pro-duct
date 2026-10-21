import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "uz_UZ",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Store",
      "@id": `${site.url}/#store`,
      name: site.name,
      url: site.url,
      description: site.description,
      image: `${site.url}/opengraph-image.png`,
      telephone: site.contacts.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.contacts.addressFull,
        addressLocality: "Tashkent",
        postalCode: "100105",
        addressCountry: "UZ",
      },
      sameAs: [
        site.contacts.telegram,
        site.contacts.instagram,
        site.contacts.youtube,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "uz",
      publisher: { "@id": `${site.url}/#store` },
    },
  ],
};

/**
 * `.anim` is added before first paint — and only when the visitor hasn't asked
 * for reduced motion — so GSAP's starting states (hidden reveals) never flash
 * and nothing stays hidden without JS.
 */
const animFlag = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('anim')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: animFlag }} />
        <noscript>
          <style>{`#initial-loader { display: none !important; }`}</style>
        </noscript>
      </head>
      {/* Browser extensions add attributes to <body> before React hydrates. */}
      <body className="min-h-full w-full overflow-x-hidden bg-graphite font-sans text-fog" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-[300] rounded-full bg-white px-4 py-2 text-sm font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Asosiy kontentga o&apos;tish
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers footer={<Footer />}>{children}</Providers>
      </body>
    </html>
  );
}
