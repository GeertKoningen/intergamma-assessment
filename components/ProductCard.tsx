import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { Pricetag } from "@/components/Pricetag";
import { WishlistButton } from "@/components/WishlistButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/producten/${product.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ba3dc] focus-visible:ring-offset-2"
      aria-label={`Bekijk product ${product.title}`}
    >
      <article className="shadow overflow-hidden rounded-lg border border-[#ececec] bg-white transition group-hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] bg-slate-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-2 p-4">
          <h2 className="text-base font-semibold text-slate-900">
            {product.title}
          </h2>
          <p className="line-clamp-2 text-sm text-slate-500">
            {product.description}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <Pricetag price={product.price} />

            <WishlistButton product={product} />
          </div>
        </div>
      </article>
    </Link>
  );
}
