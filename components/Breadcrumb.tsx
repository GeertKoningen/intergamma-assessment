import Link from "next/link";

type BreadcrumbProps = {
  categoryLabel?: string;
  categoryHref?: string;
};

export function Breadcrumb({ categoryLabel, categoryHref }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/" className="hover:underline">
            Producten
          </Link>
        </li>
        {categoryLabel && categoryHref ? (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={categoryHref} className="hover:underline">
                {categoryLabel}
              </Link>
            </li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
