import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { GlowEffect, PulseGlow, HeartbeatGlow, FlickerGlow, RainbowGlow, LegendaryGlow } from './GlowEffect';
import { ShimmerEffect, MetallicShimmer, HolographicShimmer, GoldShimmer, DiamondShimmer } from './ShimmerEffect';
import { ParticleEffect, CoinBurst, StarBurst, ConfettiBurst, EmberEffect, SparkleEffect, SnowEffect, HeartBurst } from './ParticleEffect';
import { ShakeEffect, HorizontalShake, ImpactShake, ErrorShake } from './ShakeEffect';
import { CountEffect, SlotCounter, FlipCounter, CascadeCounter, ScrambleCounter } from './CountEffect';
import { ToneProvider, useTone, TONES, type ToneId } from './ToneProvider';
import { useEffectCombo } from './useEffectCombo';
import { EffectLayer } from './EffectLayer';
import { EnhancedPerkCard } from './enhanced/EnhancedPerkCard';
import { EnhancedBalanceDisplay } from './enhanced/EnhancedBalanceDisplay';
import { useEnhancedToast, EnhancedToastProvider } from './enhanced/EnhancedRewardToast';

// ============================================
// Glow Effect Stories
// ============================================

const GlowMeta: Meta<typeof GlowEffect> = {
  title: 'Effects/GlowEffect',
  component: GlowEffect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-8 bg-ltz-bg-primary min-h-[200px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    color: {
      control: 'select',
      options: ['cyan', 'purple', 'pink', 'green', 'gold', 'red', 'blue', 'white', 'rainbow'],
    },
    pattern: {
      control: 'select',
      options: ['static', 'pulse', 'heartbeat', 'flicker', 'wave', 'reactive'],
    },
    intensity: {
      control: 'select',
      options: ['subtle', 'normal', 'intense', 'extreme'],
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast', 'instant'],
    },
    active: { control: 'boolean' },
    innerGlow: { control: 'boolean' },
  },
};

export default GlowMeta;
type GlowStory = StoryObj<typeof GlowEffect>;

const DemoCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-ltz-bg-secondary border border-ltz-border rounded-xl p-6 ${className || ''}`}>
    {children}
  </div>
);

export const GlowColors: GlowStory = {
  name: 'Glow - All Colors',
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {(['cyan', 'purple', 'pink', 'green', 'gold', 'red', 'blue', 'white', 'rainbow'] as const).map((color) => (
        <GlowEffect key={color} active color={color} pattern="pulse" intensity="normal">
          <DemoCard>
            <p className="text-ltz-text-primary font-bold capitalize">{color}</p>
          </DemoCard>
        </GlowEffect>
      ))}
    </div>
  ),
};

export const GlowPatterns: GlowStory = {
  name: 'Glow - All Patterns',
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {(['static', 'pulse', 'heartbeat', 'flicker', 'wave', 'reactive'] as const).map((pattern) => (
        <GlowEffect key={pattern} active color="cyan" pattern={pattern} intensity="normal">
          <DemoCard>
            <p className="text-ltz-text-primary font-bold capitalize">{pattern}</p>
            {pattern === 'reactive' && (
              <p className="text-xs text-ltz-text-secondary mt-1">Hover me!</p>
            )}
          </DemoCard>
        </GlowEffect>
      ))}
    </div>
  ),
};

export const GlowIntensities: GlowStory = {
  name: 'Glow - Intensities',
  render: () => (
    <div className="flex gap-6">
      {(['subtle', 'normal', 'intense', 'extreme'] as const).map((intensity) => (
        <GlowEffect key={intensity} active color="purple" pattern="pulse" intensity={intensity}>
          <DemoCard>
            <p className="text-ltz-text-primary font-bold capitalize">{intensity}</p>
          </DemoCard>
        </GlowEffect>
      ))}
    </div>
  ),
};

export const LegendaryGlowDemo: GlowStory = {
  name: 'Glow - Legendary',
  render: () => (
    <LegendaryGlow>
      <DemoCard className="min-w-[200px] text-center">
        <p className="text-2xl mb-2">✨</p>
        <p className="text-ltz-text-primary font-bold">Legendary Item</p>
        <p className="text-xs text-ltz-text-secondary">Extreme gold wave with inner glow</p>
      </DemoCard>
    </LegendaryGlow>
  ),
};

export const RainbowGlowDemo: GlowStory = {
  name: 'Glow - Rainbow',
  render: () => (
    <RainbowGlow pattern="wave" intensity="extreme">
      <DemoCard className="min-w-[200px] text-center">
        <p className="text-2xl mb-2">🌈</p>
        <p className="text-ltz-text-primary font-bold">Mythic Reward</p>
        <p className="text-xs text-ltz-text-secondary">Animated rainbow hue shift</p>
      </DemoCard>
    </RainbowGlow>
  ),
};

// ============================================
// Shimmer Effect Stories
// ============================================

export const ShimmerVariants: GlowStory = {
  name: 'Shimmer - All Variants',
  render: () => (
    <div className="grid grid-cols-4 gap-6">
      {(['metallic', 'holographic', 'gold', 'frost', 'fire', 'neon', 'diamond'] as const).map((variant) => (
        <ShimmerEffect key={variant} active variant={variant} intensity="normal" trigger="auto">
          <DemoCard>
            <p className="text-ltz-text-primary font-bold capitalize">{variant}</p>
          </DemoCard>
        </ShimmerEffect>
      ))}
    </div>
  ),
};

export const ShimmerHover: GlowStory = {
  name: 'Shimmer - Hover Trigger',
  render: () => (
    <div className="flex gap-6">
      <MetallicShimmer active trigger="hover" intensity="intense">
        <DemoCard className="min-w-[150px] text-center cursor-pointer">
          <p className="text-ltz-text-primary font-bold">Hover Me</p>
          <p className="text-xs text-ltz-text-secondary">Metallic shimmer on hover</p>
        </DemoCard>
      </MetallicShimmer>
      <HolographicShimmer active trigger="hover" intensity="intense">
        <DemoCard className="min-w-[150px] text-center cursor-pointer">
          <p className="text-ltz-text-primary font-bold">Hover Me</p>
          <p className="text-xs text-ltz-text-secondary">Holographic shimmer on hover</p>
        </DemoCard>
      </HolographicShimmer>
    </div>
  ),
};

// ============================================
// Particle Effect Stories
// ============================================

export const ParticleShapes: GlowStory = {
  name: 'Particles - All Shapes',
  render: function ParticleShapesStory() {
    const [activeShape, setActiveShape] = useState<string | null>(null);
    const shapes = ['circle', 'square', 'star', 'coin', 'heart', 'spark', 'ember', 'snow', 'confetti'] as const;

    return (
      <div className="grid grid-cols-3 gap-6">
        {shapes.map((shape) => (
          <div key={shape} className="relative">
            <ParticleEffect
              active={activeShape === shape}
              shape={shape}
              motion="burst"
              count={25}
              intensity="normal"
            >
              <DemoCard
                className="cursor-pointer text-center"
                onClick={() => setActiveShape(shape)}
              >
                <p className="text-ltz-text-primary font-bold capitalize">{shape}</p>
                <p className="text-xs text-ltz-text-secondary">Click to trigger</p>
              </DemoCard>
            </ParticleEffect>
          </div>
        ))}
      </div>
    );
  },
};

export const ParticleMotions: GlowStory = {
  name: 'Particles - All Motions',
  render: function ParticleMotionsStory() {
    const [activeMotion, setActiveMotion] = useState<string | null>(null);
    const motions = ['rise', 'fall', 'burst', 'orbit', 'swirl', 'drift', 'fountain', 'attract'] as const;

    return (
      <div className="grid grid-cols-4 gap-6">
        {motions.map((motion) => (
          <div key={motion} className="relative">
            <ParticleEffect
              active={activeMotion === motion}
              shape="star"
              motion={motion}
              count={20}
              intensity="normal"
              onComplete={() => setActiveMotion(null)}
            >
              <DemoCard
                className="cursor-pointer text-center"
                onClick={() => setActiveMotion(motion)}
              >
                <p className="text-ltz-text-primary font-bold capitalize">{motion}</p>
                <p className="text-xs text-ltz-text-secondary">Click to trigger</p>
              </DemoCard>
            </ParticleEffect>
          </div>
        ))}
      </div>
    );
  },
};

export const CoinBurstDemo: GlowStory = {
  name: 'Particles - Coin Burst',
  render: function CoinBurstDemo() {
    const [active, setActive] = useState(false);

    return (
      <CoinBurst active={active} count={30} intensity="intense" onComplete={() => setActive(false)}>
        <button
          onClick={() => setActive(true)}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform"
        >
          🪙 Collect Coins!
        </button>
      </CoinBurst>
    );
  },
};

export const ConfettiDemo: GlowStory = {
  name: 'Particles - Confetti',
  render: function ConfettiDemo() {
    const [active, setActive] = useState(false);

    return (
      <ConfettiBurst active={active} intensity="extreme" onComplete={() => setActive(false)}>
        <button
          onClick={() => setActive(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform"
        >
          🎉 Celebrate!
        </button>
      </ConfettiBurst>
    );
  },
};

export const ContinuousParticles: GlowStory = {
  name: 'Particles - Continuous',
  render: () => (
    <div className="flex gap-8">
      <EmberEffect active continuous emitRate={8}>
        <DemoCard className="min-w-[120px] text-center">
          <p className="text-2xl">🔥</p>
          <p className="text-ltz-text-primary font-bold">Embers</p>
        </DemoCard>
      </EmberEffect>
      <SparkleEffect active continuous emitRate={5}>
        <DemoCard className="min-w-[120px] text-center">
          <p className="text-2xl">✨</p>
          <p className="text-ltz-text-primary font-bold">Sparkles</p>
        </DemoCard>
      </SparkleEffect>
      <SnowEffect active continuous emitRate={10}>
        <DemoCard className="min-w-[120px] text-center">
          <p className="text-2xl">❄️</p>
          <p className="text-ltz-text-primary font-bold">Snow</p>
        </DemoCard>
      </SnowEffect>
    </div>
  ),
};

// ============================================
// Shake Effect Stories
// ============================================

export const ShakePatterns: GlowStory = {
  name: 'Shake - All Patterns',
  render: function ShakePatternsStory() {
    const [activePattern, setActivePattern] = useState<string | null>(null);
    const patterns = ['horizontal', 'vertical', 'rotational', 'random', 'impact', 'vibrate', 'earthquake'] as const;

    return (
      <div className="grid grid-cols-4 gap-6">
        {patterns.map((pattern) => (
          <ShakeEffect
            key={pattern}
            trigger={activePattern === pattern}
            pattern={pattern}
            intensity="normal"
            onComplete={() => setActivePattern(null)}
          >
            <DemoCard
              className="cursor-pointer text-center"
              onClick={() => setActivePattern(pattern)}
            >
              <p className="text-ltz-text-primary font-bold capitalize">{pattern}</p>
              <p className="text-xs text-ltz-text-secondary">Click to shake</p>
            </DemoCard>
          </ShakeEffect>
        ))}
      </div>
    );
  },
};

export const ErrorShakeDemo: GlowStory = {
  name: 'Shake - Error Feedback',
  render: function ErrorShakeDemo() {
    const [hasError, setHasError] = useState(false);

    return (
      <ErrorShake trigger={hasError} onComplete={() => setHasError(false)}>
        <GlowEffect active={hasError} color="red" pattern="pulse">
          <DemoCard className="text-center">
            <input
              type="text"
              placeholder="Enter something..."
              className="bg-ltz-bg-tertiary border border-ltz-border rounded-lg px-4 py-2 text-ltz-text-primary mb-3 w-full"
            />
            <button
              onClick={() => setHasError(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Trigger Error
            </button>
          </DemoCard>
        </GlowEffect>
      </ErrorShake>
    );
  },
};

// ============================================
// Count Effect Stories
// ============================================

export const CountVariants: GlowStory = {
  name: 'Count - All Variants',
  render: function CountVariantsStory() {
    const [value, setValue] = useState(1000);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => prev + Math.floor(Math.random() * 500) + 100);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="grid grid-cols-3 gap-8">
        <DemoCard className="text-center">
          <p className="text-ltz-text-secondary text-sm mb-2">Simple</p>
          <CountEffect value={value} variant="simple" className="text-3xl font-bold text-ltz-text-primary" showDelta />
        </DemoCard>
        <DemoCard className="text-center">
          <p className="text-ltz-text-secondary text-sm mb-2">Slot Machine</p>
          <SlotCounter value={value} className="text-3xl font-bold text-ltz-text-primary" showDelta />
        </DemoCard>
        <DemoCard className="text-center">
          <p className="text-ltz-text-secondary text-sm mb-2">Flip</p>
          <FlipCounter value={value} className="text-3xl font-bold text-ltz-text-primary" showDelta />
        </DemoCard>
        <DemoCard className="text-center">
          <p className="text-ltz-text-secondary text-sm mb-2">Cascade</p>
          <CascadeCounter value={value} className="text-3xl font-bold text-ltz-text-primary" showDelta />
        </DemoCard>
        <DemoCard className="text-center">
          <p className="text-ltz-text-secondary text-sm mb-2">Scramble</p>
          <ScrambleCounter value={value} className="text-3xl font-bold text-ltz-text-primary" showDelta />
        </DemoCard>
        <DemoCard className="text-center">
          <p className="text-ltz-text-secondary text-sm mb-2">Typewriter</p>
          <CountEffect value={value} variant="typewriter" className="text-3xl font-bold text-ltz-text-primary" showDelta />
        </DemoCard>
      </div>
    );
  },
};

// ============================================
// Effect Combo Stories
// ============================================

export const EffectComboDemo: GlowStory = {
  name: 'Effect Combo - Presets',
  render: function EffectComboDemo() {
    const [trigger, setTrigger] = useState(false);
    const [preset, setPreset] = useState<string>('coinCollect');

    const { activeGlow, activeParticles, activeShake, glowProps, particleProps, shakeProps } = useEffectCombo({
      preset: preset as keyof typeof import('./types').EFFECT_PRESETS,
      trigger,
      onComplete: () => setTrigger(false),
    });

    return (
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-2 flex-wrap justify-center">
          {['coinCollect', 'levelUp', 'milestone', 'streak', 'success', 'error', 'legendary', 'mythic'].map((p) => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className={`px-3 py-1 rounded-lg text-sm ${
                preset === p
                  ? 'bg-ltz-cyan text-black'
                  : 'bg-ltz-bg-tertiary text-ltz-text-secondary hover:bg-ltz-bg-secondary'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <ShakeEffect trigger={activeShake} {...shakeProps}>
          <GlowEffect active={activeGlow} {...glowProps}>
            <ParticleEffect active={activeParticles} {...particleProps}>
              <DemoCard className="min-w-[200px] text-center">
                <p className="text-2xl mb-2">🎮</p>
                <p className="text-ltz-text-primary font-bold capitalize">{preset}</p>
              </DemoCard>
            </ParticleEffect>
          </GlowEffect>
        </ShakeEffect>

        <button
          onClick={() => setTrigger(true)}
          className="bg-ltz-purple text-white font-bold py-2 px-6 rounded-xl hover:bg-opacity-80 transition-colors"
        >
          Trigger Effect
        </button>
      </div>
    );
  },
};

// ============================================
// Tone System Stories
// ============================================

export const ToneShowcase: GlowStory = {
  name: 'Tone System - All Tones',
  render: function ToneShowcaseStory() {
    const [currentTone, setCurrentTone] = useState<ToneId>('default');

    return (
      <ToneProvider tone={currentTone}>
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 flex-wrap justify-center">
            {(Object.keys(TONES) as ToneId[]).map((toneId) => (
              <button
                key={toneId}
                onClick={() => setCurrentTone(toneId)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentTone === toneId
                    ? 'bg-ltz-cyan text-black'
                    : 'bg-ltz-bg-tertiary text-ltz-text-secondary hover:bg-ltz-bg-secondary'
                }`}
              >
                {TONES[toneId].name}
              </button>
            ))}
          </div>
          <TonePreview />
        </div>
      </ToneProvider>
    );
  },
};

function TonePreview() {
  const { tone, toneId } = useTone();
  const [trigger, setTrigger] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <DemoCard className="text-center min-w-[300px]" style={{ fontFamily: tone.typography.fontFamily }}>
        <h3 className="text-xl font-bold text-ltz-text-primary mb-2">{tone.name}</h3>
        <p className="text-sm text-ltz-text-secondary mb-4">{tone.description}</p>
        <div className="flex gap-2 justify-center">
          {Object.entries(tone.colors).slice(0, 5).map(([name, color]) => (
            <div
              key={name}
              className="w-8 h-8 rounded-full border border-ltz-border"
              style={{ backgroundColor: `rgb(${color})` }}
              title={name}
            />
          ))}
        </div>
      </DemoCard>

      <EffectLayer
        config={tone.rewardPreset}
        trigger={trigger}
        onComplete={() => setTrigger(false)}
      >
        <button
          onClick={() => setTrigger(true)}
          className="bg-ltz-purple text-white font-bold py-2 px-6 rounded-xl"
        >
          Test {toneId} Reward Effect
        </button>
      </EffectLayer>
    </div>
  );
}

// ============================================
// Enhanced Components Stories
// ============================================

export const EnhancedPerkCardDemo: GlowStory = {
  name: 'Enhanced - PerkCard',
  render: () => {
    const perks = [
      {
        id: '1',
        name: 'Common Perk',
        description: 'A basic reward',
        price: '100',
        image: 'https://placehold.co/200x200/1a1d2e/00e0ff?text=Common',
        tags: ['common'],
      },
      {
        id: '2',
        name: 'Rare Perk',
        description: 'A rare find',
        price: '500',
        image: 'https://placehold.co/200x200/1a1d2e/6c33ea?text=Rare',
        tags: ['rare'],
      },
      {
        id: '3',
        name: 'Epic Perk',
        description: 'Epic tier reward',
        price: '2000',
        image: 'https://placehold.co/200x200/1a1d2e/ff3fa4?text=Epic',
        tags: ['epic'],
        isPremium: true,
      },
      {
        id: '4',
        name: 'Legendary Perk',
        description: 'Legendary exclusives',
        price: '10000',
        image: 'https://placehold.co/200x200/1a1d2e/ffd700?text=Legend',
        tags: ['legendary'],
        isFeatured: true,
      },
    ];

    return (
      <div className="grid grid-cols-4 gap-6">
        {perks.map((perk) => (
          <EnhancedPerkCard
            key={perk.id}
            perk={perk}
            enableEffects
            hoverEffects
          />
        ))}
      </div>
    );
  },
};

export const EnhancedBalanceDisplayDemo: GlowStory = {
  name: 'Enhanced - BalanceDisplay',
  render: function EnhancedBalanceDisplayDemo() {
    const [balance, setBalance] = useState(5000);

    const addBalance = (amount: number) => {
      setBalance((prev) => prev + amount);
    };

    return (
      <div className="flex flex-col items-center gap-6">
        <EnhancedBalanceDisplay
          balance={balance}
          size="lg"
          enableEffects
          showMilestoneEffects
          milestoneThreshold={1000}
        />

        <div className="flex gap-4">
          <button
            onClick={() => addBalance(100)}
            className="bg-ltz-bg-tertiary text-ltz-text-primary px-4 py-2 rounded-lg hover:bg-ltz-bg-secondary"
          >
            +100 LTZ
          </button>
          <button
            onClick={() => addBalance(500)}
            className="bg-ltz-cyan text-black px-4 py-2 rounded-lg hover:bg-opacity-80"
          >
            +500 LTZ
          </button>
          <button
            onClick={() => addBalance(1000)}
            className="bg-ltz-purple text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
          >
            +1000 LTZ (Milestone!)
          </button>
        </div>
      </div>
    );
  },
};

export const EnhancedToastDemo: GlowStory = {
  name: 'Enhanced - Toast Notifications',
  render: function EnhancedToastDemo() {
    return (
      <EnhancedToastProvider>
        <ToastDemoContent />
      </EnhancedToastProvider>
    );
  },
};

function ToastDemoContent() {
  const { showReward, showMilestone, showLevelUp, showStreak, showError } = useEnhancedToast();

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-ltz-text-secondary text-sm">Click buttons to show enhanced toasts</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => showReward({ title: 'Reward Claimed!', description: 'You earned 500 LTZ', amount: 500 })}
          className="bg-ltz-cyan text-black px-4 py-2 rounded-lg"
        >
          Reward Toast
        </button>
        <button
          onClick={() => showMilestone({ title: 'Milestone Reached!', description: '10,000 LTZ total earned' })}
          className="bg-ltz-gold text-black px-4 py-2 rounded-lg"
        >
          Milestone Toast
        </button>
        <button
          onClick={() => showLevelUp({ title: 'Level Up!', description: 'You are now Level 5' })}
          className="bg-ltz-purple text-white px-4 py-2 rounded-lg"
        >
          Level Up Toast
        </button>
        <button
          onClick={() => showStreak({ title: 'Streak!', description: '7 day streak achieved', streakCount: 7 })}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Streak Toast
        </button>
        <button
          onClick={() => showError({ title: 'Error', description: 'Something went wrong' })}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Error Toast
        </button>
      </div>
    </div>
  );
}

// ============================================
// Combined Effect Showcase
// ============================================

export const EffectShowcase: GlowStory = {
  name: 'Showcase - All Effects Combined',
  render: function EffectShowcase() {
    const [showReward, setShowReward] = useState(false);

    return (
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-ltz-text-primary">Effects Layer Showcase</h2>
        
        <div className="relative">
          {/* Background particles */}
          <ParticleEffect
            active={showReward}
            shape="confetti"
            motion="fountain"
            count={80}
            intensity="extreme"
            origin={{ x: 0.5, y: 0.8 }}
            onComplete={() => setShowReward(false)}
          >
            <ShakeEffect trigger={showReward} pattern="impact" intensity="normal">
              <GlowEffect active={showReward} color="gold" pattern="heartbeat" intensity="extreme" innerGlow>
                <ShimmerEffect active={showReward} variant="holographic" intensity="extreme">
                  <DemoCard className="min-w-[300px] text-center">
                    <p className="text-4xl mb-4">🏆</p>
                    <h3 className="text-2xl font-bold text-ltz-text-primary mb-2">Grand Prize!</h3>
                    <CountEffect
                      value={showReward ? 50000 : 0}
                      variant="slot"
                      intensity="extreme"
                      className="text-3xl font-bold ltz-text-gradient"
                      showDelta
                    />
                    <p className="text-ltz-text-secondary mt-2">LTZ Tokens</p>
                  </DemoCard>
                </ShimmerEffect>
              </GlowEffect>
            </ShakeEffect>
          </ParticleEffect>
        </div>

        <button
          onClick={() => setShowReward(true)}
          disabled={showReward}
          className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold py-3 px-8 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
        >
          {showReward ? 'Celebrating...' : '🎰 Spin to Win!'}
        </button>
      </div>
    );
  },
};

