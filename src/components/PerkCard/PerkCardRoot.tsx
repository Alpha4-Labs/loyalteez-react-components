'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { PerkCardProvider } from './PerkCardContext';
import { cardRootStyles } from './PerkCard.styles';
import type { PerkCardRootProps } from './types';

/**
 * Root component for the composable PerkCard.
 * Provides context for all child components.
 *
 * @example
 * <PerkCard.Root perk={perkData} variant="grid" interactive>
 *   <PerkCard.Image>
 *     <PerkCard.Badges />
 *     <PerkCard.FavoriteButton />
 *   </PerkCard.Image>
 *   <PerkCard.Content>
 *     <PerkCard.Brand />
 *     <PerkCard.Title />
 *     <PerkCard.Description />
 *     <PerkCard.Tags />
 *     <PerkCard.Supply />
 *     <PerkCard.Spacer />
 *     <PerkCard.Price />
 *     <PerkCard.Actions />
 *   </PerkCard.Content>
 * </PerkCard.Root>
 */
export const PerkCardRoot = forwardRef<HTMLDivElement, PerkCardRootProps>(
  (
    {
      perk,
      variant = 'grid',
      size = 'md',
      interactive = true,
      userBalance,
      isFavorited = false,
      claimState = 'idle',
      onClaim,
      onFavorite,
      onClick,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (interactive && onClick) {
        onClick();
      }
    };

    return (
      <PerkCardProvider
        perk={perk}
        variant={variant}
        size={size}
        interactive={interactive}
        userBalance={userBalance}
        isFavorited={isFavorited}
        claimState={claimState}
        onClaim={onClaim}
        onFavorite={onFavorite}
        onClick={onClick}
      >
        <div
          ref={ref}
          className={cn(
            cardRootStyles({ variant, size, interactive }),
            interactive && 'group',
            className
          )}
          onClick={interactive ? handleClick : undefined}
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          onKeyDown={
            interactive
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                  }
                }
              : undefined
          }
          {...props}
        >
          {children}
        </div>
      </PerkCardProvider>
    );
  }
);

PerkCardRoot.displayName = 'PerkCard.Root';
