import { defineConfig } from 'tsup';

export default defineConfig([
  // Main entry
  {
    entry: {
      index: 'src/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: true,
    treeshake: true,
    clean: true,
    external: ['react', 'react-dom', 'framer-motion'],
    esbuildOptions(options) {
      options.jsx = 'automatic';
      // Add banner via esbuild directly (doesn't trigger rollup warning)
      options.banner = {
        js: '"use client";',
      };
    },
  },
  // Motion entry (optional Framer Motion enhanced components)
  {
    entry: {
      motion: 'src/motion/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    treeshake: true,
    external: ['react', 'react-dom', 'framer-motion'],
    esbuildOptions(options) {
      options.jsx = 'automatic';
      options.banner = {
        js: '"use client";',
      };
    },
  },
  // Tailwind preset
  {
    entry: {
      'tailwind-preset': 'src/tailwind-preset.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    external: ['tailwindcss'],
  },
]);

