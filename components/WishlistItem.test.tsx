import { fireEvent, render, screen } from "@testing-library/react";
import { WishlistItem } from "@/components/WishlistItem";

/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

const increaseQuantityMock = jest.fn();
const decreaseQuantityMock = jest.fn();
const removeFromWishlistMock = jest.fn();
const setQuantityMock = jest.fn();

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, priority, sizes, ...rest } =
      props as React.ImgHTMLAttributes<HTMLImageElement> & {
        fill?: boolean;
        priority?: boolean;
        sizes?: string;
      };

    return <img {...rest} />;
  },
}));

jest.mock("@/hooks/useWishlist", () => ({
  useWishlist: () => ({
    increaseQuantity: increaseQuantityMock,
    decreaseQuantity: decreaseQuantityMock,
    removeFromWishlist: removeFromWishlistMock,
    setQuantity: setQuantityMock,
  }),
}));

describe("WishlistItem", () => {
  it("renders item and triggers quantity and remove actions", () => {
    render(
      <WishlistItem
        item={{
          product: {
            title: "Boormachine",
            description: "Compacte boormachine",
            image: "/products/boormachine.avif",
            price: 79.99,
            slug: "boormachine",
            category: "Gereedschap",
          },
          quantity: 2,
        }}
      />,
    );

    expect(screen.getByText("Boormachine")).toBeInTheDocument();
    expect(screen.getByText("€ 79,99")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "verwijder" }));
    expect(removeFromWishlistMock).toHaveBeenCalledWith("boormachine");

    fireEvent.click(
      screen.getByRole("button", { name: "Increase quantity for Boormachine" }),
    );
    expect(increaseQuantityMock).toHaveBeenCalledWith("boormachine");

    fireEvent.click(
      screen.getByRole("button", { name: "Decrease quantity for Boormachine" }),
    );
    expect(decreaseQuantityMock).toHaveBeenCalledWith("boormachine");

    const quantityInput = screen.getByRole("spinbutton", {
      name: "Quantity for Boormachine",
    });
    fireEvent.change(quantityInput, { target: { value: "5" } });

    expect(setQuantityMock).toHaveBeenCalledWith("boormachine", 5);
  });
});
