import type { HTMLAttributes, ReactNode } from 'react';

export type ChallengeStatus = 'active' | 'completed' | 'expired' | 'locked';
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';
export type ChallengeSize = 'sm' | 'md' | 'lg';

export interface ChallengeReward {
  /** Reward amount */
  amount: number;
  /** Reward type label */
  type?: string;
  /** Reward icon */
  icon?: ReactNode;
}

export interface ChallengeData {
  /** Unique identifier */
  id: string;
  /** Challenge title */
  title: string;
  /** Challenge description */
  description?: string;
  /** Current progress (0-100 or absolute value) */
  progress: number;
  /** Goal value (for absolute progress) */
  goal?: number;
  /** Status */
  status: ChallengeStatus;
  /** Difficulty level */
  difficulty?: ChallengeDifficulty;
  /** Reward for completion */
  reward: ChallengeReward;
  /** End time (ISO string or Date) */
  endTime?: string | Date;
  /** Challenge icon */
  icon?: ReactNode;
  /** Category/type label */
  category?: string;
}

export interface ChallengeCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Challenge data
   */
  challenge: ChallengeData;

  /**
   * Size variant
   * @default 'md'
   */
  size?: ChallengeSize;

  /**
   * Show countdown timer
   * @default true
   */
  showTimer?: boolean;

  /**
   * Show progress bar
   * @default true
   */
  showProgress?: boolean;

  /**
   * Show difficulty badge
   * @default true
   */
  showDifficulty?: boolean;

  /**
   * Show reward preview
   * @default true
   */
  showReward?: boolean;

  /**
   * Animate on mount
   * @default true
   */
  animated?: boolean;

  /**
   * Called when claim button is clicked
   */
  onClaim?: (challengeId: string) => void;

  /**
   * Called when card is clicked (passes challenge data)
   */
  onCardClick?: (challenge: ChallengeData) => void;

  /**
   * Custom claim button label
   */
  claimLabel?: string;

  /**
   * Is claiming in progress
   */
  isClaiming?: boolean;
}

// Difficulty configs
export const DIFFICULTY_CONFIG = {
  easy: {
    label: 'Easy',
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: '⭐',
  },
  medium: {
    label: 'Medium',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: '⭐⭐',
  },
  hard: {
    label: 'Hard',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    icon: '⭐⭐⭐',
  },
  legendary: {
    label: 'Legendary',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    icon: '👑',
  },
} as const;

// Status configs
export const STATUS_CONFIG = {
  active: {
    label: 'Active',
    color: 'text-ltz-cyan',
    bgColor: 'bg-ltz-cyan/10',
  },
  completed: {
    label: 'Completed',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  expired: {
    label: 'Expired',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
  locked: {
    label: 'Locked',
    color: 'text-ltz-text-muted',
    bgColor: 'bg-ltz-bg-tertiary',
  },
} as const;
