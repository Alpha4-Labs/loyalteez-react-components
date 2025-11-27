import { defineConfig } from 'tsup';

// Single config with all entries to avoid parallel process issues on Windows
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    motion: 'src/motion/index.ts',
    'tailwind-preset': 'src/tailwind-preset.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  treeshake: true,
  clean: true,
  external: ['react', 'react-dom', 'framer-motion', 'tailwindcss'],
  esbuildOptions(options) {
    options.jsx = 'automatic';
    options.banner = {
      js: '"use client";',
    };
  },
});

