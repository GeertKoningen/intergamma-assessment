import type { Metadata } from "next";
import { notFound } from "next/navigation";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import { CategoryHeader } from "@/components/categories/CategoryHeader";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/products/ProductGrid";
import { findCategoryBySlug, toCategorySlug } from "@/lib/categorySlug";
import type { Category, Product } from "@/lib/types";

const categories = categoriesData as Category[];
const products = productsData as Product[];

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    categorySlug: toCategorySlug(category.label),
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = findCategoryBySlug(categories, categorySlug);

  if (!category) {
    return {
      title: "Categorie niet gevonden | Intergamma",
    };
  }

  return {
    title: `${category.label} | Intergamma`,
    description: `Producten in de categorie ${category.label}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = findCategoryBySlug(categories, categorySlug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === category.key,
  );

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <CategoryHeader
          label={category.label}
          productCount={categoryProducts.length}
        />

        <ProductGrid
          products={categoryProducts}
          categoryLabel={category.label}
        />
      </main>
    </>
  );
}
