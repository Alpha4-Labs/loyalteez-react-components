export interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'square' | 'circle' | 'ribbon';
  opacity: number;
  gravity: number;
}

export interface ConfettiExplosionProps {
  /**
   * Whether the confetti is active
   */
  active: boolean;

  /**
   * Number of particles
   * @default 100
   */
  particleCount?: number;

  /**
   * Explosion origin (relative to viewport)
   * @default { x: 0.5, y: 0.5 }
   */
  origin?: { x: number; y: number };

  /**
   * Custom colors array
   * @default Loyalteez brand colors
   */
  colors?: string[];

  /**
   * Duration in ms
   * @default 3000
   */
  duration?: number;

  /**
   * Spread angle in degrees
   * @default 360
   */
  spread?: number;

  /**
   * Initial velocity
   * @default 25
   */
  velocity?: number;

  /**
   * Gravity strength
   * @default 0.5
   */
  gravity?: number;

  /**
   * Particle size range [min, max]
   * @default [5, 15]
   */
  sizeRange?: [number, number];

  /**
   * Z-index of canvas
   * @default 9999
   */
  zIndex?: number;

  /**
   * Called when animation completes
   */
  onComplete?: () => void;
}

export interface UseConfettiReturn {
  fire: (options?: Partial<ConfettiExplosionProps>) => void;
  isActive: boolean;
}

// Default colors - Loyalteez brand
export const DEFAULT_COLORS = [
  '#00E0FF', // cyan
  '#6C33EA', // purple
  '#FF3FA4', // pink
  '#A6FF00', // green
  '#FFD700', // gold
  '#FF6B6B', // coral
  '#4ECDC4', // teal
];
