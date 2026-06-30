"use client";

import Image from "next/image";
import type { WishlistItem as WishlistItemType } from "@/lib/types";
import { useWishlist } from "@/hooks/useWishlist";

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
  } = useWishlist();

  return (
    <li className="flex gap-3 rounded-2xl border border-white/10 p-3">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden">
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">
              {item.product.title}
            </h3>
            <p className="text-sm text-slate-400">
              {currencyFormatter.format(item.product.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeFromWishlist(item.product.slug)}
            className="rounded-full px-2 py-1 text-xs font-semibold text-primary transition hover:bg-white/5 cursor-pointer"
          >
            verwijder
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.product.slug)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-secondary hover:bg-primary text-white text-lg transition cursor-pointer"
            aria-label={`Decrease quantity for ${item.product.title}`}
          >
            -
          </button>
          <input
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
            className="h-9 w-16 rounded-full border border-white/10 bg-tertiary text-center text-sm text-black"
          />
          <button
            type="button"
            onClick={() => increaseQuantity(item.product.slug)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-secondary hover:bg-primary text-white text-lg transition cursor-pointer"
            aria-label={`Increase quantity for ${item.product.title}`}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
}
