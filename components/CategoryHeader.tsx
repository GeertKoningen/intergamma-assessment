import Link from "next/link";

export function CategoryHeader({
  label,
  productCount,
}: {
  label: string;
  productCount: number;
}) {
  return (
    <section className="shadow rounded-lg border border-[#ececec] bg-white p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.26em]">
        Categorie
      </p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900 sm:text-5xl">
        {label}
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        {productCount} producten gevonden in deze categorie.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex text-sm font-semibold text-[#2ba3dc] hover:underline"
      >
        Terug naar categorieoverzicht
      </Link>
    </section>
  );
}
