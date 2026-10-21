"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "./PageTransition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * Drop-in `next/link` that plays the dark-overlay page transition before
 * navigating. Modified clicks (⌘/ctrl/shift), new-tab links and external URLs
 * keep their native behaviour.
 */
export function TransitionLink({ href, onClick, target, children, ...rest }: Props) {
  const { navigate } = usePageTransition();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (target && target !== "_self") return;
    if (/^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    e.preventDefault();
    navigate(href);
  };

  return (
    <Link href={href} target={target} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
