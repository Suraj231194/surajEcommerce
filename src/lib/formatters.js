export function formatCurrency(value, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function getDiscountPercent(price, discountPrice) {
  if (!price || !discountPrice || price <= discountPrice) {
    return 0;
  }
  return Math.round(((price - discountPrice) / price) * 100);
}

export function formatCompactNumber(value) {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value || 0);
}
