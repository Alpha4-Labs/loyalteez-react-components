import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#18181b' },
        { name: 'light', value: '#ffffff' },
        { name: 'zinc', value: '#27272a' },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        dark: 'dark',
        light: 'light',
      },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;

