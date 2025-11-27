'use client';

import { forwardRef, useMemo } from 'react';
import { cn } from '@/utils/cn';
import { formatLTZ } from '@/utils/formatLTZ';
import { usePerkCard } from './PerkCardContext';
import {
  cardImageContainerStyles,
  cardImageStyles,
  cardImageOverlayStyles,
  cardContentStyles,
  cardBrandStyles,
  cardBrandLogoStyles,
  cardBrandNameStyles,
  cardTitleStyles,
  cardDescriptionStyles,
  cardTagsContainerStyles,
  cardTagStyles,
  cardPriceContainerStyles,
  cardPriceStyles,
  cardPriceLabelStyles,
  cardActionsContainerStyles,
  cardPrimaryButtonStyles,
  cardFavoriteButtonStyles,
  cardBadgesContainerStyles,
} from './PerkCard.styles';
import { SupplyProgress } from '../ProgressBar';
import {
  Badge,
  FeaturedBadge,
  SponsoredBadge,
  PremiumBadge,
  EarlyAccessBadge,
  SoldOutBadge,
} from '../Badge';
import type {
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

// ============================================
// Image Component
// ============================================

export const PerkCardImage = forwardRef<HTMLDivElement, PerkCardImageProps>(
  ({ aspectRatio, fallback, zoomOnHover = true, children, className, ...props }, ref) => {
    const { perk, variant } = usePerkCard();

    const placeholderUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(perk.name)}&size=400&background=6C33EA&color=fff`;

    return (
      <div
        ref={ref}
        className={cn(cardImageContainerStyles({ variant, aspectRatio }), 'group', className)}
        {...props}
      >
        {perk.imageUrl ? (
          <img
            src={perk.imageUrl}
            alt={perk.name}
            className={cn(cardImageStyles({ zoomOnHover }))}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('ui-avatars.com')) {
                target.src = placeholderUrl;
              }
            }}
          />
        ) : fallback ? (
          fallback
        ) : (
          <img
            src={placeholderUrl}
            alt={perk.name}
            className={cn(cardImageStyles({ zoomOnHover }))}
          />
        )}

        {/* Gradient overlay */}
        <div className={cn(cardImageOverlayStyles({ visible: false }))} />

        {/* Child content (badges, favorite button, etc.) */}
        {children}
      </div>
    );
  }
);
PerkCardImage.displayName = 'PerkCard.Image';

// ============================================
// Content Wrapper
// ============================================

export const PerkCardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { variant } = usePerkCard();

    return (
      <div ref={ref} className={cn(cardContentStyles({ variant }), className)} {...props}>
        {children}
      </div>
    );
  }
);
PerkCardContent.displayName = 'PerkCard.Content';

// ============================================
// Brand Component
// ============================================

export const PerkCardBrand = forwardRef<HTMLDivElement, PerkCardBrandProps>(
  ({ showLogo = true, logoSize = 'md', className, ...props }, ref) => {
    const { perk, size } = usePerkCard();

    if (!perk.brand) return null;

    return (
      <div ref={ref} className={cn(cardBrandStyles({ size }), className)} {...props}>
        {showLogo && (
          <div className={cn(cardBrandLogoStyles({ size: logoSize }))}>
            {perk.brand.logo ? (
              <img
                src={perk.brand.logo}
                alt={perk.brand.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="ltz-bg-gradient-primary flex h-full w-full items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
        <span className={cn(cardBrandNameStyles({ size }))}>{perk.brand.name}</span>
      </div>
    );
  }
);
PerkCardBrand.displayName = 'PerkCard.Brand';

// ============================================
// Title Component
// ============================================

export const PerkCardTitle = forwardRef<HTMLHeadingElement, PerkCardTitleProps>(
  ({ as: Tag = 'h3', lineClamp = 2, href, className, children, ...props }, ref) => {
    const { perk, variant, onClick } = usePerkCard();

    const titleContent = (
      <Tag ref={ref} className={cn(cardTitleStyles({ variant, lineClamp }), className)} {...props}>
        {children || perk.name}
      </Tag>
    );

    if (href) {
      return (
        <a href={href} className="group/title block">
          {titleContent}
        </a>
      );
    }

    if (onClick) {
      return (
        <button type="button" onClick={onClick} className="group/title block w-full text-left">
          {titleContent}
        </button>
      );
    }

    return titleContent;
  }
);
PerkCardTitle.displayName = 'PerkCard.Title';

// ============================================
// Description Component
// ============================================

export const PerkCardDescription = forwardRef<HTMLParagraphElement, PerkCardDescriptionProps>(
  ({ lineClamp = 2, className, children, ...props }, ref) => {
    const { perk, variant } = usePerkCard();

    const description = children || perk.description;
    if (!description) return null;

    return (
      <p
        ref={ref}
        className={cn(cardDescriptionStyles({ variant, lineClamp }), className)}
        {...props}
      >
        {description}
      </p>
    );
  }
);
PerkCardDescription.displayName = 'PerkCard.Description';

// ============================================
// Tags Component
// ============================================

export const PerkCardTags = forwardRef<HTMLDivElement, PerkCardTagsProps>(
  ({ maxDisplay = 2, showOverflow = true, className, ...props }, ref) => {
    const { perk, variant, size } = usePerkCard();

    if (!perk.tags || perk.tags.length === 0) return null;

    const displayTags = perk.tags.slice(0, maxDisplay);
    const overflowCount = perk.tags.length - maxDisplay;

    return (
      <div ref={ref} className={cn(cardTagsContainerStyles({ variant }), className)} {...props}>
        {displayTags.map((tag) => (
          <span key={tag} className={cn(cardTagStyles({ size }))}>
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {tag}
          </span>
        ))}
        {showOverflow && overflowCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-ltz-bg-tertiary px-2 py-0.5 text-xs font-medium text-ltz-text-muted">
            +{overflowCount}
          </span>
        )}
      </div>
    );
  }
);
PerkCardTags.displayName = 'PerkCard.Tags';

// ============================================
// Price Component
// ============================================

export const PerkCardPrice = forwardRef<HTMLDivElement, PerkCardPriceProps>(
  ({ showLogo = true, size = 'md', showShortage = true, className, ...props }, ref) => {
    const { perk, canAfford, userBalance } = usePerkCard();

    const priceNum = typeof perk.price === 'bigint' ? Number(perk.price) : perk.price;
    const balanceNum =
      userBalance !== undefined
        ? typeof userBalance === 'bigint'
          ? Number(userBalance)
          : userBalance
        : undefined;
    const shortage = balanceNum !== undefined ? priceNum - balanceNum : 0;

    return (
      <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props}>
        <span className={cn(cardPriceLabelStyles({ size }))}>LTZ Value</span>
        <div className={cn(cardPriceContainerStyles({ size }))}>
          <span className={cn(cardPriceStyles({ size }))}>{formatLTZ(priceNum)}</span>
          {showLogo && <img src="/logo-loyalteez.png" alt="LTZ" className="h-5 w-5" />}
        </div>
        {showShortage && !canAfford && shortage > 0 && (
          <span className="flex items-center gap-1 text-xs text-orange-400">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Need {formatLTZ(shortage)} more
          </span>
        )}
      </div>
    );
  }
);
PerkCardPrice.displayName = 'PerkCard.Price';

// ============================================
// Supply Component
// ============================================

export const PerkCardSupply = forwardRef<HTMLDivElement, PerkCardSupplyProps>(
  (
    { showProgress = true, showRemaining = true, urgencyThreshold = 10, className, ...props },
    ref
  ) => {
    const { perk } = usePerkCard();

    if (!perk.supply || perk.supply.max === null) {
      // Unlimited supply - just show current
      return (
        <div
          ref={ref}
          className={cn('flex items-center justify-between text-sm', className)}
          {...props}
        >
          <span className="font-medium text-ltz-text-secondary">Total Claimed</span>
          <span className="text-ltz-cyan font-bold tabular-nums">
            {typeof perk.supply?.current === 'bigint'
              ? perk.supply.current.toString()
              : (perk.supply?.current ?? 0).toLocaleString()}
          </span>
        </div>
      );
    }

    // Limited supply - show progress
    return (
      <div ref={ref} className={cn(className)} {...props}>
        <SupplyProgress
          current={perk.supply.current}
          max={perk.supply.max}
          showRemaining={showRemaining}
          urgencyThreshold={urgencyThreshold}
          variant="gradient"
          showShimmer={!perk.isSoldOut}
        />
      </div>
    );
  }
);
PerkCardSupply.displayName = 'PerkCard.Supply';

// ============================================
// Badges Component
// ============================================

export const PerkCardBadges = forwardRef<HTMLDivElement, PerkCardBadgesProps>(
  ({ show, lowSupplyThreshold = 10, className, ...props }, ref) => {
    const { perk } = usePerkCard();

    // Determine which badges to show
    const badges = useMemo(() => {
      const result: React.ReactNode[] = [];
      const showAll = !show;

      if ((showAll || show?.includes('sponsored')) && perk.isSponsored) {
        result.push(<SponsoredBadge key="sponsored" size="sm" />);
      }
      if ((showAll || show?.includes('premium')) && perk.isPremium) {
        result.push(<PremiumBadge key="premium" size="sm" />);
      }
      if ((showAll || show?.includes('early-access')) && perk.isEarlyAccess) {
        result.push(<EarlyAccessBadge key="early-access" size="sm" />);
      }
      if ((showAll || show?.includes('featured')) && perk.isFeatured && !perk.isSponsored) {
        result.push(<FeaturedBadge key="featured" size="sm" />);
      }
      if ((showAll || show?.includes('sold-out')) && perk.isSoldOut) {
        result.push(<SoldOutBadge key="sold-out" size="sm" />);
      }
      if ((showAll || show?.includes('low-supply')) && !perk.isSoldOut && perk.supply?.max) {
        const remaining = Number(perk.supply.max) - Number(perk.supply.current);
        if (remaining > 0 && remaining <= lowSupplyThreshold) {
          result.push(
            <Badge key="low-supply" variant="warning" size="sm" glow>
              Low Supply
            </Badge>
          );
        }
      }

      return result;
    }, [perk, show, lowSupplyThreshold]);

    if (badges.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn(cardBadgesContainerStyles({ position: 'top-left' }), className)}
        {...props}
      >
        {badges}
      </div>
    );
  }
);
PerkCardBadges.displayName = 'PerkCard.Badges';

// ============================================
// Favorite Button Component
// ============================================

export const PerkCardFavoriteButton = forwardRef<HTMLButtonElement, PerkCardFavoriteButtonProps>(
  ({ position = 'top-right', className, ...props }, ref) => {
    const { isFavorited, onFavorite, perk } = usePerkCard();

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onFavorite?.();
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(cardFavoriteButtonStyles({ isFavorited, position }), className)}
        title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        aria-label={
          isFavorited ? `Remove ${perk.name} from favorites` : `Add ${perk.name} to favorites`
        }
        {...props}
      >
        {isFavorited ? (
          <svg
            className="h-5 w-5 text-white drop-shadow-lg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="hover:text-ltz-pink h-5 w-5 text-ltz-text-secondary transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
        {isFavorited && (
          <span className="pointer-events-none absolute inset-0 animate-pulse rounded-full bg-white/20" />
        )}
      </button>
    );
  }
);
PerkCardFavoriteButton.displayName = 'PerkCard.FavoriteButton';

// ============================================
// Actions Component
// ============================================

export const PerkCardActions = forwardRef<HTMLDivElement, PerkCardActionsProps>(
  (
    {
      primaryLabel,
      showSecondary = false,
      secondaryLabel = 'Details',
      onSecondaryClick,
      className,
      ...props
    },
    ref
  ) => {
    const { perk, variant, canAfford, claimState, onClaim, onClick } = usePerkCard();

    // Determine button state
    const buttonState = useMemo(() => {
      if (perk.isSoldOut) return 'soldOut';
      if (claimState === 'loading' || claimState === 'confirming') return 'loading';
      if (claimState === 'success') return 'success';
      if (!canAfford) return 'cantAfford';
      return 'default';
    }, [perk.isSoldOut, claimState, canAfford]);

    // Determine button label
    const label = useMemo(() => {
      if (primaryLabel) return primaryLabel;
      if (perk.isSoldOut) return 'Sold Out';
      if (claimState === 'loading') return 'Processing...';
      if (claimState === 'confirming') return 'Confirming...';
      if (claimState === 'success') return 'Claimed! 🎉';
      if (!canAfford) return 'Insufficient LTZ';
      return 'Claim Perk';
    }, [primaryLabel, perk.isSoldOut, claimState, canAfford]);

    const isDisabled = perk.isSoldOut || claimState === 'loading' || claimState === 'confirming';

    return (
      <div ref={ref} className={cn(cardActionsContainerStyles({ variant }), className)} {...props}>
        <button
          type="button"
          onClick={onClaim}
          disabled={isDisabled}
          className={cn(cardPrimaryButtonStyles({ state: buttonState }))}
        >
          {(claimState === 'loading' || claimState === 'confirming') && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {buttonState === 'default' && (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          )}
          {label}
        </button>

        {showSecondary && (
          <button
            type="button"
            onClick={onSecondaryClick || onClick}
            className="flex-1 rounded-xl bg-ltz-bg-tertiary px-4 py-3 text-sm font-bold text-ltz-text-secondary transition-colors hover:bg-ltz-bg-tertiary/80"
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    );
  }
);
PerkCardActions.displayName = 'PerkCard.Actions';

// ============================================
// Spacer (pushes content to bottom)
// ============================================

export const PerkCardSpacer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-grow', className)} {...props} />
  )
);
PerkCardSpacer.displayName = 'PerkCard.Spacer';
