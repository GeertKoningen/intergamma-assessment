"use client";

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
      <svg
        viewBox="0 0 24 24"
        className={`h-6 w-6 ${isInWishlist ? "" : "fill-none"} stroke-current stroke-2 fill-current`}
        aria-hidden="true"
      >
        <path
          d="M12 20.25l-.6-.54C6.15 14.96 3 12.11 3 8.66 3 5.87 5.2 3.75 8 3.75c1.58 0 3.1.73 4 1.9.9-1.17 2.42-1.9 4-1.9 2.8 0 5 2.12 5 4.91 0 3.45-3.15 6.3-8.4 11.06l-.6.53z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
