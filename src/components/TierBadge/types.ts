import type { HTMLAttributes, ReactNode } from 'react';

export type TierLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
export type TierBadgeSize = 'sm' | 'md' | 'lg';

export interface TierBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The tier level to display
   */
  tier: TierLevel;

  /**
   * Size of the badge
   * @default 'md'
   */
  size?: TierBadgeSize;

  /**
   * Show tier label text
   * @default true
   */
  showLabel?: boolean;

  /**
   * Custom label override
   */
  label?: string;

  /**
   * Custom icon to display
   */
  icon?: ReactNode;

  /**
   * Enable animated glow effect
   * @default false
   */
  animated?: boolean;

  /**
   * Enable hover shine effect
   * @default false
   */
  showShine?: boolean;
}

export interface TierConfig {
  label: string;
  color: string;
  gradient: string;
  glow: string;
  textColor: string;
}

export const TIER_CONFIG: Record<TierLevel, TierConfig> = {
  bronze: {
    label: 'Bronze',
    color: '#cd7f32',
    gradient: 'linear-gradient(135deg, #cd7f32 0%, #8b4513 100%)',
    glow: '0 0 15px rgba(205, 127, 50, 0.4)',
    textColor: 'white',
  },
  silver: {
    label: 'Silver',
    color: '#c0c0c0',
    gradient: 'linear-gradient(135deg, #e8e8e8 0%, #a8a8a8 100%)',
    glow: '0 0 15px rgba(192, 192, 192, 0.4)',
    textColor: '#333333',
  },
  gold: {
    label: 'Gold',
    color: '#ffd700',
    gradient: 'linear-gradient(135deg, #ffd700 0%, #daa520 100%)',
    glow: '0 0 20px rgba(255, 215, 0, 0.5)',
    textColor: '#333333',
  },
  platinum: {
    label: 'Platinum',
    color: '#e5e4e2',
    gradient: 'linear-gradient(135deg, #e5e4e2 0%, #a0a0a0 100%)',
    glow: '0 0 20px rgba(229, 228, 226, 0.5)',
    textColor: '#333333',
  },
  diamond: {
    label: 'Diamond',
    color: '#b9f2ff',
    gradient: 'linear-gradient(135deg, #b9f2ff 0%, #7dd3fc 100%)',
    glow: '0 0 25px rgba(185, 242, 255, 0.6)',
    textColor: '#0c4a6e',
  },
};
