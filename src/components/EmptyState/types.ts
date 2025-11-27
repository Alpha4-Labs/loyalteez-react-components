import type { HTMLAttributes, ReactNode } from 'react';

export type EmptyStateSize = 'sm' | 'md' | 'lg';
export type EmptyStateVariant = 'default' | 'card' | 'minimal';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Icon to display (ReactNode or emoji string)
   */
  icon?: ReactNode;

  /**
   * Title text
   */
  title: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * Primary action button/element
   */
  action?: ReactNode;

  /**
   * Secondary action
   */
  secondaryAction?: ReactNode;

  /**
   * Size variant
   * @default 'md'
   */
  size?: EmptyStateSize;

  /**
   * Visual variant
   * - `default`: Standard layout with icon above text
   * - `card`: Elevated card with border
   * - `minimal`: Just text, no decoration
   * @default 'default'
   */
  variant?: EmptyStateVariant;

  /**
   * Show decorative gradient background
   * @default true
   */
  showGradient?: boolean;

  /**
   * Custom illustration/image
   */
  illustration?: ReactNode;

  /**
   * Animate entrance
   * @default true
   */
  animated?: boolean;
}

// Pre-defined empty state configurations
export const EMPTY_STATE_PRESETS = {
  noPerks: {
    icon: '🎁',
    title: 'No perks found',
    description: 'Try adjusting your filters or check back later for new rewards.',
  },
  noFavorites: {
    icon: '💜',
    title: 'No favorites yet',
    description: 'Heart your favorite perks to find them quickly here.',
  },
  noResults: {
    icon: '🔍',
    title: 'No results',
    description: "We couldn't find anything matching your search.",
  },
  noLeaderboard: {
    icon: '🏆',
    title: 'No rankings yet',
    description: 'Be the first to earn points and claim the top spot!',
  },
  noChallenges: {
    icon: '🎯',
    title: 'No active challenges',
    description: 'Check back soon for new ways to earn rewards.',
  },
  noNotifications: {
    icon: '🔔',
    title: 'All caught up!',
    description: 'You have seen all your notifications.',
  },
  error: {
    icon: '😵',
    title: 'Something went wrong',
    description: 'Please try again or contact support if the problem persists.',
  },
  offline: {
    icon: '📡',
    title: "You're offline",
    description: 'Check your internet connection and try again.',
  },
  comingSoon: {
    icon: '🚀',
    title: 'Coming soon',
    description: "We're working on something exciting. Stay tuned!",
  },
} as const;

export type EmptyStatePreset = keyof typeof EMPTY_STATE_PRESETS;
