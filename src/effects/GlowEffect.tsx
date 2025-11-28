'use client';

import { forwardRef, useMemo } from 'react';
import { cn } from '@/utils/cn';
import type { GlowEffectProps, GlowPattern, EffectIntensity } from './types';
import { GLOW_COLORS } from './types';

// Animation keyframes (injected via style tag) - enhanced for more impact
const GLOW_KEYFRAMES = `
@keyframes ltz-glow-pulse {
  0%, 100% { 
    opacity: var(--glow-min-opacity); 
    filter: blur(0px);
  }
  50% { 
    opacity: var(--glow-max-opacity); 
    filter: blur(2px);
  }
}

@keyframes ltz-glow-heartbeat {
  0%, 100% { 
    opacity: var(--glow-min-opacity); 
    transform: scale(1); 
  }
  14% { 
    opacity: var(--glow-max-opacity); 
    transform: scale(1.08); 
  }
  28% { 
    opacity: calc(var(--glow-min-opacity) * 1.2); 
    transform: scale(1); 
  }
  42% { 
    opacity: calc(var(--glow-max-opacity) * 0.9); 
    transform: scale(1.04); 
  }
  56% { 
    opacity: var(--glow-min-opacity); 
    transform: scale(1); 
  }
}

@keyframes ltz-glow-flicker {
  0%, 100% { opacity: var(--glow-max-opacity); filter: brightness(1); }
  10% { opacity: calc(var(--glow-max-opacity) * 0.7); filter: brightness(0.9); }
  20% { opacity: var(--glow-max-opacity); filter: brightness(1.1); }
  30% { opacity: calc(var(--glow-max-opacity) * 0.5); filter: brightness(0.8); }
  40% { opacity: var(--glow-max-opacity); filter: brightness(1.2); }
  50% { opacity: calc(var(--glow-max-opacity) * 0.85); filter: brightness(1); }
  60% { opacity: calc(var(--glow-max-opacity) * 0.6); filter: brightness(0.85); }
  70% { opacity: var(--glow-max-opacity); filter: brightness(1.15); }
  80% { opacity: calc(var(--glow-max-opacity) * 0.75); filter: brightness(0.95); }
  90% { opacity: var(--glow-max-opacity); filter: brightness(1.05); }
}

@keyframes ltz-glow-wave {
  0% { background-position: 200% center; filter: brightness(1); }
  50% { filter: brightness(1.2); }
  100% { background-position: -200% center; filter: brightness(1); }
}

@keyframes ltz-glow-rainbow {
  0% { filter: hue-rotate(0deg) saturate(1.2); }
  50% { filter: hue-rotate(180deg) saturate(1.5); }
  100% { filter: hue-rotate(360deg) saturate(1.2); }
}
`;

// Speed mappings
const SPEED_DURATIONS = {
  slow: 3000,
  normal: 1500,
  fast: 750,
  instant: 300,
} as const;

// Intensity mappings - enhanced for more dramatic effects
const INTENSITY_CONFIG: Record<
  EffectIntensity,
  { blur: number; spread: number; opacity: [number, number] }
> = {
  subtle: { blur: 12, spread: 4, opacity: [0.25, 0.5] },
  normal: { blur: 20, spread: 8, opacity: [0.4, 0.75] },
  intense: { blur: 35, spread: 15, opacity: [0.6, 0.95] },
  extreme: { blur: 50, spread: 20, opacity: [0.8, 1] },
};

// Pattern to animation mapping
const PATTERN_ANIMATIONS: Record<GlowPattern, string> = {
  static: 'none',
  pulse: 'ltz-glow-pulse',
  heartbeat: 'ltz-glow-heartbeat',
  flicker: 'ltz-glow-flicker',
  wave: 'ltz-glow-wave',
  reactive: 'none', // Handled via hover states
};

/**
 * A glowing effect wrapper that adds beautiful glow effects to any element.
 *
 * @example
 * // Basic pulsing glow
 * <GlowEffect color="cyan" pattern="pulse">
 *   <Card>Content</Card>
 * </GlowEffect>
 *
 * @example
 * // Intense gold heartbeat
 * <GlowEffect color="gold" pattern="heartbeat" intensity="intense">
 *   <Badge>Premium</Badge>
 * </GlowEffect>
 *
 * @example
 * // Rainbow legendary glow
 * <GlowEffect color="rainbow" pattern="wave" intensity="extreme" innerGlow>
 *   <PerkCard perk={legendaryPerk} />
 * </GlowEffect>
 */
export const GlowEffect = forwardRef<HTMLDivElement, GlowEffectProps>(
  (
    {
      active = true,
      color = 'cyan',
      pattern = 'pulse',
      intensity = 'normal',
      speed = 'normal',
      blur: customBlur,
      spread: customSpread,
      innerGlow = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Get configuration
    const intensityConfig = INTENSITY_CONFIG[intensity];
    const duration = SPEED_DURATIONS[speed];
    const animation = PATTERN_ANIMATIONS[pattern];

    const finalBlur = customBlur ?? intensityConfig.blur;
    const finalSpread = customSpread ?? intensityConfig.spread;

    // Build glow color
    const glowColorRgb = GLOW_COLORS[color];
    const isRainbow = color === 'rainbow';

    // Build styles
    const glowStyles = useMemo(() => {
      if (!active) return {};

      const [minOpacity, maxOpacity] = intensityConfig.opacity;

      // Base shadow
      const outerShadow = isRainbow
        ? `0 0 ${finalBlur}px ${finalSpread}px rgba(255, 0, 0, ${maxOpacity})`
        : `0 0 ${finalBlur}px ${finalSpread}px rgba(${glowColorRgb}, ${maxOpacity})`;

      const innerShadowValue = innerGlow
        ? isRainbow
          ? `, inset 0 0 ${finalBlur / 2}px ${finalSpread / 2}px rgba(255, 0, 0, ${maxOpacity * 0.5})`
          : `, inset 0 0 ${finalBlur / 2}px ${finalSpread / 2}px rgba(${glowColorRgb}, ${maxOpacity * 0.5})`
        : '';

      return {
        '--glow-min-opacity': minOpacity,
        '--glow-max-opacity': maxOpacity,
        '--glow-duration': `${duration}ms`,
        '--glow-color': isRainbow ? '255, 0, 0' : glowColorRgb,
        boxShadow: outerShadow + innerShadowValue,
        animation:
          animation !== 'none' ? `${animation} ${duration}ms ease-in-out infinite` : undefined,
        filter: isRainbow && pattern !== 'static' ? undefined : undefined,
      } as React.CSSProperties;
    }, [
      active,
      pattern,
      finalBlur,
      finalSpread,
      innerGlow,
      duration,
      animation,
      glowColorRgb,
      isRainbow,
      intensityConfig.opacity,
    ]);

    // Rainbow special handling
    const rainbowStyles = useMemo(() => {
      if (!active || !isRainbow) return {};

      return {
        animation: `ltz-glow-rainbow ${duration * 2}ms linear infinite`,
      } as React.CSSProperties;
    }, [active, isRainbow, duration]);

    // Reactive hover handling
    const reactiveClasses =
      pattern === 'reactive'
        ? 'transition-all duration-300 hover:shadow-[0_0_30px_10px_rgba(var(--glow-color),0.8)]'
        : '';

    return (
      <>
        {/* Inject keyframes */}
        <style dangerouslySetInnerHTML={{ __html: GLOW_KEYFRAMES }} />

        <div
          ref={ref}
          className={cn(
            'relative',
            active && 'will-change-[box-shadow,filter]',
            reactiveClasses,
            className
          )}
          style={{
            ...glowStyles,
            ...rainbowStyles,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

GlowEffect.displayName = 'GlowEffect';

// ============================================
// Convenience Components
// ============================================

export const PulseGlow = forwardRef<HTMLDivElement, Omit<GlowEffectProps, 'pattern'>>(
  (props, ref) => <GlowEffect ref={ref} pattern="pulse" {...props} />
);
PulseGlow.displayName = 'PulseGlow';

export const HeartbeatGlow = forwardRef<HTMLDivElement, Omit<GlowEffectProps, 'pattern'>>(
  (props, ref) => <GlowEffect ref={ref} pattern="heartbeat" {...props} />
);
HeartbeatGlow.displayName = 'HeartbeatGlow';

export const FlickerGlow = forwardRef<HTMLDivElement, Omit<GlowEffectProps, 'pattern'>>(
  (props, ref) => <GlowEffect ref={ref} pattern="flicker" {...props} />
);
FlickerGlow.displayName = 'FlickerGlow';

export const ReactiveGlow = forwardRef<HTMLDivElement, Omit<GlowEffectProps, 'pattern'>>(
  (props, ref) => <GlowEffect ref={ref} pattern="reactive" {...props} />
);
ReactiveGlow.displayName = 'ReactiveGlow';

export const LegendaryGlow = forwardRef<
  HTMLDivElement,
  Omit<GlowEffectProps, 'color' | 'pattern' | 'intensity'>
>((props, ref) => (
  <GlowEffect ref={ref} color="gold" pattern="wave" intensity="extreme" innerGlow {...props} />
));
LegendaryGlow.displayName = 'LegendaryGlow';

export const RainbowGlow = forwardRef<HTMLDivElement, Omit<GlowEffectProps, 'color'>>(
  (props, ref) => <GlowEffect ref={ref} color="rainbow" {...props} />
);
RainbowGlow.displayName = 'RainbowGlow';

// Re-export type for external use
export type { GlowColor } from './types';
