# @loyalteez/react-components

> React components for building loyalty program interfaces with Loyalteez

[![npm version](https://img.shields.io/npm/v/@loyalteez/react-components.svg)](https://www.npmjs.com/package/@loyalteez/react-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/Alpha4-Labs/loyalteez-react-components/actions/workflows/ci.yml/badge.svg)](https://github.com/Alpha4-Labs/loyalteez-react-components/actions/workflows/ci.yml)

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

## Components

### Core (Phase 1)
- ✅ **BalanceDisplay** — Display LTZ balance with animated counter
- 🚧 **ProgressBar** — Generic progress indicator with LTZ theming
- 🚧 **TierBadge** — Bronze/Silver/Gold/Platinum tier badges
- 🚧 **RewardToast** — Notification popup for earned rewards
- 🚧 **PerkCard** — Marketplace perk display with claim button

### Gamification (Phase 2)
- 📋 StreakCounter — Daily/weekly streak with flame animation
- 📋 Leaderboard — Top earners display
- 📋 BadgeGrid — Achievement badges collection
- 📋 ChallengeCard — Active challenge progress
- 📋 MilestoneTimeline — Visual timeline of achievements

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

### Tailwind CSS

For Tailwind users, extend your config with our preset:

```js
// tailwind.config.js
import { loyalteezPreset } from '@loyalteez/react-components/tailwind';

export default {
  presets: [loyalteezPreset],
  // ...
};
```

## Framer Motion (Optional)

For enhanced animations:

```tsx
import { BalanceDisplayMotion } from '@loyalteez/react-components/motion';

<BalanceDisplayMotion balance={5420} showDollarValue />
```

Requires `framer-motion` as a peer dependency.

## Documentation

- [Full Documentation](https://loyalteez.app/docs)
- [Storybook](https://alpha4-labs.github.io/loyalteez-react-components)

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
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Loyalteez](https://loyalteez.app)
