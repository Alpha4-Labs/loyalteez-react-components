/**
 * Format a number as LTZ with thousands separators.
 * @example formatLTZ(5420) // "5,420"
 * @example formatLTZ(1234567) // "1,234,567"
 */
export function formatLTZ(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

/**
 * Convert LTZ to dollar value (1,000 LTZ = $1).
 * @example ltzToDollars(5420) // 5.42
 */
export function ltzToDollars(ltz: number): number {
  return ltz / 1000;
}

/**
 * Format LTZ as dollar value string.
 * @example formatLTZAsDollars(5420) // "$5.42"
 */
export function formatLTZAsDollars(ltz: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(ltzToDollars(ltz));
}

/**
 * Format a number as a compact string (1K, 1M, etc.)
 * @example formatCompact(1500) // "1.5K"
 * @example formatCompact(1500000) // "1.5M"
 */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

