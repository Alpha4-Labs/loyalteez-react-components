import { cva, type VariantProps } from 'class-variance-authority';

export const balanceDisplayStyles = cva(
  'inline-flex flex-col items-start font-medium tabular-nums tracking-tight',
  {
    variants: {
      size: {
        sm: 'gap-0.5',
        md: 'gap-1',
        lg: 'gap-1.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const balanceValueStyles = cva('inline-flex items-baseline gap-1.5 text-ltz-text-primary', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-2xl',
      lg: 'text-4xl',
    },
    animated: {
      true: 'transition-opacity duration-200',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    animated: false,
  },
});

export const balanceLabelStyles = cva('font-semibold text-ltz-primary', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const dollarValueStyles = cva('text-ltz-text-secondary', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const skeletonStyles = cva('ltz-skeleton', {
  variants: {
    size: {
      sm: 'h-6 w-20',
      md: 'h-8 w-28',
      lg: 'h-12 w-40',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type BalanceDisplayStyleProps = VariantProps<typeof balanceDisplayStyles>;
