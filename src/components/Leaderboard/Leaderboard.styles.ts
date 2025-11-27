import { cva } from 'class-variance-authority';

export const leaderboardContainerStyles = cva(
  'rounded-xl border border-ltz-border bg-ltz-bg-secondary overflow-hidden',
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

export const leaderboardHeaderStyles = cva(
  'flex items-center justify-between border-b border-ltz-border px-4 py-3',
  {
    variants: {
      size: {
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-6 py-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const entryContainerStyles = cva(
  'flex items-center gap-3 transition-all duration-300 border-b border-ltz-border last:border-b-0',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 gap-2',
        md: 'px-4 py-3 gap-3',
        lg: 'px-6 py-4 gap-4',
      },
      isCurrentUser: {
        true: 'bg-ltz-purple/10 border-l-2 border-l-ltz-purple',
        false: 'hover:bg-ltz-bg-tertiary/50',
      },
      isTopThree: {
        true: '',
        false: '',
      },
      clickable: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    compoundVariants: [
      {
        isTopThree: true,
        isCurrentUser: false,
        className: 'bg-gradient-to-r from-transparent to-ltz-bg-tertiary/30',
      },
    ],
    defaultVariants: {
      size: 'md',
      isCurrentUser: false,
      isTopThree: false,
      clickable: false,
    },
  }
);

export const rankStyles = cva(
  'flex items-center justify-center font-bold tabular-nums flex-shrink-0',
  {
    variants: {
      size: {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
      },
      rank: {
        1: 'text-amber-400',
        2: 'text-gray-400',
        3: 'text-orange-500',
        default: 'text-ltz-text-muted',
      },
    },
    defaultVariants: {
      size: 'md',
      rank: 'default',
    },
  }
);

export const medalStyles = cva(
  'flex items-center justify-center rounded-full font-bold shadow-lg',
  {
    variants: {
      size: {
        sm: 'w-6 h-6 text-[10px]',
        md: 'w-8 h-8 text-xs',
        lg: 'w-10 h-10 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const avatarStyles = cva(
  'rounded-full bg-ltz-bg-tertiary overflow-hidden flex-shrink-0 border-2 border-ltz-border',
  {
    variants: {
      size: {
        sm: 'w-7 h-7',
        md: 'w-9 h-9',
        lg: 'w-12 h-12',
      },
      isCurrentUser: {
        true: 'border-ltz-purple ring-2 ring-ltz-purple/30',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      isCurrentUser: false,
    },
  }
);

export const nameStyles = cva('font-semibold truncate', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    isCurrentUser: {
      true: 'text-ltz-purple',
      false: 'text-ltz-text-primary',
    },
  },
  defaultVariants: {
    size: 'md',
    isCurrentUser: false,
  },
});

export const scoreStyles = cva('font-bold tabular-nums', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const scoreLabelStyles = cva('text-ltz-text-muted', {
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
});

export const rankChangeStyles = cva('flex items-center gap-0.5 font-medium', {
  variants: {
    size: {
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-sm',
    },
    direction: {
      up: 'text-emerald-400',
      down: 'text-red-400',
      same: 'text-ltz-text-muted',
    },
  },
  defaultVariants: {
    size: 'md',
    direction: 'same',
  },
});

export const currentUserCardStyles = cva(
  'flex items-center gap-3 border-t-2 border-ltz-purple bg-ltz-purple/5',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 gap-2',
        md: 'px-4 py-3 gap-3',
        lg: 'px-6 py-4 gap-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const emptyStateStyles = cva(
  'flex flex-col items-center justify-center text-center text-ltz-text-muted',
  {
    variants: {
      size: {
        sm: 'py-6 px-4',
        md: 'py-10 px-6',
        lg: 'py-14 px-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
