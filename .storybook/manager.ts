import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const loyalteezTheme = create({
  base: 'dark',
  
  // Brand
  brandTitle: 'Loyalteez Components',
  brandUrl: 'https://loyalteez.app',
  brandImage: undefined, // Add logo later
  brandTarget: '_blank',

  // Colors
  colorPrimary: '#f59e0b',
  colorSecondary: '#f59e0b',

  // UI
  appBg: '#18181b',
  appContentBg: '#27272a',
  appPreviewBg: '#18181b',
  appBorderColor: '#3f3f46',
  appBorderRadius: 8,

  // Text
  textColor: '#ffffff',
  textInverseColor: '#18181b',
  textMutedColor: '#a1a1aa',

  // Toolbar
  barTextColor: '#a1a1aa',
  barSelectedColor: '#f59e0b',
  barHoverColor: '#f59e0b',
  barBg: '#27272a',

  // Form
  inputBg: '#3f3f46',
  inputBorder: '#52525b',
  inputTextColor: '#ffffff',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme: loyalteezTheme,
});

