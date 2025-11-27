'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { badgeStyles, badgeIconStyles } from './Badge.styles';
import { BADGE_CONFIGS } from './types';
import type { BadgeProps } from './types';

/**
 * A versatile badge component with multiple variants for loyalty programs.
 *
 * @example
 * // Basic usage
 * <Badge>Default</Badge>
 *
 * @example
 * // Loyalty variants
 * <Badge variant="featured">Featured</Badge>
 * <Badge variant="premium">Premium</Badge>
 * <Badge variant="sold-out">Sold Out</Badge>
 *
 * @example
 * // With icon
 * <Badge variant="hot" icon={<FireIcon />}>Hot</Badge>
 *
 * @example
 * // With glow and glass effect
 * <Badge variant="premium" glow glass>VIP Only</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
      iconRight,
      glass = false,
      glow = false,
      pulse = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const config = BADGE_CONFIGS[variant];
    const hasIcon = Boolean(icon || iconRight);

    return (
      <span
        ref={ref}
        className={cn(
          badgeStyles({ size, glass, pulse, hasIcon }),
          config.bg,
          config.text,
          config.border && `border ${config.border}`,
          glow && config.glow,
          glass && 'border border-white/20',
          className
        )}
        {...props}
      >
        {icon && <span className={cn(badgeIconStyles({ size }))}>{icon}</span>}
        {children}
        {iconRight && <span className={cn(badgeIconStyles({ size }))}>{iconRight}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * Pre-configured badge components for common loyalty scenarios
 */
export const FeaturedBadge = forwardRef<HTMLSpanElement, Omit<BadgeProps, 'variant'>>(
  (props, ref) => (
    <Badge ref={ref} variant="featured" glow {...props}>
      {props.children || 'Featured'}
    </Badge>
  )
);
FeaturedBadge.displayName = 'FeaturedBadge';

export const SponsoredBadge = forwardRef<HTMLSpanElement, Omit<BadgeProps, 'variant'>>(
  (props, ref) => (
    <Badge ref={ref} variant="sponsored" glow {...props}>
      {props.children || 'Sponsored'}
    </Badge>
  )
);
SponsoredBadge.displayName = 'SponsoredBadge';

export const PremiumBadge = forwardRef<HTMLSpanElement, Omit<BadgeProps, 'variant'>>(
  (props, ref) => (
    <Badge ref={ref} variant="premium" glow {...props}>
      {props.children || 'Premium'}
    </Badge>
  )
);
PremiumBadge.displayName = 'PremiumBadge';

export const SoldOutBadge = forwardRef<HTMLSpanElement, Omit<BadgeProps, 'variant'>>(
  (props, ref) => (
    <Badge ref={ref} variant="sold-out" {...props}>
      {props.children || 'Sold Out'}
    </Badge>
  )
);
SoldOutBadge.displayName = 'SoldOutBadge';

export const NewBadge = forwardRef<HTMLSpanElement, Omit<BadgeProps, 'variant'>>((props, ref) => (
  <Badge ref={ref} variant="new" glow {...props}>
    {props.children || 'New'}
  </Badge>
));
NewBadge.displayName = 'NewBadge';

export const HotBadge = forwardRef<HTMLSpanElement, Omit<BadgeProps, 'variant'>>((props, ref) => (
  <Badge ref={ref} variant="hot" glow {...props}>
    {props.children || 'Hot'}
  </Badge>
));
HotBadge.displayName = 'HotBadge';

export const LimitedBadge = forwardRef<HTMLSpanElement, Omit<BadgeProps, 'variant'>>(
  (props, ref) => (
    <Badge ref={ref} variant="limited" glow {...props}>
      {props.children || 'Limited'}
    </Badge>
  )
);
LimitedBadge.displayName = 'LimitedBadge';

export const EarlyAccessBadge = forwardRef<HTMLSpanElement, Omit<BadgeProps, 'variant'>>(
  (props, ref) => (
    <Badge ref={ref} variant="early-access" glow {...props}>
      {props.children || 'Early Access'}
    </Badge>
  )
);
EarlyAccessBadge.displayName = 'EarlyAccessBadge';
