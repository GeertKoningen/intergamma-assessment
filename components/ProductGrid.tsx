import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({
  products,
  categoryLabel,
}: {
  products: Product[];
  categoryLabel: string;
}) {
  return (
    <section aria-label={`Producten voor ${categoryLabel}`}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.slug}>
            <ProductCard
              product={product}
              prioritizeImage={product.slug === products[0]?.slug}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
