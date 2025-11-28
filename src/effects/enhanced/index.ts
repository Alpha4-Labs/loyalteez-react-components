// Enhanced Components with Built-in Effects
// These components wrap the base components with effect layers

export {
  EnhancedPerkCard,
  LegendaryPerkCard,
  EpicPerkCard,
  RarePerkCard,
} from './EnhancedPerkCard';
export type { EnhancedPerkCardProps, PerkRarity } from './EnhancedPerkCard';

export {
  EnhancedBalanceDisplay,
  CelebratoryBalanceDisplay,
  JackpotBalanceDisplay,
} from './EnhancedBalanceDisplay';
export type { EnhancedBalanceDisplayProps } from './EnhancedBalanceDisplay';

export {
  EnhancedToastProvider,
  useEnhancedToast,
} from './EnhancedRewardToast';
export type {
  EnhancedToast,
  EnhancedToastOptions,
  EnhancedRewardOptions,
  EnhancedToastContextValue,
  EnhancedToastProviderProps,
} from './EnhancedRewardToast';

export {
  EnhancedClaimModal,
  PremiumClaimModal,
  MinimalClaimModal,
  ArcadeClaimModal,
} from './EnhancedClaimModal';
export type { EnhancedClaimModalProps } from './EnhancedClaimModal';

export { EnhancedLeaderboard } from './EnhancedLeaderboard';
export type { EnhancedLeaderboardProps } from './EnhancedLeaderboard';

export { EnhancedProgressBar } from './EnhancedProgressBar';
export type { EnhancedProgressBarProps } from './EnhancedProgressBar';
