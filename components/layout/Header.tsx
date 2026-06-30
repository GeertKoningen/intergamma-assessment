import Image from "next/image";
import Link from "next/link";
import { WishlistTrigger } from "@/components/wishlist/WishlistTrigger";

export function Header() {
  return (
    <header className="shadow sticky top-0 z-30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Intergamma home"
        >
          <Image
            src="/logo.svg"
            alt="Intergamma"
            width={210}
            height={42}
            loading="eager"
            fetchPriority="high"
            className="h-auto w-[150px] sm:w-[190px]"
          />
        </Link>

        <WishlistTrigger />
      </div>
    </header>
  );
}
