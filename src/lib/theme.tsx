"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "pro-duct:theme";

let themeSnapshot: Theme = "dark";
let themeLoaded = false;
const themeListeners = new Set<() => void>();

function applyThemeDOM(next: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (next === "light") {
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
  } else {
    root.classList.remove("light");
    root.setAttribute("data-theme", "dark");
  }
}

function loadTheme() {
  if (themeLoaded || typeof window === "undefined") return;
  themeLoaded = true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === "light" || saved === "dark") {
      themeSnapshot = saved;
      applyThemeDOM(saved);
    }
  } catch {
    /* ignore */
  }
}

function emitTheme() {
  themeListeners.forEach((l) => l());
}

function subscribeTheme(listener: () => void) {
  loadTheme();
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
}

function getThemeSnapshot(): Theme {
  loadTheme();
  return themeSnapshot;
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);

  const setTheme = useCallback((next: Theme) => {
    themeSnapshot = next;
    applyThemeDOM(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    emitTheme();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(themeSnapshot === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

