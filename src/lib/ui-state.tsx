"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ConsultMode = "consultation" | "order";

type ConsultState = {
  open: boolean;
  mode: ConsultMode;
  /** Product / topic the request is about. */
  subject?: string;
};

type UIContextValue = {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  consult: ConsultState;
  openConsult: (opts?: { mode?: ConsultMode; subject?: string }) => void;
  closeConsult: () => void;
  initialLoaded: boolean;
  setInitialLoaded: (loaded: boolean) => void;
};

const UIContext = createContext<UIContextValue | null>(null);

/** Open/close state for the cart drawer, search, mobile menu and consultation modal. */
export function UIProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [consult, setConsult] = useState<ConsultState>({ open: false, mode: "consultation" });
  const [initialLoaded, setInitialLoaded] = useState(false);

  const openConsult = useCallback((opts?: { mode?: ConsultMode; subject?: string }) => {
    setCartOpen(false);
    setMenuOpen(false);
    setConsult({ open: true, mode: opts?.mode ?? "consultation", subject: opts?.subject });
  }, []);
  const closeConsult = useCallback(() => setConsult((c) => ({ ...c, open: false })), []);

  const value = useMemo<UIContextValue>(
    () => ({
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      menuOpen,
      setMenuOpen,
      consult,
      openConsult,
      closeConsult,
      initialLoaded,
      setInitialLoaded,
    }),
    [cartOpen, searchOpen, menuOpen, consult, openConsult, closeConsult, initialLoaded],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
