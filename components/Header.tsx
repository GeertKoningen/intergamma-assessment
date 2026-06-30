"use client";

import Image from "next/image";
import { useWishlist } from "@/hooks/useWishlist";

export function Header() {
  const { totalItems, isDrawerOpen, openDrawer } = useWishlist();

  return (
    <header className="shadow sticky top-0 z-30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center"
          aria-label="Intergamma home"
        >
          <Image
            src="/logo.svg"
            alt="Intergamma"
            width={210}
            height={42}
            priority
            className="h-auto w-[150px] sm:w-[190px]"
          />
        </a>

        <button
          type="button"
          onClick={openDrawer}
          className="relative inline-flex h-11 items-center gap-3 rounded-full border border-[#e5e5e5] bg-white px-4 pr-5 text-sm font-semibold text-slate-700 transition hover:border-[#d6d6d6] hover:bg-[#fafafa]"
          aria-label={`Open wishlist, ${totalItems} items`}
          aria-expanded={isDrawerOpen}
          aria-haspopup="dialog"
        >
          <span className="shadow flex h-8 w-8 items-center justify-center rounded-full bg-[#e03126] text-white">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53L12 21.35z" />
            </svg>
          </span>
          <span className="hidden sm:inline">Favorieten</span>
          <span
            className="inline-flex min-w-8 items-center justify-center rounded-full bg-[#f3f3f3] px-2 py-1 text-xs font-bold text-slate-700"
            aria-live="polite"
          >
            {totalItems}
          </span>
        </button>
      </div>
    </header>
  );
}
