import { render, screen } from "@testing-library/react";
import { CategoryList } from "@/components/CategoryList";

jest.mock("swiper/modules", () => ({
  Navigation: {},
}));

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

jest.mock("@/components/CategoryCard", () => ({
  CategoryCard: ({ category }: { category: { label: string } }) => (
    <div data-testid="category-card">{category.label}</div>
  ),
}));

describe("CategoryList", () => {
  it("renders heading, navigation controls, and category cards", () => {
    render(
      <CategoryList
        categories={[
          {
            key: "wood",
            label: "Hout",
            image: "/categories/hout-category.avif",
          },
          {
            key: "tools",
            label: "Gereedschap",
            image: "/categories/gereedschap-category.avif",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Categorieën" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Previous categories" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Next categories" }),
    ).toBeEnabled();

    expect(screen.getAllByTestId("category-card")).toHaveLength(2);
    expect(screen.getByText("Hout")).toBeInTheDocument();
    expect(screen.getByText("Gereedschap")).toBeInTheDocument();
  });
});
