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
        ltz: {
          primary: 'rgb(var(--ltz-primary) / <alpha-value>)',
          'primary-dark': 'rgb(var(--ltz-primary-dark) / <alpha-value>)',
          secondary: 'rgb(var(--ltz-secondary) / <alpha-value>)',
          accent: 'rgb(var(--ltz-accent) / <alpha-value>)',
          tier: {
            bronze: 'var(--ltz-tier-bronze)',
            silver: 'var(--ltz-tier-silver)',
            gold: 'var(--ltz-tier-gold)',
            platinum: 'var(--ltz-tier-platinum)',
          },
          bg: {
            primary: 'rgb(var(--ltz-bg-primary) / <alpha-value>)',
            secondary: 'rgb(var(--ltz-bg-secondary) / <alpha-value>)',
            tertiary: 'rgb(var(--ltz-bg-tertiary) / <alpha-value>)',
          },
          text: {
            primary: 'rgb(var(--ltz-text-primary) / <alpha-value>)',
            secondary: 'rgb(var(--ltz-text-secondary) / <alpha-value>)',
            muted: 'rgb(var(--ltz-text-muted) / <alpha-value>)',
          },
          border: 'rgb(var(--ltz-border) / <alpha-value>)',
        },
      },
      borderRadius: {
        ltz: 'var(--ltz-radius)',
      },
      animation: {
        'ltz-fade-in': 'ltz-fade-in var(--ltz-duration) var(--ltz-easing)',
        'ltz-slide-in-right': 'ltz-slide-in-right var(--ltz-duration) var(--ltz-easing)',
        'ltz-slide-in-up': 'ltz-slide-in-up var(--ltz-duration) var(--ltz-easing)',
        'ltz-count-up': 'ltz-count-up 0.3s ease-out',
        'ltz-progress-fill': 'ltz-progress-fill 1s var(--ltz-easing) forwards',
        'ltz-pulse-glow': 'ltz-pulse-glow 2s ease-in-out infinite',
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
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgb(var(--ltz-primary) / 0.4)',
          },
          '50%': {
            boxShadow: '0 0 0 8px rgb(var(--ltz-primary) / 0)',
          },
        },
      },
    },
  },
};

export default loyalteezPreset;

