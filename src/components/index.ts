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
  ClaimState,
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

// TODO: More components to be added
// export { RewardToast, useToast } from './RewardToast';
