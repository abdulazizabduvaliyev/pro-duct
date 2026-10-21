import type { Metadata } from "next";
import { WishlistView } from "@/components/products/WishlistView";

export const metadata: Metadata = {
  title: "Tanlanganlar",
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistView />;
}
