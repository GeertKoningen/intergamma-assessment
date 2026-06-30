const currencyFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export function Pricetag({ price }: { price: number }) {
  return (
    <p className="text-2xl font-semibold">{currencyFormatter.format(price)}</p>
  );
}
