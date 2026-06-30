import Image from "next/image";
import type { Product } from "@/lib/types";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { Pricetag } from "./Pricetag";

export function ProductDetail({ product }: { product: Product }) {
  return (
    <section className="shadow rounded-lg border border-[#ececec] bg-white p-4 sm:p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            {product.title}
          </h1>
          <p className="text-sm leading-7 text-slate-600">
            {product.description}
          </p>
          <p>
            <WishlistButton product={product} />
          </p>
          <div className="mt-auto pt-4">
            <Pricetag price={product.price} />
          </div>
        </div>
      </div>
    </section>
  );
}
