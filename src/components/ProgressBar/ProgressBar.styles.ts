import { cva } from 'class-variance-authority';

export const progressContainerStyles = cva(
  'relative w-full overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const progressTrackStyles = cva(
  'absolute inset-0 rounded-full',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const progressBarStyles = cva(
  'h-full rounded-full transition-all relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-ltz-purple',
        gradient: 'ltz-bg-gradient-primary',
        glow: 'ltz-bg-gradient-primary shadow-ltz-glow-purple',
      },
      animated: {
        true: 'animate-ltz-progress-fill',
        false: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: false,
      size: 'md',
    },
  }
);

export const progressLabelStyles = cva(
  'text-ltz-text-secondary font-medium tabular-nums',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      position: {
        right: 'ml-3',
        below: 'mt-1',
        inside: 'absolute inset-0 flex items-center justify-center text-white',
      },
    },
    defaultVariants: {
      size: 'md',
      position: 'right',
    },
  }
);

export const shimmerStyles = cva(
  'absolute inset-0 w-full h-full',
  {
    variants: {
      active: {
        true: [
          'bg-gradient-to-r from-transparent via-white/30 to-transparent',
          'animate-[ltz-progress-shimmer_2s_infinite]',
        ],
        false: '',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export const remainingBadgeStyles = cva(
  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold',
  {
    variants: {
      urgency: {
        normal: 'bg-ltz-bg-tertiary text-ltz-text-secondary',
        low: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
        critical: 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse',
      },
    },
    defaultVariants: {
      urgency: 'normal',
    },
  }
);

