import { useId, type CSSProperties, type ReactNode } from "react";
import type { ArtKind } from "@/data/categories";
import { darken, lighten } from "@/lib/utils";

export type ArtView = "front" | "angle" | "detail";

type Props = {
  kind: ArtKind;
  /** Body colour as #rrggbb. */
  tone?: string;
  /** Screen-glow hue, 0–360. */
  accent?: number;
  view?: ArtView;
  className?: string;
  title?: string;
};

const DEFAULT_TONE: Record<ArtKind, string> = {
  laptop: "#c9ccd2",
  phone: "#b9b2a8",
  tablet: "#d6d8dc",
  watch: "#3a3a3d",
  earbuds: "#f0f0f2",
  monitor: "#d6d8dc",
  pc: "#2a2a2e",
  minipc: "#d6d8dc",
  keyboard: "#d6d8dc",
  mouse: "#4a4a4f",
};

/** viewBox used for the "detail" gallery view of each kind. */
const DETAIL_BOX: Record<ArtKind, string> = {
  laptop: "92 24 216 150",
  phone: "96 12 118 118",
  tablet: "150 30 190 130",
  watch: "140 56 124 124",
  earbuds: "108 28 184 150",
  monitor: "150 24 200 140",
  pc: "126 12 148 150",
  minipc: "90 110 220 100",
  keyboard: "30 112 200 110",
  mouse: "126 34 148 150",
};

const luma = (hex: string) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

/**
 * Built-in vector illustrations of every product type. They stand in for real
 * product renders (see `Product.images`) and are used for hero/showcase art, so
 * the site looks finished from day one. Parts carry `data-art-*` hooks.
 */
export function ProductArt({ kind, tone, accent = 215, view = "front", className, title }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const t = tone ?? DEFAULT_TONE[kind];
  const light = luma(t) > 0.55;

  const id = (s: string) => `${uid}-${s}`;
  const url = (s: string) => `url(#${id(s)})`;

  const a1 = `hsl(${accent} 92% 60%)`;
  const a2 = `hsl(${(accent + 70) % 360} 88% 52%)`;

  let clipN = 0;
  const screen = (x: number, y: number, w: number, h: number, r: number, children?: ReactNode) => {
    const cid = id(`clip${clipN++}`);
    return (
      <g data-art-screen>
        <clipPath id={cid}>
          <rect x={x} y={y} width={w} height={h} rx={r} />
        </clipPath>
        <g clipPath={`url(#${cid})`}>
          <rect x={x} y={y} width={w} height={h} fill="#05060a" />
          <rect x={x} y={y} width={w} height={h} fill={url("sa")} />
          <rect x={x} y={y} width={w} height={h} fill={url("sb")} />
          {children}
          <path
            d={`M${x} ${y} H${x + w * 0.62} L${x + w * 0.22} ${y + h} H${x} Z`}
            fill={url("glare")}
          />
        </g>
      </g>
    );
  };

  const keyFill = light ? "#ffffff" : "rgba(255,255,255,0.1)";
  const keyStroke = light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.06)";

  const body = (() => {
    switch (kind) {
      case "laptop":
        return (
          <>
            <ellipse cx="200" cy="237" rx="176" ry="11" fill={url("shadow")} />
            <g data-art-lid>
              <rect x="72" y="30" width="256" height="170" rx="12" fill={url("body")} stroke={url("rim")} />
              {screen(
                79,
                37,
                242,
                156,
                7,
                <>
                  <rect x="79" y="37" width="242" height="9" fill="rgba(0,0,0,0.38)" />
                  <rect x="118" y="68" width="164" height="94" rx="7" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.13)" />
                  <circle cx="129" cy="79" r="2.3" fill="rgba(255,255,255,0.4)" />
                  <circle cx="138" cy="79" r="2.3" fill="rgba(255,255,255,0.28)" />
                  <circle cx="147" cy="79" r="2.3" fill="rgba(255,255,255,0.18)" />
                  <rect x="130" y="94" width="92" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
                  <rect x="130" y="106" width="132" height="4" rx="2" fill="rgba(255,255,255,0.16)" />
                  <rect x="130" y="116" width="112" height="4" rx="2" fill="rgba(255,255,255,0.16)" />
                  <rect x="130" y="134" width="46" height="18" rx="9" fill="rgba(255,255,255,0.9)" opacity="0.85" />
                  <rect x="146" y="175" width="108" height="11" rx="5.5" fill="rgba(255,255,255,0.14)" />
                  <rect x="186" y="37" width="28" height="7" rx="3.5" fill="#000" />
                </>,
              )}
            </g>
            <path
              data-art-base
              d="M44 203 H356 L350 213 Q348 220 338 220 H62 Q52 220 50 213 Z"
              fill={url("base")}
              stroke={url("rim")}
            />
            <rect x="168" y="203" width="64" height="5" rx="2.5" fill={darken(t, 0.3)} opacity="0.75" />
            <path d="M62 216 H338" stroke="rgba(255,255,255,0.14)" />
          </>
        );

      case "phone":
        return (
          <>
            <ellipse cx="200" cy="274" rx="140" ry="9" fill={url("shadow")} />
            <g transform="rotate(7 262 140)">
              <rect x="208" y="24" width="104" height="232" rx="20" fill={url("body")} stroke={url("rim")} />
              <rect x="216" y="32" width="48" height="48" rx="14" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
              {[
                [230, 46],
                [250, 46],
                [230, 66],
              ].map(([cx, cy]) => (
                <g key={`${cx}-${cy}`}>
                  <circle cx={cx} cy={cy} r="9" fill="#0a0a0c" stroke={lighten(t, 0.35)} strokeWidth="1.5" />
                  <circle cx={cx} cy={cy} r="4" fill="#15151a" />
                  <circle cx={cx - 1.5} cy={cy - 1.5} r="1.2" fill="rgba(255,255,255,0.55)" />
                </g>
              ))}
              <circle cx="252" cy="68" r="3" fill="#f6e7bd" opacity="0.8" />
            </g>
            <g data-art-front>
              <rect x="104" y="22" width="106" height="238" rx="21" fill={url("body")} stroke={url("rim")} />
              <rect x="101.5" y="78" width="2.5" height="18" rx="1.2" fill={darken(t, 0.25)} />
              <rect x="101.5" y="106" width="2.5" height="30" rx="1.2" fill={darken(t, 0.25)} />
              <rect x="210" y="100" width="2.5" height="42" rx="1.2" fill={darken(t, 0.25)} />
              {screen(
                109,
                27,
                96,
                228,
                16,
                <>
                  <rect x="118" y="74" width="78" height="62" rx="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.12)" />
                  <rect x="118" y="144" width="36" height="36" rx="10" fill="rgba(255,255,255,0.1)" />
                  <rect x="160" y="144" width="36" height="36" rx="10" fill="rgba(255,255,255,0.07)" />
                  <rect x="118" y="188" width="78" height="14" rx="7" fill="rgba(255,255,255,0.08)" />
                  <rect x="141" y="34" width="32" height="9" rx="4.5" fill="#000" />
                  <rect x="143" y="246" width="28" height="3.5" rx="1.75" fill="rgba(255,255,255,0.6)" />
                </>,
              )}
            </g>
          </>
        );

      case "tablet":
        return (
          <>
            <ellipse cx="200" cy="248" rx="170" ry="9" fill={url("shadow")} />
            <rect data-art-front x="58" y="34" width="284" height="196" rx="20" fill={url("body")} stroke={url("rim")} />
            {screen(
              65,
              41,
              270,
              182,
              14,
              <>
                <rect x="84" y="64" width="112" height="70" rx="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.12)" />
                <rect x="204" y="64" width="50" height="70" rx="12" fill="rgba(255,255,255,0.08)" />
                <rect x="262" y="64" width="50" height="70" rx="12" fill="rgba(255,255,255,0.06)" />
                <rect x="84" y="144" width="228" height="12" rx="6" fill="rgba(255,255,255,0.07)" />
                <rect x="152" y="202" width="96" height="11" rx="5.5" fill="rgba(255,255,255,0.14)" />
              </>,
            )}
            <circle cx="200" cy="37.5" r="1.8" fill="#0a0a0a" />
            <rect x="348" y="52" width="8" height="168" rx="4" fill={url("body")} stroke={url("rim")} />
            <path d="M348 220 H356 L352 233 Z" fill={lighten(t, 0.25)} />
          </>
        );

      case "watch":
        return (
          <>
            <ellipse cx="200" cy="290" rx="74" ry="6" fill={url("shadow")} />
            <rect x="170" y="4" width="60" height="78" rx="14" fill={url("band")} />
            <rect x="170" y="218" width="60" height="78" rx="14" fill={url("band")} />
            <path
              d="M178 18 H222 M178 30 H222 M178 42 H222 M178 232 H222 M178 244 H222 M178 256 H222"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="2"
            />
            <rect x="253" y="98" width="9" height="28" rx="4.5" fill={darken(t, 0.2)} stroke={url("rim")} />
            <rect x="253" y="138" width="5.5" height="20" rx="2.7" fill={darken(t, 0.25)} />
            <rect data-art-front x="146" y="64" width="108" height="142" rx="35" fill={url("body")} stroke={url("rim")} />
            {screen(
              154,
              72,
              92,
              126,
              28,
              <>
                <circle cx="200" cy="135" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                <circle cx="200" cy="135" r="42" fill="none" stroke={a1} strokeWidth="5" strokeLinecap="round" strokeDasharray="150 264" transform="rotate(-90 200 135)" />
                <circle cx="200" cy="135" r="29" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                <circle cx="200" cy="135" r="29" fill="none" stroke={a2} strokeWidth="5" strokeLinecap="round" strokeDasharray="100 182" transform="rotate(-90 200 135)" />
                <path d="M200 135 V113" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M200 135 L216 145" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <circle cx="200" cy="135" r="3.6" fill="#fff" />
              </>,
            )}
          </>
        );

      case "earbuds": {
        const bud = (
          <g id={id("bud")}>
            <rect x="158" y="72" width="13" height="74" rx="6.5" fill={url("body")} stroke={url("rim")} />
            <ellipse cx="150" cy="64" rx="26" ry="30" fill={url("body")} stroke={url("rim")} />
            <circle cx="140" cy="71" r="8" fill="rgba(0,0,0,0.3)" />
            <circle cx="164" cy="46" r="2" fill="rgba(0,0,0,0.22)" />
          </g>
        );
        return (
          <>
            <ellipse cx="200" cy="260" rx="120" ry="9" fill={url("shadow")} />
            <defs>{bud}</defs>
            <use data-art-bud href={`#${id("bud")}`} transform="rotate(-14 150 130)" />
            <use data-art-bud href={`#${id("bud")}`} transform="translate(400 0) scale(-1 1) rotate(-14 150 130)" />
            <rect data-art-front x="116" y="138" width="168" height="114" rx="52" fill={url("body")} stroke={url("rim")} />
            <path d="M118 178 H282" stroke="rgba(0,0,0,0.16)" />
            <rect x="188" y="238" width="24" height="4" rx="2" fill="rgba(0,0,0,0.16)" />
            <circle cx="200" cy="214" r="3" fill={a1} />
            <circle cx="200" cy="214" r="7" fill="none" stroke={a1} strokeOpacity="0.3" />
          </>
        );
      }

      case "monitor":
        return (
          <>
            <ellipse cx="200" cy="278" rx="116" ry="7" fill={url("shadow")} />
            <path d="M174 212 H226 L232 262 H168 Z" fill={url("neck")} />
            <rect x="130" y="258" width="140" height="10" rx="5" fill={url("base")} stroke={url("rim")} />
            <rect data-art-front x="38" y="20" width="324" height="196" rx="14" fill={url("body")} stroke={url("rim")} />
            {screen(
              44,
              26,
              312,
              184,
              9,
              <>
                <rect x="84" y="56" width="232" height="108" rx="8" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.13)" />
                <circle cx="97" cy="68" r="2.4" fill="rgba(255,255,255,0.4)" />
                <circle cx="107" cy="68" r="2.4" fill="rgba(255,255,255,0.28)" />
                <circle cx="117" cy="68" r="2.4" fill="rgba(255,255,255,0.18)" />
                <rect x="98" y="86" width="120" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
                <rect x="98" y="100" width="176" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
                <rect x="98" y="111" width="150" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
                <rect x="98" y="122" width="164" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
                <rect x="160" y="190" width="80" height="9" rx="4.5" fill="rgba(255,255,255,0.14)" />
              </>,
            )}
          </>
        );

      case "pc":
        return (
          <>
            <ellipse cx="200" cy="284" rx="104" ry="7" fill={url("shadow")} />
            <rect x="146" y="272" width="20" height="7" rx="3.5" fill={darken(t, 0.3)} />
            <rect x="234" y="272" width="20" height="7" rx="3.5" fill={darken(t, 0.3)} />
            <rect data-art-front x="128" y="8" width="144" height="266" rx="16" fill={url("body")} stroke={url("rim")} />
            {screen(
              136,
              16,
              128,
              250,
              10,
              <>
                <rect x="136" y="16" width="128" height="250" fill="#07080c" />
                <rect x="144" y="26" width="70" height="150" rx="5" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.08)" />
                <rect x="144" y="184" width="112" height="24" rx="6" fill="rgba(255,255,255,0.08)" stroke={a1} strokeOpacity="0.55" />
                <rect x="150" y="192" width="100" height="3" rx="1.5" fill={a1} opacity="0.8" />
                {[52, 100, 148].map((cy) => (
                  <g key={cy}>
                    <circle cx="236" cy={cy} r="19" fill="none" stroke={a1} strokeWidth="2.4" opacity="0.9" />
                    <circle cx="236" cy={cy} r="10" fill="none" stroke={a2} strokeWidth="1.6" opacity="0.9" />
                    <circle cx="236" cy={cy} r="3.4" fill={a1} />
                  </g>
                ))}
                <rect x="136" y="224" width="128" height="42" fill="#0b0b0f" />
                <path d="M146 236 H254 M146 246 H254 M146 256 H254" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
              </>,
            )}
          </>
        );

      case "minipc":
        return (
          <>
            <ellipse cx="200" cy="200" rx="128" ry="9" fill={url("shadow")} />
            <rect data-art-front x="92" y="116" width="216" height="76" rx="22" fill={url("body")} stroke={url("rim")} />
            <path d="M104 126 H296" stroke="rgba(255,255,255,0.28)" strokeLinecap="round" />
            <circle cx="200" cy="170" r="2.6" fill={light ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.85)"} />
            <circle cx="262" cy="170" r="3" fill="rgba(0,0,0,0.35)" />
            <circle cx="276" cy="170" r="3" fill="rgba(0,0,0,0.35)" />
            <path d="M104 186 H296" stroke="rgba(0,0,0,0.12)" />
          </>
        );

      case "keyboard": {
        const rows: Array<Array<[number, number]>> = [
          Array.from({ length: 13 }, (_, i) => [46.5 + i * 24, 19] as [number, number]),
          Array.from({ length: 13 }, (_, i) => [46.5 + i * 24, 19] as [number, number]),
          Array.from({ length: 13 }, (_, i) => [46.5 + i * 24, 19] as [number, number]),
        ];
        const y0 = 132;
        return (
          <>
            <ellipse cx="200" cy="232" rx="170" ry="10" fill={url("shadow")} />
            <rect data-art-front x="34" y="120" width="332" height="106" rx="14" fill={url("body")} stroke={url("rim")} />
            {rows.map((row, ri) =>
              row.map(([x, w]) => (
                <rect key={`${ri}-${x}`} x={x} y={y0 + ri * 20} width={w} height="15" rx="3.5" fill={keyFill} stroke={keyStroke} />
              )),
            )}
            <rect x="46.5" y="192" width="38" height="15" rx="3.5" fill={keyFill} stroke={keyStroke} />
            <rect x="88" y="192" width="38" height="15" rx="3.5" fill={keyFill} stroke={keyStroke} />
            <rect x="130" y="192" width="138" height="15" rx="3.5" fill={keyFill} stroke={keyStroke} />
            <rect x="272" y="192" width="38" height="15" rx="3.5" fill={keyFill} stroke={keyStroke} />
            <rect x="314" y="192" width="38" height="15" rx="3.5" fill={keyFill} stroke={keyStroke} />
          </>
        );
      }

      case "mouse":
        return (
          <>
            <ellipse cx="200" cy="268" rx="74" ry="7" fill={url("shadow")} />
            <path
              data-art-front
              d="M200 34 C252 34 270 88 270 150 C270 214 246 266 200 266 C154 266 130 214 130 150 C130 88 148 34 200 34 Z"
              fill={url("body")}
              stroke={url("rim")}
            />
            <path d="M200 38 V116" stroke="rgba(0,0,0,0.4)" />
            <path d="M138 126 Q200 140 262 126" stroke="rgba(0,0,0,0.25)" fill="none" />
            <rect x="190" y="64" width="20" height="44" rx="10" fill={darken(t, 0.4)} stroke={url("rim")} />
            <rect x="132" y="156" width="14" height="48" rx="7" fill={darken(t, 0.25)} />
            <path d="M160 60 C150 90 146 130 150 180" stroke="rgba(255,255,255,0.14)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
    }
  })();

  const box = view === "detail" ? DETAIL_BOX[kind] : "0 0 400 300";
  const style: CSSProperties | undefined =
    view === "angle"
      ? { transform: "perspective(900px) rotateY(-16deg) rotateX(3deg)" }
      : kind === "keyboard" && view === "front"
        ? { transform: "perspective(900px) rotateX(18deg)" }
        : undefined;

  return (
    <svg
      viewBox={box}
      className={className}
      style={style}
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={id("body")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={lighten(t, 0.22)} />
          <stop offset="0.5" stopColor={t} />
          <stop offset="1" stopColor={darken(t, 0.38)} />
        </linearGradient>
        <linearGradient id={id("base")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={lighten(t, 0.12)} />
          <stop offset="1" stopColor={darken(t, 0.3)} />
        </linearGradient>
        <linearGradient id={id("neck")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={darken(t, 0.25)} />
          <stop offset="0.5" stopColor={lighten(t, 0.1)} />
          <stop offset="1" stopColor={darken(t, 0.3)} />
        </linearGradient>
        <linearGradient id={id("band")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={darken(t, 0.1)} />
          <stop offset="1" stopColor={darken(t, 0.5)} />
        </linearGradient>
        <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={id("glare")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("sa")} cx="0.22" cy="0.2" r="0.95">
          <stop offset="0" stopColor={a1} stopOpacity="0.95" />
          <stop offset="0.55" stopColor={a1} stopOpacity="0.25" />
          <stop offset="1" stopColor={a1} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("sb")} cx="0.85" cy="0.9" r="0.85">
          <stop offset="0" stopColor={a2} stopOpacity="0.9" />
          <stop offset="0.6" stopColor={a2} stopOpacity="0.18" />
          <stop offset="1" stopColor={a2} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("shadow")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.6" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      {title ? <title>{title}</title> : null}
      {body}
    </svg>
  );
}
