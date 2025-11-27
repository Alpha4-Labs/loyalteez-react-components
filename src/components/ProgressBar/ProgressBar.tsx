'use client';

import { forwardRef, useMemo } from 'react';
import { cn } from '@/utils/cn';
import {
  progressContainerStyles,
  progressBarStyles,
  progressLabelStyles,
  shimmerStyles,
} from './ProgressBar.styles';
import type { ProgressBarProps } from './types';

/**
 * A progress bar component with multiple visual variants.
 *
 * @example
 * // Basic usage
 * <ProgressBar value={75} />
 *
 * @example
 * // Gradient with shimmer
 * <ProgressBar value={50} max={100} variant="gradient" showShimmer />
 *
 * @example
 * // With label
 * <ProgressBar value={75} showLabel animated />
 *
 * @example
 * // Custom label format
 * <ProgressBar
 *   value={750}
 *   max={1000}
 *   showLabel
 *   formatLabel={(v, m) => `${v}/${m} claimed`}
 * />
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      variant = 'default',
      size = 'md',
      showLabel = false,
      formatLabel,
      animated = false,
      showShimmer = false,
      gradientStops,
      barClassName,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Calculate percentage
    const percentage = useMemo(() => {
      const clampedValue = Math.max(0, Math.min(value, max));
      return max > 0 ? (clampedValue / max) * 100 : 0;
    }, [value, max]);

    // Format label
    const labelText = useMemo(() => {
      if (!showLabel) return null;
      if (formatLabel) {
        return formatLabel(value, max, percentage);
      }
      return `${Math.round(percentage)}%`;
    }, [showLabel, formatLabel, value, max, percentage]);

    // Custom gradient style
    const customGradientStyle = gradientStops
      ? { background: `linear-gradient(90deg, ${gradientStops.join(', ')})` }
      : undefined;

    return (
      <div
        ref={ref}
        className={cn('flex items-center', className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={labelText || `${Math.round(percentage)}% complete`}
        {...props}
      >
        <div
          className={cn(
            progressContainerStyles({ size }),
            'bg-ltz-bg-tertiary flex-1'
          )}
          style={style}
        >
          <div
            className={cn(
              progressBarStyles({ variant, animated, size }),
              barClassName
            )}
            style={{
              width: `${percentage}%`,
              ...customGradientStyle,
            }}
          >
            {/* Shimmer effect */}
            {showShimmer && percentage > 0 && (
              <div className={cn(shimmerStyles({ active: true }))} />
            )}
          </div>
        </div>

        {/* Label */}
        {showLabel && labelText && (
          <span className={cn(progressLabelStyles({ size, position: 'right' }))}>
            {labelText}
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

