# @loyalteez/react-components

> React components for building loyalty program interfaces with Loyalteez

[![npm version](https://img.shields.io/npm/v/@loyalteez/react-components.svg)](https://www.npmjs.com/package/@loyalteez/react-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚧 Under Development

This package is currently under active development. The first stable release is coming soon!

## Overview

`@loyalteez/react-components` provides drop-in React components for building loyalty program interfaces. Launch polished loyalty experiences in hours instead of weeks.

### Features

- 🎨 **Beautiful defaults** — Dark theme with customizable CSS variables
- 🧩 **Composable** — Use individual components or pre-built layouts
- 🪝 **Headless hooks** — Full control when you need custom UI
- ⚡ **Lightweight** — Tree-shakeable, minimal dependencies
- 🎭 **Animated** — Smooth CSS animations with optional Framer Motion enhancement
- 📱 **Responsive** — Mobile-first design
- ♿ **Accessible** — WCAG 2.1 AA compliant

## Planned Components

### Core (Phase 1)
- `<BalanceDisplay />` — Display LTZ balance with animated counter
- `<ProgressBar />` — Generic progress indicator with LTZ theming
- `<TierBadge />` — Bronze/Silver/Gold/Platinum tier badges
- `<RewardToast />` — Notification popup for earned rewards
- `<PerkCard />` — Marketplace perk display with claim button

### Gamification (Phase 2)
- `<StreakCounter />` — Daily/weekly streak with flame animation
- `<Leaderboard />` — Top earners display
- `<BadgeGrid />` — Achievement badges collection
- `<ChallengeCard />` — Active challenge progress
- `<MilestoneTimeline />` — Visual timeline of achievements

### Layouts (Phase 3)
- `<TierCard />` — Full tier information card
- `<PerkGrid />` — Marketplace grid layout
- `<LoyaltyDashboard />` — Pre-composed dashboard

## Installation

```bash
npm install @loyalteez/react-components
# or
yarn add @loyalteez/react-components
# or
pnpm add @loyalteez/react-components
```

## Quick Start

```tsx
import { BalanceDisplay, TierBadge } from '@loyalteez/react-components';
import '@loyalteez/react-components/styles.css';

function MyLoyaltyWidget() {
  return (
    <div>
      <TierBadge tier="gold" />
      <BalanceDisplay balance={5420} showDollarValue animated />
    </div>
  );
}
```

## Theming

Customize with CSS variables:

```css
:root {
  --ltz-primary: #f59e0b;
  --ltz-secondary: #10b981;
  --ltz-bg-primary: #18181b;
  --ltz-bg-secondary: #27272a;
  --ltz-text-primary: #ffffff;
  --ltz-radius-md: 0.5rem;
}
```

## Documentation

Full documentation coming soon at [loyalteez.com/docs](https://loyalteez.com/docs)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Loyalteez](https://loyalteez.com)

