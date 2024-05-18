function formatPrice({
  price,
  locales = 'vi-VN',
  style = 'currency',
  currency = 'VND',
}: {
  price: number;
  locales?: string;
  style?: string;
  currency?: string;
}) {
  return price.toLocaleString(locales, {
    style,
    currency,
  });
}

export { formatPrice };
