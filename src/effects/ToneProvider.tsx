'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { EffectPreset } from './types';

// ============================================
// Tone Definitions
// ============================================

export type ToneId =
  | 'default' // Balanced Loyalteez look
  | 'arcade' // Bright, bouncy, retro-game
  | 'casino' // Gold, luxury, high-stakes
  | 'cyberpunk' // Neon, glitch, dark
  | 'minimal' // Clean, subtle, professional
  | 'playful' // Rounded, colorful, fun
  | 'competitive' // Sports/esports energy
  | 'fantasy' // RPG, magical, mystical
  | 'scifi' // Futuristic, tech, sleek
  | 'retro'; // 80s/90s nostalgia

export interface ToneConfig {
  id: ToneId;
  name: string;
  description: string;

  // Color palette
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
  };

  // Effect settings
  effects: {
    glowIntensity: 'subtle' | 'normal' | 'intense' | 'extreme';
    shimmerStyle: 'metallic' | 'holographic' | 'gold' | 'neon' | 'frost' | 'fire';
    particleStyle: 'minimal' | 'normal' | 'rich' | 'explosive';
    animationSpeed: 'slow' | 'normal' | 'fast';
  };

  // Typography
  typography: {
    fontFamily: string;
    headingWeight: number;
    bodyWeight: number;
    rounded: boolean;
  };

  // Borders & Shadows
  borders: {
    radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
    width: number;
    style: 'solid' | 'dashed' | 'glow';
  };

  // Specific presets for reward moments
  rewardPreset: Partial<EffectPreset>;
  milestonePreset: Partial<EffectPreset>;
  errorPreset: Partial<EffectPreset>;
}

// ============================================
// Tone Presets
// ============================================

export const TONES: Record<ToneId, ToneConfig> = {
  default: {
    id: 'default',
    name: 'Loyalteez',
    description: 'The signature Loyalteez experience',
    colors: {
      primary: '0 224 255', // Cyan
      secondary: '108 51 234', // Purple
      accent: '255 63 164', // Pink
      success: '166 255 0', // Green
      warning: '255 215 0', // Gold
      error: '255 59 48', // Red
      background: '10 12 28',
      surface: '26 29 46',
      text: '255 255 255',
      textMuted: '140 140 153',
    },
    effects: {
      glowIntensity: 'normal',
      shimmerStyle: 'neon',
      particleStyle: 'normal',
      animationSpeed: 'normal',
    },
    typography: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      headingWeight: 700,
      bodyWeight: 400,
      rounded: false,
    },
    borders: {
      radius: 'lg',
      width: 1,
      style: 'solid',
    },
    rewardPreset: {
      glow: { color: 'cyan', pattern: 'pulse' },
      particles: { shape: 'coin', motion: 'rise' },
    },
    milestonePreset: {
      glow: { color: 'gold', pattern: 'heartbeat', intensity: 'intense' },
      particles: { shape: 'star', motion: 'burst' },
      shake: { pattern: 'impact' },
    },
    errorPreset: {
      shake: { pattern: 'horizontal' },
      glow: { color: 'red', pattern: 'pulse' },
    },
  },

  arcade: {
    id: 'arcade',
    name: 'Arcade',
    description: 'Bright, bouncy, retro-game vibes',
    colors: {
      primary: '255 215 0', // Gold
      secondary: '255 0 128', // Hot pink
      accent: '0 255 255', // Cyan
      success: '0 255 0', // Lime
      warning: '255 165 0', // Orange
      error: '255 0 0', // Red
      background: '16 16 32',
      surface: '32 32 64',
      text: '255 255 255',
      textMuted: '160 160 200',
    },
    effects: {
      glowIntensity: 'intense',
      shimmerStyle: 'holographic',
      particleStyle: 'rich',
      animationSpeed: 'fast',
    },
    typography: {
      fontFamily: '"Press Start 2P", monospace, system-ui',
      headingWeight: 700,
      bodyWeight: 400,
      rounded: false,
    },
    borders: {
      radius: 'sm',
      width: 3,
      style: 'solid',
    },
    rewardPreset: {
      glow: { color: 'gold', pattern: 'pulse', intensity: 'intense' },
      particles: { shape: 'star', motion: 'burst', count: 40 },
      shake: { pattern: 'impact', intensity: 'intense' },
    },
    milestonePreset: {
      glow: { color: 'rainbow', pattern: 'wave', intensity: 'extreme' },
      particles: { shape: 'confetti', motion: 'fountain', count: 80 },
      shake: { pattern: 'earthquake', intensity: 'intense' },
    },
    errorPreset: {
      shake: { pattern: 'vibrate', count: 3 },
      glow: { color: 'red', pattern: 'flicker' },
    },
  },

  casino: {
    id: 'casino',
    name: 'Casino',
    description: 'Luxury, gold, high-stakes glamour',
    colors: {
      primary: '255 215 0', // Gold
      secondary: '139 69 19', // Brown/bronze
      accent: '220 20 60', // Crimson
      success: '34 139 34', // Forest green
      warning: '255 165 0', // Orange
      error: '178 34 34', // Firebrick
      background: '15 10 5',
      surface: '35 25 15',
      text: '255 248 220', // Cornsilk
      textMuted: '189 183 107',
    },
    effects: {
      glowIntensity: 'intense',
      shimmerStyle: 'gold',
      particleStyle: 'rich',
      animationSpeed: 'normal',
    },
    typography: {
      fontFamily: '"Playfair Display", serif, system-ui',
      headingWeight: 700,
      bodyWeight: 400,
      rounded: false,
    },
    borders: {
      radius: 'md',
      width: 2,
      style: 'glow',
    },
    rewardPreset: {
      glow: { color: 'gold', pattern: 'pulse', intensity: 'extreme' },
      shimmer: { variant: 'gold' },
      particles: { shape: 'coin', motion: 'fountain', count: 50 },
    },
    milestonePreset: {
      glow: { color: 'gold', pattern: 'wave', intensity: 'extreme' },
      shimmer: { variant: 'diamond' },
      particles: { shape: 'star', motion: 'burst', count: 100 },
      shake: { pattern: 'impact', intensity: 'intense' },
    },
    errorPreset: {
      shake: { pattern: 'horizontal', intensity: 'subtle' },
    },
  },

  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon, glitch, dark future',
    colors: {
      primary: '0 255 255', // Cyan
      secondary: '255 0 255', // Magenta
      accent: '255 255 0', // Yellow
      success: '0 255 128', // Neon green
      warning: '255 128 0', // Orange
      error: '255 0 64', // Neon red
      background: '5 0 15',
      surface: '15 5 30',
      text: '255 255 255',
      textMuted: '128 128 192',
    },
    effects: {
      glowIntensity: 'extreme',
      shimmerStyle: 'neon',
      particleStyle: 'explosive',
      animationSpeed: 'fast',
    },
    typography: {
      fontFamily: '"Orbitron", "Rajdhani", sans-serif',
      headingWeight: 700,
      bodyWeight: 400,
      rounded: false,
    },
    borders: {
      radius: 'none',
      width: 1,
      style: 'glow',
    },
    rewardPreset: {
      glow: { color: 'cyan', pattern: 'flicker', intensity: 'extreme' },
      shimmer: { variant: 'neon' },
      particles: { shape: 'spark', motion: 'burst' },
    },
    milestonePreset: {
      glow: { color: 'rainbow', pattern: 'wave', intensity: 'extreme' },
      particles: { shape: 'spark', motion: 'swirl', count: 60 },
      shake: { pattern: 'random', intensity: 'intense' },
    },
    errorPreset: {
      shake: { pattern: 'vibrate', intensity: 'intense' },
      glow: { color: 'red', pattern: 'flicker', intensity: 'extreme' },
    },
  },

  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, subtle, professional',
    colors: {
      primary: '64 64 64',
      secondary: '96 96 96',
      accent: '0 122 255',
      success: '52 199 89',
      warning: '255 159 10',
      error: '255 59 48',
      background: '255 255 255',
      surface: '248 248 248',
      text: '0 0 0',
      textMuted: '128 128 128',
    },
    effects: {
      glowIntensity: 'subtle',
      shimmerStyle: 'metallic',
      particleStyle: 'minimal',
      animationSpeed: 'slow',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      headingWeight: 600,
      bodyWeight: 400,
      rounded: true,
    },
    borders: {
      radius: 'md',
      width: 1,
      style: 'solid',
    },
    rewardPreset: {
      glow: { color: 'blue', pattern: 'pulse', intensity: 'subtle' },
    },
    milestonePreset: {
      glow: { color: 'green', pattern: 'pulse', intensity: 'normal' },
      particles: { shape: 'circle', motion: 'rise', count: 10 },
    },
    errorPreset: {
      shake: { pattern: 'horizontal', intensity: 'subtle', count: 2 },
    },
  },

  playful: {
    id: 'playful',
    name: 'Playful',
    description: 'Rounded, colorful, fun',
    colors: {
      primary: '255 111 97', // Coral
      secondary: '78 205 196', // Teal
      accent: '255 209 102', // Yellow
      success: '119 221 119', // Pastel green
      warning: '255 179 71', // Orange
      error: '255 105 97', // Red
      background: '254 249 243',
      surface: '255 255 255',
      text: '51 51 51',
      textMuted: '128 128 128',
    },
    effects: {
      glowIntensity: 'normal',
      shimmerStyle: 'holographic',
      particleStyle: 'rich',
      animationSpeed: 'normal',
    },
    typography: {
      fontFamily: '"Nunito", "Poppins", sans-serif',
      headingWeight: 700,
      bodyWeight: 400,
      rounded: true,
    },
    borders: {
      radius: 'full',
      width: 2,
      style: 'solid',
    },
    rewardPreset: {
      glow: { color: 'pink', pattern: 'heartbeat' },
      particles: { shape: 'heart', motion: 'fountain', count: 25 },
    },
    milestonePreset: {
      particles: { shape: 'confetti', motion: 'fountain', count: 60 },
      shake: { pattern: 'impact', intensity: 'normal' },
    },
    errorPreset: {
      shake: { pattern: 'rotational', intensity: 'subtle' },
    },
  },

  competitive: {
    id: 'competitive',
    name: 'Competitive',
    description: 'Sports/esports intensity',
    colors: {
      primary: '255 59 48', // Red
      secondary: '0 122 255', // Blue
      accent: '255 215 0', // Gold
      success: '52 199 89',
      warning: '255 159 10',
      error: '255 59 48',
      background: '18 18 18',
      surface: '28 28 30',
      text: '255 255 255',
      textMuted: '142 142 147',
    },
    effects: {
      glowIntensity: 'intense',
      shimmerStyle: 'metallic',
      particleStyle: 'explosive',
      animationSpeed: 'fast',
    },
    typography: {
      fontFamily: '"Bebas Neue", "Oswald", sans-serif',
      headingWeight: 700,
      bodyWeight: 400,
      rounded: false,
    },
    borders: {
      radius: 'sm',
      width: 2,
      style: 'solid',
    },
    rewardPreset: {
      glow: { color: 'gold', pattern: 'pulse', intensity: 'intense' },
      shake: { pattern: 'impact' },
      particles: { shape: 'star', motion: 'burst', count: 30 },
    },
    milestonePreset: {
      glow: { color: 'gold', pattern: 'wave', intensity: 'extreme' },
      shake: { pattern: 'earthquake', intensity: 'intense' },
      particles: { shape: 'confetti', motion: 'fountain', count: 80 },
    },
    errorPreset: {
      shake: { pattern: 'horizontal', intensity: 'intense' },
      glow: { color: 'red', pattern: 'flicker' },
    },
  },

  fantasy: {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical, mystical RPG vibes',
    colors: {
      primary: '138 43 226', // Purple
      secondary: '255 215 0', // Gold
      accent: '0 191 255', // Deep sky blue
      success: '50 205 50', // Lime green
      warning: '255 165 0',
      error: '220 20 60', // Crimson
      background: '15 10 25',
      surface: '25 20 40',
      text: '255 250 240',
      textMuted: '176 156 192',
    },
    effects: {
      glowIntensity: 'intense',
      shimmerStyle: 'holographic',
      particleStyle: 'rich',
      animationSpeed: 'normal',
    },
    typography: {
      fontFamily: '"Cinzel", "Uncial Antiqua", serif',
      headingWeight: 700,
      bodyWeight: 400,
      rounded: false,
    },
    borders: {
      radius: 'lg',
      width: 2,
      style: 'glow',
    },
    rewardPreset: {
      glow: { color: 'purple', pattern: 'pulse' },
      shimmer: { variant: 'holographic' },
      particles: { shape: 'spark', motion: 'swirl' },
    },
    milestonePreset: {
      glow: { color: 'gold', pattern: 'wave', intensity: 'extreme' },
      particles: { shape: 'star', motion: 'orbit', count: 40, continuous: true },
    },
    errorPreset: {
      glow: { color: 'red', pattern: 'flicker' },
      shake: { pattern: 'rotational' },
    },
  },

  scifi: {
    id: 'scifi',
    name: 'Sci-Fi',
    description: 'Futuristic, tech, sleek',
    colors: {
      primary: '0 200 255',
      secondary: '100 100 255',
      accent: '255 100 100',
      success: '0 255 150',
      warning: '255 200 0',
      error: '255 50 50',
      background: '5 10 20',
      surface: '15 25 40',
      text: '200 220 255',
      textMuted: '100 120 160',
    },
    effects: {
      glowIntensity: 'intense',
      shimmerStyle: 'frost',
      particleStyle: 'normal',
      animationSpeed: 'normal',
    },
    typography: {
      fontFamily: '"Exo 2", "Rajdhani", sans-serif',
      headingWeight: 600,
      bodyWeight: 400,
      rounded: false,
    },
    borders: {
      radius: 'sm',
      width: 1,
      style: 'glow',
    },
    rewardPreset: {
      glow: { color: 'cyan', pattern: 'pulse' },
      shimmer: { variant: 'frost' },
      particles: { shape: 'spark', motion: 'rise' },
    },
    milestonePreset: {
      glow: { color: 'blue', pattern: 'wave', intensity: 'extreme' },
      particles: { shape: 'circle', motion: 'burst' },
    },
    errorPreset: {
      glow: { color: 'red', pattern: 'flicker' },
      shake: { pattern: 'vibrate' },
    },
  },

  retro: {
    id: 'retro',
    name: 'Retro',
    description: '80s/90s nostalgia',
    colors: {
      primary: '255 0 128', // Hot pink
      secondary: '0 255 255', // Cyan
      accent: '255 255 0', // Yellow
      success: '0 255 0', // Lime
      warning: '255 165 0',
      error: '255 0 0',
      background: '20 0 40',
      surface: '40 10 60',
      text: '255 255 255',
      textMuted: '200 150 220',
    },
    effects: {
      glowIntensity: 'extreme',
      shimmerStyle: 'neon',
      particleStyle: 'rich',
      animationSpeed: 'normal',
    },
    typography: {
      fontFamily: '"VT323", "Courier New", monospace',
      headingWeight: 700,
      bodyWeight: 400,
      rounded: false,
    },
    borders: {
      radius: 'none',
      width: 3,
      style: 'glow',
    },
    rewardPreset: {
      glow: { color: 'pink', pattern: 'pulse', intensity: 'extreme' },
      shimmer: { variant: 'neon' },
      particles: { shape: 'star', motion: 'burst' },
    },
    milestonePreset: {
      glow: { color: 'rainbow', pattern: 'wave', intensity: 'extreme' },
      particles: { shape: 'confetti', motion: 'fountain', count: 80 },
      shake: { pattern: 'impact' },
    },
    errorPreset: {
      glow: { color: 'red', pattern: 'flicker', intensity: 'extreme' },
      shake: { pattern: 'vibrate' },
    },
  },
};

// ============================================
// Context
// ============================================

interface ToneContextValue {
  tone: ToneConfig;
  toneId: ToneId;
  setTone: (id: ToneId) => void;
}

const ToneContext = createContext<ToneContextValue | null>(null);

// ============================================
// Provider
// ============================================

export interface ToneProviderProps {
  children: ReactNode;
  tone?: ToneId;
  customTone?: Partial<ToneConfig>;
}

export function ToneProvider({
  children,
  tone: initialTone = 'default',
  customTone,
}: ToneProviderProps) {
  const [toneId, setToneId] = useState<ToneId>(initialTone);

  const tone = useMemo(() => {
    const baseTone = TONES[toneId];
    if (customTone) {
      return {
        ...baseTone,
        ...customTone,
        colors: { ...baseTone.colors, ...customTone.colors },
        effects: { ...baseTone.effects, ...customTone.effects },
        typography: { ...baseTone.typography, ...customTone.typography },
        borders: { ...baseTone.borders, ...customTone.borders },
      };
    }
    return baseTone;
  }, [toneId, customTone]);

  // Generate CSS variables
  const cssVariables = useMemo(() => {
    const vars: Record<string, string> = {};

    // Colors
    Object.entries(tone.colors).forEach(([key, colorValue]) => {
      vars[`--ltz-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = colorValue as string;
    });

    // Typography
    vars['--ltz-font-family'] = tone.typography.fontFamily;
    vars['--ltz-heading-weight'] = String(tone.typography.headingWeight);
    vars['--ltz-body-weight'] = String(tone.typography.bodyWeight);

    // Borders
    const radiusMap: Record<string, string> = {
      none: '0',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px',
    };
    vars['--ltz-radius'] = radiusMap[tone.borders.radius] || '0.75rem';
    vars['--ltz-border-width'] = `${tone.borders.width}px`;

    return vars;
  }, [tone]);

  const value = useMemo(
    () => ({
      tone,
      toneId,
      setTone: setToneId,
    }),
    [tone, toneId]
  );

  return (
    <ToneContext.Provider value={value}>
      <div style={cssVariables as React.CSSProperties}>{children}</div>
    </ToneContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export function useTone() {
  const context = useContext(ToneContext);
  if (!context) {
    // Return default if not in provider
    return {
      tone: TONES.default,
      toneId: 'default' as ToneId,
      setTone: () => {},
    };
  }
  return context;
}

// ============================================
// Utility: Get effect preset for current tone
// ============================================

export function useRewardEffect() {
  const { tone } = useTone();
  return tone.rewardPreset;
}

export function useMilestoneEffect() {
  const { tone } = useTone();
  return tone.milestonePreset;
}

export function useErrorEffect() {
  const { tone } = useTone();
  return tone.errorPreset;
}
