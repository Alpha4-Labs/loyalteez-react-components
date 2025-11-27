import type { HTMLAttributes, ReactNode } from 'react';

export interface LeaderboardEntry {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Avatar URL */
  avatar?: string;
  /** Score/points */
  score: number;
  /** Current rank position */
  rank: number;
  /** Previous rank (for showing change) */
  previousRank?: number;
  /** Optional badge/tier */
  badge?: ReactNode;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

export type LeaderboardSize = 'sm' | 'md' | 'lg';

export interface LeaderboardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Leaderboard entries (should be sorted by rank)
   */
  entries: LeaderboardEntry[];

  /**
   * Current user's ID to highlight
   */
  currentUserId?: string;

  /**
   * Maximum entries to display
   * @default 10
   */
  maxDisplay?: number;

  /**
   * Show medal icons for top 3
   * @default true
   */
  showMedals?: boolean;

  /**
   * Show rank change indicators (↑↓)
   * @default true
   */
  showRankChange?: boolean;

  /**
   * Show avatars
   * @default true
   */
  showAvatars?: boolean;

  /**
   * Size variant
   * @default 'md'
   */
  size?: LeaderboardSize;

  /**
   * Animate entries on mount
   * @default true
   */
  animated?: boolean;

  /**
   * Custom score label
   * @default 'LTZ'
   */
  scoreLabel?: string;

  /**
   * Show "Your Rank" card at bottom if current user not in top entries
   * @default true
   */
  showCurrentUserCard?: boolean;

  /**
   * Current user's entry (if not in the main entries list)
   */
  currentUserEntry?: LeaderboardEntry;

  /**
   * Called when an entry is clicked
   */
  onEntryClick?: (entry: LeaderboardEntry) => void;

  /**
   * Custom empty state
   */
  emptyState?: ReactNode;

  /**
   * Header content
   */
  header?: ReactNode;

  /**
   * Footer content
   */
  footer?: ReactNode;
}

export interface LeaderboardEntryProps extends HTMLAttributes<HTMLDivElement> {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
  showMedal?: boolean;
  showRankChange?: boolean;
  showAvatar?: boolean;
  size?: LeaderboardSize;
  animated?: boolean;
  animationDelay?: number;
  scoreLabel?: string;
  onClick?: () => void;
}

// Medal colors
export const MEDAL_COLORS = {
  1: { bg: 'from-yellow-400 to-amber-500', text: 'text-amber-900', glow: 'shadow-amber-400/50' },
  2: { bg: 'from-gray-300 to-gray-400', text: 'text-gray-700', glow: 'shadow-gray-400/50' },
  3: { bg: 'from-orange-400 to-orange-600', text: 'text-orange-900', glow: 'shadow-orange-400/50' },
} as const;
