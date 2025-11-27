# @loyalteez/react-components

> React components for building loyalty program interfaces with Loyalteez

[![npm version](https://img.shields.io/npm/v/@loyalteez/react-components.svg)](https://www.npmjs.com/package/@loyalteez/react-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/Alpha4-Labs/loyalteez-react-components/actions/workflows/ci.yml/badge.svg)](https://github.com/Alpha4-Labs/loyalteez-react-components/actions/workflows/ci.yml)

## Overview

`@loyalteez/react-components` provides drop-in React components for building loyalty program interfaces. Launch polished loyalty experiences in hours instead of weeks.

### Features

- 🎮 **Game-like effects** — Glows, shimmers, particles, shakes, dramatic reveals
- 🎨 **Beautiful defaults** — Dark theme with customizable CSS variables  
- 🎭 **Tone system** — 10 theme presets (arcade, casino, cyberpunk, fantasy...)
- 🧩 **Composable** — Use individual components or compose your own
- 🪝 **Headless hooks** — Full control when you need custom UI
- ⚡ **Lightweight** — Tree-shakeable, minimal dependencies
- 📱 **Responsive** — Mobile-first design
- ♿ **Accessible** — WCAG 2.1 AA compliant
- 🔥 **Gamification** — Streaks, leaderboards, challenges, confetti!

## Installation

```bash
npm install @loyalteez/react-components
# or
pnpm add @loyalteez/react-components
# or
yarn add @loyalteez/react-components
```

## Quick Start

```tsx
import { 
  BalanceDisplay, 
  TierBadge, 
  StreakCounter,
  ToastProvider,
  useToast 
} from '@loyalteez/react-components';
import '@loyalteez/react-components/styles.css';

function App() {
  return (
    <ToastProvider>
      <MyLoyaltyWidget />
    </ToastProvider>
  );
}

function MyLoyaltyWidget() {
  const { reward } = useToast();
  
  return (
    <div className="flex gap-4">
      <TierBadge tier="gold" />
      <BalanceDisplay balance={5420} showDollarValue animated />
      <StreakCounter streak={7} />
      <button onClick={() => reward({ amount: 100 })}>
        Earn Rewards!
      </button>
    </div>
  );
}
```

## Components

### Core Display
| Component | Description |
|-----------|-------------|
| `BalanceDisplay` | Display LTZ balance with animated counter and dollar value |
| `ProgressBar` | Generic progress indicator with gradient/glow variants |
| `TierBadge` | Bronze/Silver/Gold/Platinum/Diamond tier badges with glow effects |
| `Badge` | Pre-styled badges: Featured, Sponsored, Premium, SoldOut, etc. |

### Perk Marketplace
| Component | Description |
|-----------|-------------|
| `PerkCard` | Full perk card with image, badges, supply, price, actions |
| `PerkCard.Root` | Composable root for custom layouts |
| `PerkCard.Image` | Perk image with overlay badges |
| `PerkCard.Content` | Content container |
| `PerkCard.Title` | Perk title |
| `PerkCard.Brand` | Brand name and logo |
| `PerkCard.Supply` | Supply progress indicator |
| `PerkCard.Price` | LTZ price display |
| `PerkCard.Actions` | Claim/purchase buttons |
| `SupplyProgress` | Supply bar with urgency indicators |

### Gamification
| Component | Description |
|-----------|-------------|
| `StreakCounter` | Daily/weekly streak with animated flame, milestones |
| `Leaderboard` | Top earners with medals, rank changes, current user highlight |
| `ChallengeCard` | Active challenges with timer, progress, rewards |

### Interactive
| Component | Description |
|-----------|-------------|
| `ToastProvider` | Toast notification system context |
| `useToast` | Hook for showing reward/success/error toasts |
| `ClaimModal` | Transaction flow modal (idle→processing→success/error) |
| `ConfettiExplosion` | Canvas-based confetti celebration |
| `useConfetti` | Hook for imperative confetti control |

### Layout & Utility
| Component | Description |
|-----------|-------------|
| `EmptyState` | Flexible empty state with presets (noPerks, noFavorites, etc.) |
| `Skeleton` | Loading skeletons for cards, lists, balance displays |
| `Tooltip` | Smart-positioned tooltips with arrow |
| `FilterBar` | Filter dropdowns, search, sort, view toggle |

### Effects Module 🎮
| Effect | Description |
|--------|-------------|
| `GlowEffect` | Pulsing, breathing, heartbeat, flicker, rainbow glows |
| `ShimmerEffect` | Metallic, holographic, gold, frost, fire, neon, diamond shimmers |
| `ParticleEffect` | Coins, stars, embers, sparkles, confetti, snow, hearts |
| `ShakeEffect` | Horizontal, vertical, rotational, impact, vibrate, earthquake |
| `CountEffect` | Simple, slot machine, flip, cascade, scramble, typewriter |
| `ToneProvider` | Theme system with 10 presets (arcade, casino, cyberpunk, etc.) |

## Examples

### Streak Counter with Flame Animation

```tsx
<StreakCounter 
  streak={14} 
  bestStreak={21}
  showFlame
  showMilestones
  breakWarning={{ hoursRemaining: 4, show: true }}
/>
```

### Leaderboard with Medals

```tsx
<Leaderboard 
  entries={leaderboardData}
  currentUserId="user123"
  showMedals
  showRankChange
  showAvatars
/>
```

### Challenge Card with Timer

```tsx
<ChallengeCard 
  challenge={{
    id: '1',
    title: 'Daily Login',
    description: 'Log in 7 days in a row',
    progress: 5,
    goal: 7,
    status: 'active',
    difficulty: 'medium',
    reward: { amount: 500 },
    endTime: '2024-12-31T23:59:59Z'
  }}
  onClaim={handleClaim}
/>
```

### Toast Notifications

```tsx
function RewardButton() {
  const { reward, success, error } = useToast();
  
  const handleClaim = async () => {
    try {
      await claimReward();
      reward({ amount: 500, description: 'Daily bonus claimed!' });
    } catch (e) {
      error({ title: 'Claim failed', description: e.message });
    }
  };
  
  return <button onClick={handleClaim}>Claim</button>;
}
```

### Claim Modal with Transaction Flow

```tsx
<ClaimModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  item={{ id: '1', title: 'Coffee Reward', cost: 500 }}
  state={claimState}  // 'idle' | 'confirming' | 'processing' | 'success' | 'error'
  userBalance={1000}
  onConfirm={handleClaim}
  transactionHash={txHash}
  explorerUrlTemplate="https://explorer.soneium.org/tx/{hash}"
/>
```

### Confetti Celebration

```tsx
function Celebration() {
  const { fire, props } = useConfetti();
  
  return (
    <>
      <button onClick={() => fire()}>🎉 Celebrate!</button>
      <ConfettiExplosion {...props} />
    </>
  );
}
```

### Composable PerkCard

```tsx
<PerkCard.Root perk={perkData} variant="featured">
  <PerkCard.Image />
  <PerkCard.Content>
    <PerkCard.Badges />
    <PerkCard.Brand />
    <PerkCard.Title />
    <PerkCard.Tags />
    <PerkCard.Supply />
    <div className="flex justify-between items-center">
      <PerkCard.Price />
      <CustomClaimButton />
    </div>
  </PerkCard.Content>
</PerkCard.Root>
```

## Theming

### CSS Variables

```css
:root {
  /* Brand Colors */
  --ltz-cyan: 0 224 255;
  --ltz-purple: 108 51 234;
  --ltz-pink: 255 63 164;
  --ltz-green: 166 255 0;
  
  /* Backgrounds */
  --ltz-bg-primary: 10 12 28;
  --ltz-bg-secondary: 26 29 46;
  
  /* Text */
  --ltz-text-primary: 255 255 255;
  --ltz-text-secondary: 140 140 153;
  
  /* Radius */
  --ltz-radius: 0.75rem;
}
```

### Tailwind CSS

```js
// tailwind.config.js
import { loyalteezPreset } from '@loyalteez/react-components/tailwind';

export default {
  presets: [loyalteezPreset],
  // ...
};
```

## Framer Motion (Optional)

For enhanced animations, import from `/motion`:

```tsx
import { 
  BalanceDisplayMotion,
  StreakCounterMotion,
  LeaderboardMotion,
  ChallengeCardMotion,
  AnimatedList,
  AnimatedItem
} from '@loyalteez/react-components/motion';

// Physics-based balance counter
<BalanceDisplayMotion balance={5420} showDollarValue />

// Animated flame with intensity levels
<StreakCounterMotion streak={14} showFlame />

// Staggered entry animations for leaderboards
<LeaderboardMotion entries={data} currentUserId="user123" />

// Animated progress bars and timers
<ChallengeCardMotion challenge={challengeData} onClaim={handleClaim} />

// Stagger animate any list
<AnimatedList preset="spring" staggerDelay={0.1}>
  {items.map(item => <Card key={item.id} />)}
</AnimatedList>
```

### Motion Components
| Component | Features |
|-----------|----------|
| `BalanceDisplayMotion` | Spring-based number transitions |
| `StreakCounterMotion` | Physics-based flame, smooth count updates |
| `LeaderboardMotion` | Staggered entries, layout animations, rank changes |
| `ChallengeCardMotion` | Animated progress, pulsing timers, spring physics |
| `AnimatedList` | Generic stagger wrapper with presets (fade, slide, scale, spring, bounce) |
| `AnimatedItem` | Individual animated item control |

Requires `framer-motion` as a peer dependency:
```bash
pnpm add framer-motion
```

## Effects Module 🎮

The Effects module provides game-like visual feedback for any UI element.

### Glow Effects

```tsx
import { GlowEffect, PulseGlow, LegendaryGlow, RainbowGlow } from '@loyalteez/react-components';

// Pulsing cyan glow
<GlowEffect color="cyan" pattern="pulse" intensity="normal">
  <Card>Content</Card>
</GlowEffect>

// Heartbeat gold glow for rewards
<GlowEffect color="gold" pattern="heartbeat" intensity="intense">
  <Badge>Premium</Badge>
</GlowEffect>

// Legendary rainbow glow
<LegendaryGlow>
  <PerkCard perk={legendaryPerk} />
</LegendaryGlow>
```

### Shimmer Effects

```tsx
import { ShimmerEffect, HolographicShimmer, GoldShimmer } from '@loyalteez/react-components';

// Holographic on hover
<ShimmerEffect variant="holographic" trigger="hover">
  <Badge>New</Badge>
</ShimmerEffect>

// Auto gold shimmer for rewards
<GoldShimmer trigger="auto" delay={3000}>
  <RewardCard />
</GoldShimmer>
```

### Particle Effects

```tsx
import { ParticleEffect, CoinBurst, StarBurst, EmberEffect } from '@loyalteez/react-components';

// Coin collect on reward
<CoinBurst active={showReward} count={20} onComplete={hideReward} />

// Continuous ember particles
<EmberEffect active continuous emitRate={10}>
  <StreakCounter streak={14} />
</EmberEffect>

// Custom particle configuration
<ParticleEffect
  active={celebrating}
  shape="star"
  motion="burst"
  colors={['#FFD700', '#FFA500', '#FF6B35']}
  count={50}
  intensity="intense"
/>
```

### Shake Effects

```tsx
import { ShakeEffect, ErrorShake, ImpactShake, useShake } from '@loyalteez/react-components';

// Error shake on validation failure
<ErrorShake trigger={hasError}>
  <Input />
</ErrorShake>

// Impact shake on achievement unlock
<ImpactShake trigger={unlocked} intensity="intense">
  <AchievementBadge />
</ImpactShake>

// Imperative shake hook
function Component() {
  const { shake, props } = useShake({ pattern: 'earthquake' });
  return (
    <ShakeEffect {...props}>
      <button onClick={shake}>Trigger!</button>
    </ShakeEffect>
  );
}
```

### Count Effects (Dramatic Number Reveals)

```tsx
import { CountEffect, SlotCounter, ScrambleCounter, useCountUp } from '@loyalteez/react-components';

// Slot machine reveal
<SlotCounter value={jackpot} intensity="extreme" showDelta />

// Scramble then settle
<ScrambleCounter value={score} from={previousScore} easing="bounce" />

// Imperative count hook
function PointsDisplay() {
  const { countTo, props } = useCountUp();
  return (
    <>
      <CountEffect {...props} />
      <button onClick={() => countTo(1000)}>Add Points</button>
    </>
  );
}
```

### Tone System (Theme Presets)

```tsx
import { ToneProvider, useTone, TONES } from '@loyalteez/react-components';

// Wrap your app with a tone
<ToneProvider tone="arcade">
  <App />
</ToneProvider>

// Available tones:
// - default   (Loyalteez signature)
// - arcade    (bright, bouncy, retro)
// - casino    (gold, luxury, high-stakes)
// - cyberpunk (neon, glitch, dark)
// - minimal   (clean, subtle, professional)
// - playful   (rounded, colorful, fun)
// - competitive (sports/esports energy)
// - fantasy   (RPG, magical, mystical)
// - scifi     (futuristic, tech, sleek)
// - retro     (80s/90s nostalgia)

// Access current tone
function Component() {
  const { tone, toneId, setTone } = useTone();
  return <button onClick={() => setTone('cyberpunk')}>Go Cyber</button>;
}
```

### Effect Presets

```tsx
import { EFFECT_PRESETS } from '@loyalteez/react-components';

// Pre-configured effect combos:
// - coinCollect, levelUp, milestone, streak
// - success, error, warning
// - common, rare, epic, legendary, mythic

// Use with components:
<GlowEffect {...EFFECT_PRESETS.legendary.glow} />
<ParticleEffect {...EFFECT_PRESETS.coinCollect.particles} />
```

## Utilities

```ts
import { 
  formatLTZ,           // 1500000 → "1,500,000"
  formatCompact,       // 1500000 → "1.5M"
  formatLTZAsDollars,  // 5000 → "$5.00"
  cn                   // Tailwind class merge utility
} from '@loyalteez/react-components';
```

## Documentation

- [Storybook](https://alpha4-labs.github.io/loyalteez-react-components) — Interactive component playground
- [Full Documentation](https://loyalteez.app/docs) — API reference and guides

## Development

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm dev

# Run tests
pnpm test

# Build library
pnpm build

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Loyalteez](https://loyalteez.app)
