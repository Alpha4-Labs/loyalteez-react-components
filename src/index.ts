// @loyalteez/react-components
// React components for building loyalty program interfaces

// ============================================
// Core Components
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
} from './components/PerkCard';

// ============================================
// Gamification Components
// ============================================
export {
  StreakCounter,
  FlameIcon,
  DEFAULT_MILESTONES,
  DEFAULT_MESSAGES,
  getFlameIntensity,
  getStreakMessage,
} from './components/StreakCounter';

export { Leaderboard, MEDAL_COLORS } from './components/Leaderboard';

export { ChallengeCard, DIFFICULTY_CONFIG, STATUS_CONFIG } from './components/ChallengeCard';

// ============================================
// Interactive Components
// ============================================
export { ToastProvider, useToast, TOAST_TYPE_CONFIG } from './components/RewardToast';

export {
  ClaimModal,
  DEFAULT_LABELS,
  STATE_CONFIG as CLAIM_STATE_CONFIG,
} from './components/ClaimModal';

export { ConfettiExplosion, useConfetti, DEFAULT_COLORS } from './components/ConfettiExplosion';

// ============================================
// Layout & Utility Components
// ============================================
export {
  EmptyState,
  NoPerksFound,
  NoFavorites,
  NoResults,
  ErrorState,
  EMPTY_STATE_PRESETS,
} from './components/EmptyState';

export {
  Skeleton,
  PerkCardSkeleton,
  BalanceDisplaySkeleton,
  LeaderboardSkeleton,
  ChallengeCardSkeleton,
} from './components/Skeleton';

export { Tooltip, InfoTooltip } from './components/Tooltip';

export { FilterBar, FilterChip, FilterDropdown } from './components/FilterBar';

// ============================================
// Headless Hooks
// ============================================
export { useBalanceDisplay } from './components/BalanceDisplay';

// ============================================
// Utilities
// ============================================
export { cn } from './utils/cn';
export { formatLTZ, ltzToDollars, formatLTZAsDollars, formatCompact } from './utils/formatLTZ';

// ============================================
// Types - Core
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

export type { TierBadgeProps, TierLevel, TierBadgeSize, TierConfig } from './components/TierBadge';

export type { BadgeProps, BadgeVariant, BadgeSize, BadgeConfig } from './components/Badge';

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
} from './components/PerkCard';

// ============================================
// Types - Gamification
// ============================================
export type {
  StreakCounterProps,
  StreakType,
  StreakSize,
  StreakMilestone,
} from './components/StreakCounter';

export type {
  LeaderboardProps,
  LeaderboardEntry,
  LeaderboardSize,
  LeaderboardEntryProps,
} from './components/Leaderboard';

export type {
  ChallengeCardProps,
  ChallengeData,
  ChallengeReward,
  ChallengeStatus,
  ChallengeDifficulty,
  ChallengeSize,
} from './components/ChallengeCard';

// ============================================
// Types - Interactive
// ============================================
export type {
  Toast,
  ToastType,
  ToastPosition,
  ToastOptions,
  RewardToastOptions,
  ToastContextValue,
  ToastProviderProps,
} from './components/RewardToast';

export type { ClaimModalProps, ClaimItem, ClaimState, ModalSize } from './components/ClaimModal';

export type {
  ConfettiExplosionProps,
  ConfettiParticle,
  UseConfettiReturn,
} from './components/ConfettiExplosion';

// ============================================
// Types - Layout & Utility
// ============================================
export type {
  EmptyStateProps,
  EmptyStateSize,
  EmptyStateVariant,
  EmptyStatePreset,
} from './components/EmptyState';

export type {
  SkeletonProps,
  SkeletonVariant,
  PerkCardSkeletonProps,
  BalanceDisplaySkeletonProps,
  LeaderboardSkeletonProps,
  ChallengeCardSkeletonProps,
} from './components/Skeleton';

export type {
  TooltipProps,
  InfoTooltipProps,
  TooltipPosition,
  TooltipAlign,
} from './components/Tooltip';

export type {
  FilterBarProps,
  FilterChipProps,
  FilterDropdownProps,
  FilterGroup,
  FilterOption,
  SortOption,
  ViewMode,
  SortDirection,
} from './components/FilterBar';

// ============================================
// Effects Module
// ============================================
export {
  // Glow Effects
  GlowEffect,
  PulseGlow,
  HeartbeatGlow,
  FlickerGlow,
  ReactiveGlow,
  LegendaryGlow,
  RainbowGlow,
  // Shimmer Effects
  ShimmerEffect,
  MetallicShimmer,
  HolographicShimmer,
  GoldShimmer,
  DiamondShimmer,
  NeonShimmer,
  FireShimmer,
  FrostShimmer,
  // Particle Effects
  ParticleEffect,
  CoinBurst,
  StarBurst,
  EmberEffect,
  SparkleEffect,
  ConfettiBurst,
  SnowEffect,
  HeartBurst,
  // Shake Effects
  ShakeEffect,
  ErrorShake,
  ImpactShake,
  VibrateEffect,
  EarthquakeEffect,
  useShake,
  // Count Effects
  CountEffect,
  SlotCounter,
  FlipCounter,
  CascadeCounter,
  ScrambleCounter,
  useCountUp,
  // Tone System
  ToneProvider,
  useTone,
  useRewardEffect,
  useMilestoneEffect,
  useErrorEffect,
  TONES,
  // Presets & Constants
  EFFECT_PRESETS,
  GLOW_COLORS,
  PARTICLE_COLORS,
} from './effects';

// ============================================
// Types - Effects
// ============================================
export type {
  // Base types
  EffectIntensity,
  EffectSpeed,
  BaseEffectProps,
  // Glow
  GlowEffectProps,
  GlowColor,
  GlowPattern,
  // Shimmer
  ShimmerEffectProps,
  ShimmerStyle,
  ShimmerDirection,
  // Particles
  ParticleEffectProps,
  ParticleShape,
  ParticleMotion,
  Particle,
  // Shake
  ShakeEffectProps,
  ShakePattern,
  // Count
  CountEffectProps,
  CountStyle,
  // Presets
  EffectPreset,
  // Tones
  ToneId,
  ToneConfig,
  ToneProviderProps,
} from './effects';
