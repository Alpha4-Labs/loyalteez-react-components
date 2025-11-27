import type { HTMLAttributes } from 'react';

export type ProgressBarVariant = 'default' | 'gradient' | 'glow';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Current value of the progress bar
   */
  value: number;

  /**
   * Maximum value (defaults to 100)
   */
  max?: number;

  /**
   * Visual style variant
   * - `default`: Solid primary color
   * - `gradient`: Cyan to purple gradient
   * - `glow`: Gradient with glow effect
   * @default 'default'
   */
  variant?: ProgressBarVariant;

  /**
   * Size of the progress bar
   * @default 'md'
   */
  size?: ProgressBarSize;

  /**
   * Show percentage label
   * @default false
   */
  showLabel?: boolean;

  /**
   * Custom label format function
   * @param value Current value
   * @param max Maximum value
   * @param percentage Percentage complete
   */
  formatLabel?: (value: number, max: number, percentage: number) => string;

  /**
   * Animate the progress bar fill on mount
   * @default false
   */
  animated?: boolean;

  /**
   * Show shimmer effect on the filled portion
   * @default false
   */
  showShimmer?: boolean;

  /**
   * Color stops for custom gradient (overrides variant)
   */
  gradientStops?: string[];

  /**
   * Additional class for the progress bar fill
   */
  barClassName?: string;
}

export interface SupplyProgressProps extends Omit<ProgressBarProps, 'value' | 'max'> {
  /**
   * Current supply (claimed)
   */
  current: number | bigint;

  /**
   * Maximum supply
   */
  max: number | bigint;

  /**
   * Show "X remaining" text
   * @default true
   */
  showRemaining?: boolean;

  /**
   * Threshold to show "Low Supply" badge (remaining count)
   * @default 10
   */
  urgencyThreshold?: number;

  /**
   * Callback when urgency threshold is reached
   */
  onUrgency?: () => void;
}

