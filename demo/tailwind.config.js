import loyalteezPreset from '../src/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [loyalteezPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};

