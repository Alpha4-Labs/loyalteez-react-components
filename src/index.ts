// @loyalteez/react-components
// React components for building loyalty program interfaces

// ============================================
// Components
// ============================================
export { BalanceDisplay } from './components/BalanceDisplay';
export { ProgressBar, SupplyProgress } from './components/ProgressBar';
export { TierBadge, TIER_CONFIG } from './components/TierBadge';
export {
  Badge,
  FeaturedBadge,
  SponsoredBadge,
  PremiumBadge,
  SoldOutBadge,
  NewBadge,
  HotBadge,
  LimitedBadge,
  EarlyAccessBadge,
  BADGE_CONFIGS,
} from './components/Badge';
// export { RewardToast } from './components/RewardToast';
// export { PerkCard } from './components/PerkCard';

// ============================================
// Headless Hooks
// ============================================
export { useBalanceDisplay } from './components/BalanceDisplay';
// export { useToast } from './components/RewardToast';

// ============================================
// Utilities
// ============================================
export { cn } from './utils/cn';
export { formatLTZ, ltzToDollars, formatLTZAsDollars, formatCompact } from './utils/formatLTZ';

// ============================================
// Types
// ============================================
export type {
  BalanceDisplayProps,
  UseBalanceDisplayOptions,
  UseBalanceDisplayReturn,
} from './components/BalanceDisplay';

export type {
  ProgressBarProps,
  ProgressBarVariant,
  ProgressBarSize,
  SupplyProgressProps,
} from './components/ProgressBar';

export type {
  TierBadgeProps,
  TierLevel,
  TierBadgeSize,
  TierConfig,
} from './components/TierBadge';

export type {
  BadgeProps,
  BadgeVariant,
  BadgeSize,
  BadgeConfig,
} from './components/Badge';
