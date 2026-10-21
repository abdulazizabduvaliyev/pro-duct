import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrand } from "@/data/brands";
import { getProduct, products } from "@/data/products";
import { site } from "@/lib/site";
import { ProductDetail } from "@/components/products/ProductDetail";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const title = product.name;
  const description = `${product.tagline} ${product.description}`;
  return {
    title,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { title: `${title} | ${site.name}`, description, url: `/product/${product.slug}`, type: "website" },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: getBrand(product.brand)?.name },
    ...(product.images?.length ? { image: product.images.map((src) => `${site.url}${src}`) } : {}),
    offers: {
      "@type": "Offer",
      url: `${site.url}/product/${product.slug}`,
      priceCurrency: "UZS",
      price: product.price,
      availability:
        product.stock === "out"
          ? "https://schema.org/OutOfStock"
          : product.stock === "preorder"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProductDetail product={product} />
    </>
  );
}
