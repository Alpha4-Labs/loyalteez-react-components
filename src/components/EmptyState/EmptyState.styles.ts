import { cva } from 'class-variance-authority';

export const emptyStateContainerStyles = cva(
  'flex flex-col items-center justify-center text-center',
  {
    variants: {
      size: {
        sm: 'py-6 px-4 gap-2',
        md: 'py-10 px-6 gap-3',
        lg: 'py-16 px-8 gap-4',
      },
      variant: {
        default: '',
        card: 'rounded-2xl border border-ltz-border bg-ltz-bg-secondary',
        minimal: '',
      },
      animated: {
        true: 'animate-ltz-fade-in',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      animated: true,
    },
  }
);

export const emptyStateIconStyles = cva('flex items-center justify-center rounded-full', {
  variants: {
    size: {
      sm: 'w-12 h-12 text-2xl mb-1',
      md: 'w-16 h-16 text-3xl mb-2',
      lg: 'w-24 h-24 text-5xl mb-4',
    },
    showGradient: {
      true: 'bg-gradient-to-br from-ltz-purple/20 to-ltz-cyan/20',
      false: 'bg-ltz-bg-tertiary',
    },
  },
  defaultVariants: {
    size: 'md',
    showGradient: true,
  },
});

export const emptyStateTitleStyles = cva('font-bold text-ltz-text-primary', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-2xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const emptyStateDescriptionStyles = cva('text-ltz-text-secondary max-w-sm', {
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

export const emptyStateActionsStyles = cva('flex items-center gap-3', {
  variants: {
    size: {
      sm: 'mt-3',
      md: 'mt-4',
      lg: 'mt-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const emptyStateIllustrationStyles = cva('', {
  variants: {
    size: {
      sm: 'w-24 h-24 mb-2',
      md: 'w-32 h-32 mb-4',
      lg: 'w-48 h-48 mb-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
