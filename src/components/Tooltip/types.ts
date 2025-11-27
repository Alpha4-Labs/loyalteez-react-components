import type { HTMLAttributes, ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * Tooltip content
   */
  content: ReactNode;

  /**
   * The trigger element
   */
  children: ReactNode;

  /**
   * Position relative to trigger
   * @default 'top'
   */
  position?: TooltipPosition;

  /**
   * Alignment along the position axis
   * @default 'center'
   */
  align?: TooltipAlign;

  /**
   * Delay before showing (ms)
   * @default 200
   */
  delayShow?: number;

  /**
   * Delay before hiding (ms)
   * @default 0
   */
  delayHide?: number;

  /**
   * Max width of tooltip
   * @default 250
   */
  maxWidth?: number;

  /**
   * Show arrow pointer
   * @default true
   */
  showArrow?: boolean;

  /**
   * Disable the tooltip
   * @default false
   */
  disabled?: boolean;

  /**
   * Controlled open state
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Close on click
   * @default false
   */
  closeOnClick?: boolean;
}

export interface InfoTooltipProps extends Omit<TooltipProps, 'children'> {
  /**
   * Icon size
   * @default 16
   */
  iconSize?: number;

  /**
   * Icon color class
   * @default 'text-ltz-text-muted'
   */
  iconClassName?: string;
}
