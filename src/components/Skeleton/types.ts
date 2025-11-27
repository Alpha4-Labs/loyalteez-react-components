import type { HTMLAttributes } from 'react';

export type SkeletonVariant = 'pulse' | 'shimmer' | 'wave';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Width (CSS value or number for pixels)
   */
  width?: string | number;

  /**
   * Height (CSS value or number for pixels)
   */
  height?: string | number;

  /**
   * Shape variant
   * @default 'rectangle'
   */
  shape?: 'rectangle' | 'circle' | 'rounded';

  /**
   * Animation variant
   * @default 'shimmer'
   */
  variant?: SkeletonVariant;

  /**
   * Border radius (overrides shape)
   */
  borderRadius?: string | number;
}

export interface PerkCardSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant
   * @default 'grid'
   */
  variant?: 'grid' | 'list' | 'compact';

  /**
   * Animation variant
   * @default 'shimmer'
   */
  animation?: SkeletonVariant;
}

export interface BalanceDisplaySkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show dollar value placeholder
   * @default true
   */
  showDollarValue?: boolean;

  /**
   * Animation variant
   * @default 'shimmer'
   */
  animation?: SkeletonVariant;
}

export interface LeaderboardSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of skeleton entries
   * @default 5
   */
  entries?: number;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show avatars
   * @default true
   */
  showAvatars?: boolean;

  /**
   * Animation variant
   * @default 'shimmer'
   */
  animation?: SkeletonVariant;
}

export interface ChallengeCardSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Animation variant
   * @default 'shimmer'
   */
  animation?: SkeletonVariant;
}
