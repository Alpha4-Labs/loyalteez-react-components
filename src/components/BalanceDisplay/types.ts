import type { HTMLAttributes } from 'react';

export interface BalanceDisplayProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * The LTZ balance to display.
   */
  balance: number;

  /**
   * Show the equivalent dollar value beneath the balance.
   * Calculated as balance / 1000.
   * @default false
   */
  showDollarValue?: boolean;

  /**
   * Size variant of the balance display.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether to animate the balance when it changes.
   * @default false
   */
  animated?: boolean;

  /**
   * Show a loading skeleton instead of the balance.
   * @default false
   */
  loading?: boolean;

  /**
   * Show the LTZ label next to the balance.
   * @default true
   */
  showLabel?: boolean;

  /**
   * Use compact number format (e.g., 1.5K, 2.3M).
   * @default false
   */
  compact?: boolean;
}

export interface UseBalanceDisplayOptions {
  balance: number;
  animated?: boolean;
  compact?: boolean;
}

export interface UseBalanceDisplayReturn {
  /**
   * The current display value (may differ from balance during animation).
   */
  displayValue: number;

  /**
   * The formatted balance string.
   */
  formattedBalance: string;

  /**
   * The dollar equivalent value.
   */
  dollarValue: number;

  /**
   * Whether the balance is currently animating.
   */
  isAnimating: boolean;
}

