"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Category } from "@/lib/types";
import { CategoryCard } from "@/components/categories/CategoryCard";

export function CategoryList({ categories }: { categories: Category[] }) {
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(categories.length > 1);

  const syncScrollState = useCallback(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const { scrollLeft, clientWidth, scrollWidth } = scroller;

    setCanScrollPrev(scrollLeft > 2);

    // JSDOM doesn't calculate layout widths, so preserve meaningful button state in tests.
    if (clientWidth === 0 || scrollWidth === 0) {
      setCanScrollNext(categories.length > 1);
      return;
    }

    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 2);
  }, [categories.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    syncScrollState();

    const handleScroll = () => {
      syncScrollState();
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new ResizeObserver(() => {
      syncScrollState();
    });

    observer.observe(scroller);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [syncScrollState]);

  const scrollByCards = (direction: "prev" | "next") => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const amount = Math.max(scroller.clientWidth * 0.9, 220);

    scroller.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section aria-labelledby="categorie-kop" className="space-y-4 ">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2
            id="categorie-kop"
            className="display-font text-3xl text-slate-900 sm:text-4xl"
          >
            Categorieën
          </h2>
        </div>
      </div>

      <div className="">
        <div className="flex items-center justify-between gap-3 border-b border-[#ececec] px-4 py-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Vorige categorieën"
              className="shadow inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e1e1] bg-white text-slate-700 transition hover:border-[#d1d1d1] hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => scrollByCards("prev")}
              disabled={!canScrollPrev}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-current stroke-[2]"
                aria-hidden="true"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Volgende categorieën"
              className="shadow inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e1e1] bg-white text-slate-700 transition hover:border-[#d1d1d1] hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => scrollByCards("next")}
              disabled={!canScrollNext}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-current stroke-[2]"
                aria-hidden="true"
              >
                <path
                  d="M9 18l6-6-6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-4 py-4">
          <ul
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => (
              <li
                key={category.key}
                className="w-[190px] shrink-0 snap-start sm:w-[220px]"
              >
                <CategoryCard
                  category={category}
                  prioritizeImage={category.key === categories[0]?.key}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
