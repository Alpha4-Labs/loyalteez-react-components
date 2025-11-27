import { cva } from 'class-variance-authority';

export const challengeCardStyles = cva(
  'relative rounded-xl border transition-all duration-300 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      status: {
        active:
          'bg-ltz-bg-secondary border-ltz-border hover:border-ltz-cyan/30 hover:shadow-lg hover:shadow-ltz-cyan/10',
        completed: 'bg-emerald-500/5 border-emerald-500/30',
        expired: 'bg-red-500/5 border-red-500/20 opacity-60',
        locked: 'bg-ltz-bg-tertiary/50 border-ltz-border opacity-50',
      },
      clickable: {
        true: 'cursor-pointer hover:scale-[1.01]',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'active',
      clickable: false,
    },
  }
);

export const challengeHeaderStyles = cva('flex items-start justify-between gap-3', {
  variants: {
    size: {
      sm: 'mb-2',
      md: 'mb-3',
      lg: 'mb-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const challengeIconStyles = cva(
  'flex items-center justify-center rounded-xl flex-shrink-0',
  {
    variants: {
      size: {
        sm: 'w-10 h-10 text-xl',
        md: 'w-12 h-12 text-2xl',
        lg: 'w-16 h-16 text-3xl',
      },
      status: {
        active: 'bg-ltz-cyan/20',
        completed: 'bg-emerald-500/20',
        expired: 'bg-red-500/20',
        locked: 'bg-ltz-bg-tertiary',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'active',
    },
  }
);

export const challengeTitleStyles = cva('font-bold', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    status: {
      active: 'text-ltz-text-primary',
      completed: 'text-emerald-400',
      expired: 'text-red-400 line-through',
      locked: 'text-ltz-text-muted',
    },
  },
  defaultVariants: {
    size: 'md',
    status: 'active',
  },
});

export const challengeDescriptionStyles = cva('text-ltz-text-secondary', {
  variants: {
    size: {
      sm: 'text-xs mt-0.5',
      md: 'text-sm mt-1',
      lg: 'text-base mt-1.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const challengeTimerStyles = cva(
  'flex items-center gap-1.5 font-mono font-medium rounded-full px-3 py-1',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      urgent: {
        true: 'bg-red-500/20 text-red-400 animate-pulse',
        false: 'bg-ltz-bg-tertiary text-ltz-text-secondary',
      },
    },
    defaultVariants: {
      size: 'md',
      urgent: false,
    },
  }
);

export const challengeProgressStyles = cva('', {
  variants: {
    size: {
      sm: 'mt-2',
      md: 'mt-3',
      lg: 'mt-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const challengeProgressBarStyles = cva(
  'relative h-2 rounded-full bg-ltz-bg-tertiary overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const challengeProgressFillStyles = cva('h-full rounded-full transition-all duration-500', {
  variants: {
    status: {
      active: 'ltz-bg-gradient-primary',
      completed: 'bg-emerald-500',
      expired: 'bg-red-500',
      locked: 'bg-ltz-text-muted',
    },
  },
  defaultVariants: {
    status: 'active',
  },
});

export const challengeRewardStyles = cva(
  'flex items-center justify-between border-t border-ltz-border',
  {
    variants: {
      size: {
        sm: 'mt-2 pt-2',
        md: 'mt-3 pt-3',
        lg: 'mt-4 pt-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const challengeRewardAmountStyles = cva('font-bold ltz-text-gradient', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const challengeClaimButtonStyles = cva(
  'flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
      },
      state: {
        ready: 'ltz-bg-gradient-primary text-white hover:scale-105 shadow-lg shadow-ltz-purple/30',
        disabled: 'bg-ltz-bg-tertiary text-ltz-text-muted cursor-not-allowed',
        loading: 'ltz-bg-gradient-primary/70 text-white cursor-wait',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'ready',
    },
  }
);

export const difficultyBadgeStyles = cva(
  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
  {
    variants: {
      size: {
        sm: 'text-[10px] px-1.5',
        md: 'text-xs px-2',
        lg: 'text-sm px-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const categoryBadgeStyles = cva(
  'text-xs font-medium text-ltz-text-muted uppercase tracking-wider',
  {
    variants: {
      size: {
        sm: 'text-[10px]',
        md: 'text-xs',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
