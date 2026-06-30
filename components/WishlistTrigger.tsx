"use client";

import { useWishlist } from "@/hooks/useWishlist";

export function WishlistTrigger() {
  const { totalItems, isDrawerOpen, openDrawer } = useWishlist();

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="relative inline-flex h-11 items-center gap-3 rounded-full border bg-secondary hover:bg-primary text-white px-3 text-sm font-semibold transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0b0b0b] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label={`Open wishlist, ${totalItems} items`}
      aria-expanded={isDrawerOpen}
      aria-haspopup="dialog"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 fill-current"
        aria-hidden="true"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53L12 21.35z" />
      </svg>
      <span
        className="inline-flex min-w-6 items-center justify-center rounded-full text-sm font-bold"
        aria-live="polite"
      >
        {totalItems}
      </span>
    </button>
  );
}
