import type { ReactNode } from 'react';

export type ToastType = 'reward' | 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export interface Toast {
  /** Unique identifier */
  id: string;
  /** Toast type */
  type: ToastType;
  /** Title text */
  title: string;
  /** Description/message */
  description?: string;
  /** Custom icon */
  icon?: ReactNode;
  /** Duration in ms (0 = persistent) */
  duration?: number;
  /** Show confetti burst */
  confetti?: boolean;
  /** Custom action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Timestamp */
  createdAt: number;
}

export interface ToastOptions {
  /** Title text */
  title: string;
  /** Description/message */
  description?: string;
  /** Custom icon */
  icon?: ReactNode;
  /** Duration in ms */
  duration?: number;
  /** Show confetti */
  confetti?: boolean;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface RewardToastOptions extends Omit<ToastOptions, 'title'> {
  /** Reward amount */
  amount: number;
  /** Reward label (e.g., "LTZ", "Points") */
  label?: string;
  /** Description */
  description?: string;
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (type: ToastType, options: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
  // Convenience methods
  reward: (options: RewardToastOptions) => string;
  success: (options: ToastOptions) => string;
  error: (options: ToastOptions) => string;
  warning: (options: ToastOptions) => string;
  info: (options: ToastOptions) => string;
}

export interface ToastProviderProps {
  children: ReactNode;
  /** Default position for toasts */
  position?: ToastPosition;
  /** Default duration in ms */
  defaultDuration?: number;
  /** Maximum visible toasts */
  maxToasts?: number;
}

export interface RewardToastProps {
  toast: Toast;
  onClose: () => void;
  position: ToastPosition;
}

// Type configs
export const TOAST_TYPE_CONFIG = {
  reward: {
    icon: '🎁',
    bgClass: 'bg-gradient-to-r from-ltz-purple/20 to-ltz-cyan/20 border-ltz-purple/30',
    iconBgClass: 'bg-ltz-purple/20',
  },
  success: {
    icon: '✓',
    bgClass: 'bg-emerald-500/10 border-emerald-500/30',
    iconBgClass: 'bg-emerald-500/20',
  },
  error: {
    icon: '✕',
    bgClass: 'bg-red-500/10 border-red-500/30',
    iconBgClass: 'bg-red-500/20',
  },
  warning: {
    icon: '⚠',
    bgClass: 'bg-orange-500/10 border-orange-500/30',
    iconBgClass: 'bg-orange-500/20',
  },
  info: {
    icon: 'ℹ',
    bgClass: 'bg-blue-500/10 border-blue-500/30',
    iconBgClass: 'bg-blue-500/20',
  },
} as const;
