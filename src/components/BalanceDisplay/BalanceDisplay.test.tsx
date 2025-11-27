import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BalanceDisplay } from './BalanceDisplay';

describe('BalanceDisplay', () => {
  it('renders the balance correctly', () => {
    render(<BalanceDisplay balance={5420} />);
    expect(screen.getByText('5,420')).toBeInTheDocument();
    expect(screen.getByText('LTZ')).toBeInTheDocument();
  });

  it('shows dollar value when showDollarValue is true', () => {
    render(<BalanceDisplay balance={5420} showDollarValue />);
    expect(screen.getByText('$5.42 value')).toBeInTheDocument();
  });

  it('hides LTZ label when showLabel is false', () => {
    render(<BalanceDisplay balance={5420} showLabel={false} />);
    expect(screen.queryByText('LTZ')).not.toBeInTheDocument();
  });

  it('shows compact format when compact is true', () => {
    render(<BalanceDisplay balance={1500000} compact />);
    expect(screen.getByText('1.5M')).toBeInTheDocument();
  });

  it('renders loading skeleton when loading', () => {
    render(<BalanceDisplay balance={0} loading />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading balance');
  });

  it('applies custom className', () => {
    const { container } = render(<BalanceDisplay balance={100} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies size variants correctly', () => {
    const { rerender, container } = render(<BalanceDisplay balance={100} size="sm" />);
    expect(container.firstChild).toHaveClass('gap-0.5');

    rerender(<BalanceDisplay balance={100} size="lg" />);
    expect(container.firstChild).toHaveClass('gap-1.5');
  });

  it('has correct aria-label for accessibility', () => {
    render(<BalanceDisplay balance={5420} />);
    expect(screen.getByLabelText('5420 LTZ')).toBeInTheDocument();
  });
});

