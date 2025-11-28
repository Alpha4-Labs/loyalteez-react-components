'use client';

import { useState, useCallback, useRef } from 'react';
import type {
  GlowEffectProps,
  ShimmerEffectProps,
  ParticleEffectProps,
  ShakeEffectProps,
} from './types';
import { EFFECT_PRESETS } from './types';

// ============================================
// Types
// ============================================

export interface EffectComboConfig {
  /** Glow effect configuration */
  glow?: GlowEffectProps;
  /** Shimmer effect configuration */
  shimmer?: ShimmerEffectProps;
  /** Particle effect configuration */
  particles?: ParticleEffectProps;
  /** Shake effect configuration */
  shake?: ShakeEffectProps;
  /** Delays between effects (ms) */
  delays?: {
    glow?: number;
    shimmer?: number;
    particles?: number;
    shake?: number;
  };
  /** Auto-reset after duration (ms) */
  autoReset?: number;
}

export interface EffectComboState {
  glowActive: boolean;
  shimmerActive: boolean;
  particlesActive: boolean;
  shakeActive: boolean;
}

export interface UseEffectComboReturn {
  /** Current state of all effects */
  state: EffectComboState;
  /** Fire all configured effects */
  fire: () => void;
  /** Fire a specific effect */
  fireGlow: () => void;
  fireShimmer: () => void;
  fireParticles: () => void;
  fireShake: () => void;
  /** Reset all effects */
  reset: () => void;
  /** Props to spread on effect components */
  glowProps: GlowEffectProps & { active: boolean };
  shimmerProps: ShimmerEffectProps & { active: boolean };
  particleProps: ParticleEffectProps & { active: boolean };
  shakeProps: ShakeEffectProps & { trigger: boolean };
}

// ============================================
// Hook
// ============================================

/**
 * Hook for orchestrating multiple effects together.
 * Perfect for reward moments, achievements, and celebrations.
 *
 * @example
 * // Basic combo
 * const { fire, glowProps, particleProps } = useEffectCombo({
 *   glow: { color: 'gold', pattern: 'pulse' },
 *   particles: { shape: 'coin', motion: 'rise' },
 * });
 *
 * return (
 *   <GlowEffect {...glowProps}>
 *     <ParticleEffect {...particleProps}>
 *       <Button onClick={fire}>Claim Reward</Button>
 *     </ParticleEffect>
 *   </GlowEffect>
 * );
 *
 * @example
 * // Using presets
 * const { fire, ...effectProps } = useEffectCombo(EFFECT_PRESETS.legendary);
 *
 * @example
 * // With staggered delays
 * const combo = useEffectCombo({
 *   glow: { color: 'gold' },
 *   particles: { shape: 'star' },
 *   shake: { pattern: 'impact' },
 *   delays: { glow: 0, shake: 100, particles: 200 },
 *   autoReset: 3000,
 * });
 */
export function useEffectCombo(config: EffectComboConfig): UseEffectComboReturn {
  const [state, setState] = useState<EffectComboState>({
    glowActive: false,
    shimmerActive: false,
    particlesActive: false,
    shakeActive: false,
  });

  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear all pending timers
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  // Reset all effects
  const reset = useCallback(() => {
    clearTimers();
    setState({
      glowActive: false,
      shimmerActive: false,
      particlesActive: false,
      shakeActive: false,
    });
  }, [clearTimers]);

  // Fire individual effects
  const fireGlow = useCallback(() => {
    setState((prev) => ({ ...prev, glowActive: true }));
  }, []);

  const fireShimmer = useCallback(() => {
    setState((prev) => ({ ...prev, shimmerActive: true }));
  }, []);

  const fireParticles = useCallback(() => {
    setState((prev) => ({ ...prev, particlesActive: true }));
  }, []);

  const fireShake = useCallback(() => {
    setState((prev) => ({ ...prev, shakeActive: true }));
    // Shake auto-resets via its onComplete
  }, []);

  // Fire all configured effects
  const fire = useCallback(() => {
    clearTimers();

    const delays = config.delays || {};

    // Glow
    if (config.glow) {
      const delay = delays.glow || 0;
      if (delay === 0) {
        fireGlow();
      } else {
        const timer = setTimeout(fireGlow, delay);
        timersRef.current.push(timer);
      }
    }

    // Shimmer
    if (config.shimmer) {
      const delay = delays.shimmer || 0;
      if (delay === 0) {
        fireShimmer();
      } else {
        const timer = setTimeout(fireShimmer, delay);
        timersRef.current.push(timer);
      }
    }

    // Particles
    if (config.particles) {
      const delay = delays.particles || 0;
      if (delay === 0) {
        fireParticles();
      } else {
        const timer = setTimeout(fireParticles, delay);
        timersRef.current.push(timer);
      }
    }

    // Shake
    if (config.shake) {
      const delay = delays.shake || 0;
      if (delay === 0) {
        fireShake();
      } else {
        const timer = setTimeout(fireShake, delay);
        timersRef.current.push(timer);
      }
    }

    // Auto-reset
    if (config.autoReset && config.autoReset > 0) {
      resetTimerRef.current = setTimeout(reset, config.autoReset);
    }
  }, [config, clearTimers, fireGlow, fireShimmer, fireParticles, fireShake, reset]);

  // Build props
  const glowProps: GlowEffectProps & { active: boolean } = {
    ...config.glow,
    active: state.glowActive,
  };

  const shimmerProps: ShimmerEffectProps & { active: boolean } = {
    ...config.shimmer,
    active: state.shimmerActive,
  };

  const particleProps: ParticleEffectProps & { active: boolean } = {
    ...config.particles,
    active: state.particlesActive,
    onComplete: () => {
      setState((prev) => ({ ...prev, particlesActive: false }));
      config.particles?.onComplete?.();
    },
  };

  const shakeProps: ShakeEffectProps & { trigger: boolean } = {
    ...config.shake,
    trigger: state.shakeActive,
    onComplete: () => {
      setState((prev) => ({ ...prev, shakeActive: false }));
      config.shake?.onComplete?.();
    },
  };

  return {
    state,
    fire,
    fireGlow,
    fireShimmer,
    fireParticles,
    fireShake,
    reset,
    glowProps,
    shimmerProps,
    particleProps,
    shakeProps,
  };
}

// ============================================
// Preset Hook Variants
// ============================================

/**
 * Pre-configured combo for coin collection moments.
 */
export function useCoinCollectEffect() {
  return useEffectCombo({
    ...EFFECT_PRESETS.coinCollect,
    autoReset: 2000,
  });
}

/**
 * Pre-configured combo for level-up moments.
 */
export function useLevelUpEffect() {
  return useEffectCombo({
    ...EFFECT_PRESETS.levelUp,
    delays: { glow: 0, shake: 50, particles: 100 },
    autoReset: 3000,
  });
}

/**
 * Pre-configured combo for milestone achievements.
 */
export function useMilestoneEffect() {
  return useEffectCombo({
    ...EFFECT_PRESETS.milestone,
    delays: { glow: 0, particles: 200 },
    autoReset: 4000,
  });
}

/**
 * Pre-configured combo for streak celebrations.
 */
export function useStreakEffect() {
  return useEffectCombo({
    ...EFFECT_PRESETS.streak,
    autoReset: 2500,
  });
}

/**
 * Pre-configured combo for success feedback.
 */
export function useSuccessEffect() {
  return useEffectCombo({
    ...EFFECT_PRESETS.success,
    autoReset: 1500,
  });
}

/**
 * Pre-configured combo for error feedback.
 */
export function useErrorEffect() {
  return useEffectCombo({
    ...EFFECT_PRESETS.error,
    autoReset: 1000,
  });
}

/**
 * Pre-configured combo for legendary items.
 */
export function useLegendaryEffect() {
  return useEffectCombo({
    ...EFFECT_PRESETS.legendary,
    autoReset: 5000,
  });
}

