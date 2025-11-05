export function formatNumber(
  value: number,
  options?: {
    decimals?: number;
    locale?: string;
  }
): string {
  const { decimals = 2, locale = "ko-KR" } = options || {};
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCurrency(
  value: number,
  currency: string = "KRW",
  locale: string = "ko-KR"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDate(date: Date, locale: string = "ko-KR"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

