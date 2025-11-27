import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { BalanceDisplay } from './BalanceDisplay';

const meta: Meta<typeof BalanceDisplay> = {
  title: 'Components/BalanceDisplay',
  component: BalanceDisplay,
  tags: ['autodocs'],
  argTypes: {
    balance: {
      control: { type: 'number', min: 0, max: 10000000 },
      description: 'The LTZ balance to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showDollarValue: {
      control: 'boolean',
      description: 'Show dollar equivalent',
    },
    animated: {
      control: 'boolean',
      description: 'Animate balance changes',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading skeleton',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show LTZ label',
    },
    compact: {
      control: 'boolean',
      description: 'Use compact number format',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BalanceDisplay>;

export const Default: Story = {
  args: {
    balance: 5420,
  },
};

export const WithDollarValue: Story = {
  args: {
    balance: 5420,
    showDollarValue: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm text-ltz-text-secondary">Small</p>
        <BalanceDisplay balance={5420} size="sm" showDollarValue />
      </div>
      <div>
        <p className="mb-2 text-sm text-ltz-text-secondary">Medium (default)</p>
        <BalanceDisplay balance={5420} size="md" showDollarValue />
      </div>
      <div>
        <p className="mb-2 text-sm text-ltz-text-secondary">Large</p>
        <BalanceDisplay balance={5420} size="lg" showDollarValue />
      </div>
    </div>
  ),
};

export const Animated: Story = {
  render: function AnimatedStory() {
    const [balance, setBalance] = useState(5000);

    useEffect(() => {
      const interval = setInterval(() => {
        setBalance((prev) => prev + Math.floor(Math.random() * 500) + 100);
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex flex-col items-center gap-4">
        <BalanceDisplay balance={balance} animated showDollarValue size="lg" />
        <p className="text-sm text-ltz-text-secondary">Balance updates every 2 seconds</p>
      </div>
    );
  },
};

export const CompactFormat: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <BalanceDisplay balance={1500} compact />
      <BalanceDisplay balance={15000} compact />
      <BalanceDisplay balance={150000} compact />
      <BalanceDisplay balance={1500000} compact />
      <BalanceDisplay balance={15000000} compact />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    balance: 0,
    loading: true,
    showDollarValue: true,
  },
};

export const NoLabel: Story = {
  args: {
    balance: 5420,
    showLabel: false,
  },
};

export const LargeNumbers: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <BalanceDisplay balance={1234567} showDollarValue />
      <BalanceDisplay balance={9999999} showDollarValue />
    </div>
  ),
};
