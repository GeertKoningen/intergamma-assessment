"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product, WishlistContextType, WishlistItem } from "@/lib/types";

const STORAGE_KEY = "intergamma-wishlist";

const WishlistContext = createContext<WishlistContextType | null>(null);

function getItemCount(items: WishlistItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

function addProduct(items: WishlistItem[], product: Product) {
  const existingItem = items.find((item) => item.product.slug === product.slug);

  if (existingItem) {
    return items.map((item) =>
      item.product.slug === product.slug
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...items, { product, quantity: 1 }];
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const savedWishlist = window.localStorage.getItem(STORAGE_KEY);

        if (savedWishlist) {
          const parsedWishlist = JSON.parse(savedWishlist) as WishlistItem[];
          if (Array.isArray(parsedWishlist)) {
            setWishlist(parsedWishlist);
          }
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setHasHydrated(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [hasHydrated, wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist((currentWishlist) => addProduct(currentWishlist, product));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((currentWishlist) => {
      const isInWishlist = currentWishlist.some(
        (item) => item.product.slug === product.slug,
      );

      if (isInWishlist) {
        return currentWishlist.filter(
          (item) => item.product.slug !== product.slug,
        );
      }

      return [...currentWishlist, { product, quantity: 1 }];
    });
  };

  const removeFromWishlist = (slug: string) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.product.slug !== slug),
    );
  };

  const increaseQuantity = (slug: string) => {
    setWishlist((currentWishlist) =>
      currentWishlist.map((item) =>
        item.product.slug === slug
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (slug: string) => {
    setWishlist((currentWishlist) =>
      currentWishlist
        .map((item) =>
          item.product.slug === slug
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const setQuantity = (slug: string, quantity: number) => {
    setWishlist((currentWishlist) => {
      if (quantity <= 0) {
        return currentWishlist.filter((item) => item.product.slug !== slug);
      }

      return currentWishlist.map((item) =>
        item.product.slug === slug ? { ...item, quantity } : item,
      );
    });
  };

  const value: WishlistContextType = {
    wishlist,
    totalItems: getItemCount(wishlist),
    addToWishlist,
    toggleWishlist,
    removeFromWishlist,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    isDrawerOpen,
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlistContext must be used within a WishlistProvider",
    );
  }

  return context;
}
