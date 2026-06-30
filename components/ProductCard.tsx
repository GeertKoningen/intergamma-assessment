import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="shadow overflow-hidden rounded-lg border border-[#ececec] bg-white">
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
      </div>
    </article>
  );
}
