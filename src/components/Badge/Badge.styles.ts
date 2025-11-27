import { cva } from 'class-variance-authority';

export const badgeStyles = cva(
  [
    'inline-flex items-center gap-1.5 rounded-full font-semibold',
    'transition-all duration-200',
  ],
  {
    variants: {
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
      glass: {
        true: 'backdrop-blur-sm',
        false: '',
      },
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
      hasIcon: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        hasIcon: true,
        className: 'gap-1',
      },
    ],
    defaultVariants: {
      size: 'md',
      glass: false,
      pulse: false,
      hasIcon: false,
    },
  }
);

export const badgeIconStyles = cva('flex-shrink-0', {
  variants: {
    size: {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

