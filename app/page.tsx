import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Category, Product } from "@/lib/types";
import { CategoryList } from "@/components/categories/CategoryList";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/products/ProductGrid";

const categories = categoriesData as Category[];
const products = productsData as Product[];

export default function Home() {
  return (
    <>
      <Header />
      <main
        id="top"
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
      >
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase text-primary">
            Intergamma assortiment
          </p>
        </section>

        <CategoryList categories={categories} />

        <section className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">
                Producten
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Bekijk onze klusproducten en bewaar favorieten in je wishlist.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-600">
              {products.length} producten
            </p>
          </div>
        </section>

        <ProductGrid products={products} categoryLabel="alle producten" />
      </main>
    </>
  );
}
