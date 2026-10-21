"use client";

import { useSyncExternalStore } from "react";
import { getProduct } from "@/data/products";

/**
 * Tiny external store for cart + wishlist, persisted to localStorage.
 * Uses `useSyncExternalStore` so server HTML (empty) and the first client
 * render always match; real data appears right after hydration.
 */

export type CartLine = { id: string; color?: string; qty: number };

type State = {
  cart: CartLine[];
  wishlist: string[];
};

const KEY = "pro-duct:v1";
const EMPTY: State = { cart: [], wishlist: [] };

let state: State = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<State>;
      state = {
        cart: Array.isArray(parsed.cart) ? parsed.cart.filter((l) => l && getProduct(l.id) && l.qty > 0) : [],
        wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist.filter((id) => getProduct(id)) : [],
      };
    }
  } catch {
    /* corrupted storage — start clean */
  }
  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    loaded = false;
    state = EMPTY;
    load();
    emit(false);
  });
}

function emit(persist = true) {
  if (persist && typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full / blocked */
    }
  }
  listeners.forEach((l) => l());
}

function set(next: State) {
  state = next;
  emit();
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => EMPTY;

export const lineKey = (l: { id: string; color?: string }) => `${l.id}::${l.color ?? ""}`;

export const store = {
  addToCart(id: string, opts: { color?: string; qty?: number } = {}) {
    const qty = Math.max(1, opts.qty ?? 1);
    const key = lineKey({ id, color: opts.color });
    const exists = state.cart.find((l) => lineKey(l) === key);
    set({
      ...state,
      cart: exists
        ? state.cart.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(20, l.qty + qty) } : l))
        : [...state.cart, { id, color: opts.color, qty }],
    });
  },
  setQty(key: string, qty: number) {
    set({
      ...state,
      cart: state.cart
        .map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(20, qty) } : l))
        .filter((l) => l.qty > 0),
    });
  },
  removeLine(key: string) {
    set({ ...state, cart: state.cart.filter((l) => lineKey(l) !== key) });
  },
  clearCart() {
    set({ ...state, cart: [] });
  },
  toggleWishlist(id: string) {
    set({
      ...state,
      wishlist: state.wishlist.includes(id) ? state.wishlist.filter((x) => x !== id) : [...state.wishlist, id],
    });
  },
};

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Cart lines joined with product data, plus totals. */
export function useCart() {
  const { cart } = useStore();
  const lines = cart.flatMap((l) => {
    const product = getProduct(l.id);
    return product ? [{ ...l, key: lineKey(l), product }] : [];
  });
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
  return { lines, count, total };
}

export function useWishlist() {
  const { wishlist } = useStore();
  return {
    ids: wishlist,
    count: wishlist.length,
    has: (id: string) => wishlist.includes(id),
  };
}
