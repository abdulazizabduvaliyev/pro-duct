"use client";

import type { ReactNode } from "react";
import { useUI, type ConsultMode } from "@/lib/ui-state";
import { Button } from "./Button";

type Props = {
  children: ReactNode;
  mode?: ConsultMode;
  subject?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  className?: string;
  wrapperClassName?: string;
};

/** Button that opens the consultation / order modal. Safe to use from server components. */
export function OpenConsult({ children, mode, subject, variant = "primary", size = "md", magnetic, className, wrapperClassName }: Props) {
  const { openConsult } = useUI();
  return (
    <Button
      variant={variant}
      size={size}
      magnetic={magnetic}
      className={className}
      wrapperClassName={wrapperClassName}
      onClick={() => openConsult({ mode, subject })}
    >
      {children}
    </Button>
  );
}

/** Plain text-style trigger for footers and inline copy. */
export function OpenConsultLink({ children, className }: { children: ReactNode; className?: string }) {
  const { openConsult } = useUI();
  return (
    <button type="button" onClick={() => openConsult()} className={className}>
      {children}
    </button>
  );
}
