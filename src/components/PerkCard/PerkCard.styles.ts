import { cva } from 'class-variance-authority';

// ============================================
// Root Card Styles
// ============================================

export const cardRootStyles = cva(
  [
    'relative overflow-hidden rounded-xl border',
    'bg-ltz-bg-secondary border-ltz-border',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        grid: 'flex flex-col',
        list: 'flex flex-row gap-4 sm:gap-6',
        compact: 'flex flex-row gap-3',
        featured: 'flex flex-col',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      interactive: {
        true: [
          'cursor-pointer',
          'hover:shadow-lg hover:shadow-ltz-purple/20',
          'hover:border-ltz-purple/30',
          'hover:scale-[1.02]',
        ],
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'featured',
        className: 'border-2 border-ltz-purple/30 shadow-lg shadow-ltz-purple/10',
      },
    ],
    defaultVariants: {
      variant: 'grid',
      size: 'md',
      interactive: true,
    },
  }
);

// ============================================
// Image Styles
// ============================================

export const cardImageContainerStyles = cva(
  'relative overflow-hidden bg-gradient-to-br from-ltz-bg-tertiary to-ltz-bg-secondary',
  {
    variants: {
      variant: {
        grid: 'w-full',
        list: 'flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-lg',
        compact: 'flex-shrink-0 w-16 h-16 rounded-lg',
        featured: 'w-full',
      },
      aspectRatio: {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        auto: '',
      },
    },
    compoundVariants: [
      {
        variant: 'grid',
        aspectRatio: undefined,
        className: 'aspect-[4/3]',
      },
      {
        variant: 'featured',
        aspectRatio: undefined,
        className: 'aspect-video',
      },
    ],
    defaultVariants: {
      variant: 'grid',
      aspectRatio: undefined,
    },
  }
);

export const cardImageStyles = cva('w-full h-full object-cover transition-transform duration-500', {
  variants: {
    zoomOnHover: {
      true: 'group-hover:scale-110 group-hover:rotate-1',
      false: '',
    },
  },
  defaultVariants: {
    zoomOnHover: true,
  },
});

export const cardImageOverlayStyles = cva(
  'absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent',
  {
    variants: {
      visible: {
        true: 'opacity-100',
        false: 'opacity-0 group-hover:opacity-100',
      },
    },
    defaultVariants: {
      visible: false,
    },
  }
);

// ============================================
// Content Styles
// ============================================

export const cardContentStyles = cva('flex flex-col', {
  variants: {
    variant: {
      grid: 'p-4 sm:p-5 flex-grow',
      list: 'py-2 flex-grow min-w-0',
      compact: 'py-1 flex-grow min-w-0 justify-center',
      featured: 'p-5 sm:p-6 flex-grow',
    },
  },
  defaultVariants: {
    variant: 'grid',
  },
});

// ============================================
// Brand Styles
// ============================================

export const cardBrandStyles = cva('flex items-center gap-2', {
  variants: {
    size: {
      sm: 'mb-1',
      md: 'mb-2 sm:mb-3',
      lg: 'mb-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const cardBrandLogoStyles = cva(
  'rounded-full border border-ltz-border flex items-center justify-center overflow-hidden',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5 sm:w-6 sm:h-6',
        lg: 'w-7 h-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const cardBrandNameStyles = cva('font-medium text-ltz-text-secondary truncate', {
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

// ============================================
// Title Styles
// ============================================

export const cardTitleStyles = cva(
  [
    'font-bold text-ltz-text-primary',
    'transition-colors duration-200',
    'group-hover:text-ltz-cyan',
  ],
  {
    variants: {
      variant: {
        grid: 'text-lg mb-2',
        list: 'text-lg sm:text-xl mb-1',
        compact: 'text-sm',
        featured: 'text-xl sm:text-2xl mb-2',
      },
      lineClamp: {
        1: 'line-clamp-1',
        2: 'line-clamp-2',
        3: 'line-clamp-3',
      },
    },
    defaultVariants: {
      variant: 'grid',
      lineClamp: 2,
    },
  }
);

// ============================================
// Description Styles
// ============================================

export const cardDescriptionStyles = cva('text-ltz-text-secondary leading-relaxed', {
  variants: {
    variant: {
      grid: 'text-sm mb-3 sm:mb-4',
      list: 'text-sm mb-2',
      compact: 'hidden',
      featured: 'text-base mb-4',
    },
    lineClamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
    },
  },
  defaultVariants: {
    variant: 'grid',
    lineClamp: 2,
  },
});

// ============================================
// Tags Styles
// ============================================

export const cardTagsContainerStyles = cva('flex flex-wrap gap-1.5', {
  variants: {
    variant: {
      grid: 'mb-3 sm:mb-4',
      list: 'mb-2',
      compact: 'hidden',
      featured: 'mb-4',
    },
  },
  defaultVariants: {
    variant: 'grid',
  },
});

export const cardTagStyles = cva(
  [
    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full',
    'text-xs font-medium',
    'bg-ltz-purple/10 text-ltz-purple border border-ltz-purple/20',
  ],
  {
    variants: {
      size: {
        sm: 'px-1.5 py-0.5 text-[10px]',
        md: 'px-2 py-0.5 text-xs',
        lg: 'px-2.5 py-1 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ============================================
// Price Styles
// ============================================

export const cardPriceContainerStyles = cva('flex items-center gap-2', {
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
});

export const cardPriceStyles = cva('font-bold ltz-text-gradient tabular-nums', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl sm:text-2xl',
      lg: 'text-2xl sm:text-3xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const cardPriceLabelStyles = cva('text-ltz-text-muted uppercase tracking-wide', {
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

// ============================================
// Actions Styles
// ============================================

export const cardActionsContainerStyles = cva('flex gap-2 sm:gap-3', {
  variants: {
    variant: {
      grid: 'flex-col sm:flex-row mt-auto pt-4 border-t border-ltz-border',
      list: 'flex-row items-center',
      compact: 'hidden',
      featured: 'flex-row mt-auto pt-4',
    },
  },
  defaultVariants: {
    variant: 'grid',
  },
});

export const cardPrimaryButtonStyles = cva(
  [
    'flex-1 flex items-center justify-center gap-2',
    'px-4 py-3 rounded-xl font-bold text-sm',
    'transition-all duration-200 transform',
    'hover:scale-[1.02] active:scale-[0.98]',
  ],
  {
    variants: {
      state: {
        default: [
          'ltz-bg-gradient-primary text-white',
          'shadow-lg shadow-ltz-purple/30',
          'hover:shadow-xl hover:shadow-ltz-purple/40',
        ],
        disabled: 'bg-ltz-bg-tertiary text-ltz-text-muted cursor-not-allowed hover:scale-100',
        loading: 'ltz-bg-gradient-primary/80 text-white cursor-wait hover:scale-100',
        cantAfford: [
          'bg-orange-500/20 text-orange-400 border-2 border-orange-500/30',
          'hover:bg-orange-500/30',
        ],
        soldOut: 'bg-red-500/20 text-red-400 cursor-not-allowed hover:scale-100',
        success: 'bg-emerald-500 text-white',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

// ============================================
// Favorite Button Styles
// ============================================

export const cardFavoriteButtonStyles = cva(
  [
    'p-2.5 rounded-full transition-all duration-300',
    'border-2 shadow-lg',
    'hover:scale-125 active:scale-110',
    'focus:outline-none focus:ring-2 focus:ring-ltz-pink/50 focus:ring-offset-2',
  ],
  {
    variants: {
      isFavorited: {
        true: [
          'bg-gradient-to-br from-ltz-pink to-pink-600',
          'border-ltz-pink/70 hover:border-white',
          'shadow-ltz-pink/30 hover:shadow-ltz-pink/50',
        ],
        false: ['bg-ltz-bg-primary/95 border-white/30', 'hover:border-ltz-pink/30'],
      },
      position: {
        'top-right': 'absolute top-3 right-3 z-10',
        'top-left': 'absolute top-3 left-3 z-10',
        inline: '',
      },
    },
    defaultVariants: {
      isFavorited: false,
      position: 'top-right',
    },
  }
);

// ============================================
// Badges Container Styles
// ============================================

export const cardBadgesContainerStyles = cva('flex flex-wrap gap-2', {
  variants: {
    position: {
      'top-left': 'absolute top-3 left-3 z-10',
      'top-right': 'absolute top-3 right-3 z-10',
      inline: '',
    },
  },
  defaultVariants: {
    position: 'top-left',
  },
});
