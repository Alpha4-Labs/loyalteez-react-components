'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { tierBadgeStyles, tierIconStyles, shineOverlayStyles } from './TierBadge.styles';
import { TIER_CONFIG } from './types';
import type { TierBadgeProps } from './types';

// Default tier icons (simple SVGs)
const TierIcons = {
  bronze: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  silver: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  gold: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  platinum: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 2h12l4 7-10 13L2 9l4-7zm2.94 1L6.26 7.5h11.48L15.06 3H8.94zM12 19.3l7.66-10H4.34L12 19.3z" />
    </svg>
  ),
};

/**
 * A badge component for displaying user tier levels.
 *
 * @example
 * // Basic usage
 * <TierBadge tier="gold" />
 *
 * @example
 * // Large with animation
 * <TierBadge tier="diamond" size="lg" animated />
 *
 * @example
 * // With shine effect on hover
 * <TierBadge tier="platinum" showShine />
 *
 * @example
 * // Custom label
 * <TierBadge tier="gold" label="VIP Gold" />
 */
export const TierBadge = forwardRef<HTMLDivElement, TierBadgeProps>(
  (
    {
      tier,
      size = 'md',
      showLabel = true,
      label,
      icon,
      animated = false,
      showShine = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const config = TIER_CONFIG[tier];
    const displayLabel = label || config.label;
    const IconComponent = icon || TierIcons[tier];

    return (
      <div
        ref={ref}
        className={cn(
          tierBadgeStyles({ size, animated }),
          showShine && 'group',
          className
        )}
        style={{
          background: config.gradient,
          color: config.textColor,
          boxShadow: animated ? undefined : config.glow,
          ...style,
        }}
        {...props}
      >
        {/* Icon */}
        <span className={cn(tierIconStyles({ size }))}>
          {IconComponent}
        </span>

        {/* Label */}
        {showLabel && <span>{displayLabel}</span>}

        {/* Shine overlay */}
        {showShine && (
          <span className={cn(shineOverlayStyles({ active: true }))} />
        )}
      </div>
    );
  }
);

TierBadge.displayName = 'TierBadge';

