import { render, screen } from "@testing-library/react";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";

const closeDrawerMock = jest.fn();

jest.mock("@/hooks/useWishlist", () => ({
  useWishlist: () => ({
    wishlist: [
      {
        product: {
          title: "Boormachine",
          description: "Compacte boormachine",
          image: "/products/boormachine.avif",
          price: 79.99,
          slug: "boormachine",
          category: "Gereedschap",
        },
        quantity: 2,
      },
    ],
    totalItems: 2,
    isDrawerOpen: true,
    closeDrawer: closeDrawerMock,
  }),
}));

jest.mock("@/components/wishlist/WishlistItem", () => ({
  WishlistItem: ({ item }: { item: { product: { title: string } } }) => (
    <li data-testid="wishlist-item">{item.product.title}</li>
  ),
}));

describe("WishlistDrawer", () => {
  it("renders open drawer content and totals", () => {
    render(<WishlistDrawer />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Favorieten/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("wishlist-item")).toHaveTextContent(
      "Boormachine",
    );
    expect(screen.getByText("€ 159,98")).toBeInTheDocument();
  });
});
