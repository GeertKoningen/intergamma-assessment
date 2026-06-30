import { render, screen } from "@testing-library/react";
import { CategoryCard } from "@/components/CategoryCard";

/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // next/image-specific props are not relevant for unit tests.
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

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("CategoryCard", () => {
  it("renders category content and slug link", () => {
    render(
      <CategoryCard
        category={{
          key: "wood",
          label: "Hout",
          image: "/categories/hout-category.avif",
        }}
      />,
    );

    const link = screen.getByRole("link", { name: "Bekijk categorie Hout" });
    expect(link).toHaveAttribute("href", "/hout");
    expect(screen.getByAltText("Hout")).toBeInTheDocument();
    expect(screen.getByText("Bekijk")).toBeInTheDocument();
  });
});
