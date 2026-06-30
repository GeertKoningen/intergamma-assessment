import { act, render, screen } from "@testing-library/react";
import { WishlistTrigger } from "@/components/wishlist/WishlistTrigger";

const openDrawerMock = jest.fn();

const wishlistState = {
  totalItems: 0,
  isDrawerOpen: false,
  hasHydrated: false,
};

jest.mock("@/hooks/useWishlist", () => ({
  useWishlist: () => ({
    ...wishlistState,
    openDrawer: openDrawerMock,
  }),
}));

describe("WishlistTrigger", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    openDrawerMock.mockClear();
    wishlistState.totalItems = 0;
    wishlistState.isDrawerOpen = false;
    wishlistState.hasHydrated = false;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("animates when the wishlist count changes after hydration", () => {
    const { rerender } = render(<WishlistTrigger />);

    wishlistState.hasHydrated = true;
    rerender(<WishlistTrigger />);

    const trigger = screen.getByRole("button", {
      name: "Bekijk wensenlijst, 0 artikelen",
    });
    expect(trigger).not.toHaveClass("animate-wishlist-trigger-highlight");

    wishlistState.totalItems = 1;
    rerender(<WishlistTrigger />);

    expect(
      screen.getByRole("button", { name: "Bekijk wensenlijst, 1 artikelen" }),
    ).toHaveClass("animate-wishlist-trigger-highlight");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(
      screen.getByRole("button", { name: "Bekijk wensenlijst, 1 artikelen" }),
    ).not.toHaveClass("animate-wishlist-trigger-highlight");
  });

  it("does not animate during the initial hydration sync", () => {
    const { rerender } = render(<WishlistTrigger />);

    wishlistState.totalItems = 3;
    wishlistState.hasHydrated = true;
    rerender(<WishlistTrigger />);

    expect(
      screen.getByRole("button", { name: "Bekijk wensenlijst, 3 artikelen" }),
    ).not.toHaveClass("animate-wishlist-trigger-highlight");
  });
});
