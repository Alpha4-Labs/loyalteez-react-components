'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import type { BalanceDisplayProps } from '@/components/BalanceDisplay/types';
import { GlowEffect } from '../GlowEffect';
import { ParticleEffect } from '../ParticleEffect';
import { ShakeEffect } from '../ShakeEffect';
import { CountEffect } from '../CountEffect';
import type { GlowEffectProps, ParticleEffectProps, CountStyle } from '../types';

// ============================================
// Types
// ============================================

export interface EnhancedBalanceDisplayProps extends Omit<BalanceDisplayProps, 'animated'> {
  /** Enable dramatic count animation */
  dramaticCount?: boolean;

  /** Count animation style */
  countStyle?: CountStyle;

  /** Show glow on balance increase */
  glowOnIncrease?: boolean;

  /** Show particles on balance increase */
  particlesOnIncrease?: boolean;

  /** Show shake on balance decrease */
  shakeOnDecrease?: boolean;

  /** Glow configuration */
  glow?: GlowEffectProps;

  /** Particle configuration */
  particles?: ParticleEffectProps;

  /** Callback when balance changes */
  onBalanceChange?: (delta: number) => void;

  /** Threshold for "big" balance changes (triggers extra effects) */
  bigChangeThreshold?: number;
}

// ============================================
// Component
// ============================================

/**
 * BalanceDisplay with built-in effects for balance changes.
 * Shows celebratory effects on increases and shake on decreases.
 *
 * @example
 * // Basic with effects
 * <EnhancedBalanceDisplay
 *   balance={balance}
 *   glowOnIncrease
 *   particlesOnIncrease
 *   dramaticCount
 * />
 *
 * @example
 * // Slot machine reveal for big rewards
 * <EnhancedBalanceDisplay
 *   balance={jackpot}
 *   countStyle="slot"
 *   dramaticCount
 *   particlesOnIncrease
 *   bigChangeThreshold={1000}
 * />
 */
export const EnhancedBalanceDisplay = forwardRef<HTMLDivElement, EnhancedBalanceDisplayProps>(
  (
    {
      balance,
      dramaticCount = false,
      countStyle = 'simple',
      glowOnIncrease = false,
      particlesOnIncrease = false,
      shakeOnDecrease = false,
      glow,
      particles,
      onBalanceChange,
      bigChangeThreshold = 500,
      className,
      ...balanceProps
    },
    ref
  ) => {
    const prevBalanceRef = useRef(balance);
    const [showGlow, setShowGlow] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const [showShake, setShowShake] = useState(false);
    const [displayBalance, setDisplayBalance] = useState(balance);
    const [isBigChange, setIsBigChange] = useState(false);

    // Track balance changes
    useEffect(() => {
      const delta = balance - prevBalanceRef.current;

      if (delta !== 0) {
        onBalanceChange?.(delta);
        setIsBigChange(Math.abs(delta) >= bigChangeThreshold);

        if (delta > 0) {
          // Balance increased
          if (glowOnIncrease) {
            setShowGlow(true);
            setTimeout(() => setShowGlow(false), 2000);
          }
          if (particlesOnIncrease) {
            setShowParticles(true);
          }
        } else {
          // Balance decreased
          if (shakeOnDecrease) {
            setShowShake(true);
          }
        }
      }

      // Update for non-dramatic mode
      if (!dramaticCount) {
        setDisplayBalance(balance);
      }

      prevBalanceRef.current = balance;
    }, [balance, glowOnIncrease, particlesOnIncrease, shakeOnDecrease, bigChangeThreshold, dramaticCount, onBalanceChange]);

    // Glow props
    const glowProps: GlowEffectProps = {
      color: isBigChange ? 'gold' : 'cyan',
      pattern: isBigChange ? 'heartbeat' : 'pulse',
      intensity: isBigChange ? 'intense' : 'normal',
      ...glow,
    };

    // Particle props
    const particleProps: ParticleEffectProps = {
      shape: 'coin',
      motion: isBigChange ? 'burst' : 'rise',
      count: isBigChange ? 30 : 15,
      colors: ['#FFD700', '#FFA500', '#DAA520'],
      ...particles,
    };

    // Content
    let content = (
      <BalanceDisplay
        ref={ref}
        balance={dramaticCount ? displayBalance : balance}
        animated={!dramaticCount}
        className={className}
        {...balanceProps}
      />
    );

    // Wrap with dramatic count if enabled
    if (dramaticCount) {
      content = (
        <CountEffect
          value={balance}
          from={prevBalanceRef.current}
          variant={countStyle}
          intensity={isBigChange ? 'extreme' : 'normal'}
          showDelta
          onComplete={() => setDisplayBalance(balance)}
        >
          {content}
        </CountEffect>
      );
    }

    // Wrap with shake
    if (shakeOnDecrease) {
      content = (
        <ShakeEffect
          trigger={showShake}
          pattern="horizontal"
          intensity={isBigChange ? 'intense' : 'normal'}
          onComplete={() => setShowShake(false)}
        >
          {content}
        </ShakeEffect>
      );
    }

    // Wrap with particles
    if (particlesOnIncrease) {
      content = (
        <ParticleEffect
          {...particleProps}
          active={showParticles}
          onComplete={() => setShowParticles(false)}
        >
          {content}
        </ParticleEffect>
      );
    }

    // Wrap with glow
    if (glowOnIncrease) {
      content = (
        <GlowEffect {...glowProps} active={showGlow}>
          {content}
        </GlowEffect>
      );
    }

    return content;
  }
);

EnhancedBalanceDisplay.displayName = 'EnhancedBalanceDisplay';

// ============================================
// Convenience Variants
// ============================================

/** Balance display with all effects enabled */
export const CelebratoryBalanceDisplay = forwardRef<
  HTMLDivElement,
  Omit<EnhancedBalanceDisplayProps, 'glowOnIncrease' | 'particlesOnIncrease' | 'shakeOnDecrease'>
>((props, ref) => (
  <EnhancedBalanceDisplay
    ref={ref}
    glowOnIncrease
    particlesOnIncrease
    shakeOnDecrease
    dramaticCount
    {...props}
  />
));
CelebratoryBalanceDisplay.displayName = 'CelebratoryBalanceDisplay';

/** Balance display with slot machine reveal */
export const JackpotBalanceDisplay = forwardRef<
  HTMLDivElement,
  Omit<EnhancedBalanceDisplayProps, 'countStyle' | 'dramaticCount'>
>((props, ref) => (
  <EnhancedBalanceDisplay
    ref={ref}
    countStyle="slot"
    dramaticCount
    glowOnIncrease
    particlesOnIncrease
    bigChangeThreshold={100}
    glow={{ color: 'gold', pattern: 'wave', intensity: 'extreme' }}
    particles={{ shape: 'star', motion: 'burst', count: 50 }}
    {...props}
  />
));
JackpotBalanceDisplay.displayName = 'JackpotBalanceDisplay';

