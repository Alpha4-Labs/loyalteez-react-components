// ============================================
// @loyalteez/react-components - Effects Module
// ============================================
// A hyper-rich effects layer for game-like UI experiences

// Types
export * from './types';

// Glow Effects
export {
  GlowEffect,
  PulseGlow,
  HeartbeatGlow,
  FlickerGlow,
  ReactiveGlow,
  LegendaryGlow,
  RainbowGlow,
} from './GlowEffect';

// Shimmer Effects
export {
  ShimmerEffect,
  MetallicShimmer,
  HolographicShimmer,
  GoldShimmer,
  DiamondShimmer,
  NeonShimmer,
  FireShimmer,
  FrostShimmer,
} from './ShimmerEffect';

// Particle Effects
export {
  ParticleEffect,
  CoinBurst,
  StarBurst,
  EmberEffect,
  SparkleEffect,
  ConfettiBurst,
  SnowEffect,
  HeartBurst,
} from './ParticleEffect';

// Shake Effects
export {
  ShakeEffect,
  ErrorShake,
  ImpactShake,
  VibrateEffect,
  EarthquakeEffect,
  useShake,
} from './ShakeEffect';

// Count Effects
export {
  CountEffect,
  SlotCounter,
  FlipCounter,
  CascadeCounter,
  ScrambleCounter,
  useCountUp,
} from './CountEffect';

// Tone System
export {
  ToneProvider,
  useTone,
  useRewardEffect,
  useMilestoneEffect,
  useErrorEffect,
  TONES,
} from './ToneProvider';
export type { ToneId, ToneConfig, ToneProviderProps } from './ToneProvider';
