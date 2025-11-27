'use client';

import { forwardRef, useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import type { ShimmerEffectProps, ShimmerStyle, ShimmerDirection, EffectIntensity } from './types';

// Shimmer gradient definitions
const SHIMMER_GRADIENTS: Record<ShimmerStyle, string> = {
  metallic: `linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0) 25%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.8) 55%,
    rgba(255, 255, 255, 0.3) 60%,
    rgba(255, 255, 255, 0) 75%,
    transparent 100%
  )`,
  holographic: `linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 0, 0, 0.2) 15%,
    rgba(255, 127, 0, 0.3) 25%,
    rgba(255, 255, 0, 0.3) 35%,
    rgba(0, 255, 0, 0.3) 45%,
    rgba(0, 127, 255, 0.3) 55%,
    rgba(0, 0, 255, 0.3) 65%,
    rgba(127, 0, 255, 0.3) 75%,
    rgba(255, 0, 127, 0.2) 85%,
    transparent 100%
  )`,
  gold: `linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 215, 0, 0) 25%,
    rgba(255, 215, 0, 0.4) 45%,
    rgba(255, 255, 200, 0.9) 50%,
    rgba(255, 215, 0, 0.4) 55%,
    rgba(255, 215, 0, 0) 75%,
    transparent 100%
  )`,
  frost: `linear-gradient(
    90deg,
    transparent 0%,
    rgba(135, 206, 250, 0) 25%,
    rgba(135, 206, 250, 0.3) 45%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(135, 206, 250, 0.3) 55%,
    rgba(135, 206, 250, 0) 75%,
    transparent 100%
  )`,
  fire: `linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 69, 0, 0) 25%,
    rgba(255, 140, 0, 0.4) 40%,
    rgba(255, 215, 0, 0.9) 50%,
    rgba(255, 140, 0, 0.4) 60%,
    rgba(255, 69, 0, 0) 75%,
    transparent 100%
  )`,
  neon: `linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 224, 255, 0) 20%,
    rgba(0, 224, 255, 0.5) 35%,
    rgba(108, 51, 234, 0.9) 50%,
    rgba(255, 63, 164, 0.5) 65%,
    rgba(255, 63, 164, 0) 80%,
    transparent 100%
  )`,
  diamond: `
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, transparent 10%),
    radial-gradient(circle at 70% 40%, rgba(255,255,255,0.8) 0%, transparent 8%),
    radial-gradient(circle at 50% 70%, rgba(255,255,255,0.7) 0%, transparent 12%),
    radial-gradient(circle at 20% 60%, rgba(255,255,255,0.6) 0%, transparent 6%),
    radial-gradient(circle at 80% 80%, rgba(255,255,255,0.8) 0%, transparent 10%)
  `,
};

// Direction transforms
const DIRECTION_TRANSFORMS: Record<ShimmerDirection, string> = {
  'left-right': 'rotate(0deg)',
  'right-left': 'rotate(180deg)',
  'top-bottom': 'rotate(90deg)',
  'bottom-top': 'rotate(270deg)',
  diagonal: 'rotate(45deg)',
  radial: 'rotate(0deg)', // Special handling
};

// Intensity to opacity mapping
const INTENSITY_OPACITY: Record<EffectIntensity, number> = {
  subtle: 0.4,
  normal: 0.7,
  intense: 0.9,
  extreme: 1,
};

/**
 * A shimmer/shine effect that sweeps across content.
 * Perfect for premium items, new badges, and highlighting important elements.
 *
 * @example
 * // Metallic shine on hover
 * <ShimmerEffect variant="metallic" trigger="hover">
 *   <Card>Premium Content</Card>
 * </ShimmerEffect>
 *
 * @example
 * // Holographic continuous shimmer
 * <ShimmerEffect variant="holographic" trigger="auto">
 *   <Badge>Legendary</Badge>
 * </ShimmerEffect>
 *
 * @example
 * // Gold shine for rewards
 * <ShimmerEffect variant="gold" trigger="manual" active={showShimmer}>
 *   <RewardCard reward={reward} />
 * </ShimmerEffect>
 */
export const ShimmerEffect = forwardRef<HTMLDivElement, ShimmerEffectProps>(
  (
    {
      active = true,
      variant = 'metallic',
      direction = 'left-right',
      intensity = 'normal',
      speed = 'normal',
      delay = 0,
      duration: customDuration,
      trigger = 'auto',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = useState(trigger === 'auto');
    const [_isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Speed to duration mapping
    const baseDuration =
      customDuration ??
      (speed === 'slow' ? 2000 : speed === 'normal' ? 1000 : speed === 'fast' ? 500 : 250);

    // Handle auto trigger with delay
    useEffect(() => {
      if (trigger === 'auto' && active) {
        const startAnimation = () => {
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), baseDuration);
        };

        // Initial delay
        const timeout = setTimeout(() => {
          startAnimation();
          // Set up interval for continuous shimmer
          intervalRef.current = setInterval(startAnimation, baseDuration + (delay || 3000));
        }, delay || 0);

        return () => {
          clearTimeout(timeout);
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }
    }, [trigger, active, baseDuration, delay]);

    // Handle hover trigger
    const handleMouseEnter = useCallback(() => {
      if (trigger === 'hover' && active) {
        setIsHovered(true);
        setIsAnimating(true);
      }
    }, [trigger, active]);

    const handleMouseLeave = useCallback(() => {
      if (trigger === 'hover') {
        setIsHovered(false);
        setTimeout(() => setIsAnimating(false), baseDuration);
      }
    }, [trigger, baseDuration]);

    // Handle manual trigger
    useEffect(() => {
      if (trigger === 'manual' && active) {
        setIsAnimating(true);
        const timeout = setTimeout(() => setIsAnimating(false), baseDuration);
        return () => clearTimeout(timeout);
      }
    }, [trigger, active, baseDuration]);

    const shouldAnimate = isAnimating && active;
    const opacity = INTENSITY_OPACITY[intensity];

    // Build shimmer overlay styles
    const isDiamond = variant === 'diamond';

    const shimmerStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      borderRadius: 'inherit',
      zIndex: 1,
    };

    const shimmerInnerStyle: React.CSSProperties = {
      position: 'absolute',
      inset: isDiamond ? 0 : '-50%',
      background: SHIMMER_GRADIENTS[variant],
      backgroundSize: isDiamond ? '100% 100%' : '200% 100%',
      transform: DIRECTION_TRANSFORMS[direction],
      opacity: shouldAnimate ? opacity : 0,
      transition: shouldAnimate ? 'none' : `opacity ${baseDuration / 4}ms ease-out`,
      animation:
        shouldAnimate && !isDiamond
          ? `shimmer-sweep ${baseDuration}ms ease-in-out`
          : shouldAnimate && isDiamond
            ? `shimmer-sparkle ${baseDuration}ms ease-in-out`
            : 'none',
    };

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Inject keyframes */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes shimmer-sweep {
              0% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(-100%); }
              100% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(100%); }
            }
            @keyframes shimmer-sparkle {
              0%, 100% { opacity: 0; }
              50% { opacity: ${opacity}; }
            }
          `,
          }}
        />

        {/* Content */}
        {children}

        {/* Shimmer overlay */}
        {active && (
          <div style={shimmerStyle} aria-hidden="true">
            <div style={shimmerInnerStyle} />
          </div>
        )}
      </div>
    );
  }
);

ShimmerEffect.displayName = 'ShimmerEffect';

// ============================================
// Convenience Components
// ============================================

export const MetallicShimmer = forwardRef<HTMLDivElement, Omit<ShimmerEffectProps, 'variant'>>(
  (props, ref) => <ShimmerEffect ref={ref} variant="metallic" {...props} />
);
MetallicShimmer.displayName = 'MetallicShimmer';

export const HolographicShimmer = forwardRef<HTMLDivElement, Omit<ShimmerEffectProps, 'variant'>>(
  (props, ref) => <ShimmerEffect ref={ref} variant="holographic" {...props} />
);
HolographicShimmer.displayName = 'HolographicShimmer';

export const GoldShimmer = forwardRef<HTMLDivElement, Omit<ShimmerEffectProps, 'variant'>>(
  (props, ref) => <ShimmerEffect ref={ref} variant="gold" {...props} />
);
GoldShimmer.displayName = 'GoldShimmer';

export const DiamondShimmer = forwardRef<HTMLDivElement, Omit<ShimmerEffectProps, 'variant'>>(
  (props, ref) => <ShimmerEffect ref={ref} variant="diamond" {...props} />
);
DiamondShimmer.displayName = 'DiamondShimmer';

export const NeonShimmer = forwardRef<HTMLDivElement, Omit<ShimmerEffectProps, 'variant'>>(
  (props, ref) => <ShimmerEffect ref={ref} variant="neon" {...props} />
);
NeonShimmer.displayName = 'NeonShimmer';

export const FireShimmer = forwardRef<HTMLDivElement, Omit<ShimmerEffectProps, 'variant'>>(
  (props, ref) => <ShimmerEffect ref={ref} variant="fire" {...props} />
);
FireShimmer.displayName = 'FireShimmer';

export const FrostShimmer = forwardRef<HTMLDivElement, Omit<ShimmerEffectProps, 'variant'>>(
  (props, ref) => <ShimmerEffect ref={ref} variant="frost" {...props} />
);
FrostShimmer.displayName = 'FrostShimmer';
