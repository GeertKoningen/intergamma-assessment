"use client";

import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { useWishlist } from "@/hooks/useWishlist";

type WishlistButtonProps = {
  product: Product;
};

export function WishlistButton({ product }: WishlistButtonProps) {
  const { wishlist, toggleWishlist } = useWishlist();
  const isInWishlist = wishlist.some(
    (item) => item.product.slug === product.slug,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        isInWishlist
          ? `Remove ${product.title} from wishlist`
          : `Add ${product.title} to wishlist`
      }
      className="inline-flex items-center gap-2 rounded-full bg-secondary px-2 py-2 text-sm font-semibold transition hover:bg-primary text-white"
    >
      <Heart
        className={`h-6 w-6 ${isInWishlist ? "fill-current" : "fill-none"}`}
        aria-hidden="true"
      />
    </button>
  );
}
