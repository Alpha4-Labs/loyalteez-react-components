'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import {
  emptyStateContainerStyles,
  emptyStateIconStyles,
  emptyStateTitleStyles,
  emptyStateDescriptionStyles,
  emptyStateActionsStyles,
  emptyStateIllustrationStyles,
} from './EmptyState.styles';
import { EMPTY_STATE_PRESETS } from './types';
import type { EmptyStateProps, EmptyStatePreset } from './types';

/**
 * A flexible empty state component for displaying when no content is available.
 *
 * @example
 * // Basic usage
 * <EmptyState
 *   icon="🎁"
 *   title="No perks found"
 *   description="Try adjusting your filters"
 * />
 *
 * @example
 * // With action button
 * <EmptyState
 *   icon={<SearchIcon />}
 *   title="No results"
 *   description="We couldn't find anything matching your search"
 *   action={<Button onClick={clearSearch}>Clear search</Button>}
 * />
 *
 * @example
 * // Card variant with illustration
 * <EmptyState
 *   variant="card"
 *   illustration={<EmptyBoxIllustration />}
 *   title="Your cart is empty"
 *   description="Add some perks to get started"
 *   action={<Button>Browse Perks</Button>}
 * />
 *
 * @example
 * // Using preset
 * <EmptyState preset="noFavorites" />
 */
export const EmptyState = forwardRef<
  HTMLDivElement,
  EmptyStateProps & { preset?: EmptyStatePreset }
>(
  (
    {
      icon,
      title,
      description,
      action,
      secondaryAction,
      size = 'md',
      variant = 'default',
      showGradient = true,
      illustration,
      animated = true,
      preset,
      className,
      ...props
    },
    ref
  ) => {
    // Apply preset if provided
    const presetConfig = preset ? EMPTY_STATE_PRESETS[preset] : null;
    const finalIcon = icon ?? presetConfig?.icon;
    const finalTitle = title ?? presetConfig?.title ?? '';
    const finalDescription = description ?? presetConfig?.description;

    return (
      <div
        ref={ref}
        className={cn(emptyStateContainerStyles({ size, variant, animated }), className)}
        {...props}
      >
        {/* Custom Illustration */}
        {illustration && (
          <div className={cn(emptyStateIllustrationStyles({ size }))}>{illustration}</div>
        )}

        {/* Icon */}
        {finalIcon && !illustration && (
          <div className={cn(emptyStateIconStyles({ size, showGradient }))}>
            {typeof finalIcon === 'string' ? (
              <span role="img" aria-hidden="true">
                {finalIcon}
              </span>
            ) : (
              finalIcon
            )}
          </div>
        )}

        {/* Title */}
        <h3 className={cn(emptyStateTitleStyles({ size }))}>{finalTitle}</h3>

        {/* Description */}
        {finalDescription && (
          <p className={cn(emptyStateDescriptionStyles({ size }))}>{finalDescription}</p>
        )}

        {/* Actions */}
        {(action || secondaryAction) && (
          <div className={cn(emptyStateActionsStyles({ size }))}>
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

// Convenience component type (title becomes optional since preset provides it)
type ConvenienceEmptyStateProps = Omit<EmptyStateProps, 'title'> & { title?: string };

// Convenience components for common empty states
export const NoPerksFound = forwardRef<HTMLDivElement, ConvenienceEmptyStateProps>((props, ref) => (
  <EmptyState ref={ref} preset="noPerks" title="" {...props} />
));
NoPerksFound.displayName = 'NoPerksFound';

export const NoFavorites = forwardRef<HTMLDivElement, ConvenienceEmptyStateProps>((props, ref) => (
  <EmptyState ref={ref} preset="noFavorites" title="" {...props} />
));
NoFavorites.displayName = 'NoFavorites';

export const NoResults = forwardRef<HTMLDivElement, ConvenienceEmptyStateProps>((props, ref) => (
  <EmptyState ref={ref} preset="noResults" title="" {...props} />
));
NoResults.displayName = 'NoResults';

export const ErrorState = forwardRef<HTMLDivElement, ConvenienceEmptyStateProps>((props, ref) => (
  <EmptyState ref={ref} preset="error" title="" {...props} />
));
ErrorState.displayName = 'ErrorState';
