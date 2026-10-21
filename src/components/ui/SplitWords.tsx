import type { ElementType } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Extra class for every word (e.g. gradient fill). */
  wordClassName?: string;
};

/**
 * Wraps every word in a clipping mask + inner `.split-word` so GSAP can slide
 * the words up (`yPercent`) for a cinematic headline reveal. The full text is
 * kept in `aria-label` and the visual spans are hidden from assistive tech.
 */
export function SplitWords({ text, as: Tag = "span", className, wordClassName }: Props) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pt-[0.1em] -mt-[0.1em] pb-[0.35em] -mb-[0.35em] align-bottom">
          <span className={cn("split-word inline-block will-change-transform pb-[0.35em] -mb-[0.35em]", wordClassName)}>{w}</span>
          {i < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}
