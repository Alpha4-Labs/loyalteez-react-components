'use client';

import { forwardRef } from 'react';
import { PerkCardRoot } from './PerkCardRoot';
import {
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
import type { PerkCardProps } from './types';

/**
 * A fully composed perk card component.
 * For more control, use the composable API with PerkCard.Root and sub-components.
 *
 * @example
 * // Simple usage
 * <PerkCard perk={perkData} onClaim={handleClaim} />
 *
 * @example
 * // With all options
 * <PerkCard
 *   perk={perkData}
 *   variant="grid"
 *   userBalance={5000n}
 *   isFavorited={false}
 *   claimState="idle"
 *   showActions
 *   showFavorite
 *   showSupply
 *   showTags
 *   showDescription
 *   onClaim={handleClaim}
 *   onFavorite={handleFavorite}
 *   onClick={handleClick}
 * />
 *
 * @example
 * // List variant
 * <PerkCard perk={perkData} variant="list" />
 *
 * @example
 * // Compact variant for sidebars
 * <PerkCard perk={perkData} variant="compact" />
 *
 * @example
 * // Featured variant with extra emphasis
 * <PerkCard perk={perkData} variant="featured" />
 */
export const PerkCard = forwardRef<HTMLDivElement, PerkCardProps>(
  (
    {
      perk,
      variant = 'grid',
      showActions = true,
      showFavorite = true,
      showSupply = true,
      showTags = true,
      showDescription = true,
      actionLabel,
      onQuickPurchase,
      ...props
    },
    ref
  ) => {
    // Handle quick purchase action
    const handleClaim = () => {
      if (onQuickPurchase) {
        onQuickPurchase(perk.id);
      } else if (props.onClaim) {
        props.onClaim();
      }
    };

    // Render based on variant
    if (variant === 'compact') {
      return (
        <PerkCardRoot ref={ref} perk={perk} variant="compact" {...props} onClaim={handleClaim}>
          <PerkCardImage zoomOnHover={false} />
          <PerkCardContent>
            <PerkCardTitle lineClamp={1} />
            <PerkCardPrice size="sm" showShortage={false} />
          </PerkCardContent>
        </PerkCardRoot>
      );
    }

    if (variant === 'list') {
      return (
        <PerkCardRoot ref={ref} perk={perk} variant="list" {...props} onClaim={handleClaim}>
          <PerkCardImage>{perk.isFeatured && <PerkCardBadges show={['featured']} />}</PerkCardImage>
          <PerkCardContent>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-grow">
                <PerkCardBrand />
                <PerkCardTitle lineClamp={1} />
                {showDescription && <PerkCardDescription lineClamp={2} />}
              </div>
              <div className="flex-shrink-0 text-right">
                <PerkCardPrice />
              </div>
            </div>
            {showTags && <PerkCardTags maxDisplay={3} />}
            <div className="mt-2 flex items-center justify-between gap-4">
              {showSupply && (
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-ltz-text-secondary">
                    Supply:{' '}
                    <span className="text-ltz-cyan font-bold">
                      {perk.supply?.max
                        ? `${perk.supply.current}/${perk.supply.max}`
                        : `${perk.supply?.current ?? 0} claimed`}
                    </span>
                  </span>
                  {perk.isSoldOut && (
                    <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-medium text-red-400">
                      Sold Out
                    </span>
                  )}
                </div>
              )}
              {showFavorite && <PerkCardFavoriteButton position="inline" />}
              {showActions && <PerkCardActions primaryLabel={actionLabel} />}
            </div>
          </PerkCardContent>
        </PerkCardRoot>
      );
    }

    // Grid and Featured variants (similar layout, different styling)
    return (
      <PerkCardRoot ref={ref} perk={perk} variant={variant} {...props} onClaim={handleClaim}>
        <PerkCardImage>
          <PerkCardBadges />
          {showFavorite && <PerkCardFavoriteButton />}
        </PerkCardImage>
        <PerkCardContent>
          <PerkCardBrand />
          <PerkCardTitle />
          {showDescription && <PerkCardDescription />}
          {showTags && <PerkCardTags />}
          {showSupply && <PerkCardSupply />}
          <PerkCardSpacer />
          <div className="mt-4 border-t border-ltz-border pt-4">
            <div className="mb-3 flex items-center justify-between">
              <PerkCardPrice />
            </div>
            {showActions && <PerkCardActions primaryLabel={actionLabel} />}
          </div>
        </PerkCardContent>
      </PerkCardRoot>
    );
  }
);

PerkCard.displayName = 'PerkCard';

// ============================================
// Attach sub-components for composable API
// ============================================

export const PerkCardNamespace = Object.assign(PerkCard, {
  Root: PerkCardRoot,
  Image: PerkCardImage,
  Content: PerkCardContent,
  Brand: PerkCardBrand,
  Title: PerkCardTitle,
  Description: PerkCardDescription,
  Tags: PerkCardTags,
  Supply: PerkCardSupply,
  Price: PerkCardPrice,
  Badges: PerkCardBadges,
  FavoriteButton: PerkCardFavoriteButton,
  Actions: PerkCardActions,
  Spacer: PerkCardSpacer,
});
