import { render, screen } from "@testing-library/react";
import { ProductGrid } from "@/components/ProductGrid";

jest.mock("@/components/ProductCard", () => ({
  ProductCard: ({
    product,
    categoryLabel,
  }: {
    product: { title: string };
    categoryLabel: string;
  }) => (
    <article data-testid="product-card">
      {product.title} ({categoryLabel})
    </article>
  ),
}));

describe("ProductGrid", () => {
  it("renders product list for a category", () => {
    render(
      <ProductGrid
        categoryLabel="Gereedschap"
        products={[
          {
            title: "Boormachine",
            description: "Compacte boormachine",
            image: "/products/boormachine.avif",
            price: 79.99,
            slug: "boormachine",
            category: "Gereedschap",
          },
          {
            title: "Schroevendraaier",
            description: "Set met 6 schroevendraaiers",
            image: "/products/schroevendraaier.avif",
            price: 14.99,
            slug: "schroevendraaier",
            category: "Gereedschap",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("region", { name: "Producten voor Gereedschap" }),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
    expect(screen.getByText(/Boormachine/)).toBeInTheDocument();
    expect(screen.getByText(/Schroevendraaier/)).toBeInTheDocument();
  });
});
