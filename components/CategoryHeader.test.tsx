import { render, screen } from "@testing-library/react";
import { CategoryHeader } from "@/components/CategoryHeader";

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

describe("CategoryHeader", () => {
  it("renders label, product count and back link", () => {
    render(<CategoryHeader label="Verf" productCount={12} />);

    expect(screen.getByRole("heading", { name: "Verf" })).toBeInTheDocument();
    expect(
      screen.getByText("12 producten gevonden in deze categorie."),
    ).toBeInTheDocument();

    const backLink = screen.getByRole("link", {
      name: "Terug naar categorieoverzicht",
    });
    expect(backLink).toHaveAttribute("href", "/");
  });
});
