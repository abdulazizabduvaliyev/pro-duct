import { useId } from "react";
import { LOGO } from "@/lib/logo-data";

type LogoProps = {
  className?: string;
  /** Accessible name. Pass `""` to hide from assistive tech (decorative use). */
  title?: string;
};

/**
 * PRO DUCT lockup as inline SVG. Every part carries a `data-logo-*` hook so
 * GSAP can animate pills and letters independently:
 *   [data-logo-pill="white|dark"], [data-logo-letter]
 */
export function Logo({ className, title = "PRO DUCT" }: LogoProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const white = `${uid}-w`;
  const dark = `${uid}-d`;
  const duct = `${uid}-t`;

  return (
    <svg
      viewBox={LOGO.viewBox}
      className={className}
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={white} gradientUnits="userSpaceOnUse" x1={LOGO.white.x1} y1={LOGO.white.y1} x2={LOGO.white.x2} y2={LOGO.white.y2}>
          {LOGO.white.stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
        <linearGradient id={dark} gradientUnits="userSpaceOnUse" x1={LOGO.dark.x1} y1="0" x2={LOGO.dark.x2} y2="0">
          <stop offset="0" stopColor={LOGO.dark.from} />
          <stop offset="1" stopColor={LOGO.dark.to} />
        </linearGradient>
        <linearGradient id={duct} gradientUnits="userSpaceOnUse" x1={LOGO.duct_grad.x1} y1={LOGO.duct_grad.y1} x2={LOGO.duct_grad.x2} y2={LOGO.duct_grad.y2}>
          {LOGO.duct_grad.stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
      </defs>

      {/* DUCT Group (Behind PRO) */}
      <g data-logo-duct>
        <rect data-logo-pill="dark" x="200" y="255" width="372" height="123" rx="30" fill={`url(#${dark})`} />
        <g fill={`url(#${duct})`}>
          {LOGO.duct.map((d, i) => (
            <path key={i} data-logo-letter data-logo-letter-duct d={d} />
          ))}
        </g>
      </g>

      {/* PRO Group (In Front) */}
      <g data-logo-pro>
        <rect data-logo-pill="white" x="65" y="255" width="224.6" height="124" rx="30" fill={`url(#${white})`} />
        <g fill="#292929">
          {LOGO.pro.map((d, i) => (
            <path key={i} data-logo-letter data-logo-letter-pro d={d} />
          ))}
        </g>
      </g>
    </svg>
  );
}
