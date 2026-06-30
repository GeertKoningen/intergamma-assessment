"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWishlist } from "@/hooks/useWishlist";
import { WishlistItem } from "@/components/WishlistItem";

const currencyFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export function WishlistDrawer() {
  const { wishlist, totalItems, isDrawerOpen, closeDrawer } = useWishlist();

  const totalPrice = wishlist.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <Sheet
      open={isDrawerOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDrawer();
        }
      }}
    >
      <SheetContent side="right" className="border-white/10 shadow-2xl bg-wite">
        <SheetHeader className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <SheetTitle className="display-font text-3xl text-white">
              Favorieten ({totalItems})
            </SheetTitle>
          </div>

          <SheetClose asChild>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Sluiten
            </button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {wishlist.length > 0 ? (
            <ul className="space-y-3">
              {wishlist.map((item) => (
                <WishlistItem key={item.product.slug} item={item} />
              ))}
            </ul>
          ) : (
            <div className="flex h-full min-h-[20rem] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl">
                ♡
              </div>
              <h3 className="display-font text-2xl text-white">
                Geen favorieten
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                Voeg items toe vanuit het productoverzicht om bij te houden
                welke producten je wilt vergelijken, opnieuw wilt bekijken of
                later wilt kopen.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-6 py-5">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Totaal</span>
            <span className="text-lg font-semibold">
              {currencyFormatter.format(totalPrice)}
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
