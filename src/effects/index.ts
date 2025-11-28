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
  CoinRain,
  StarBurst,
  EmberEffect,
  SparkleEffect,
  ConfettiBurst,
  SnowEffect,
  HeartBurst,
  CelebrationBurst,
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

// Effect Combo Hook
export {
  useEffectCombo,
  useCoinCollectEffect,
  useLevelUpEffect,
  useMilestoneEffect as useMilestoneComboEffect,
  useStreakEffect,
  useSuccessEffect,
  useErrorEffect as useErrorComboEffect,
  useLegendaryEffect,
} from './useEffectCombo';
export type {
  EffectComboConfig,
  EffectComboState,
  UseEffectComboReturn,
} from './useEffectCombo';

// Effect Layer Component
export {
  EffectLayer,
  LegendaryEffectLayer,
  EpicEffectLayer,
  RareEffectLayer,
  RewardEffectLayer,
  MilestoneEffectLayer,
  SuccessEffectLayer,
  ErrorEffectLayer,
} from './EffectLayer';
export type { EffectLayerProps } from './EffectLayer';

// Enhanced Components (with built-in effects)
export {
  EnhancedPerkCard,
  LegendaryPerkCard,
  EpicPerkCard,
  RarePerkCard,
  EnhancedBalanceDisplay,
  CelebratoryBalanceDisplay,
  JackpotBalanceDisplay,
  EnhancedToastProvider,
  useEnhancedToast,
} from './enhanced';
export type {
  EnhancedPerkCardProps,
  PerkRarity,
  EnhancedBalanceDisplayProps,
  EnhancedToast,
  EnhancedToastOptions,
  EnhancedRewardOptions,
  EnhancedToastContextValue,
  EnhancedToastProviderProps,
} from './enhanced';
