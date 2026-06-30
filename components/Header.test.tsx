import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";

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

describe("Header", () => {
  it("renders logo and wishlist button state", () => {
    render(<Header />);

    expect(screen.getByAltText("Intergamma")).toBeInTheDocument();

    const wishlistButton = screen.getByRole("button", {
      name: "Open wishlist, 0 items",
    });
    expect(wishlistButton).toHaveAttribute("aria-expanded", "false");

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
