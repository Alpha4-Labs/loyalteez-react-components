'use client';

import { forwardRef, useMemo } from 'react';
import { PerkCard } from '@/components/PerkCard';
import type { PerkCardProps, PerkData } from '@/components/PerkCard/types';
import { EffectLayer } from '../EffectLayer';
import type { EffectLayerProps } from '../EffectLayer';
import type { GlowEffectProps, ShimmerEffectProps, ParticleEffectProps } from '../types';

// ============================================
// Types
// ============================================

export type PerkRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface EnhancedPerkCardProps extends Omit<PerkCardProps, 'children'> {
  /** Perk rarity - automatically applies effect preset */
  rarity?: PerkRarity;

  /** Override glow effect */
  glow?: GlowEffectProps | boolean;

  /** Override shimmer effect */
  shimmer?: ShimmerEffectProps | boolean;

  /** Override particle effect */
  particles?: ParticleEffectProps | boolean;

  /** Enable all effects (respects rarity preset) */
  effectsEnabled?: boolean;

  /** Show effects only on hover */
  effectsOnHover?: boolean;

  /** Wrapper className for effect layer */
  effectClassName?: string;
}

// ============================================
// Rarity to Effect Mapping
// ============================================

const RARITY_EFFECTS: Record<PerkRarity, Partial<EffectLayerProps>> = {
  common: {
    preset: 'common',
  },
  rare: {
    preset: 'rare',
  },
  epic: {
    preset: 'epic',
  },
  legendary: {
    preset: 'legendary',
  },
  mythic: {
    preset: 'mythic',
  },
};

// ============================================
// Helper: Determine rarity from perk data
// ============================================

function inferRarity(perk: PerkData): PerkRarity {
  // Check if perk has rarity in tags
  const rarityTags = ['common', 'rare', 'epic', 'legendary', 'mythic'];
  const foundRarity = perk.tags?.find((tag) =>
    rarityTags.includes(tag.toLowerCase())
  )?.toLowerCase() as PerkRarity | undefined;

  if (foundRarity) return foundRarity;

  // Infer from featured/premium status
  if (perk.isFeatured) return 'legendary';
  if (perk.isPremium) return 'epic';

  // Infer from supply scarcity
  if (perk.supply && perk.supply.max) {
    const current = Number(perk.supply.current);
    const max = Number(perk.supply.max);
    const ratio = current / max;
    if (ratio <= 0.05) return 'legendary'; // <= 5% remaining
    if (ratio <= 0.15) return 'epic'; // <= 15% remaining
    if (ratio <= 0.3) return 'rare'; // <= 30% remaining
  }

  // Infer from price
  const price = Number(perk.price);
  if (price >= 10000) return 'legendary';
  if (price >= 5000) return 'epic';
  if (price >= 1000) return 'rare';

  return 'common';
}

// ============================================
// Component
// ============================================

/**
 * PerkCard with built-in visual effects based on rarity.
 * Automatically applies glow, shimmer, and particle effects for premium items.
 *
 * @example
 * // Basic with auto-detected rarity
 * <EnhancedPerkCard perk={perk} effectsEnabled />
 *
 * @example
 * // Explicit legendary rarity
 * <EnhancedPerkCard perk={perk} rarity="legendary" effectsEnabled />
 *
 * @example
 * // Effects on hover only
 * <EnhancedPerkCard perk={perk} rarity="epic" effectsOnHover />
 *
 * @example
 * // Custom effects override
 * <EnhancedPerkCard
 *   perk={perk}
 *   glow={{ color: 'rainbow', pattern: 'wave' }}
 *   shimmer={{ variant: 'diamond' }}
 *   effectsEnabled
 * />
 */
export const EnhancedPerkCard = forwardRef<HTMLDivElement, EnhancedPerkCardProps>(
  (
    {
      perk,
      rarity: explicitRarity,
      glow,
      shimmer,
      particles,
      effectsEnabled = true,
      effectsOnHover = false,
      effectClassName,
      className,
      ...perkCardProps
    },
    ref
  ) => {
    // Determine rarity
    const rarity = explicitRarity ?? inferRarity(perk);
    const rarityEffects = rarity ? RARITY_EFFECTS[rarity] : {};

    // Build effect props
    const effectLayerProps = useMemo((): Partial<EffectLayerProps> => {
      if (!effectsEnabled && !effectsOnHover) {
        return { active: false };
      }

      // Start with rarity preset
      const props: Partial<EffectLayerProps> = {
        ...rarityEffects,
        active: effectsEnabled && !effectsOnHover,
      };

      // Override with explicit props
      if (glow !== undefined) props.glow = glow;
      if (shimmer !== undefined) props.shimmer = shimmer;
      if (particles !== undefined) props.particles = particles;

      return props;
    }, [rarity, rarityEffects, effectsEnabled, effectsOnHover, glow, shimmer, particles]);

    // For hover mode, we need state
    if (effectsOnHover) {
      return (
        <div
          ref={ref}
          className="group"
          onMouseEnter={(e) => {
            const target = e.currentTarget.querySelector('[data-effect-layer]');
            if (target) target.setAttribute('data-active', 'true');
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget.querySelector('[data-effect-layer]');
            if (target) target.setAttribute('data-active', 'false');
          }}
        >
          <EffectLayer
            {...effectLayerProps}
            active={false}
            className={effectClassName}
            data-effect-layer
          >
            <PerkCard perk={perk} className={className} {...perkCardProps} />
          </EffectLayer>
        </div>
      );
    }

    return (
      <EffectLayer ref={ref} {...effectLayerProps} className={effectClassName}>
        <PerkCard perk={perk} className={className} {...perkCardProps} />
      </EffectLayer>
    );
  }
);

EnhancedPerkCard.displayName = 'EnhancedPerkCard';

// ============================================
// Convenience Exports
// ============================================

/** Pre-styled legendary perk card */
export const LegendaryPerkCard = forwardRef<
  HTMLDivElement,
  Omit<EnhancedPerkCardProps, 'rarity'>
>((props, ref) => <EnhancedPerkCard ref={ref} rarity="legendary" effectsEnabled {...props} />);
LegendaryPerkCard.displayName = 'LegendaryPerkCard';

/** Pre-styled epic perk card */
export const EpicPerkCard = forwardRef<HTMLDivElement, Omit<EnhancedPerkCardProps, 'rarity'>>(
  (props, ref) => <EnhancedPerkCard ref={ref} rarity="epic" effectsEnabled {...props} />
);
EpicPerkCard.displayName = 'EpicPerkCard';

/** Pre-styled rare perk card */
export const RarePerkCard = forwardRef<HTMLDivElement, Omit<EnhancedPerkCardProps, 'rarity'>>(
  (props, ref) => <EnhancedPerkCard ref={ref} rarity="rare" effectsEnabled {...props} />
);
RarePerkCard.displayName = 'RarePerkCard';

