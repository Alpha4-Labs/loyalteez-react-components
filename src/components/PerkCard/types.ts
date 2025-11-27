import type { HTMLAttributes, ReactNode } from 'react';

// ============================================
// Core Types
// ============================================

export type PerkCardVariant = 'grid' | 'list' | 'compact' | 'featured';
export type PerkCardSize = 'sm' | 'md' | 'lg';

/**
 * Core perk data structure
 */
export interface PerkData {
  /** Unique identifier */
  id: string | number | bigint;
  /** Perk name/title */
  name: string;
  /** Description text */
  description?: string;
  /** Image URL */
  imageUrl?: string;
  /** Price in LTZ points */
  price: number | bigint;
  /** Brand information */
  brand?: {
    name: string;
    logo?: string;
  };
  /** Tags/categories */
  tags?: string[];
  /** Supply information */
  supply?: {
    current: number | bigint;
    max: number | bigint | null;
  };
  /** Status flags */
  isFeatured?: boolean;
  isSponsored?: boolean;
  isPremium?: boolean;
  isEarlyAccess?: boolean;
  isSoldOut?: boolean;
}

/**
 * Claim state for tracking transaction progress
 */
export type ClaimState = 'idle' | 'loading' | 'confirming' | 'success' | 'error';

// ============================================
// Context
// ============================================

export interface PerkCardContextValue {
  /** Perk data */
  perk: PerkData;
  /** Current card variant */
  variant: PerkCardVariant;
  /** Card size */
  size: PerkCardSize;
  /** Whether the card is interactive (hoverable) */
  interactive: boolean;
  /** Whether user can afford this perk */
  canAfford: boolean;
  /** User's current balance (for affordability check) */
  userBalance?: number | bigint;
  /** Whether this perk is favorited */
  isFavorited: boolean;
  /** Current claim state */
  claimState: ClaimState;
  /** Handle claim action */
  onClaim?: () => void;
  /** Handle favorite toggle */
  onFavorite?: () => void;
  /** Handle card click */
  onClick?: () => void;
}

// ============================================
// Component Props
// ============================================

export interface PerkCardRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Perk data to display */
  perk: PerkData;
  /** Visual variant */
  variant?: PerkCardVariant;
  /** Size */
  size?: PerkCardSize;
  /** Enable hover effects */
  interactive?: boolean;
  /** User's balance for affordability check */
  userBalance?: number | bigint;
  /** Whether user has favorited this perk */
  isFavorited?: boolean;
  /** Current claim state */
  claimState?: ClaimState;
  /** Called when claim button is clicked */
  onClaim?: () => void;
  /** Called when favorite button is toggled */
  onFavorite?: () => void;
  /** Card click handler */
  onClick?: () => void;
  /** Children (sub-components) */
  children?: ReactNode;
}

export interface PerkCardImageProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom aspect ratio class */
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  /** Fallback content when no image */
  fallback?: ReactNode;
  /** Show zoom effect on hover */
  zoomOnHover?: boolean;
  /** Overlay content (badges, buttons) */
  children?: ReactNode;
}

export interface PerkCardBrandProps extends HTMLAttributes<HTMLDivElement> {
  /** Show brand logo */
  showLogo?: boolean;
  /** Custom logo size */
  logoSize?: 'sm' | 'md' | 'lg';
}

export interface PerkCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Title element tag */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Max lines to show (truncate with ellipsis) */
  lineClamp?: 1 | 2 | 3;
  /** Link URL */
  href?: string;
}

export interface PerkCardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Max lines to show */
  lineClamp?: 1 | 2 | 3 | 4;
}

export interface PerkCardTagsProps extends HTMLAttributes<HTMLDivElement> {
  /** Max tags to display */
  maxDisplay?: number;
  /** Show overflow count (+N more) */
  showOverflow?: boolean;
}

export interface PerkCardPriceProps extends HTMLAttributes<HTMLDivElement> {
  /** Show LTZ logo */
  showLogo?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show "Need X more" when can't afford */
  showShortage?: boolean;
}

export interface PerkCardSupplyProps extends HTMLAttributes<HTMLDivElement> {
  /** Show progress bar */
  showProgress?: boolean;
  /** Show remaining count */
  showRemaining?: boolean;
  /** Low supply threshold */
  urgencyThreshold?: number;
}

export interface PerkCardBadgesProps extends HTMLAttributes<HTMLDivElement> {
  /** Which badges to show */
  show?: ('featured' | 'sponsored' | 'premium' | 'early-access' | 'sold-out' | 'low-supply')[];
  /** Low supply threshold for badge */
  lowSupplyThreshold?: number;
}

export interface PerkCardFavoriteButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Position of the button */
  position?: 'top-right' | 'top-left' | 'inline';
}

export interface PerkCardActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Primary action label */
  primaryLabel?: string;
  /** Show secondary action */
  showSecondary?: boolean;
  /** Secondary action label */
  secondaryLabel?: string;
  /** Secondary action handler */
  onSecondaryClick?: () => void;
}

// ============================================
// Composed Card Props
// ============================================

export interface PerkCardProps extends Omit<PerkCardRootProps, 'children'> {
  /** Show claim/buy button */
  showActions?: boolean;
  /** Show favorite button */
  showFavorite?: boolean;
  /** Show supply progress */
  showSupply?: boolean;
  /** Show tags */
  showTags?: boolean;
  /** Show description */
  showDescription?: boolean;
  /** Custom action label */
  actionLabel?: string;
  /** Handle quick purchase click */
  onQuickPurchase?: (perkId: string | number | bigint) => void;
}
