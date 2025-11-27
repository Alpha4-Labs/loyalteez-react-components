'use client';

import { forwardRef, useEffect, useState, useCallback, useRef } from 'react';
import { cn } from '@/utils/cn';
import type { ShakeEffectProps, ShakePattern, EffectIntensity } from './types';

// Shake patterns configuration
const SHAKE_CONFIG: Record<
  ShakePattern,
  {
    keyframes: (magnitude: number) => string;
    duration: number;
    timing: string;
  }
> = {
  horizontal: {
    keyframes: (m) => `
      0%, 100% { transform: translateX(0); }
      10% { transform: translateX(-${m}px); }
      20% { transform: translateX(${m}px); }
      30% { transform: translateX(-${m * 0.8}px); }
      40% { transform: translateX(${m * 0.8}px); }
      50% { transform: translateX(-${m * 0.6}px); }
      60% { transform: translateX(${m * 0.6}px); }
      70% { transform: translateX(-${m * 0.4}px); }
      80% { transform: translateX(${m * 0.4}px); }
      90% { transform: translateX(-${m * 0.2}px); }
    `,
    duration: 500,
    timing: 'ease-out',
  },
  vertical: {
    keyframes: (m) => `
      0%, 100% { transform: translateY(0); }
      10% { transform: translateY(-${m}px); }
      20% { transform: translateY(${m}px); }
      30% { transform: translateY(-${m * 0.8}px); }
      40% { transform: translateY(${m * 0.8}px); }
      50% { transform: translateY(-${m * 0.6}px); }
      60% { transform: translateY(${m * 0.6}px); }
      70% { transform: translateY(-${m * 0.4}px); }
      80% { transform: translateY(${m * 0.4}px); }
      90% { transform: translateY(-${m * 0.2}px); }
    `,
    duration: 500,
    timing: 'ease-out',
  },
  rotational: {
    keyframes: (m) => `
      0%, 100% { transform: rotate(0deg); }
      10% { transform: rotate(-${m}deg); }
      20% { transform: rotate(${m}deg); }
      30% { transform: rotate(-${m * 0.7}deg); }
      40% { transform: rotate(${m * 0.7}deg); }
      50% { transform: rotate(-${m * 0.5}deg); }
      60% { transform: rotate(${m * 0.5}deg); }
      70% { transform: rotate(-${m * 0.3}deg); }
      80% { transform: rotate(${m * 0.3}deg); }
      90% { transform: rotate(-${m * 0.1}deg); }
    `,
    duration: 600,
    timing: 'ease-out',
  },
  random: {
    keyframes: (m) => `
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      10% { transform: translate(-${m}px, ${m * 0.5}px) rotate(-${m * 0.3}deg); }
      20% { transform: translate(${m * 0.8}px, -${m}px) rotate(${m * 0.2}deg); }
      30% { transform: translate(-${m * 0.6}px, ${m * 0.3}px) rotate(-${m * 0.15}deg); }
      40% { transform: translate(${m}px, ${m * 0.6}px) rotate(${m * 0.25}deg); }
      50% { transform: translate(-${m * 0.4}px, -${m * 0.8}px) rotate(-${m * 0.1}deg); }
      60% { transform: translate(${m * 0.5}px, ${m * 0.2}px) rotate(${m * 0.15}deg); }
      70% { transform: translate(-${m * 0.3}px, -${m * 0.4}px) rotate(-${m * 0.08}deg); }
      80% { transform: translate(${m * 0.2}px, ${m * 0.1}px) rotate(${m * 0.05}deg); }
      90% { transform: translate(-${m * 0.1}px, -${m * 0.05}px) rotate(-${m * 0.02}deg); }
    `,
    duration: 700,
    timing: 'ease-out',
  },
  impact: {
    keyframes: (m) => `
      0% { transform: scale(1) translateY(0); }
      15% { transform: scale(1.05) translateY(-${m}px); }
      30% { transform: scale(0.95) translateY(${m * 0.3}px); }
      45% { transform: scale(1.02) translateY(-${m * 0.2}px); }
      60% { transform: scale(0.98) translateY(${m * 0.1}px); }
      75% { transform: scale(1.01) translateY(-${m * 0.05}px); }
      100% { transform: scale(1) translateY(0); }
    `,
    duration: 400,
    timing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)',
  },
  vibrate: {
    keyframes: (m) => `
      0%, 100% { transform: translateX(0); }
      10% { transform: translateX(-${m * 0.5}px); }
      20% { transform: translateX(${m * 0.5}px); }
      30% { transform: translateX(-${m * 0.5}px); }
      40% { transform: translateX(${m * 0.5}px); }
      50% { transform: translateX(-${m * 0.5}px); }
      60% { transform: translateX(${m * 0.5}px); }
      70% { transform: translateX(-${m * 0.5}px); }
      80% { transform: translateX(${m * 0.5}px); }
      90% { transform: translateX(-${m * 0.5}px); }
    `,
    duration: 200,
    timing: 'linear',
  },
  earthquake: {
    keyframes: (m) => `
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      5% { transform: translate(-${m * 1.5}px, ${m}px) rotate(-${m * 0.5}deg); }
      10% { transform: translate(${m * 2}px, -${m * 1.2}px) rotate(${m * 0.4}deg); }
      15% { transform: translate(-${m * 1.8}px, ${m * 1.5}px) rotate(-${m * 0.6}deg); }
      20% { transform: translate(${m * 1.2}px, -${m * 0.8}px) rotate(${m * 0.3}deg); }
      25% { transform: translate(-${m}px, ${m * 1.8}px) rotate(-${m * 0.5}deg); }
      30% { transform: translate(${m * 1.5}px, -${m}px) rotate(${m * 0.4}deg); }
      35% { transform: translate(-${m * 0.8}px, ${m * 0.6}px) rotate(-${m * 0.2}deg); }
      40% { transform: translate(${m * 0.6}px, -${m * 0.5}px) rotate(${m * 0.15}deg); }
      50% { transform: translate(-${m * 0.5}px, ${m * 0.3}px) rotate(-${m * 0.1}deg); }
      60% { transform: translate(${m * 0.3}px, -${m * 0.2}px) rotate(${m * 0.05}deg); }
      80% { transform: translate(-${m * 0.1}px, ${m * 0.1}px) rotate(-${m * 0.02}deg); }
    `,
    duration: 1000,
    timing: 'ease-out',
  },
};

// Intensity to magnitude mapping
const INTENSITY_MAGNITUDE: Record<EffectIntensity, number> = {
  subtle: 2,
  normal: 5,
  intense: 10,
  extreme: 20,
};

/**
 * A shake/vibration effect wrapper for dramatic feedback.
 *
 * @example
 * // Error shake
 * <ShakeEffect trigger={hasError} pattern="horizontal" intensity="normal">
 *   <Input error={hasError} />
 * </ShakeEffect>
 *
 * @example
 * // Impact effect on achievement
 * <ShakeEffect trigger={unlocked} pattern="impact" intensity="intense">
 *   <AchievementBadge />
 * </ShakeEffect>
 *
 * @example
 * // Earthquake on critical event
 * <ShakeEffect trigger={criticalHit} pattern="earthquake" intensity="extreme">
 *   <GameHUD />
 * </ShakeEffect>
 */
export const ShakeEffect = forwardRef<HTMLDivElement, ShakeEffectProps>(
  (
    {
      active = true,
      trigger = false,
      pattern = 'horizontal',
      intensity = 'normal',
      speed = 'normal',
      duration: customDuration,
      magnitude: customMagnitude,
      count = 1,
      onComplete,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isShaking, setIsShaking] = useState(false);
    const [animationId, setAnimationId] = useState(0);
    const countRef = useRef(0);

    const config = SHAKE_CONFIG[pattern];
    const baseMagnitude = customMagnitude ?? INTENSITY_MAGNITUDE[intensity];

    // Speed multiplier
    const speedMultiplier =
      speed === 'slow' ? 1.5 : speed === 'normal' ? 1 : speed === 'fast' ? 0.6 : 0.3;

    const duration = customDuration ?? config.duration * speedMultiplier;

    // Generate unique animation name
    const animationName = `shake-${pattern}-${animationId}`;

    // Start shake
    const startShake = useCallback(() => {
      if (!active) return;

      countRef.current = 0;
      setAnimationId((prev) => prev + 1);
      setIsShaking(true);
    }, [active]);

    // Handle animation end
    const handleAnimationEnd = useCallback(() => {
      countRef.current += 1;

      if (countRef.current < count) {
        // Continue shaking
        setAnimationId((prev) => prev + 1);
      } else {
        // Done shaking
        setIsShaking(false);
        onComplete?.();
      }
    }, [count, onComplete]);

    // Trigger shake when trigger prop changes to true
    useEffect(() => {
      if (trigger) {
        startShake();
      }
    }, [trigger, startShake]);

    // Keyframes CSS
    const keyframesCSS = `
      @keyframes ${animationName} {
        ${config.keyframes(baseMagnitude)}
      }
    `;

    return (
      <>
        {/* Inject keyframes */}
        {isShaking && <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />}

        <div
          ref={ref}
          className={cn('transform-gpu', className)}
          style={{
            animation: isShaking ? `${animationName} ${duration}ms ${config.timing}` : undefined,
            ...style,
          }}
          onAnimationEnd={handleAnimationEnd}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

ShakeEffect.displayName = 'ShakeEffect';

// ============================================
// Convenience Components
// ============================================

export const ErrorShake = forwardRef<HTMLDivElement, Omit<ShakeEffectProps, 'pattern'>>(
  (props, ref) => <ShakeEffect ref={ref} pattern="horizontal" {...props} />
);
ErrorShake.displayName = 'ErrorShake';

export const ImpactShake = forwardRef<HTMLDivElement, Omit<ShakeEffectProps, 'pattern'>>(
  (props, ref) => <ShakeEffect ref={ref} pattern="impact" {...props} />
);
ImpactShake.displayName = 'ImpactShake';

export const VibrateEffect = forwardRef<HTMLDivElement, Omit<ShakeEffectProps, 'pattern'>>(
  (props, ref) => <ShakeEffect ref={ref} pattern="vibrate" {...props} />
);
VibrateEffect.displayName = 'VibrateEffect';

export const EarthquakeEffect = forwardRef<HTMLDivElement, Omit<ShakeEffectProps, 'pattern'>>(
  (props, ref) => <ShakeEffect ref={ref} pattern="earthquake" {...props} />
);
EarthquakeEffect.displayName = 'EarthquakeEffect';

// ============================================
// Hook for imperative control
// ============================================

export function useShake(options?: Partial<ShakeEffectProps>) {
  const [trigger, setTrigger] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shake = useCallback(() => {
    // Reset first
    setTrigger(false);

    // Small delay to ensure re-trigger works
    timeoutRef.current = setTimeout(() => {
      setTrigger(true);
    }, 10);
  }, []);

  const reset = useCallback(() => {
    setTrigger(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    trigger,
    shake,
    reset,
    props: {
      trigger,
      onComplete: reset,
      ...options,
    },
  };
}
