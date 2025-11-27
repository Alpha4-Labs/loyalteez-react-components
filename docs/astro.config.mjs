import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Loyalteez Components',
      description: 'React components for building loyalty program interfaces',
      social: {
        github: 'https://github.com/Alpha4-Labs/loyalteez-react-components',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'BalanceDisplay', slug: 'components/balance-display' },
            { label: 'ProgressBar', slug: 'components/progress-bar', badge: 'Coming Soon' },
            { label: 'TierBadge', slug: 'components/tier-badge', badge: 'Coming Soon' },
            { label: 'RewardToast', slug: 'components/reward-toast', badge: 'Coming Soon' },
            { label: 'PerkCard', slug: 'components/perk-card', badge: 'Coming Soon' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Theming', slug: 'guides/theming' },
            { label: 'Accessibility', slug: 'guides/accessibility', badge: 'Coming Soon' },
          ],
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://loyalteez.app/og-image.png',
          },
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/Alpha4-Labs/loyalteez-react-components/edit/main/docs/',
      },
    }),
  ],
});

