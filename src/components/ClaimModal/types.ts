import type { HTMLAttributes, ReactNode } from 'react';

export type ClaimState = 'idle' | 'confirming' | 'processing' | 'success' | 'error';
export type ModalSize = 'sm' | 'md' | 'lg';

export interface ClaimItem {
  /** Item identifier */
  id: string;
  /** Item title */
  title: string;
  /** Item description */
  description?: string;
  /** Item image */
  image?: string;
  /** Cost in points/tokens */
  cost: number;
  /** Cost label (e.g., "LTZ") */
  costLabel?: string;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

export interface ClaimModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Close handler
   */
  onClose: () => void;

  /**
   * Item being claimed
   */
  item: ClaimItem;

  /**
   * Current claim state
   * @default 'idle'
   */
  state?: ClaimState;

  /**
   * User's current balance
   */
  userBalance?: number;

  /**
   * Confirm/claim handler
   */
  onConfirm?: () => void;

  /**
   * Error message (when state is 'error')
   */
  errorMessage?: string;

  /**
   * Transaction hash (when state is 'success' or 'processing')
   */
  transactionHash?: string;

  /**
   * Block explorer URL template (use {hash} as placeholder)
   */
  explorerUrlTemplate?: string;

  /**
   * Success message override
   */
  successMessage?: string;

  /**
   * Estimated time in seconds
   */
  estimatedTime?: number;

  /**
   * Custom content for each state
   */
  customContent?: {
    idle?: ReactNode;
    confirming?: ReactNode;
    processing?: ReactNode;
    success?: ReactNode;
    error?: ReactNode;
  };

  /**
   * Size variant
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Show confetti on success
   * @default true
   */
  showConfetti?: boolean;

  /**
   * Close on backdrop click
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Close on success automatically after delay (ms, 0 = no auto-close)
   * @default 3000
   */
  autoCloseOnSuccess?: number;

  /**
   * Custom button labels
   */
  labels?: {
    confirm?: string;
    cancel?: string;
    close?: string;
    retry?: string;
  };
}

export const DEFAULT_LABELS = {
  confirm: 'Claim Now',
  cancel: 'Cancel',
  close: 'Done',
  retry: 'Try Again',
};

export const STATE_CONFIG = {
  idle: {
    icon: null,
    title: 'Claim Reward',
    description: 'Review your claim details',
  },
  confirming: {
    icon: null,
    title: 'Confirm Claim',
    description: 'Please confirm this transaction',
  },
  processing: {
    icon: 'loading',
    title: 'Processing',
    description: 'Your transaction is being processed...',
  },
  success: {
    icon: 'success',
    title: 'Claimed!',
    description: 'Your reward has been claimed successfully',
  },
  error: {
    icon: 'error',
    title: 'Something went wrong',
    description: 'The transaction could not be completed',
  },
} as const;
