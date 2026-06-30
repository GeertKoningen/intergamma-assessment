"use client";

import Image from "next/image";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="group h-full overflow-hidden rounded-lg border border-[#ececec] bg-white transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={category.image}
          alt={category.label}
          fill
          sizes="(min-width: 640px) 220px, 190px"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm font-semibold text-slate-900">
          {category.label}
        </span>
        <span className="text-xs font-medium text-slate-400">Bekijk</span>
      </div>
    </article>
  );
}
