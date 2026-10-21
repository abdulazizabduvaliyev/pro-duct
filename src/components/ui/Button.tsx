"use client";

import { useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/components/animations/useMagnetic";
import { TransitionLink } from "@/components/layout/TransitionLink";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  /** Pulled gently towards the cursor (TZ: magnetic CTA). */
  magnetic?: boolean;
  icon?: ReactNode;
  className?: string;
  /** Class for the magnetic wrapper element (use for layout: `flex-1`, `w-full`…). */
  wrapperClassName?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-apple disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-white text-black shadow-[0_8px_30px_-8px_rgb(255_255_255/0.35)] hover:bg-white/90",
  secondary: "glass text-fog hover:bg-white/12 hover:border-white/20",
  ghost: "text-fog/80 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", magnetic = false, icon, className, wrapperClassName, children } = props;
  const wrap = useRef<HTMLSpanElement>(null);
  useMagnetic(wrap, 0.3, magnetic);

  const cls = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {icon ? (
        <span className="relative z-10 transition-transform duration-300 ease-apple group-hover/btn:translate-x-0.5">{icon}</span>
      ) : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, magnetic: _m, icon: _i, className: _c, wrapperClassName: _w, children: _ch, href, ...anchor } = props;
    return (
      <span ref={wrap} className={cn("inline-block", wrapperClassName)}>
        <TransitionLink href={href} className={cls} {...anchor}>
          {content}
        </TransitionLink>
      </span>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, magnetic: _m, icon: _i, className: _c, wrapperClassName: _w, children: _ch, href: _h, ...button } = props as AsButton;
  return (
    <span ref={wrap} className={cn("inline-block", wrapperClassName)}>
      <button type="button" className={cls} {...button}>
        {content}
      </button>
    </span>
  );
}
