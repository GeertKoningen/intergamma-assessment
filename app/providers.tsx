"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { WishlistProvider } from "@/context/WishlistContext";

const WishlistDrawer = dynamic(
  () =>
    import("@/components/wishlist/WishlistDrawer").then(
      (mod) => mod.WishlistDrawer,
    ),
  { ssr: false },
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WishlistProvider>
      {children}
      <WishlistDrawer />
    </WishlistProvider>
  );
}
