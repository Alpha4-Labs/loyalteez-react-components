import type { Config } from 'tailwindcss';

/**
 * Loyalteez Tailwind CSS preset.
 * Use this in your tailwind.config.js to get Loyalteez design tokens.
 *
 * @example
 * // tailwind.config.js
 * import { loyalteezPreset } from '@loyalteez/react-components/tailwind';
 *
 * export default {
 *   presets: [loyalteezPreset],
 *   content: ['./src/**\/*.{ts,tsx}'],
 * }
 */
export const loyalteezPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // Brand colors (can use with alpha: bg-ltz-cyan/50)
        ltz: {
          cyan: 'rgb(var(--ltz-cyan) / <alpha-value>)',
          purple: 'rgb(var(--ltz-purple) / <alpha-value>)',
          pink: 'rgb(var(--ltz-pink) / <alpha-value>)',
          green: 'rgb(var(--ltz-green) / <alpha-value>)',
          navy: 'rgb(var(--ltz-navy) / <alpha-value>)',
          // Semantic aliases
          primary: 'rgb(var(--ltz-purple) / <alpha-value>)',
          secondary: 'rgb(var(--ltz-cyan) / <alpha-value>)',
          accent: 'rgb(var(--ltz-pink) / <alpha-value>)',
          // Tier colors (no alpha - solid colors)
          tier: {
            bronze: 'var(--ltz-tier-bronze)',
            silver: 'var(--ltz-tier-silver)',
            gold: 'var(--ltz-tier-gold)',
            platinum: 'var(--ltz-tier-platinum)',
            diamond: 'var(--ltz-tier-diamond)',
          },
          // Background colors
          bg: {
            primary: 'rgb(var(--ltz-bg-primary) / <alpha-value>)',
            secondary: 'rgb(var(--ltz-bg-secondary) / <alpha-value>)',
            tertiary: 'rgb(var(--ltz-bg-tertiary) / <alpha-value>)',
          },
          // Text colors
          text: {
            primary: 'rgb(var(--ltz-text-primary) / <alpha-value>)',
            secondary: 'rgb(var(--ltz-text-secondary) / <alpha-value>)',
            muted: 'rgb(var(--ltz-text-muted) / <alpha-value>)',
          },
          // Border colors
          border: 'rgb(var(--ltz-border) / <alpha-value>)',
        },
        // Legacy brand colors (direct values for convenience)
        brand: {
          navy: '#0A0C1C',
          cyan: '#00E0FF',
          purple: '#6C33EA',
          pink: '#FF3FA4',
          green: '#A6FF00',
        },
      },
      borderRadius: {
        ltz: 'var(--ltz-radius)',
        'ltz-sm': 'var(--ltz-radius-sm)',
        'ltz-md': 'var(--ltz-radius-md)',
        'ltz-lg': 'var(--ltz-radius-lg)',
        'ltz-xl': 'var(--ltz-radius-xl)',
      },
      boxShadow: {
        'ltz-glow-cyan': 'var(--ltz-shadow-glow-cyan)',
        'ltz-glow-purple': 'var(--ltz-shadow-glow-purple)',
        'ltz-glow-pink': 'var(--ltz-shadow-glow-pink)',
      },
      animation: {
        'ltz-fade-in': 'ltz-fade-in 0.3s ease-out forwards',
        'ltz-slide-in-right': 'ltz-slide-in-right 0.4s ease-out forwards',
        'ltz-slide-in-up': 'ltz-slide-in-up 0.3s ease-out forwards',
        'ltz-count-up': 'ltz-count-up 0.3s ease-out',
        'ltz-progress-fill': 'ltz-progress-fill 1s ease-out forwards',
        'ltz-pulse-glow': 'ltz-pulse-glow 2s ease-in-out infinite',
        'ltz-shimmer': 'ltz-shimmer 1.5s infinite',
        'ltz-shine': 'ltz-shine 2s infinite',
        'ltz-float': 'ltz-float 3s ease-in-out infinite',
        'ltz-bounce-in': 'ltz-bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        'ltz-fade-in': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'ltz-slide-in-right': {
          from: { opacity: '0', transform: 'translateX(100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'ltz-slide-in-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'ltz-count-up': {
          from: { opacity: '0.5' },
          to: { opacity: '1' },
        },
        'ltz-progress-fill': {
          from: { width: '0%' },
        },
        'ltz-pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(var(--ltz-purple) / 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgb(var(--ltz-purple) / 0)' },
        },
        'ltz-shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'ltz-shine': {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(200%) rotate(45deg)' },
        },
        'ltz-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'ltz-bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
};

export default loyalteezPreset;
