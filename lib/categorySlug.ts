import type { Category } from "@/lib/types";

export function toCategorySlug(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " en ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findCategoryBySlug(
  categories: Category[],
  categorySlug: string,
) {
  return categories.find(
    (category) => toCategorySlug(category.label) === categorySlug,
  );
}
