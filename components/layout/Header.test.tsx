import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

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

const openDrawerMock = jest.fn();

jest.mock("@/hooks/useWishlist", () => ({
  useWishlist: () => ({
    totalItems: 2,
    isDrawerOpen: false,
    openDrawer: openDrawerMock,
  }),
}));

describe("Header", () => {
  it("renders logo, shows wishlist count, and opens drawer", () => {
    render(<Header />);

    expect(screen.getByAltText("Intergamma")).toBeInTheDocument();

    const wishlistButton = screen.getByRole("button", {
      name: "Bekijk wensenlijst, 2 artikelen",
    });
    expect(wishlistButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(wishlistButton);
    expect(openDrawerMock).toHaveBeenCalledTimes(1);
  });
});
