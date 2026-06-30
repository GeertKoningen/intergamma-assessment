"use client";

import type { ReactNode } from "react";
import { WishlistProvider } from "@/context/WishlistContext";
import { WishlistDrawer } from "@/components/WishlistDrawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WishlistProvider>
      {children}
      <WishlistDrawer />
    </WishlistProvider>
  );
}
