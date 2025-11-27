'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import type {
  SkeletonProps,
  PerkCardSkeletonProps,
  BalanceDisplaySkeletonProps,
  LeaderboardSkeletonProps,
  ChallengeCardSkeletonProps,
} from './types';

// Base animation classes
const animationClasses = {
  pulse: 'animate-pulse',
  shimmer: 'animate-ltz-shimmer bg-[length:200%_100%]',
  wave: 'animate-[ltz-wave_1.5s_ease-in-out_infinite]',
};

// Base skeleton gradient
const skeletonBase =
  'bg-gradient-to-r from-ltz-bg-tertiary via-ltz-bg-secondary to-ltz-bg-tertiary';

/**
 * Base skeleton primitive for building loading states.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      shape = 'rectangle',
      variant = 'shimmer',
      borderRadius,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const shapeClasses = {
      rectangle: 'rounded',
      circle: 'rounded-full',
      rounded: 'rounded-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(skeletonBase, animationClasses[variant], shapeClasses[shape], className)}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          borderRadius:
            borderRadius !== undefined
              ? typeof borderRadius === 'number'
                ? `${borderRadius}px`
                : borderRadius
              : undefined,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

/**
 * Skeleton for PerkCard component.
 */
export const PerkCardSkeleton = forwardRef<HTMLDivElement, PerkCardSkeletonProps>(
  ({ variant = 'grid', animation = 'shimmer', className, ...props }, ref) => {
    if (variant === 'list') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex gap-4 rounded-xl border border-ltz-border bg-ltz-bg-secondary p-4',
            className
          )}
          aria-label="Loading perk"
          {...props}
        >
          <Skeleton width={100} height={100} shape="rounded" variant={animation} />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton width="40%" height={16} variant={animation} />
            <Skeleton width="80%" height={20} variant={animation} />
            <Skeleton width="60%" height={14} variant={animation} />
            <div className="mt-auto flex items-center justify-between">
              <Skeleton width={80} height={24} variant={animation} />
              <Skeleton width={100} height={36} shape="rounded" variant={animation} />
            </div>
          </div>
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center gap-3 rounded-lg border border-ltz-border bg-ltz-bg-secondary p-3',
            className
          )}
          aria-label="Loading perk"
          {...props}
        >
          <Skeleton width={48} height={48} shape="rounded" variant={animation} />
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton width="70%" height={16} variant={animation} />
            <Skeleton width={60} height={14} variant={animation} />
          </div>
        </div>
      );
    }

    // Grid variant (default)
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col overflow-hidden rounded-xl border border-ltz-border bg-ltz-bg-secondary',
          className
        )}
        aria-label="Loading perk"
        {...props}
      >
        {/* Image placeholder */}
        <Skeleton width="100%" height={200} variant={animation} className="rounded-none" />

        {/* Content */}
        <div className="flex flex-col gap-3 p-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Skeleton width={24} height={24} shape="circle" variant={animation} />
            <Skeleton width="40%" height={14} variant={animation} />
          </div>

          {/* Title */}
          <Skeleton width="90%" height={20} variant={animation} />

          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton width={60} height={20} shape="rounded" variant={animation} />
            <Skeleton width={80} height={20} shape="rounded" variant={animation} />
          </div>

          {/* Supply */}
          <Skeleton width="100%" height={8} shape="rounded" variant={animation} />

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-2">
            <Skeleton width={80} height={24} variant={animation} />
            <Skeleton width={100} height={40} shape="rounded" variant={animation} />
          </div>
        </div>
      </div>
    );
  }
);
PerkCardSkeleton.displayName = 'PerkCardSkeleton';

/**
 * Skeleton for BalanceDisplay component.
 */
export const BalanceDisplaySkeleton = forwardRef<HTMLDivElement, BalanceDisplaySkeletonProps>(
  ({ size = 'md', showDollarValue = true, animation = 'shimmer', className, ...props }, ref) => {
    const sizes = {
      sm: { balance: { w: 80, h: 24 }, dollar: { w: 40, h: 12 } },
      md: { balance: { w: 120, h: 32 }, dollar: { w: 50, h: 14 } },
      lg: { balance: { w: 160, h: 40 }, dollar: { w: 60, h: 16 } },
    };

    const s = sizes[size];

    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-end gap-1', className)}
        aria-label="Loading balance"
        {...props}
      >
        <Skeleton width={s.balance.w} height={s.balance.h} variant={animation} />
        {showDollarValue && <Skeleton width={s.dollar.w} height={s.dollar.h} variant={animation} />}
      </div>
    );
  }
);
BalanceDisplaySkeleton.displayName = 'BalanceDisplaySkeleton';

/**
 * Skeleton for Leaderboard component.
 */
export const LeaderboardSkeleton = forwardRef<HTMLDivElement, LeaderboardSkeletonProps>(
  (
    { entries = 5, size = 'md', showAvatars = true, animation = 'shimmer', className, ...props },
    ref
  ) => {
    const sizes = {
      sm: { avatar: 28, row: 'py-2 px-3 gap-2' },
      md: { avatar: 36, row: 'py-3 px-4 gap-3' },
      lg: { avatar: 48, row: 'py-4 px-6 gap-4' },
    };

    const s = sizes[size];

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-xl border border-ltz-border bg-ltz-bg-secondary',
          className
        )}
        aria-label="Loading leaderboard"
        {...props}
      >
        {/* Header */}
        <div className="border-b border-ltz-border px-4 py-3">
          <Skeleton width={120} height={20} variant={animation} />
        </div>

        {/* Entries */}
        {Array.from({ length: entries }).map((_, i) => (
          <div
            key={i}
            className={cn('flex items-center border-b border-ltz-border last:border-b-0', s.row)}
          >
            {/* Rank */}
            <Skeleton width={32} height={24} variant={animation} />

            {/* Avatar */}
            {showAvatars && (
              <Skeleton width={s.avatar} height={s.avatar} shape="circle" variant={animation} />
            )}

            {/* Name */}
            <Skeleton width="40%" height={16} variant={animation} className="flex-1" />

            {/* Score */}
            <Skeleton width={60} height={20} variant={animation} />
          </div>
        ))}
      </div>
    );
  }
);
LeaderboardSkeleton.displayName = 'LeaderboardSkeleton';

/**
 * Skeleton for ChallengeCard component.
 */
export const ChallengeCardSkeleton = forwardRef<HTMLDivElement, ChallengeCardSkeletonProps>(
  ({ size = 'md', animation = 'shimmer', className, ...props }, ref) => {
    const sizes = {
      sm: { icon: 40, padding: 'p-3' },
      md: { icon: 48, padding: 'p-4' },
      lg: { icon: 64, padding: 'p-6' },
    };

    const s = sizes[size];

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-ltz-border bg-ltz-bg-secondary',
          s.padding,
          className
        )}
        aria-label="Loading challenge"
        {...props}
      >
        {/* Header */}
        <div className="mb-4 flex items-start gap-3">
          <Skeleton width={s.icon} height={s.icon} shape="rounded" variant={animation} />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton width="30%" height={12} variant={animation} />
            <Skeleton width="80%" height={18} variant={animation} />
            <Skeleton width="60%" height={14} variant={animation} />
          </div>
          <Skeleton width={70} height={24} shape="rounded" variant={animation} />
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="mb-1 flex justify-between">
            <Skeleton width={60} height={12} variant={animation} />
            <Skeleton width={40} height={12} variant={animation} />
          </div>
          <Skeleton width="100%" height={8} shape="rounded" variant={animation} />
        </div>

        {/* Reward */}
        <div className="flex items-center justify-between border-t border-ltz-border pt-4">
          <div className="flex items-center gap-2">
            <Skeleton width={60} height={14} variant={animation} />
            <Skeleton width={80} height={24} variant={animation} />
          </div>
          <Skeleton width={100} height={36} shape="rounded" variant={animation} />
        </div>
      </div>
    );
  }
);
ChallengeCardSkeleton.displayName = 'ChallengeCardSkeleton';
