import { cva } from 'class-variance-authority';

export const modalOverlayStyles = cva(
  'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
  {
    variants: {
      visible: {
        true: 'opacity-100',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      visible: true,
    },
  }
);

export const modalContainerStyles = cva(
  'fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300',
  {
    variants: {
      visible: {
        true: 'opacity-100',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      visible: true,
    },
  }
);

export const modalContentStyles = cva(
  'relative w-full bg-ltz-bg-secondary border border-ltz-border rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
      },
      visible: {
        true: 'scale-100 translate-y-0',
        false: 'scale-95 translate-y-4',
      },
    },
    defaultVariants: {
      size: 'md',
      visible: true,
    },
  }
);

export const modalHeaderStyles = cva('px-6 py-4 border-b border-ltz-border', {
  variants: {
    size: {
      sm: 'px-4 py-3',
      md: 'px-6 py-4',
      lg: 'px-8 py-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const modalBodyStyles = cva('', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const modalFooterStyles = cva('flex items-center gap-3 border-t border-ltz-border', {
  variants: {
    size: {
      sm: 'px-4 py-3',
      md: 'px-6 py-4',
      lg: 'px-8 py-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const itemPreviewStyles = cva(
  'flex items-center gap-4 rounded-xl bg-ltz-bg-tertiary/50 border border-ltz-border',
  {
    variants: {
      size: {
        sm: 'p-3 gap-3',
        md: 'p-4 gap-4',
        lg: 'p-5 gap-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const itemImageStyles = cva('rounded-lg bg-ltz-bg-tertiary flex-shrink-0 overflow-hidden', {
  variants: {
    size: {
      sm: 'w-14 h-14',
      md: 'w-16 h-16',
      lg: 'w-20 h-20',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const stateIconStyles = cva('flex items-center justify-center rounded-full mx-auto', {
  variants: {
    size: {
      sm: 'w-14 h-14 mb-3',
      md: 'w-16 h-16 mb-4',
      lg: 'w-20 h-20 mb-5',
    },
    state: {
      idle: 'bg-ltz-bg-tertiary',
      confirming: 'bg-ltz-purple/20',
      processing: 'bg-ltz-cyan/20',
      success: 'bg-emerald-500/20',
      error: 'bg-red-500/20',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'idle',
  },
});

export const primaryButtonStyles = cva(
  'flex-1 flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
      variant: {
        primary:
          'ltz-bg-gradient-primary text-white hover:scale-[1.02] shadow-lg shadow-ltz-purple/30',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        disabled: 'bg-ltz-bg-tertiary text-ltz-text-muted cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

export const secondaryButtonStyles = cva(
  'flex items-center justify-center gap-2 rounded-xl font-medium border border-ltz-border bg-transparent text-ltz-text-secondary hover:bg-ltz-bg-tertiary transition-colors',
  {
    variants: {
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const balanceWarningStyles = cva('flex items-center gap-2 rounded-lg px-3 py-2 text-sm', {
  variants: {
    type: {
      insufficient: 'bg-red-500/10 text-red-400 border border-red-500/20',
      sufficient: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    },
  },
  defaultVariants: {
    type: 'sufficient',
  },
});

export const transactionLinkStyles = cva(
  'inline-flex items-center gap-1 text-ltz-cyan hover:text-ltz-cyan/80 transition-colors text-sm font-medium'
);
