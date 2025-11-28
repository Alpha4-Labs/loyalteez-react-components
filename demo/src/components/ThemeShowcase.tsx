import { useState, useEffect } from 'react';
import { useTone, TONES, type ToneId } from '../../../src/effects/ToneProvider';
import { GlowEffect } from '../../../src/effects/GlowEffect';
import { ShimmerEffect } from '../../../src/effects/ShimmerEffect';
import { ParticleEffect } from '../../../src/effects/ParticleEffect';
import { ShakeEffect } from '../../../src/effects/ShakeEffect';
import { CountEffect } from '../../../src/effects/CountEffect';
import { EnhancedPerkCard } from '../../../src/effects/enhanced/EnhancedPerkCard';
import { EnhancedBalanceDisplay } from '../../../src/effects/enhanced/EnhancedBalanceDisplay';
import {
  EnhancedToastProvider,
  useEnhancedToast,
} from '../../../src/effects/enhanced/EnhancedRewardToast';
import { BalanceDisplay } from '../../../src/components/BalanceDisplay';
import { PerkCard } from '../../../src/components/PerkCard';
import { StreakCounter } from '../../../src/components/StreakCounter';
import { ChallengeCard } from '../../../src/components/ChallengeCard';
import { EnhancedLeaderboard } from '../../../src/effects/enhanced/EnhancedLeaderboard';
import { EnhancedProgressBar } from '../../../src/effects/enhanced/EnhancedProgressBar';
import { ProgressBar } from '../../../src/components/ProgressBar';

interface ThemeShowcaseProps {
  toneId: ToneId;
}

// Sample data
const SAMPLE_PERKS = [
  {
    id: '1',
    name: 'Free Coffee',
    description: 'Enjoy a complimentary coffee at any participating location',
    price: 500,
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
    tags: ['common', 'food'],
  },
  {
    id: '2',
    name: 'Concert Tickets',
    description: 'VIP access to exclusive live events',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=200&fit=crop',
    tags: ['rare', 'entertainment'],
  },
  {
    id: '3',
    name: 'Limited Merch',
    description: 'Exclusive limited edition merchandise drop',
    price: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=200&fit=crop',
    tags: ['epic', 'exclusive'],
    isPremium: true,
  },
  {
    id: '4',
    name: 'VIP Experience',
    description: 'Once-in-a-lifetime backstage experience',
    price: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop',
    tags: ['legendary', 'vip'],
    isFeatured: true,
  },
];

const LEADERBOARD_DATA = [
  { id: '1', rank: 1, name: 'CryptoKing', score: 125000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto' },
  { id: '2', rank: 2, name: 'TokenQueen', score: 98500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=token' },
  { id: '3', rank: 3, name: 'Web3Wizard', score: 87200, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wizard' },
  { id: '4', rank: 4, name: 'NFTNinja', score: 76400, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninja' },
  { id: '5', rank: 5, name: 'DeFiDragon', score: 65100, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dragon' },
];

export function ThemeShowcase({ toneId }: ThemeShowcaseProps) {
  const { tone } = useTone();
  const toneConfig = TONES[toneId];

  return (
    <EnhancedToastProvider>
      <div
        className="tab-content space-y-12"
        style={{ fontFamily: tone.typography.fontFamily }}
      >
        {/* Theme Info */}
        <section className="rounded-2xl border border-white/10 bg-[rgb(20,23,38)] p-6">
          <div className="flex items-start gap-6">
            <div
              className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl text-4xl"
              style={{
                background: `linear-gradient(135deg, rgb(${tone.colors.primary}), rgb(${tone.colors.secondary}))`,
              }}
            >
              {getThemeEmoji(toneId)}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">{toneConfig.name}</h2>
              <p className="mt-1 text-lg text-gray-400">{toneConfig.description}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {Object.entries(tone.colors)
                  .slice(0, 6)
                  .map(([name, color]) => (
                    <div key={name} className="flex items-center gap-2">
                      <div
                        className="h-6 w-6 rounded-full border border-white/20"
                        style={{ backgroundColor: `rgb(${color})` }}
                      />
                      <span className="text-xs text-gray-400">{name}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Effects Demo */}
        <section>
          <SectionHeader
            title="Effects Layer"
            description="Interactive visual effects that bring your UI to life"
          />
          <EffectsDemo />
        </section>

        {/* Balance Display */}
        <section>
          <SectionHeader
            title="Balance Display"
            description="Animated point balance with milestone celebrations"
          />
          <BalanceDemo />
        </section>

        {/* Progress Bars */}
        <section>
          <SectionHeader
            title="Progress Bars"
            description="Visual progress indicators with multiple styles"
          />
          <ProgressBarsDemo />
        </section>

        {/* Perk Cards */}
        <section>
          <SectionHeader
            title="Perk Cards"
            description="Rarity-based effects automatically applied"
          />
          <PerkCardsDemo />
        </section>

        {/* Gamification Components */}
        <section>
          <SectionHeader
            title="Gamification"
            description="Streak counters, challenges, and leaderboards"
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-6">
              <StreakCounter
                streak={7}
                bestStreak={14}
                showMilestones
                showMessage
              />
              <ChallengeCard
                challenge={{
                  id: '1',
                  title: 'Weekly Champion',
                  description: 'Complete 5 activities this week',
                  progress: 3,
                  goal: 5,
                  status: 'active',
                  difficulty: 'medium',
                  reward: { amount: 500, type: 'LTZ' },
                  endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                }}
              />
            </div>
            <div className="lg:col-span-2">
              <EnhancedLeaderboard
                entries={LEADERBOARD_DATA}
                currentUserId="42"
                themed
                header={<h4 className="text-lg font-bold text-white">Top Earners</h4>}
              />
            </div>
          </div>
        </section>

        {/* Toast Demo */}
        <section>
          <SectionHeader
            title="Toast Notifications"
            description="Enhanced toasts with particle effects"
          />
          <ToastDemo />
        </section>

        {/* Effect Combos */}
        <section>
          <SectionHeader
            title="Effect Presets"
            description="Pre-configured effect combinations for common scenarios"
          />
          <EffectPresetsDemo />
        </section>
      </div>
    </EnhancedToastProvider>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function EffectsDemo() {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const { tone } = useTone();

  const effects = [
    { id: 'glow-pulse', label: 'Pulse Glow', color: 'cyan' },
    { id: 'glow-heartbeat', label: 'Heartbeat', color: 'gold' },
    { id: 'shimmer-holo', label: 'Holographic', color: 'purple' },
    { id: 'shimmer-gold', label: 'Gold Shimmer', color: 'gold' },
    { id: 'particles-stars', label: 'Star Burst', color: 'cyan' },
    { id: 'particles-coins', label: 'Coin Rain', color: 'gold' },
    { id: 'shake-impact', label: 'Impact', color: 'red' },
    { id: 'shake-vibrate', label: 'Vibrate', color: 'purple' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {effects.map((effect) => (
        <EffectButton
          key={effect.id}
          effect={effect}
          isActive={activeEffect === effect.id}
          onClick={() => setActiveEffect(activeEffect === effect.id ? null : effect.id)}
          onComplete={() => setActiveEffect(null)}
        />
      ))}
    </div>
  );
}

function EffectButton({
  effect,
  isActive,
  onClick,
  onComplete,
}: {
  effect: { id: string; label: string; color: string };
  isActive: boolean;
  onClick: () => void;
  onComplete: () => void;
}) {
  const baseCard = (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-white/10 bg-[rgb(26,29,46)] p-4 text-center transition-transform hover:scale-105 hover:bg-[rgb(36,39,56)]"
    >
      <p className="font-bold text-white">{effect.label}</p>
      <p className="text-xs text-gray-400">Click to trigger</p>
    </button>
  );

  if (effect.id.startsWith('glow')) {
    const pattern = effect.id.includes('heartbeat') ? 'heartbeat' : 'pulse';
    return (
      <GlowEffect
        active={isActive}
        color={effect.color as any}
        pattern={pattern}
        intensity="intense"
      >
        {baseCard}
      </GlowEffect>
    );
  }

  if (effect.id.startsWith('shimmer')) {
    const variant = effect.id.includes('holo') ? 'holographic' : 'gold';
    return (
      <ShimmerEffect 
        active={isActive} 
        variant={variant} 
        intensity="extreme" 
        trigger="manual"
        speed="normal"
      >
        {baseCard}
      </ShimmerEffect>
    );
  }

  if (effect.id.startsWith('particles')) {
    const isCoins = effect.id.includes('coins');
    return (
      <ParticleEffect
        active={isActive}
        shape={isCoins ? 'coin' : 'star'}
        motion={isCoins ? 'fountain' : 'burst'}
        count={isCoins ? 35 : 45}
        sizeRange={isCoins ? [14, 26] : [10, 20]}
        colors={isCoins ? ['#FFD700', '#FFA500', '#FFE55C', '#FFCC00', '#DAA520'] : ['#00FFFF', '#00BFFF', '#FFD700', '#FF69B4', '#FFFFFF', '#7B68EE']}
        intensity="extreme"
        speed="fast"
        lifetime={isCoins ? 2000 : 1500}
        onComplete={onComplete}
      >
        {baseCard}
      </ParticleEffect>
    );
  }

  if (effect.id.startsWith('shake')) {
    const pattern = effect.id.includes('vibrate') ? 'vibrate' : 'impact';
    return (
      <ShakeEffect
        trigger={isActive}
        pattern={pattern}
        intensity="intense"
        onComplete={onComplete}
      >
        {baseCard}
      </ShakeEffect>
    );
  }

  return baseCard;
}

function BalanceDemo() {
  const [balance, setBalance] = useState(5000);

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-[rgb(20,23,38)] p-8">
      <EnhancedBalanceDisplay
        balance={balance}
        size="lg"
        glowOnIncrease
        particlesOnIncrease
        dramaticCount
        bigChangeThreshold={1000}
        showDollarValue
      />

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setBalance((b) => b + 100)}
          className="rounded-lg bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20"
        >
          +100 LTZ
        </button>
        <button
          onClick={() => setBalance((b) => b + 500)}
          className="rounded-lg bg-cyan-500/20 px-4 py-2 text-cyan-400 transition-colors hover:bg-cyan-500/30"
        >
          +500 LTZ
        </button>
        <button
          onClick={() => setBalance((b) => b + 1000)}
          className="rounded-lg bg-purple-500/20 px-4 py-2 text-purple-400 transition-colors hover:bg-purple-500/30"
        >
          +1,000 LTZ ✨
        </button>
        <button
          onClick={() => setBalance((b) => b + 5000)}
          className="rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-4 py-2 text-yellow-400 transition-colors hover:from-yellow-500/30 hover:to-orange-500/30"
        >
          +5,000 LTZ 🎉
        </button>
      </div>
    </div>
  );
}

function ProgressBarsDemo() {
  const [progress, setProgress] = useState(60);
  const { tone } = useTone();

  // Theme descriptions for the showcase
  const themeInfo: Record<string, { name: string; description: string; emoji: string }> = {
    default: { name: 'Loyalteez', description: 'Smooth gradient with shimmer', emoji: '💎' },
    arcade: { name: 'Arcade', description: 'Pixel blocks like 8-bit games', emoji: '🕹️' },
    casino: { name: 'Casino', description: 'Segmented gold bars', emoji: '🎰' },
    cyberpunk: { name: 'Cyberpunk', description: 'Glitchy scanlines & neon', emoji: '🌃' },
    minimal: { name: 'Minimal', description: 'Clean and simple', emoji: '⬜' },
    playful: { name: 'Playful', description: 'Floating bubbles', emoji: '🫧' },
    competitive: { name: 'Competitive', description: 'Fiery flames', emoji: '🔥' },
    fantasy: { name: 'Fantasy', description: 'RPG health hearts', emoji: '❤️' },
    scifi: { name: 'Sci-Fi', description: 'Circuit nodes & data flow', emoji: '🔌' },
    retro: { name: 'Retro', description: 'VHS tracking & CRT green', emoji: '📼' },
  };

  const currentThemeId = tone?.id || 'default';
  const currentInfo = themeInfo[currentThemeId] || themeInfo.default;

  return (
    <div className="space-y-8 rounded-2xl border border-white/10 bg-[rgb(20,23,38)] p-8">
      {/* Theme-Specific Progress Bar */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{currentInfo.emoji}</span>
          <div>
            <h4 className="text-lg font-bold text-white">{currentInfo.name} Style</h4>
            <p className="text-sm text-gray-400">{currentInfo.description}</p>
          </div>
        </div>
        
        {/* Interactive themed progress */}
        <div className="space-y-4">
          <EnhancedProgressBar 
            value={progress} 
            size="xl" 
            showLabel 
            showGlow
          />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setProgress((p) => Math.max(0, p - 10))}
              className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
            >
              -10%
            </button>
            <button
              onClick={() => setProgress((p) => Math.min(100, p + 10))}
              className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
            >
              +10%
            </button>
            <button
              onClick={() => setProgress(0)}
              className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/30"
            >
              Reset
            </button>
            <button
              onClick={() => setProgress(100)}
              className="rounded-lg bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400 transition-colors hover:bg-emerald-500/30"
            >
              Complete
            </button>
          </div>
        </div>
      </div>

      {/* Preview All Theme Styles */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
          All Theme Styles Preview
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(themeInfo).map(([themeId, info]) => (
            <div 
              key={themeId} 
              className={`space-y-2 rounded-lg p-4 transition-all ${
                themeId === currentThemeId 
                  ? 'bg-white/10 ring-2 ring-purple-500/50' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{info.emoji}</span>
                <span className="text-sm font-medium text-white">{info.name}</span>
                {themeId === currentThemeId && (
                  <span className="ml-auto text-xs bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <EnhancedProgressBar 
                value={75} 
                theme={themeId as ToneId}
                size="lg" 
                showGlow={themeId === currentThemeId}
              />
              <p className="text-xs text-gray-500">{info.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Classic Progress Bars */}
      <div className="space-y-4 border-t border-white/10 pt-6">
        <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
          Classic Variants
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <span className="text-xs text-gray-400">Default</span>
            <ProgressBar value={75} size="md" showLabel />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-gray-400">Success</span>
            <ProgressBar value={100} variant="success" size="md" showLabel />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-gray-400">Warning</span>
            <ProgressBar value={65} variant="warning" size="md" showLabel />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-gray-400">Error</span>
            <ProgressBar value={25} variant="error" size="md" showLabel />
          </div>
        </div>
      </div>

      {/* Custom Label */}
      <div className="space-y-3 border-t border-white/10 pt-6">
        <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
          Custom Label Format
        </h4>
        <EnhancedProgressBar
          value={750}
          max={1000}
          size="lg"
          showLabel
          formatLabel={(v, m) => `${v.toLocaleString()} / ${m.toLocaleString()} LTZ claimed`}
        />
      </div>
    </div>
  );
}

function PerkCardsDemo() {
  const { reward } = useEnhancedToast();

  const handleClaim = (perk: typeof SAMPLE_PERKS[0]) => {
    reward({
      title: `${perk.name} Claimed!`,
      description: `You redeemed this perk for ${perk.price.toLocaleString()} LTZ`,
      amount: perk.price,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {SAMPLE_PERKS.map((perk) => (
        <EnhancedPerkCard
          key={perk.id}
          perk={perk}
          effectsEnabled
          effectsOnHover
          onClaim={() => handleClaim(perk)}
        />
      ))}
    </div>
  );
}

function ToastDemo() {
  const { reward, success, error } = useEnhancedToast();

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() =>
          reward({
            title: 'Reward Claimed!',
            description: 'You earned 500 LTZ',
            amount: 500,
          })
        }
        className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black transition-transform hover:scale-105"
      >
        🎁 Reward Toast
      </button>
      <button
        onClick={() =>
          success({
            title: 'Milestone Reached!',
            description: '10,000 LTZ total earned',
          })
        }
        className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-black transition-transform hover:scale-105"
      >
        🏆 Milestone Toast
      </button>
      <button
        onClick={() =>
          success({
            title: 'Level Up!',
            description: 'You are now Level 5',
          })
        }
        className="rounded-lg bg-purple-500 px-4 py-2 font-medium text-white transition-transform hover:scale-105"
      >
        ⬆️ Level Up Toast
      </button>
      <button
        onClick={() =>
          success({
            title: '🔥 Streak!',
            description: '7 day streak achieved',
          })
        }
        className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-transform hover:scale-105"
      >
        🔥 Streak Toast
      </button>
      <button
        onClick={() =>
          error({
            title: 'Error',
            description: 'Something went wrong',
          })
        }
        className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition-transform hover:scale-105"
      >
        ❌ Error Toast
      </button>
    </div>
  );
}

function EffectPresetsDemo() {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [hoveredPreset, setHoveredPreset] = useState<string | null>(null);

  const presets = [
    { id: 'coinCollect', label: 'Coin Collect', emoji: '🪙', shimmer: 'gold' as const, glow: 'gold' as const },
    { id: 'levelUp', label: 'Level Up', emoji: '⬆️', shimmer: 'neon' as const, glow: 'cyan' as const },
    { id: 'milestone', label: 'Milestone', emoji: '🏆', shimmer: 'gold' as const, glow: 'gold' as const },
    { id: 'streak', label: 'Streak', emoji: '🔥', shimmer: 'fire' as const, glow: 'red' as const },
    { id: 'legendary', label: 'Legendary', emoji: '✨', shimmer: 'holographic' as const, glow: 'purple' as const },
    { id: 'mythic', label: 'Mythic', emoji: '🌈', shimmer: 'holographic' as const, glow: 'rainbow' as const },
  ];

  useEffect(() => {
    if (activePreset) {
      const timer = setTimeout(() => setActivePreset(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [activePreset]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {presets.map((preset) => {
        const isActive = activePreset === preset.id;
        const isHovered = hoveredPreset === preset.id;
        const showEffect = isActive || isHovered;
        
        return (
          <div
            key={preset.id}
            onMouseEnter={() => setHoveredPreset(preset.id)}
            onMouseLeave={() => setHoveredPreset(null)}
          >
            <GlowEffect
              active={showEffect}
              color={preset.glow}
              pattern={isActive ? 'heartbeat' : 'pulse'}
              intensity={isActive ? 'extreme' : isHovered ? 'intense' : 'subtle'}
            >
              <ShimmerEffect
                active={showEffect}
                variant={preset.shimmer}
                intensity="extreme"
                speed="normal"
                trigger="auto"
                delay={0}
              >
                <ParticleEffect
                  active={isActive}
                  shape={preset.id === 'coinCollect' ? 'coin' : preset.id === 'streak' ? 'ember' : 'star'}
                  motion="burst"
                  count={isActive ? 50 : 20}
                  colors={
                    preset.id === 'streak' 
                      ? ['#ff4500', '#ff6b00', '#ffa500'] 
                      : preset.id === 'mythic'
                        ? ['#ff00ff', '#00ffff', '#ffff00', '#ff0080', '#00ff80']
                        : undefined
                  }
                >
                  <ShakeEffect
                    trigger={isActive}
                    pattern={preset.id === 'streak' ? 'vibrate' : 'impact'}
                    intensity="normal"
                  >
                    <button
                      onClick={() => setActivePreset(preset.id)}
                      className={`
                        w-full rounded-xl border p-6 text-center 
                        transition-all duration-300 
                        ${isHovered 
                          ? 'border-white/30 bg-[rgb(36,42,66)] scale-105 shadow-lg' 
                          : 'border-white/10 bg-[rgb(26,29,46)]'
                        }
                        ${isActive ? 'scale-110' : ''}
                      `}
                      style={{
                        boxShadow: isHovered 
                          ? `0 0 30px rgba(${preset.glow === 'gold' ? '255,200,50' : preset.glow === 'cyan' ? '0,200,255' : preset.glow === 'red' ? '255,80,50' : preset.glow === 'purple' ? '150,50,255' : '150,100,255'}, 0.3)` 
                          : undefined,
                      }}
                    >
                      <span className={`text-4xl transition-transform duration-300 inline-block ${isHovered ? 'scale-110' : ''}`}>
                        {preset.emoji}
                      </span>
                      <p className={`mt-2 font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/90'}`}>
                        {preset.label}
                      </p>
                    </button>
                  </ShakeEffect>
                </ParticleEffect>
              </ShimmerEffect>
            </GlowEffect>
          </div>
        );
      })}
    </div>
  );
}

function getThemeEmoji(toneId: ToneId): string {
  const emojis: Record<ToneId, string> = {
    default: '💎',
    arcade: '🕹️',
    casino: '🎰',
    cyberpunk: '🤖',
    minimal: '◻️',
    playful: '🎈',
    competitive: '🏆',
    fantasy: '🧙',
    scifi: '🚀',
    retro: '📼',
  };
  return emojis[toneId] || '✨';
}

