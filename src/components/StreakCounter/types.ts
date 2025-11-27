import type { HTMLAttributes, ReactNode } from 'react';

export type StreakType = 'daily' | 'weekly' | 'custom';
export type StreakSize = 'sm' | 'md' | 'lg' | 'xl';

export interface StreakMilestone {
  /** Days/count to reach this milestone */
  count: number;
  /** Label for the milestone */
  label: string;
  /** Optional reward description */
  reward?: string;
  /** Icon override for this milestone */
  icon?: ReactNode;
}

export interface StreakCounterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Current streak count
   */
  streak: number;

  /**
   * Type of streak for contextual messaging
   * @default 'daily'
   */
  streakType?: StreakType;

  /**
   * Custom label for the streak type (e.g., "Day Streak", "Week Streak")
   */
  typeLabel?: string;

  /**
   * Size variant
   * @default 'md'
   */
  size?: StreakSize;

  /**
   * Show animated flame icon
   * @default true
   */
  showFlame?: boolean;

  /**
   * Intensity level for flame (auto-calculated from streak if not provided)
   * 0 = no flame, 1 = small, 2 = medium, 3 = large, 4 = intense, 5 = legendary
   */
  flameIntensity?: 0 | 1 | 2 | 3 | 4 | 5;

  /**
   * Custom milestones to display
   * @default [7, 14, 30, 60, 100]
   */
  milestones?: number[] | StreakMilestone[];

  /**
   * Show milestone indicators
   * @default true
   */
  showMilestones?: boolean;

  /**
   * Show contextual message ("You're on fire!", etc.)
   * @default true
   */
  showMessage?: boolean;

  /**
   * Custom messages based on streak count
   */
  messages?: {
    start?: string; // 1-2 days
    building?: string; // 3-6 days
    strong?: string; // 7-13 days
    fire?: string; // 14-29 days
    legendary?: string; // 30+ days
  };

  /**
   * Show the "best streak" indicator
   */
  bestStreak?: number;

  /**
   * Animate the counter on mount/change
   * @default true
   */
  animated?: boolean;

  /**
   * Callback when a milestone is reached
   */
  onMilestoneReached?: (milestone: number) => void;

  /**
   * Show streak break warning (days until break)
   */
  breakWarning?: {
    hoursRemaining: number;
    show: boolean;
  };
}

// Default milestones
export const DEFAULT_MILESTONES = [7, 14, 30, 60, 100];

// Message defaults
export const DEFAULT_MESSAGES = {
  start: 'Keep it going!',
  building: 'Building momentum!',
  strong: "You're doing great!",
  fire: "🔥 You're on fire!",
  legendary: '🏆 Legendary streak!',
};

// Calculate flame intensity from streak
export function getFlameIntensity(streak: number): 0 | 1 | 2 | 3 | 4 | 5 {
  if (streak === 0) return 0;
  if (streak < 3) return 1;
  if (streak < 7) return 2;
  if (streak < 14) return 3;
  if (streak < 30) return 4;
  return 5;
}

// Get contextual message
export function getStreakMessage(
  streak: number,
  messages: typeof DEFAULT_MESSAGES = DEFAULT_MESSAGES
): string {
  if (streak < 3) return messages.start;
  if (streak < 7) return messages.building;
  if (streak < 14) return messages.strong;
  if (streak < 30) return messages.fire;
  return messages.legendary;
}
