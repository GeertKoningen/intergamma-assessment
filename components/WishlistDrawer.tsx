"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWishlist } from "@/hooks/useWishlist";
import { WishlistItem } from "@/components/WishlistItem";
import { Heart } from "lucide-react";

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
      <SheetContent side="right" className="border-slate-200 shadow-2xl">
        <SheetHeader className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <SheetTitle className="display-font text-3xl">
              Favorieten ({totalItems})
            </SheetTitle>
            <SheetDescription>
              Beheer je bewaarde producten en pas aantallen aan.
            </SheetDescription>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {wishlist.length > 0 ? (
            <ul className="space-y-3">
              {wishlist.map((item) => (
                <WishlistItem key={item.product.slug} item={item} />
              ))}
            </ul>
          ) : (
            <div className="flex h-full min-h-[20rem] flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary">
                <Heart className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="display-font text-2xl">Geen favorieten</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Voeg items toe vanuit het productoverzicht om bij te houden
                welke producten je wilt vergelijken, opnieuw wilt bekijken of
                later wilt kopen.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Totaal</span>
            <span className="text-lg font-semibold text-slate-950">
              {currencyFormatter.format(totalPrice)}
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
