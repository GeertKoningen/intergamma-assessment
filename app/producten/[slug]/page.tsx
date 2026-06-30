import type { Metadata } from "next";
import { notFound } from "next/navigation";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Header } from "@/components/Header";
import { ProductDetail } from "@/components/ProductDetail";
import { toCategorySlug } from "@/lib/categorySlug";
import type { Category, Product } from "@/lib/types";

const products = productsData as Product[];
const categories = categoriesData as Category[];

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function findProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

function findCategoryByProduct(product: Product) {
  return categories.find((category) => category.key === product.category);
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlug(slug);

  if (!product) {
    return {
      title: "Product niet gevonden | Intergamma",
    };
  }

  return {
    title: `${product.title} | Intergamma`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = findProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = findCategoryByProduct(product);
  const categoryHref = category ? `/${toCategorySlug(category.label)}` : "/";

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Breadcrumb
          categoryLabel={category?.label}
          categoryHref={categoryHref}
        />

        <ProductDetail product={product} />
      </main>
    </>
  );
}
