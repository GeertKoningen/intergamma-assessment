import { render, screen } from "@testing-library/react";
import { CategoryList } from "@/components/categories/CategoryList";

class ResizeObserverMock {
  observe() {
    // noop for tests
  }

  disconnect() {
    // noop for tests
  }
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
});

jest.mock("@/components/categories/CategoryCard", () => ({
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
      screen.getByRole("button", { name: "Vorige categorieën" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Volgende categorieën" }),
    ).toBeEnabled();

    expect(screen.getAllByTestId("category-card")).toHaveLength(2);
    expect(screen.getByText("Hout")).toBeInTheDocument();
    expect(screen.getByText("Gereedschap")).toBeInTheDocument();
  });
});
