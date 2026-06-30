"use client";

import Image from "next/image";
import type { WishlistItem as WishlistItemType } from "@/lib/types";
import { useWishlist } from "@/hooks/useWishlist";
import Link from "next/link";

const currencyFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export function WishlistItem({ item }: { item: WishlistItemType }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromWishlist,
    setQuantity,
    closeDrawer,
  } = useWishlist();

  const handleProductLinkClick = () => {
    closeDrawer();
  };

  return (
    <li className="flex gap-3 rounded-2xl border border-slate-200 p-3">
      <Link
        href={`/producten/${item.product.slug}`}
        aria-label={`Bekijk product ${item.product.title}`}
        onClick={handleProductLinkClick}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0b0b] focus-visible:ring-offset-2"
      >
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          className="object-cover"
        />
      </Link>

      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/producten/${item.product.slug}`}
              onClick={handleProductLinkClick}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0b0b] focus-visible:ring-offset-2"
            >
              <h3 className="truncate text-sm font-semibold">
                {item.product.title}
              </h3>
            </Link>
            <p className="text-sm text-slate-500">
              {currencyFormatter.format(item.product.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              removeFromWishlist(item.product.slug);
            }}
            className="rounded-full px-2 py-1 text-xs font-semibold text-primary transition hover:bg-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0b0b] focus-visible:ring-offset-2"
          >
            verwijder
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              decreaseQuantity(item.product.slug);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-secondary hover:bg-primary text-white text-lg transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0b0b] focus-visible:ring-offset-2"
            aria-label={`Decrease quantity for ${item.product.title}`}
          >
            -
          </button>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(event) => {
              const parsedQuantity = Number.parseInt(event.target.value, 10);
              if (Number.isNaN(parsedQuantity)) {
                return;
              }

              setQuantity(item.product.slug, parsedQuantity);
            }}
            aria-label={`Quantity for ${item.product.title}`}
            className="h-9 w-16 rounded-full border border-slate-200 bg-tertiary text-center text-sm text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0b0b] focus-visible:ring-offset-2"
          />
          <button
            type="button"
            onClick={() => {
              increaseQuantity(item.product.slug);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-secondary hover:bg-primary text-white text-lg transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0b0b] focus-visible:ring-offset-2"
            aria-label={`Increase quantity for ${item.product.title}`}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
}
