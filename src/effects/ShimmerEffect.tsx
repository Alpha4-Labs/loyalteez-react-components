'use client';

import { forwardRef, useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import type { ShimmerEffectProps, ShimmerStyle, ShimmerDirection, EffectIntensity } from './types';

// Enhanced shimmer gradient definitions - more holographic/prismatic
const SHIMMER_GRADIENTS: Record<ShimmerStyle, string> = {
  metallic: `linear-gradient(
    105deg,
    transparent 0%,
    transparent 35%,
    rgba(255, 255, 255, 0.1) 40%,
    rgba(255, 255, 255, 0.4) 45%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0.4) 55%,
    rgba(255, 255, 255, 0.1) 60%,
    transparent 65%,
    transparent 100%
  )`,
  holographic: `linear-gradient(
    105deg,
    transparent 0%,
    transparent 30%,
    rgba(255, 0, 128, 0.4) 35%,
    rgba(255, 0, 255, 0.6) 38%,
    rgba(128, 0, 255, 0.8) 42%,
    rgba(0, 128, 255, 1) 46%,
    rgba(0, 255, 255, 1) 50%,
    rgba(0, 255, 128, 1) 54%,
    rgba(128, 255, 0, 0.8) 58%,
    rgba(255, 255, 0, 0.6) 62%,
    rgba(255, 128, 0, 0.4) 65%,
    transparent 70%,
    transparent 100%
  )`,
  gold: `linear-gradient(
    105deg,
    transparent 0%,
    transparent 35%,
    rgba(255, 180, 0, 0.2) 40%,
    rgba(255, 215, 0, 0.6) 45%,
    rgba(255, 255, 180, 1) 50%,
    rgba(255, 215, 0, 0.6) 55%,
    rgba(255, 180, 0, 0.2) 60%,
    transparent 65%,
    transparent 100%
  )`,
  frost: `linear-gradient(
    105deg,
    transparent 0%,
    transparent 35%,
    rgba(180, 220, 255, 0.3) 40%,
    rgba(200, 240, 255, 0.7) 45%,
    rgba(255, 255, 255, 1) 50%,
    rgba(200, 240, 255, 0.7) 55%,
    rgba(180, 220, 255, 0.3) 60%,
    transparent 65%,
    transparent 100%
  )`,
  fire: `linear-gradient(
    105deg,
    transparent 0%,
    transparent 30%,
    rgba(255, 0, 0, 0.3) 35%,
    rgba(255, 80, 0, 0.6) 40%,
    rgba(255, 150, 0, 0.9) 45%,
    rgba(255, 255, 100, 1) 50%,
    rgba(255, 150, 0, 0.9) 55%,
    rgba(255, 80, 0, 0.6) 60%,
    rgba(255, 0, 0, 0.3) 65%,
    transparent 70%,
    transparent 100%
  )`,
  neon: `linear-gradient(
    105deg,
    transparent 0%,
    transparent 30%,
    rgba(0, 255, 255, 0.4) 35%,
    rgba(0, 200, 255, 0.8) 40%,
    rgba(128, 0, 255, 1) 47%,
    rgba(255, 0, 255, 1) 50%,
    rgba(255, 0, 128, 1) 53%,
    rgba(255, 100, 100, 0.8) 60%,
    rgba(255, 150, 100, 0.4) 65%,
    transparent 70%,
    transparent 100%
  )`,
  diamond: `
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, transparent 8%),
    radial-gradient(circle at 70% 25%, rgba(200,220,255,0.9) 0%, transparent 6%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 10%),
    radial-gradient(circle at 20% 70%, rgba(255,220,255,0.85) 0%, transparent 5%),
    radial-gradient(circle at 80% 65%, rgba(220,255,255,0.9) 0%, transparent 7%),
    radial-gradient(circle at 40% 80%, rgba(255,255,220,0.8) 0%, transparent 4%),
    radial-gradient(circle at 60% 15%, rgba(255,200,255,0.7) 0%, transparent 6%)
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
  subtle: 0.5,
  normal: 0.8,
  intense: 1,
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
      zIndex: 10,
    };

    const shimmerInnerStyle: React.CSSProperties = {
      position: 'absolute',
      inset: isDiamond ? 0 : '-100%',
      width: isDiamond ? '100%' : '300%',
      height: '100%',
      background: SHIMMER_GRADIENTS[variant],
      backgroundSize: isDiamond ? '100% 100%' : '100% 100%',
      transform: DIRECTION_TRANSFORMS[direction],
      opacity: shouldAnimate ? opacity : 0,
      transition: shouldAnimate ? 'none' : `opacity ${baseDuration / 4}ms ease-out`,
      animation:
        shouldAnimate && !isDiamond
          ? `shimmer-sweep-${variant} ${baseDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : shouldAnimate && isDiamond
            ? `shimmer-sparkle ${baseDuration}ms ease-in-out`
            : 'none',
      // Using normal blend mode for consistent visibility on all backgrounds
    };

    // Secondary shimmer for extra depth (holographic effect)
    const showSecondaryShimmer = variant === 'holographic' || variant === 'neon' || variant === 'diamond';
    const shimmerSecondaryStyle: React.CSSProperties = {
      position: 'absolute',
      inset: '-100%',
      width: '300%',
      height: '100%',
      background: variant === 'holographic' 
        ? `linear-gradient(
            -15deg,
            transparent 0%,
            transparent 40%,
            rgba(255,255,255,0.1) 45%,
            rgba(255,255,255,0.4) 50%,
            rgba(255,255,255,0.1) 55%,
            transparent 60%,
            transparent 100%
          )`
        : SHIMMER_GRADIENTS[variant],
      opacity: shouldAnimate ? opacity * 0.5 : 0,
      animation: shouldAnimate
        ? `shimmer-sweep-secondary ${baseDuration * 1.5}ms cubic-bezier(0.4, 0, 0.2, 1) ${baseDuration * 0.2}ms`
        : 'none',
      // Using normal blend for secondary shimmer
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
            @keyframes shimmer-sweep-metallic {
              0% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(-100%); }
              100% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(100%); }
            }
            @keyframes shimmer-sweep-holographic {
              0% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(-100%) skewX(-5deg); }
              100% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(100%) skewX(-5deg); }
            }
            @keyframes shimmer-sweep-gold {
              0% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(-100%); }
              100% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(100%); }
            }
            @keyframes shimmer-sweep-frost {
              0% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(-100%); }
              100% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(100%); }
            }
            @keyframes shimmer-sweep-fire {
              0% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(-100%); }
              100% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(100%); }
            }
            @keyframes shimmer-sweep-neon {
              0% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(-100%) skewX(-8deg); }
              100% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(100%) skewX(-8deg); }
            }
            @keyframes shimmer-sweep-diamond {
              0% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(-100%); }
              100% { transform: ${DIRECTION_TRANSFORMS[direction]} translateX(100%); }
            }
            @keyframes shimmer-sweep-secondary {
              0% { transform: translateX(-100%) skewX(15deg); }
              100% { transform: translateX(100%) skewX(15deg); }
            }
            @keyframes shimmer-sparkle {
              0%, 100% { opacity: 0; transform: scale(1); }
              50% { opacity: ${opacity}; transform: scale(1.02); }
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
            {showSecondaryShimmer && <div style={shimmerSecondaryStyle} />}
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
