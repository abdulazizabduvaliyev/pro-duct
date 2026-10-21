import Image from "next/image";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductArt, type ArtView } from "./ProductArt";

type Props = {
  product: Product;
  /** Selected colour (#rrggbb) — tints the illustration. */
  tone?: string;
  view?: ArtView;
  /** Which of `product.images` to show when real renders exist. */
  imageIndex?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders the real product render when `product.images` is provided
 * (next/image, optimised + lazy), otherwise the built-in vector illustration.
 * The parent must be `relative` and sized — the media fills it.
 */
export function ProductMedia({ product, tone, view = "front", imageIndex = 0, sizes, priority, className }: Props) {
  const src = product.images?.[imageIndex];

  if (src) {
    return (
      <Image
        src={src}
        alt={product.name}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"}
        className={cn("object-contain", className)}
      />
    );
  }

  return (
    <ProductArt
      kind={product.kind}
      tone={tone ?? product.colors[0]?.value}
      accent={product.accent}
      view={view}
      title={product.name}
      className={cn("h-full w-full", className)}
    />
  );
}
