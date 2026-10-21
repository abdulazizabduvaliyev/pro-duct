"use client";

import type { ReactNode } from "react";
import { UIProvider } from "@/lib/ui-state";
import { CartDrawer } from "./CartDrawer";
import { ConsultModal } from "./ConsultModal";
import { InitialLoader } from "./InitialLoader";
import { Navbar } from "./Navbar";
import { PageTransitionProvider } from "./PageTransition";
import { SearchOverlay } from "./SearchOverlay";
import { SmoothScroll } from "./SmoothScroll";

/** Client shell: smooth scroll, UI state, page transitions, navbar and global overlays. */
export function Providers({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  return (
    <UIProvider>
      <PageTransitionProvider>
        <SmoothScroll />
        <InitialLoader />
        <Navbar />
        <main id="main" className="min-h-[100svh]">
          {children}
        </main>
        {footer}
        <CartDrawer />
        <SearchOverlay />
        <ConsultModal />
      </PageTransitionProvider>
    </UIProvider>
  );
}
