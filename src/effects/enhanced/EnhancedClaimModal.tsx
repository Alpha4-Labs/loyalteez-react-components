'use client';

import { forwardRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { ClaimModal } from '@/components/ClaimModal';
import type { ClaimModalProps, ClaimState } from '@/components/ClaimModal/types';
import { GlowEffect } from '../GlowEffect';
import { ShimmerEffect } from '../ShimmerEffect';
import { ParticleEffect } from '../ParticleEffect';
import { ShakeEffect } from '../ShakeEffect';
import { useTone } from '../ToneProvider';
import type {
  GlowEffectProps,
  ShimmerEffectProps,
  ParticleEffectProps,
  ShakeEffectProps,
  EffectIntensity,
} from '../types';

// ============================================
// State Effect Configurations
// ============================================

interface StateEffectConfig {
  glow?: GlowEffectProps;
  shimmer?: ShimmerEffectProps;
  particles?: ParticleEffectProps;
  shake?: ShakeEffectProps;
}

const STATE_EFFECTS: Record<ClaimState, StateEffectConfig> = {
  idle: {},
  confirming: {
    shimmer: {
      variant: 'metallic',
      trigger: 'auto',
      intensity: 'subtle',
    },
  },
  processing: {
    shimmer: {
      variant: 'neon',
      trigger: 'auto',
      intensity: 'normal',
      speed: 'normal',
    },
    glow: {
      color: 'cyan',
      pattern: 'pulse',
      intensity: 'subtle',
    },
  },
  success: {
    glow: {
      color: 'green',
      pattern: 'heartbeat',
      intensity: 'intense',
    },
    particles: {
      shape: 'confetti',
      motion: 'fountain',
      count: 60,
      intensity: 'intense',
      origin: { x: 0.5, y: 0.3 },
    },
    shimmer: {
      variant: 'gold',
      trigger: 'auto',
      intensity: 'intense',
    },
  },
  error: {
    glow: {
      color: 'red',
      pattern: 'flicker',
      intensity: 'normal',
    },
    shake: {
      pattern: 'horizontal',
      intensity: 'normal',
      count: 3,
    },
  },
};

// ============================================
// Enhanced Props
// ============================================

export interface EnhancedClaimModalProps extends ClaimModalProps {
  /** Enable/disable all effects */
  enableEffects?: boolean;

  /** Effect intensity level */
  effectIntensity?: EffectIntensity;

  /** Custom effects per state */
  stateEffects?: Partial<Record<ClaimState, StateEffectConfig>>;

  /** Show coin burst on success */
  showCoinBurst?: boolean;

  /** Colors for success particles */
  successParticleColors?: string[];

  /** Sound effects (future integration) */
  soundEnabled?: boolean;

  /** Callback when success effects complete */
  onSuccessEffectsComplete?: () => void;
}

// ============================================
// Component
// ============================================

/**
 * An enhanced ClaimModal with built-in visual effects for each transaction state.
 * Automatically applies appropriate effects based on the claim flow state.
 *
 * @example
 * // Basic enhanced claim modal
 * <EnhancedClaimModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   item={{ id: '1', title: 'Coffee Reward', cost: 500 }}
 *   state={claimState}
 *   onConfirm={handleClaim}
 *   userBalance={1000}
 * />
 *
 * @example
 * // With custom effect intensity
 * <EnhancedClaimModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   item={selectedPerk}
 *   state={txState}
 *   onConfirm={handleClaim}
 *   effectIntensity="extreme"
 *   showCoinBurst
 * />
 *
 * @example
 * // With custom state effects
 * <EnhancedClaimModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   item={perk}
 *   state={state}
 *   onConfirm={handleClaim}
 *   stateEffects={{
 *     success: {
 *       particles: { shape: 'star', motion: 'burst', count: 100 },
 *       glow: { color: 'gold', pattern: 'wave', intensity: 'extreme' },
 *     },
 *   }}
 * />
 */
export const EnhancedClaimModal = forwardRef<HTMLDivElement, EnhancedClaimModalProps>(
  (
    {
      enableEffects = true,
      effectIntensity = 'normal',
      stateEffects,
      showCoinBurst = false,
      successParticleColors,
      soundEnabled: _soundEnabled = false, // Future use
      onSuccessEffectsComplete,
      state = 'idle',
      className,
      ...props
    },
    ref
  ) => {
    const { tone } = useTone();
    const [prevState, setPrevState] = useState<ClaimState>(state);
    const [activeShake, setActiveShake] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const [successEffectComplete, setSuccessEffectComplete] = useState(false);

    // Get merged effects for current state
    const currentEffects: StateEffectConfig = {
      ...STATE_EFFECTS[state],
      ...stateEffects?.[state],
    };

    // Apply intensity override
    if (currentEffects.glow && effectIntensity !== 'normal') {
      currentEffects.glow = { ...currentEffects.glow, intensity: effectIntensity };
    }
    if (currentEffects.shimmer && effectIntensity !== 'normal') {
      currentEffects.shimmer = { ...currentEffects.shimmer, intensity: effectIntensity };
    }
    if (currentEffects.particles && effectIntensity !== 'normal') {
      currentEffects.particles = { ...currentEffects.particles, intensity: effectIntensity };
    }

    // Apply tone-specific effects
    useEffect(() => {
      if (state === 'success' && tone.rewardPreset) {
        // Apply tone's reward preset
      } else if (state === 'error' && tone.errorPreset) {
        // Apply tone's error preset
      }
    }, [state, tone]);

    // Handle state transitions
    useEffect(() => {
      if (state !== prevState) {
        setPrevState(state);

        // Trigger shake on error
        if (state === 'error') {
          setActiveShake(true);
          setTimeout(() => setActiveShake(false), 500);
        }

        // Trigger particles on success
        if (state === 'success') {
          setShowParticles(true);
          setSuccessEffectComplete(false);
        } else {
          setShowParticles(false);
        }
      }
    }, [state, prevState]);

    // Handle particle completion
    const handleParticlesComplete = useCallback(() => {
      setSuccessEffectComplete(true);
      onSuccessEffectsComplete?.();
    }, [onSuccessEffectsComplete]);

    // Determine particle config
    const particleConfig = currentEffects.particles
      ? {
          ...currentEffects.particles,
          colors: successParticleColors || currentEffects.particles.colors,
        }
      : showCoinBurst && state === 'success'
        ? {
            shape: 'coin' as const,
            motion: 'rise' as const,
            count: 30,
            colors: ['#FFD700', '#FFA500', '#DAA520'],
            intensity: effectIntensity,
          }
        : undefined;

    if (!enableEffects) {
      return <ClaimModal ref={ref} state={state} className={className} {...props} />;
    }

    return (
      <div className={cn('relative', className)}>
        {/* Particle overlay layer (positioned absolutely over modal) */}
        {particleConfig && (
          <div className="pointer-events-none fixed inset-0 z-[100]">
            <ParticleEffect
              active={showParticles && !successEffectComplete}
              {...particleConfig}
              onComplete={handleParticlesComplete}
            />
          </div>
        )}

        {/* Shake wrapper */}
        <ShakeEffect
          active={activeShake}
          {...(currentEffects.shake || { pattern: 'horizontal' })}
          trigger={activeShake}
        >
          {/* Glow wrapper */}
          <GlowEffect
            active={enableEffects && !!currentEffects.glow}
            {...currentEffects.glow}
          >
            {/* Shimmer wrapper */}
            <ShimmerEffect
              active={enableEffects && !!currentEffects.shimmer}
              {...currentEffects.shimmer}
            >
              {/* The actual modal */}
              <ClaimModal ref={ref} state={state} {...props} />
            </ShimmerEffect>
          </GlowEffect>
        </ShakeEffect>
      </div>
    );
  }
);

EnhancedClaimModal.displayName = 'EnhancedClaimModal';

// ============================================
// Convenience Components
// ============================================

/**
 * A high-impact claim modal with intense effects for premium/legendary items.
 */
export const PremiumClaimModal = forwardRef<HTMLDivElement, ClaimModalProps>((props, ref) => (
  <EnhancedClaimModal
    ref={ref}
    effectIntensity="intense"
    showCoinBurst
    stateEffects={{
      success: {
        glow: { color: 'gold', pattern: 'wave', intensity: 'extreme', innerGlow: true },
        particles: {
          shape: 'star',
          motion: 'burst',
          count: 80,
          colors: ['#FFD700', '#FFA500', '#FFFF00', '#FF6B35'],
        },
        shimmer: { variant: 'holographic', intensity: 'extreme' },
      },
    }}
    {...props}
  />
));
PremiumClaimModal.displayName = 'PremiumClaimModal';

/**
 * A minimal claim modal with subtle effects for professional contexts.
 */
export const MinimalClaimModal = forwardRef<HTMLDivElement, ClaimModalProps>((props, ref) => (
  <EnhancedClaimModal
    ref={ref}
    effectIntensity="subtle"
    stateEffects={{
      success: {
        glow: { color: 'green', pattern: 'pulse', intensity: 'subtle' },
        particles: { shape: 'circle', motion: 'rise', count: 15 },
        shimmer: { variant: 'metallic', intensity: 'subtle' },
      },
      error: {
        shake: { pattern: 'horizontal', intensity: 'subtle', count: 2 },
      },
    }}
    {...props}
  />
));
MinimalClaimModal.displayName = 'MinimalClaimModal';

/**
 * An arcade-style claim modal with explosive, game-like effects.
 */
export const ArcadeClaimModal = forwardRef<HTMLDivElement, ClaimModalProps>((props, ref) => (
  <EnhancedClaimModal
    ref={ref}
    effectIntensity="extreme"
    showCoinBurst
    stateEffects={{
      processing: {
        shimmer: { variant: 'holographic', intensity: 'intense', speed: 'fast' },
        glow: { color: 'rainbow', pattern: 'wave', intensity: 'normal' },
      },
      success: {
        glow: { color: 'rainbow', pattern: 'wave', intensity: 'extreme' },
        particles: {
          shape: 'confetti',
          motion: 'fountain',
          count: 120,
        },
        shimmer: { variant: 'holographic', intensity: 'extreme' },
        shake: { pattern: 'impact', intensity: 'intense' },
      },
      error: {
        glow: { color: 'red', pattern: 'flicker', intensity: 'extreme' },
        shake: { pattern: 'earthquake', intensity: 'normal' },
      },
    }}
    {...props}
  />
));
ArcadeClaimModal.displayName = 'ArcadeClaimModal';

