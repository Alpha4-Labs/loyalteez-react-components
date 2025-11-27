import { cva } from 'class-variance-authority';

export const tierBadgeStyles = cva(
  [
    'inline-flex items-center gap-2 rounded-full font-bold uppercase tracking-wide',
    'transition-all duration-200 relative overflow-hidden',
    'border border-white/20',
  ],
  {
    variants: {
      size: {
        sm: 'px-2.5 py-1 text-xs gap-1.5',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-5 py-2.5 text-base gap-2.5',
      },
      animated: {
        true: 'animate-ltz-pulse-glow',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      animated: false,
    },
  }
);

export const tierIconStyles = cva('flex-shrink-0', {
  variants: {
    size: {
      sm: 'w-3.5 h-3.5',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const shineOverlayStyles = cva(
  [
    'absolute inset-0 w-[200%] h-full',
    'bg-gradient-to-r from-transparent via-white/30 to-transparent',
    '-translate-x-full',
  ],
  {
    variants: {
      active: {
        true: 'group-hover:translate-x-full transition-transform duration-700',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

