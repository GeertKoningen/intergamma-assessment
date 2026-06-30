import categoriesData from "@/data/categories.json";
import type { Category } from "@/lib/types";
import { Header } from "@/components/Header";
import { CategoryList } from "@/components/CategoryList";

const categories = categoriesData as Category[];

export default function Home() {
  return (
    <>
      <Header />
      <main
        id="top"
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
      >
        <CategoryList categories={categories} />
      </main>
    </>
  );
}
