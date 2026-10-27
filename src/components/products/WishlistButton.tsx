"use client";

import { useRef } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { store, useWishlist } from "@/lib/store";
import { gsap } from "@/components/animations/gsap";
import { EASE } from "@/components/animations/motion";

type Props = {
  slug: string;
  name: string;
  className?: string;
  size?: "sm" | "md";
};

/** Heart toggle with a small spring on the icon when toggled. */
export function WishlistButton({ slug, name, className, size = "md" }: Props) {
  const { has } = useWishlist();
  const active = has(slug);
  const icon = useRef<SVGSVGElement>(null);

  const toggle = () => {
    store.toggleWishlist(slug);
    if (icon.current) {
      gsap.fromTo(icon.current, { scale: 0.55 }, { scale: 1, duration: 0.55, ease: EASE.pop });
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? `${name} — tanlanganlardan olib tashlash` : `${name} — tanlanganlarga qo'shish`}
      className={cn(
        "flex items-center justify-center rounded-full border border-line bg-black/30 text-fog backdrop-blur-md transition-colors duration-300 hover:bg-white/15",
        size === "sm" ? "size-9" : "size-11",
        className,
      )}
    >
      <Heart
        ref={icon}
        className={cn("size-[18px] transition-colors", active ? "fill-rose-500 text-rose-500" : "text-fog/80")}
        strokeWidth={1.8}
      />
    </button>
  );
}
