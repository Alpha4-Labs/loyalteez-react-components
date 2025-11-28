'use client';

import { forwardRef, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { GlowEffect } from './GlowEffect';
import { ShimmerEffect } from './ShimmerEffect';
import { ParticleEffect } from './ParticleEffect';
import { ShakeEffect } from './ShakeEffect';
import type {
  GlowEffectProps,
  ShimmerEffectProps,
  ParticleEffectProps,
  ShakeEffectProps,
  EffectPreset,
} from './types';
import { EFFECT_PRESETS } from './types';

// ============================================
// Types
// ============================================

export interface EffectLayerProps {
  children: ReactNode;

  /** Use a preset configuration */
  preset?: keyof typeof EFFECT_PRESETS;

  /** Glow effect configuration (or true to enable with defaults) */
  glow?: GlowEffectProps | boolean;

  /** Shimmer effect configuration (or true to enable with defaults) */
  shimmer?: ShimmerEffectProps | boolean;

  /** Particle effect configuration (or true to enable with defaults) */
  particles?: ParticleEffectProps | boolean;

  /** Shake effect configuration (or true to enable with defaults) */
  shake?: ShakeEffectProps | boolean;

  /** Master active state (controls all effects) */
  active?: boolean;

  /** Additional CSS classes */
  className?: string;
}

// ============================================
// Component
// ============================================

/**
 * A convenience wrapper that composes multiple effects together.
 * Perfect for quickly adding game-like effects to any component.
 *
 * @example
 * // Using a preset
 * <EffectLayer preset="legendary" active={isLegendary}>
 *   <PerkCard perk={perk} />
 * </EffectLayer>
 *
 * @example
 * // Custom configuration
 * <EffectLayer
 *   glow={{ color: 'cyan', pattern: 'pulse' }}
 *   shimmer={{ variant: 'holographic', trigger: 'hover' }}
 *   active
 * >
 *   <Card>Premium Content</Card>
 * </EffectLayer>
 *
 * @example
 * // Quick enable with boolean
 * <EffectLayer glow shimmer active={isHighlighted}>
 *   <Badge>New</Badge>
 * </EffectLayer>
 *
 * @example
 * // With particles on hover
 * <EffectLayer particles={{ shape: 'sparkle', motion: 'drift', continuous: true }} active={isHovered}>
 *   <Button>Magic Button</Button>
 * </EffectLayer>
 */
export const EffectLayer = forwardRef<HTMLDivElement, EffectLayerProps>(
  ({ children, preset, glow, shimmer, particles, shake, active = true, className }, ref) => {
    // Load preset configuration
    const presetConfig: Partial<EffectPreset> = preset ? EFFECT_PRESETS[preset] || {} : {};

    // Merge preset with explicit props
    const glowConfig: GlowEffectProps | undefined =
      glow === true
        ? presetConfig.glow || { color: 'cyan', pattern: 'pulse' }
        : glow === false
          ? undefined
          : glow || presetConfig.glow;

    const shimmerConfig: ShimmerEffectProps | undefined =
      shimmer === true
        ? presetConfig.shimmer || { variant: 'metallic' }
        : shimmer === false
          ? undefined
          : shimmer || presetConfig.shimmer;

    const particleConfig: ParticleEffectProps | undefined =
      particles === true
        ? presetConfig.particles || { shape: 'star', motion: 'burst' }
        : particles === false
          ? undefined
          : particles || presetConfig.particles;

    const shakeConfig: ShakeEffectProps | undefined =
      shake === true
        ? presetConfig.shake || { pattern: 'impact' }
        : shake === false
          ? undefined
          : shake || presetConfig.shake;

    // Build the nested effect structure
    let content: ReactNode = children;

    // Innermost first: Particles (so they render on top)
    if (particleConfig) {
      content = (
        <ParticleEffect {...particleConfig} active={active && (particleConfig.active !== false)}>
          {content}
        </ParticleEffect>
      );
    }

    // Shimmer
    if (shimmerConfig) {
      content = (
        <ShimmerEffect {...shimmerConfig} active={active && (shimmerConfig.active !== false)}>
          {content}
        </ShimmerEffect>
      );
    }

    // Shake
    if (shakeConfig) {
      content = (
        <ShakeEffect {...shakeConfig} trigger={active && (shakeConfig.trigger !== false)}>
          {content}
        </ShakeEffect>
      );
    }

    // Outermost: Glow
    if (glowConfig) {
      content = (
        <GlowEffect
          ref={ref}
          {...glowConfig}
          active={active && (glowConfig.active !== false)}
          className={className}
        >
          {content}
        </GlowEffect>
      );
    } else {
      // If no glow, wrap in a div for ref forwarding
      content = (
        <div ref={ref} className={cn('relative', className)}>
          {content}
        </div>
      );
    }

    return content;
  }
);

EffectLayer.displayName = 'EffectLayer';

// ============================================
// Convenience Pre-styled Variants
// ============================================

/** Effect layer with legendary preset */
export const LegendaryEffectLayer = forwardRef<
  HTMLDivElement,
  Omit<EffectLayerProps, 'preset'>
>((props, ref) => <EffectLayer ref={ref} preset="legendary" {...props} />);
LegendaryEffectLayer.displayName = 'LegendaryEffectLayer';

/** Effect layer with epic preset */
export const EpicEffectLayer = forwardRef<HTMLDivElement, Omit<EffectLayerProps, 'preset'>>(
  (props, ref) => <EffectLayer ref={ref} preset="epic" {...props} />
);
EpicEffectLayer.displayName = 'EpicEffectLayer';

/** Effect layer with rare preset */
export const RareEffectLayer = forwardRef<HTMLDivElement, Omit<EffectLayerProps, 'preset'>>(
  (props, ref) => <EffectLayer ref={ref} preset="rare" {...props} />
);
RareEffectLayer.displayName = 'RareEffectLayer';

/** Effect layer for rewards */
export const RewardEffectLayer = forwardRef<HTMLDivElement, Omit<EffectLayerProps, 'preset'>>(
  (props, ref) => <EffectLayer ref={ref} preset="coinCollect" {...props} />
);
RewardEffectLayer.displayName = 'RewardEffectLayer';

/** Effect layer for milestones */
export const MilestoneEffectLayer = forwardRef<HTMLDivElement, Omit<EffectLayerProps, 'preset'>>(
  (props, ref) => <EffectLayer ref={ref} preset="milestone" {...props} />
);
MilestoneEffectLayer.displayName = 'MilestoneEffectLayer';

/** Effect layer for success states */
export const SuccessEffectLayer = forwardRef<HTMLDivElement, Omit<EffectLayerProps, 'preset'>>(
  (props, ref) => <EffectLayer ref={ref} preset="success" {...props} />
);
SuccessEffectLayer.displayName = 'SuccessEffectLayer';

/** Effect layer for error states */
export const ErrorEffectLayer = forwardRef<HTMLDivElement, Omit<EffectLayerProps, 'preset'>>(
  (props, ref) => <EffectLayer ref={ref} preset="error" {...props} />
);
ErrorEffectLayer.displayName = 'ErrorEffectLayer';

