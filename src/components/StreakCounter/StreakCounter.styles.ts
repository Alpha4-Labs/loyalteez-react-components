import { cva } from 'class-variance-authority';

export const streakContainerStyles = cva(
  'relative flex flex-col items-center justify-center rounded-2xl transition-all duration-300',
  {
    variants: {
      size: {
        sm: 'p-3 gap-1',
        md: 'p-4 gap-2',
        lg: 'p-6 gap-3',
        xl: 'p-8 gap-4',
      },
      intensity: {
        0: 'bg-ltz-bg-secondary border border-ltz-border',
        1: 'bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20',
        2: 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30',
        3: 'bg-gradient-to-br from-orange-500/30 to-red-600/30 border border-orange-500/40 shadow-lg shadow-orange-500/20',
        4: 'bg-gradient-to-br from-orange-500/40 to-red-600/40 border border-orange-400/50 shadow-xl shadow-orange-500/30',
        5: 'bg-gradient-to-br from-yellow-500/30 via-orange-500/40 to-red-600/50 border-2 border-yellow-400/60 shadow-2xl shadow-orange-500/40',
      },
    },
    defaultVariants: {
      size: 'md',
      intensity: 1,
    },
  }
);

export const streakNumberStyles = cva(
  'font-black tabular-nums leading-none transition-all duration-300',
  {
    variants: {
      size: {
        sm: 'text-3xl',
        md: 'text-5xl',
        lg: 'text-7xl',
        xl: 'text-9xl',
      },
      intensity: {
        0: 'text-ltz-text-muted',
        1: 'text-orange-400',
        2: 'text-orange-400',
        3: 'bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent',
        4: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent',
        5: 'bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]',
      },
    },
    defaultVariants: {
      size: 'md',
      intensity: 1,
    },
  }
);

export const streakLabelStyles = cva(
  'font-semibold uppercase tracking-wider transition-colors duration-300',
  {
    variants: {
      size: {
        sm: 'text-[10px]',
        md: 'text-xs',
        lg: 'text-sm',
        xl: 'text-base',
      },
      intensity: {
        0: 'text-ltz-text-muted',
        1: 'text-orange-400/80',
        2: 'text-orange-400/90',
        3: 'text-orange-400',
        4: 'text-orange-300',
        5: 'text-yellow-300',
      },
    },
    defaultVariants: {
      size: 'md',
      intensity: 1,
    },
  }
);

export const streakMessageStyles = cva('font-medium text-center transition-colors duration-300', {
  variants: {
    size: {
      sm: 'text-xs mt-1',
      md: 'text-sm mt-2',
      lg: 'text-base mt-3',
      xl: 'text-lg mt-4',
    },
    intensity: {
      0: 'text-ltz-text-muted',
      1: 'text-ltz-text-secondary',
      2: 'text-orange-300/80',
      3: 'text-orange-300',
      4: 'text-orange-200',
      5: 'text-yellow-200 animate-pulse',
    },
  },
  defaultVariants: {
    size: 'md',
    intensity: 1,
  },
});

export const flameContainerStyles = cva(
  'relative flex items-center justify-center transition-all duration-500',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 mb-1',
        md: 'w-12 h-12 mb-2',
        lg: 'w-16 h-16 mb-3',
        xl: 'w-24 h-24 mb-4',
      },
      intensity: {
        0: 'opacity-30',
        1: 'opacity-60',
        2: 'opacity-80',
        3: 'opacity-100 animate-[ltz-float_2s_ease-in-out_infinite]',
        4: 'opacity-100 animate-[ltz-float_1.5s_ease-in-out_infinite] scale-110',
        5: 'opacity-100 animate-[ltz-float_1s_ease-in-out_infinite] scale-125',
      },
    },
    defaultVariants: {
      size: 'md',
      intensity: 1,
    },
  }
);

export const milestoneContainerStyles = cva('flex items-center gap-1', {
  variants: {
    size: {
      sm: 'mt-2',
      md: 'mt-3',
      lg: 'mt-4',
      xl: 'mt-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const milestoneIndicatorStyles = cva('rounded-full transition-all duration-300 border', {
  variants: {
    size: {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
      xl: 'w-3 h-3',
    },
    reached: {
      true: 'bg-orange-400 border-orange-400 shadow-sm shadow-orange-400/50',
      false: 'bg-white/10 border-white/20',
    },
    current: {
      true: 'ring-2 ring-orange-400 ring-offset-1 ring-offset-transparent',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    reached: false,
    current: false,
  },
});

export const breakWarningStyles = cva(
  'flex items-center gap-1.5 rounded-full px-3 py-1 font-medium',
  {
    variants: {
      size: {
        sm: 'text-[10px] mt-2',
        md: 'text-xs mt-3',
        lg: 'text-sm mt-4',
        xl: 'text-base mt-5',
      },
      urgent: {
        true: 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse',
        false: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      },
    },
    defaultVariants: {
      size: 'md',
      urgent: false,
    },
  }
);

export const bestStreakStyles = cva('flex items-center gap-1 font-medium text-ltz-text-muted', {
  variants: {
    size: {
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
