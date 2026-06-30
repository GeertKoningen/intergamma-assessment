"use client";

import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";

import type { Category } from "@/lib/types";
import { CategoryCard } from "@/components/CategoryCard";

export function CategoryList({ categories }: { categories: Category[] }) {
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncNavigationState = (swiper: SwiperInstance) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section aria-labelledby="categories-heading" className="space-y-4 ">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2
            id="categories-heading"
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
              ref={prevButtonRef}
              type="button"
              aria-label="Previous categories"
              className="shadow inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e1e1] bg-white text-slate-700 transition hover:border-[#d1d1d1] hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-40"
              disabled={isBeginning}
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
              ref={nextButtonRef}
              type="button"
              aria-label="Next categories"
              className="shadow inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e1e1] bg-white text-slate-700 transition hover:border-[#d1d1d1] hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-40"
              disabled={isEnd}
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
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView="auto"
            watchOverflow
            onBeforeInit={(swiper) => {
              const navigation = swiper.params.navigation;

              if (!navigation || typeof navigation === "boolean") {
                return;
              }

              navigation.prevEl = prevButtonRef.current;
              navigation.nextEl = nextButtonRef.current;
            }}
            onSwiper={syncNavigationState}
            onSlideChange={syncNavigationState}
            onResize={syncNavigationState}
            className="!overflow-visible"
          >
            {categories.map((category) => (
              <SwiperSlide
                key={category.key}
                className="!w-[190px] sm:!w-[220px]"
              >
                <CategoryCard category={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
