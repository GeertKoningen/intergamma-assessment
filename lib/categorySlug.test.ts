import { findCategoryBySlug, toCategorySlug } from "@/lib/categorySlug";
import type { Category } from "@/lib/types";

describe("toCategorySlug", () => {
  it("normalizes accents and punctuation", () => {
    expect(toCategorySlug("Vloeren & Plafonds")).toBe("vloeren-en-plafonds");
    expect(toCategorySlug("Isolatie++")).toBe("isolatie");
  });

  it("trims extra separators", () => {
    expect(toCategorySlug("---Hout---")).toBe("hout");
  });
});

describe("findCategoryBySlug", () => {
  it("returns matching category by slugified label", () => {
    const categories: Category[] = [
      {
        key: "building-materials",
        label: "Bouwmaterialen",
        image: "bouwmaterialen-category.avif",
      },
      {
        key: "window-decoration",
        label: "Raamdecoratie",
        image: "raamdecoratie-category.avif",
      },
    ];

    const result = findCategoryBySlug(categories, "raamdecoratie");
    expect(result?.key).toBe("window-decoration");
  });

  it("returns undefined when there is no match", () => {
    const categories: Category[] = [
      {
        key: "paint",
        label: "Verf",
        image: "verf-category.avif",
      },
    ];

    const result = findCategoryBySlug(categories, "gereedschap");
    expect(result).toBeUndefined();
  });
});
