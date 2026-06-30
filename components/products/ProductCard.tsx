import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { Pricetag } from "@/components/products/Pricetag";
import { WishlistButton } from "@/components/wishlist/WishlistButton";

type ProductCardProps = {
  product: Product;
  prioritizeImage?: boolean;
};

export function ProductCard({
  product,
  prioritizeImage = false,
}: ProductCardProps) {
  return (
    <article className="shadow hover:shadow-dark overflow-hidden rounded-lg border border-[#ececec] bg-white transition">
      <Link
        href={`/producten/${product.slug}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0b0b] focus-visible:ring-offset-2"
        aria-label={`Bekijk product ${product.title}`}
      >
        <div className="relative aspect-[4/3] bg-slate-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading={prioritizeImage ? "eager" : undefined}
            fetchPriority={prioritizeImage ? "high" : undefined}
            className="object-cover"
          />
        </div>
      </Link>

      <div className="space-y-2 p-4">
        <Link
          href={`/producten/${product.slug}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0b0b] focus-visible:ring-offset-2"
        >
          <h2 className="text-base font-semibold text-slate-900">
            {product.title}
          </h2>
        </Link>
        <p className="line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <Pricetag price={product.price} />

          <WishlistButton product={product} />
        </div>
      </div>
    </article>
  );
}
