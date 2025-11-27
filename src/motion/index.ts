// Framer Motion enhanced components
// Requires framer-motion as a peer dependency

// Balance
export { BalanceDisplayMotion } from './BalanceDisplayMotion';

// Gamification
export { StreakCounterMotion } from './StreakCounterMotion';
export { LeaderboardMotion } from './LeaderboardMotion';
export { ChallengeCardMotion } from './ChallengeCardMotion';

// Animation Utilities
export { AnimatedList, AnimatedItem } from './AnimatedList';
export type {
  AnimatedListProps,
  AnimatedItemProps,
  StaggerDirection,
  AnimationPreset,
} from './AnimatedList';

// Re-export types for convenience
export type { BalanceDisplayProps } from '@/components/BalanceDisplay/types';
export type { StreakCounterProps } from '@/components/StreakCounter/types';
export type { LeaderboardProps } from '@/components/Leaderboard/types';
export type { ChallengeCardProps } from '@/components/ChallengeCard/types';
