import type { ReactNode, CSSProperties } from 'react';

// ============================================
// Core Effect Types
// ============================================

export type EffectIntensity = 'subtle' | 'normal' | 'intense' | 'extreme';
export type EffectSpeed = 'slow' | 'normal' | 'fast' | 'instant';

export interface BaseEffectProps {
  /** Enable/disable the effect */
  active?: boolean;
  /** Intensity level */
  intensity?: EffectIntensity;
  /** Animation speed */
  speed?: EffectSpeed;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Children to wrap */
  children?: ReactNode;
}

// ============================================
// Glow Effect
// ============================================

export type GlowColor =
  | 'cyan'
  | 'purple'
  | 'pink'
  | 'green'
  | 'gold'
  | 'red'
  | 'blue'
  | 'white'
  | 'rainbow';

export type GlowPattern =
  | 'static' // Constant glow
  | 'pulse' // Breathing in/out
  | 'heartbeat' // Quick double pulse
  | 'flicker' // Candle-like
  | 'wave' // Traveling wave
  | 'reactive'; // Responds to hover/interaction

export interface GlowEffectProps extends BaseEffectProps {
  /** Glow color */
  color?: GlowColor;
  /** Glow pattern/animation */
  pattern?: GlowPattern;
  /** Blur radius in pixels */
  blur?: number;
  /** Spread radius */
  spread?: number;
  /** Show inner glow as well */
  innerGlow?: boolean;
}

// ============================================
// Shimmer Effect
// ============================================

export type ShimmerStyle =
  | 'metallic' // Chrome/silver sweep
  | 'holographic' // Rainbow prismatic
  | 'gold' // Warm gold sweep
  | 'frost' // Ice/cold blue
  | 'fire' // Orange/red sweep
  | 'neon' // Bright neon trail
  | 'diamond'; // Sparkle points

export type ShimmerDirection =
  | 'left-right'
  | 'right-left'
  | 'top-bottom'
  | 'bottom-top'
  | 'diagonal'
  | 'radial';

export interface ShimmerEffectProps extends BaseEffectProps {
  /** Shimmer visual style */
  variant?: ShimmerStyle;
  /** Direction of shimmer travel */
  direction?: ShimmerDirection;
  /** Delay between shimmer passes */
  delay?: number;
  /** Duration of each pass */
  duration?: number;
  /** Trigger mode */
  trigger?: 'auto' | 'hover' | 'manual';
}

// ============================================
// Particle Effect
// ============================================

export type ParticleShape =
  | 'circle'
  | 'square'
  | 'star'
  | 'coin'
  | 'heart'
  | 'spark'
  | 'ember'
  | 'snow'
  | 'confetti'
  | 'custom';

export type ParticleMotion =
  | 'rise' // Float upward
  | 'fall' // Fall down (gravity)
  | 'burst' // Explode outward
  | 'orbit' // Circle around
  | 'swirl' // Spiral motion
  | 'drift' // Gentle random drift
  | 'fountain' // Up then fall
  | 'attract'; // Move toward center

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  shape: ParticleShape;
  life: number;
  maxLife: number;
  gravity: number;
}

export interface ParticleEffectProps extends BaseEffectProps {
  /** Particle shape */
  shape?: ParticleShape;
  /** Motion pattern */
  motion?: ParticleMotion;
  /** Number of particles */
  count?: number;
  /** Particle colors */
  colors?: string[];
  /** Size range [min, max] */
  sizeRange?: [number, number];
  /** Particle lifespan in ms */
  lifetime?: number;
  /** Origin point {x: 0-1, y: 0-1} */
  origin?: { x: number; y: number };
  /** Continuous emission vs one-shot */
  continuous?: boolean;
  /** Emit rate (particles per second) */
  emitRate?: number;
  /** Custom particle render function */
  renderParticle?: (particle: Particle) => ReactNode;
  /** Callback when effect completes (non-continuous) */
  onComplete?: () => void;
}

// ============================================
// Shake Effect
// ============================================

export type ShakePattern =
  | 'horizontal' // Left-right shake
  | 'vertical' // Up-down shake
  | 'rotational' // Rotation wobble
  | 'random' // Chaotic shake
  | 'impact' // Single impact shake
  | 'vibrate' // Rapid small shake
  | 'earthquake'; // Large dramatic shake

export interface ShakeEffectProps extends BaseEffectProps {
  /** Shake pattern */
  pattern?: ShakePattern;
  /** Duration in ms */
  duration?: number;
  /** Max displacement in pixels */
  magnitude?: number;
  /** Number of shakes */
  count?: number;
  /** Trigger the shake */
  trigger?: boolean;
  /** Callback when shake completes */
  onComplete?: () => void;
}

// ============================================
// Count Effect (Slot Machine / Dramatic Reveal)
// ============================================

export type CountStyle =
  | 'simple' // Basic count
  | 'slot' // Slot machine roll
  | 'flip' // Flip card digits
  | 'cascade' // Digits cascade in
  | 'scramble' // Random then settle
  | 'typewriter'; // One digit at a time

export interface CountEffectProps extends BaseEffectProps {
  /** Target value */
  value: number;
  /** Starting value */
  from?: number;
  /** Count style */
  variant?: CountStyle;
  /** Duration in ms */
  duration?: number;
  /** Format function */
  format?: (value: number) => string;
  /** Easing function */
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'bounce' | 'overshoot';
  /** Callback when count completes */
  onComplete?: () => void;
  /** Show + prefix on increase */
  showDelta?: boolean;
}

// ============================================
// Combo Effect (Chain multiple effects)
// ============================================

export interface ComboEffectProps {
  children: ReactNode;
  effects: Array<{
    type: 'glow' | 'shimmer' | 'shake' | 'particles';
    props: GlowEffectProps | ShimmerEffectProps | ShakeEffectProps | ParticleEffectProps;
    delay?: number;
  }>;
  trigger?: boolean;
}

// ============================================
// Effect Presets
// ============================================

export interface EffectPreset {
  name: string;
  glow?: GlowEffectProps;
  shimmer?: ShimmerEffectProps;
  particles?: ParticleEffectProps;
  shake?: ShakeEffectProps;
}

export const EFFECT_PRESETS: Record<string, EffectPreset> = {
  // Reward moments
  coinCollect: {
    name: 'Coin Collect',
    particles: { shape: 'coin', motion: 'rise', count: 15, colors: ['#FFD700', '#FFA500'] },
    shimmer: { variant: 'gold', duration: 500 },
  },
  levelUp: {
    name: 'Level Up',
    glow: { color: 'gold', pattern: 'pulse', intensity: 'intense' },
    particles: { shape: 'star', motion: 'burst', count: 30 },
    shake: { pattern: 'impact', magnitude: 5 },
  },
  milestone: {
    name: 'Milestone',
    glow: { color: 'purple', pattern: 'heartbeat' },
    particles: { shape: 'confetti', motion: 'fountain', count: 50 },
  },
  streak: {
    name: 'Streak',
    particles: {
      shape: 'ember',
      motion: 'rise',
      count: 20,
      colors: ['#FF4500', '#FF6B35', '#FFD700'],
    },
    glow: { color: 'red', pattern: 'flicker' },
  },

  // UI feedback
  success: {
    name: 'Success',
    glow: { color: 'green', pattern: 'pulse', intensity: 'normal' },
    shimmer: { variant: 'metallic' },
  },
  error: {
    name: 'Error',
    shake: { pattern: 'horizontal', magnitude: 8, count: 3 },
    glow: { color: 'red', pattern: 'pulse' },
  },
  warning: {
    name: 'Warning',
    glow: { color: 'gold', pattern: 'pulse' },
  },

  // Rarity tiers
  common: {
    name: 'Common',
    glow: { color: 'white', pattern: 'static', intensity: 'subtle' },
  },
  rare: {
    name: 'Rare',
    glow: { color: 'blue', pattern: 'pulse' },
    shimmer: { variant: 'frost' },
  },
  epic: {
    name: 'Epic',
    glow: { color: 'purple', pattern: 'pulse', intensity: 'intense' },
    shimmer: { variant: 'holographic' },
  },
  legendary: {
    name: 'Legendary',
    glow: { color: 'gold', pattern: 'wave', intensity: 'extreme' },
    shimmer: { variant: 'holographic', direction: 'radial' },
    particles: { shape: 'star', motion: 'orbit', count: 5, continuous: true },
  },
  mythic: {
    name: 'Mythic',
    glow: { color: 'rainbow', pattern: 'wave', intensity: 'extreme' },
    shimmer: { variant: 'diamond' },
    particles: { shape: 'spark', motion: 'swirl', count: 10, continuous: true },
  },
} as const;

// ============================================
// Color Palettes
// ============================================

export const GLOW_COLORS: Record<GlowColor, string> = {
  cyan: '0 224 255',
  purple: '108 51 234',
  pink: '255 63 164',
  green: '166 255 0',
  gold: '255 215 0',
  red: '255 59 48',
  blue: '0 122 255',
  white: '255 255 255',
  rainbow: '0 0 0', // Handled specially
};

export const PARTICLE_COLORS = {
  gold: ['#FFD700', '#FFA500', '#DAA520', '#F0E68C'],
  fire: ['#FF4500', '#FF6B35', '#FFD700', '#FF8C00'],
  ice: ['#00CED1', '#87CEEB', '#ADD8E6', '#E0FFFF'],
  neon: ['#00E0FF', '#6C33EA', '#FF3FA4', '#A6FF00'],
  rainbow: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
  confetti: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'],
};
