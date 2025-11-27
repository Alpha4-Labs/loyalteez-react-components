import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { formatLTZAsDollars } from '@/utils/formatLTZ';
import { useBalanceDisplay } from './useBalanceDisplay';
import {
  balanceDisplayStyles,
  balanceValueStyles,
  balanceLabelStyles,
  dollarValueStyles,
  skeletonStyles,
} from './BalanceDisplay.styles';
import type { BalanceDisplayProps } from './types';

/**
 * Displays the user's LTZ balance with optional animation and dollar value.
 *
 * @example
 * // Basic usage
 * <BalanceDisplay balance={5420} />
 *
 * @example
 * // With animation and dollar value
 * <BalanceDisplay balance={5420} animated showDollarValue />
 *
 * @example
 * // Large size with compact numbers
 * <BalanceDisplay balance={1500000} size="lg" compact />
 */
export const BalanceDisplay = forwardRef<HTMLDivElement, BalanceDisplayProps>(
  (
    {
      balance,
      showDollarValue = false,
      size = 'md',
      animated = false,
      loading = false,
      showLabel = true,
      compact = false,
      className,
      ...props
    },
    ref
  ) => {
    const { formattedBalance, displayValue, isAnimating } = useBalanceDisplay({
      balance,
      animated,
      compact,
    });

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(balanceDisplayStyles({ size }), className)}
          role="status"
          aria-label="Loading balance"
          {...props}
        >
          <div className={skeletonStyles({ size })} />
          {showDollarValue && (
            <div className={cn(skeletonStyles({ size }), 'h-4 w-16')} />
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(balanceDisplayStyles({ size }), className)}
        {...props}
      >
        <div
          className={cn(
            balanceValueStyles({ size, animated }),
            isAnimating && 'animate-ltz-count-up'
          )}
        >
          <span aria-label={`${displayValue} LTZ`}>{formattedBalance}</span>
          {showLabel && <span className={balanceLabelStyles({ size })}>LTZ</span>}
        </div>
        {showDollarValue && (
          <span className={dollarValueStyles({ size })}>
            {formatLTZAsDollars(displayValue)} value
          </span>
        )}
      </div>
    );
  }
);

BalanceDisplay.displayName = 'BalanceDisplay';

