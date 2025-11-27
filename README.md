# @loyalteez/react-components

> React components for building loyalty program interfaces with Loyalteez

[![npm version](https://img.shields.io/npm/v/@loyalteez/react-components.svg)](https://www.npmjs.com/package/@loyalteez/react-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/Alpha4-Labs/loyalteez-react-components/actions/workflows/ci.yml/badge.svg)](https://github.com/Alpha4-Labs/loyalteez-react-components/actions/workflows/ci.yml)

## Overview

`@loyalteez/react-components` provides drop-in React components for building loyalty program interfaces. Launch polished loyalty experiences in hours instead of weeks.

### Features

- 🎨 **Beautiful defaults** — Dark theme with customizable CSS variables
- 🧩 **Composable** — Use individual components or compose your own
- 🪝 **Headless hooks** — Full control when you need custom UI
- ⚡ **Lightweight** — Tree-shakeable, minimal dependencies
- 🎭 **Animated** — Smooth CSS animations with optional Framer Motion enhancement
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
import { BalanceDisplayMotion } from '@loyalteez/react-components/motion';

<BalanceDisplayMotion balance={5420} showDollarValue />
```

Requires `framer-motion` as a peer dependency.

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
