// Core Components
export { BalanceDisplay, useBalanceDisplay } from './BalanceDisplay';
export type {
  BalanceDisplayProps,
  UseBalanceDisplayOptions,
  UseBalanceDisplayReturn,
} from './BalanceDisplay';

// Progress Components
export { ProgressBar, SupplyProgress } from './ProgressBar';
export type {
  ProgressBarProps,
  ProgressBarVariant,
  ProgressBarSize,
  SupplyProgressProps,
} from './ProgressBar';

// Badge Components
export { TierBadge, TIER_CONFIG } from './TierBadge';
export type { TierBadgeProps, TierLevel, TierBadgeSize, TierConfig } from './TierBadge';

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
} from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeConfig } from './Badge';

// PerkCard (Composable)
export {
  PerkCard,
  PerkCardNamespace,
  PerkCardRoot,
  PerkCardImage,
  PerkCardContent,
  PerkCardBrand,
  PerkCardTitle,
  PerkCardDescription,
  PerkCardTags,
  PerkCardSupply,
  PerkCardPrice,
  PerkCardBadges,
  PerkCardFavoriteButton,
  PerkCardActions,
  PerkCardSpacer,
  usePerkCard,
  usePerkCardOptional,
} from './PerkCard';
export type {
  PerkCardProps,
  PerkCardRootProps,
  PerkCardVariant,
  PerkCardSize,
  PerkData,
  ClaimState as PerkClaimState,
  PerkCardImageProps,
  PerkCardBrandProps,
  PerkCardTitleProps,
  PerkCardDescriptionProps,
  PerkCardTagsProps,
  PerkCardPriceProps,
  PerkCardSupplyProps,
  PerkCardBadgesProps,
  PerkCardFavoriteButtonProps,
  PerkCardActionsProps,
} from './PerkCard';

// ============================================
// Gamification Components (Phase 3)
// ============================================

// StreakCounter
export {
  StreakCounter,
  FlameIcon,
  DEFAULT_MILESTONES,
  DEFAULT_MESSAGES,
  getFlameIntensity,
  getStreakMessage,
} from './StreakCounter';
export type { StreakCounterProps, StreakType, StreakSize, StreakMilestone } from './StreakCounter';

// Leaderboard
export { Leaderboard, MEDAL_COLORS } from './Leaderboard';
export type {
  LeaderboardProps,
  LeaderboardEntry,
  LeaderboardSize,
  LeaderboardEntryProps,
} from './Leaderboard';

// ChallengeCard
export { ChallengeCard, DIFFICULTY_CONFIG, STATUS_CONFIG } from './ChallengeCard';
export type {
  ChallengeCardProps,
  ChallengeData,
  ChallengeReward,
  ChallengeStatus,
  ChallengeDifficulty,
  ChallengeSize,
} from './ChallengeCard';

// ============================================
// Interactive Components (Phase 4)
// ============================================

// RewardToast
export { ToastProvider, useToast, TOAST_TYPE_CONFIG } from './RewardToast';
export type {
  Toast,
  ToastType,
  ToastPosition,
  ToastOptions,
  RewardToastOptions,
  ToastContextValue,
  ToastProviderProps,
} from './RewardToast';

// ClaimModal
export { ClaimModal, DEFAULT_LABELS, STATE_CONFIG as CLAIM_STATE_CONFIG } from './ClaimModal';
export type { ClaimModalProps, ClaimItem, ClaimState, ModalSize } from './ClaimModal';

// ConfettiExplosion
export { ConfettiExplosion, useConfetti, DEFAULT_COLORS } from './ConfettiExplosion';
export type {
  ConfettiExplosionProps,
  ConfettiParticle,
  UseConfettiReturn,
} from './ConfettiExplosion';

// ============================================
// Layout & Utility Components (Phase 5)
// ============================================

// EmptyState
export {
  EmptyState,
  NoPerksFound,
  NoFavorites,
  NoResults,
  ErrorState,
  EMPTY_STATE_PRESETS,
} from './EmptyState';
export type {
  EmptyStateProps,
  EmptyStateSize,
  EmptyStateVariant,
  EmptyStatePreset,
} from './EmptyState';

// Skeleton
export {
  Skeleton,
  PerkCardSkeleton,
  BalanceDisplaySkeleton,
  LeaderboardSkeleton,
  ChallengeCardSkeleton,
} from './Skeleton';
export type {
  SkeletonProps,
  SkeletonVariant,
  PerkCardSkeletonProps,
  BalanceDisplaySkeletonProps,
  LeaderboardSkeletonProps,
  ChallengeCardSkeletonProps,
} from './Skeleton';

// Tooltip
export { Tooltip, InfoTooltip } from './Tooltip';
export type { TooltipProps, InfoTooltipProps, TooltipPosition, TooltipAlign } from './Tooltip';

// FilterBar
export { FilterBar, FilterChip, FilterDropdown } from './FilterBar';
export type {
  FilterBarProps,
  FilterChipProps,
  FilterDropdownProps,
  FilterGroup,
  FilterOption,
  SortOption,
  ViewMode,
  SortDirection,
} from './FilterBar';
