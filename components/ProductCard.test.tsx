import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/ProductCard";

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

describe("ProductCard", () => {
  it("renders product title, description, and image", () => {
    render(
      <ProductCard
        product={{
          title: "Boormachine",
          description: "Compacte accuboormachine voor dagelijks gebruik.",
          image: "/products/boormachine.avif",
          price: 79.99,
          slug: "boormachine",
          category: "Gereedschap",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Boormachine" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Compacte accuboormachine voor dagelijks gebruik."),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Boormachine")).toBeInTheDocument();
  });
});
