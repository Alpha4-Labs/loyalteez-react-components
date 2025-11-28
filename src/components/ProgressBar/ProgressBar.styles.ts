import { cva } from 'class-variance-authority';

export const progressContainerStyles = cva('relative w-full overflow-hidden rounded-full bg-white/10', {
  variants: {
    size: {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
      xl: 'h-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const progressTrackStyles = cva('absolute inset-0 rounded-full', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const progressBarStyles = cva(
  'h-full rounded-full transition-all duration-500 relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-cyan-500 to-purple-500',
        gradient: 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500',
        glow: 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50',
        success: 'bg-gradient-to-r from-emerald-400 to-green-500',
        warning: 'bg-gradient-to-r from-yellow-400 to-orange-500',
        error: 'bg-gradient-to-r from-red-400 to-rose-500',
        cyan: 'bg-gradient-to-r from-cyan-400 to-cyan-600',
        purple: 'bg-gradient-to-r from-purple-400 to-purple-600',
        gold: 'bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500',
      },
      animated: {
        true: 'animate-ltz-progress-fill',
        false: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: false,
      size: 'md',
    },
  }
);

export const progressLabelStyles = cva('text-ltz-text-secondary font-medium tabular-nums', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
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
});

export const shimmerStyles = cva('absolute inset-0 w-full h-full', {
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
});

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
