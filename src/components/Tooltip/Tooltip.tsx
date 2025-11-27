'use client';

import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  cloneElement,
  isValidElement,
} from 'react';
import { cn } from '@/utils/cn';
import type { TooltipProps, InfoTooltipProps, TooltipPosition, TooltipAlign } from './types';

// Position styles
function getPositionStyles(position: TooltipPosition, align: TooltipAlign): string {
  const positionMap = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  const alignMapHorizontal = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  const alignMapVertical = {
    start: 'top-0',
    center: 'top-1/2 -translate-y-1/2',
    end: 'bottom-0',
  };

  const isVertical = position === 'top' || position === 'bottom';
  const alignMap = isVertical ? alignMapHorizontal : alignMapVertical;

  return `${positionMap[position]} ${alignMap[align]}`;
}

// Arrow styles
function getArrowStyles(position: TooltipPosition): string {
  const arrowMap = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-ltz-bg-tertiary border-x-transparent border-b-transparent',
    bottom:
      'bottom-full left-1/2 -translate-x-1/2 border-b-ltz-bg-tertiary border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-ltz-bg-tertiary border-y-transparent border-r-transparent',
    right:
      'right-full top-1/2 -translate-y-1/2 border-r-ltz-bg-tertiary border-y-transparent border-l-transparent',
  };

  return arrowMap[position];
}

/**
 * A lightweight tooltip component for displaying additional information.
 *
 * @example
 * // Basic usage
 * <Tooltip content="This is helpful information">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 * @example
 * // With position and alignment
 * <Tooltip content="Info" position="bottom" align="start">
 *   <span>Target</span>
 * </Tooltip>
 *
 * @example
 * // Rich content
 * <Tooltip content={<div><strong>Title</strong><p>Description</p></div>}>
 *   <InfoIcon />
 * </Tooltip>
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = 'top',
      align = 'center',
      delayShow = 200,
      delayHide = 0,
      maxWidth = 250,
      showArrow = true,
      disabled = false,
      open: controlledOpen,
      onOpenChange,
      closeOnClick = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalOpen(value);
        }
        onOpenChange?.(value);
      },
      [isControlled, onOpenChange]
    );

    const clearTimeouts = useCallback(() => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    }, []);

    const handleMouseEnter = useCallback(() => {
      if (disabled) return;
      clearTimeouts();
      showTimeoutRef.current = setTimeout(() => setOpen(true), delayShow);
    }, [disabled, clearTimeouts, setOpen, delayShow]);

    const handleMouseLeave = useCallback(() => {
      clearTimeouts();
      hideTimeoutRef.current = setTimeout(() => setOpen(false), delayHide);
    }, [clearTimeouts, setOpen, delayHide]);

    const handleFocus = useCallback(() => {
      if (disabled) return;
      clearTimeouts();
      setOpen(true);
    }, [disabled, clearTimeouts, setOpen]);

    const handleBlur = useCallback(() => {
      clearTimeouts();
      setOpen(false);
    }, [clearTimeouts, setOpen]);

    const handleClick = useCallback(() => {
      if (closeOnClick) {
        setOpen(false);
      }
    }, [closeOnClick, setOpen]);

    useEffect(() => {
      return () => clearTimeouts();
    }, [clearTimeouts]);

    if (disabled) {
      return <>{children}</>;
    }

    // Clone child to add event handlers
    const trigger = isValidElement(children)
      ? cloneElement(children as React.ReactElement<Record<string, unknown>>, {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onFocus: handleFocus,
          onBlur: handleBlur,
          onClick: handleClick,
          'aria-describedby': isOpen ? 'tooltip' : undefined,
        })
      : children;

    return (
      <div ref={ref} className={cn('relative inline-flex', className)} {...props}>
        {trigger}

        {/* Tooltip */}
        {isOpen && (
          <div
            id="tooltip"
            role="tooltip"
            className={cn(
              'absolute z-50 rounded-lg bg-ltz-bg-tertiary px-3 py-2 text-sm text-ltz-text-primary shadow-lg',
              'pointer-events-none animate-ltz-fade-in',
              getPositionStyles(position, align)
            )}
            style={{ maxWidth }}
          >
            {content}

            {/* Arrow */}
            {showArrow && (
              <div className={cn('absolute h-0 w-0 border-4', getArrowStyles(position))} />
            )}
          </div>
        )}
      </div>
    );
  }
);
Tooltip.displayName = 'Tooltip';

/**
 * A tooltip with an info icon trigger.
 *
 * @example
 * <InfoTooltip content="This perk costs 500 LTZ" />
 */
export const InfoTooltip = forwardRef<HTMLDivElement, InfoTooltipProps>(
  ({ iconSize = 16, iconClassName = 'text-ltz-text-muted', ...props }, ref) => {
    return (
      <Tooltip ref={ref} {...props}>
        <button
          type="button"
          className={cn(
            'focus:ring-ltz-purple/50 inline-flex items-center justify-center rounded-full transition-colors hover:text-ltz-text-secondary focus:outline-none focus:ring-2',
            iconClassName
          )}
          aria-label="More information"
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Tooltip>
    );
  }
);
InfoTooltip.displayName = 'InfoTooltip';
