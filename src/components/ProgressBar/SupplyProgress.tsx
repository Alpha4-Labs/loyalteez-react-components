'use client';

import { forwardRef, useMemo, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { ProgressBar } from './ProgressBar';
import { remainingBadgeStyles } from './ProgressBar.styles';
import type { SupplyProgressProps } from './types';

/**
 * A specialized progress bar for displaying supply/inventory progress.
 * Commonly used for perk collections, limited editions, etc.
 *
 * @example
 * // Basic usage
 * <SupplyProgress current={75} max={100} />
 *
 * @example
 * // With urgency threshold
 * <SupplyProgress
 *   current={92}
 *   max={100}
 *   urgencyThreshold={10}
 *   onUrgency={() => console.log('Low supply!')}
 * />
 *
 * @example
 * // Sold out state
 * <SupplyProgress current={100} max={100} />
 */
export const SupplyProgress = forwardRef<HTMLDivElement, SupplyProgressProps>(
  (
    {
      current,
      max,
      showRemaining = true,
      urgencyThreshold = 10,
      onUrgency,
      variant = 'gradient',
      showShimmer = true,
      className,
      ...props
    },
    ref
  ) => {
    // Convert BigInt to number for calculations
    const currentNum = typeof current === 'bigint' ? Number(current) : current;
    const maxNum = typeof max === 'bigint' ? Number(max) : max;

    // Calculate remaining and percentage
    const remaining = useMemo(() => maxNum - currentNum, [maxNum, currentNum]);
    const percentage = useMemo(
      () => (maxNum > 0 ? (currentNum / maxNum) * 100 : 0),
      [currentNum, maxNum]
    );

    // Determine urgency level
    const urgencyLevel = useMemo(() => {
      if (remaining <= 0) return 'critical';
      if (remaining <= urgencyThreshold / 2) return 'critical';
      if (remaining <= urgencyThreshold) return 'low';
      return 'normal';
    }, [remaining, urgencyThreshold]);

    // Contextual message
    const statusMessage = useMemo(() => {
      if (remaining <= 0) return 'Sold out!';
      if (percentage < 30) return 'Just started!';
      if (percentage < 70) return 'Going fast!';
      return 'Almost gone!';
    }, [remaining, percentage]);

    // Trigger urgency callback
    useEffect(() => {
      if (remaining <= urgencyThreshold && remaining > 0 && onUrgency) {
        onUrgency();
      }
    }, [remaining, urgencyThreshold, onUrgency]);

    const isSoldOut = remaining <= 0;

    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        {/* Header row */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-ltz-text-secondary font-medium">Availability</span>
          <div className="flex items-center gap-2">
            {showRemaining && (
              <span
                className={cn(
                  remainingBadgeStyles({ urgency: urgencyLevel })
                )}
              >
                {isSoldOut ? (
                  'Sold Out'
                ) : (
                  <>
                    <span className="font-bold text-base">{remaining}</span>
                    <span>remaining</span>
                  </>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar
          value={currentNum}
          max={maxNum}
          variant={isSoldOut ? 'default' : variant}
          showShimmer={!isSoldOut && showShimmer}
          barClassName={isSoldOut ? 'bg-red-500' : undefined}
          {...props}
        />

        {/* Footer row */}
        <div className="flex items-center justify-between text-xs text-ltz-text-muted">
          <span>{statusMessage}</span>
          <span className="tabular-nums">
            {currentNum.toLocaleString()} / {maxNum.toLocaleString()} claimed
          </span>
        </div>
      </div>
    );
  }
);

SupplyProgress.displayName = 'SupplyProgress';

