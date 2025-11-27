// Main composed component
export { PerkCard, PerkCardNamespace } from './PerkCard';

// Root component for composable API
export { PerkCardRoot } from './PerkCardRoot';

// Sub-components for composable API
export {
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
} from './PerkCardParts';

// Context hook for custom sub-components
export { usePerkCard, usePerkCardOptional } from './PerkCardContext';

// Types
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
} from './types';
