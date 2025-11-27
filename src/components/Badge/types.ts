import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  // Loyalty-specific variants
  | 'featured'
  | 'sponsored'
  | 'premium'
  | 'early-access'
  | 'limited'
  | 'sold-out'
  | 'new'
  | 'hot';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Icon to display before the label
   */
  icon?: ReactNode;

  /**
   * Icon to display after the label
   */
  iconRight?: ReactNode;

  /**
   * Enable glass/blur effect
   * @default false
   */
  glass?: boolean;

  /**
   * Enable glow effect (for featured/premium variants)
   * @default false
   */
  glow?: boolean;

  /**
   * Enable pulse animation (for urgency)
   * @default false
   */
  pulse?: boolean;

  /**
   * Content of the badge
   */
  children?: ReactNode;
}

export interface BadgeConfig {
  bg: string;
  text: string;
  border?: string;
  glow?: string;
}

export const BADGE_CONFIGS: Record<BadgeVariant, BadgeConfig> = {
  default: {
    bg: 'bg-ltz-bg-tertiary',
    text: 'text-ltz-text-secondary',
  },
  primary: {
    bg: 'bg-ltz-purple/20',
    text: 'text-ltz-purple',
    border: 'border-ltz-purple/30',
  },
  secondary: {
    bg: 'bg-ltz-cyan/20',
    text: 'text-ltz-cyan',
    border: 'border-ltz-cyan/30',
  },
  success: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
  warning: {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
  },
  danger: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
  },
  // Loyalty-specific
  featured: {
    bg: 'bg-gradient-to-r from-orange-500 to-red-500',
    text: 'text-white',
    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.4)]',
  },
  sponsored: {
    bg: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    text: 'text-white',
    glow: 'shadow-[0_0_15px_rgba(234,179,8,0.4)]',
  },
  premium: {
    bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
    text: 'text-white',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.4)]',
  },
  'early-access': {
    bg: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    text: 'text-white',
    glow: 'shadow-[0_0_15px_rgba(99,102,241,0.4)]',
  },
  limited: {
    bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
    text: 'text-white',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.4)]',
  },
  'sold-out': {
    bg: 'bg-red-500',
    text: 'text-white',
  },
  new: {
    bg: 'bg-gradient-to-r from-green-400 to-emerald-500',
    text: 'text-white',
    glow: 'shadow-[0_0_15px_rgba(34,197,94,0.4)]',
  },
  hot: {
    bg: 'bg-gradient-to-r from-red-500 to-orange-500',
    text: 'text-white',
    glow: 'shadow-[0_0_15px_rgba(239,68,68,0.4)]',
  },
};
