import { fireEvent, render, screen } from "@testing-library/react";
import { WishlistButton } from "@/components/WishlistButton";

const toggleWishlistMock = jest.fn();

jest.mock("@/hooks/useWishlist", () => ({
  useWishlist: () => ({
    wishlist: [],
    toggleWishlist: toggleWishlistMock,
  }),
}));

describe("WishlistButton", () => {
  const product = {
    title: "Boormachine",
    description: "Compacte accuboormachine",
    image: "/products/boormachine.avif",
    price: 79.99,
    slug: "boormachine",
    category: "Gereedschap",
  };

  beforeEach(() => {
    toggleWishlistMock.mockClear();
  });

  it("renders add label and toggles on click", () => {
    render(<WishlistButton product={product} />);

    const button = screen.getByRole("button", {
      name: "Add Boormachine to wishlist",
    });

    fireEvent.click(button);
    expect(toggleWishlistMock).toHaveBeenCalledWith(product);
  });
});
