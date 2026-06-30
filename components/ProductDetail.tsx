import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

const euroFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

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
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            {product.title}
          </h1>
          <p className="text-sm leading-7 text-slate-600">
            {product.description}
          </p>
          <Link
            href="#"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ececec] px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            aria-label="Toevoegen aan wensenlijst"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-none stroke-current stroke-2"
              aria-hidden="true"
            >
              <path
                d="M12 20.25l-.6-.54C6.15 14.96 3 12.11 3 8.66 3 5.87 5.2 3.75 8 3.75c1.58 0 3.1.73 4 1.9.9-1.17 2.42-1.9 4-1.9 2.8 0 5 2.12 5 4.91 0 3.45-3.15 6.3-8.4 11.06l-.6.53z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Toevoegen aan wensenlijst
          </Link>

          <div className="mt-auto border-t border-[#ececec] pt-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Prijs
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {euroFormatter.format(product.price)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
