import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/products/CatalogView";

export const metadata: Metadata = {
  title: "Katalog",
  description: "MacBook, iPhone, iPad, Watch, AirPods, monitorlar, kompyuterlar va aksessuarlar — PRO DUCT katalogi.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    // useSearchParams needs a Suspense boundary for static rendering
    <Suspense fallback={<div className="min-h-[70svh]" />}>
      <CatalogView />
    </Suspense>
  );
}
