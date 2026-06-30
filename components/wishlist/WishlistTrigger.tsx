"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
const WISHLIST_TRIGGER_HIGHLIGHT_DURATION = 500;
export function WishlistTrigger() {
  const {
    totalItems,
    isDrawerOpen,
    openDrawer,
    hasHydrated = true,
  } = useWishlist();
  const [isHighlighting, setIsHighlighting] = useState(false);
  const hasObservedHydration = useRef(false);
  const previousTotalItems = useRef(totalItems);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!hasObservedHydration.current) {
      hasObservedHydration.current = true;
      previousTotalItems.current = totalItems;
      return;
    }

    if (previousTotalItems.current === totalItems) {
      return;
    }

    previousTotalItems.current = totalItems;
    setIsHighlighting(true);

    const timeoutId = window.setTimeout(() => {
      setIsHighlighting(false);
    }, WISHLIST_TRIGGER_HIGHLIGHT_DURATION);

    return () => window.clearTimeout(timeoutId);
  }, [hasHydrated, totalItems]);

  return (
    <button
      type="button"
      onClick={openDrawer}
      className={`relative inline-flex h-11 items-center gap-3 rounded-full border bg-secondary px-3 text-sm font-semibold text-white transition hover:bg-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0b0b0b] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isHighlighting ? "animate-wishlist-trigger-highlight" : ""}`}
      aria-label={`Bekijk wensenlijst, ${totalItems} artikelen`}
      aria-expanded={isDrawerOpen}
      aria-haspopup="dialog"
    >
      <Heart className="h-6 w-6 fill-current" aria-hidden="true" />
      <span
        className="inline-flex min-w-6 items-center justify-center rounded-full text-sm font-bold"
        aria-live="polite"
      >
        {totalItems}
      </span>
    </button>
  );
}
