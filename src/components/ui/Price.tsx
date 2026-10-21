import { cn, discountPercent, formatPrice } from "@/lib/utils";

type Props = {
  price: number;
  oldPrice?: number;
  size?: "md" | "lg";
  className?: string;
};

/** Current price, struck-through previous price and a discount pill. */
export function Price({ price, oldPrice, size = "md", className }: Props) {
  const off = discountPercent(price, oldPrice);
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-1", className)}>
      <span
        className={cn(
          "font-semibold tracking-tight text-fog",
          size === "lg" ? "text-3xl md:text-4xl" : "text-lg",
        )}
      >
        {formatPrice(price)}
      </span>
      {off > 0 && oldPrice ? (
        <>
          <span className={cn("text-ash line-through", size === "lg" ? "text-lg" : "text-sm")}>
            {formatPrice(oldPrice)}
          </span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-fog">−{off}%</span>
        </>
      ) : null}
    </div>
  );
}
