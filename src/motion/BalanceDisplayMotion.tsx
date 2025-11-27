'use client';

import { forwardRef } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { formatLTZ, formatCompact, formatLTZAsDollars } from '@/utils/formatLTZ';
import {
  balanceDisplayStyles,
  balanceValueStyles,
  balanceLabelStyles,
  dollarValueStyles,
  skeletonStyles,
} from '@/components/BalanceDisplay/BalanceDisplay.styles';
import type { BalanceDisplayProps } from '@/components/BalanceDisplay/types';

/**
 * Enhanced BalanceDisplay with Framer Motion animations.
 * Requires framer-motion as a peer dependency.
 *
 * @example
 * import { BalanceDisplayMotion } from '@loyalteez/react-components/motion';
 *
 * <BalanceDisplayMotion balance={5420} showDollarValue />
 */
export const BalanceDisplayMotion = forwardRef<HTMLDivElement, BalanceDisplayProps>(
  (
    {
      balance,
      showDollarValue = false,
      size = 'md',
      animated: _animated = true, // Default to true for motion variant (unused, always animated)
      loading = false,
      showLabel = true,
      compact = false,
      className,
      // Destructure event handlers that conflict with framer-motion
      onDrag: _onDrag,
      onDragStart: _onDragStart,
      onDragEnd: _onDragEnd,
      onAnimationStart: _onAnimationStart,
      ...props
    },
    ref
  ) => {
    // Spring animation for smooth number transitions
    const springValue = useSpring(balance, {
      stiffness: 100,
      damping: 30,
      mass: 1,
    });

    const displayValue = useTransform(springValue, (v) => Math.round(v));
    const formattedBalance = useTransform(displayValue, (v) =>
      compact ? formatCompact(v) : formatLTZ(v)
    );
    const dollarValue = useTransform(displayValue, (v) => formatLTZAsDollars(v));

    if (loading) {
      return (
        <motion.div
          ref={ref}
          className={cn(balanceDisplayStyles({ size }), className)}
          role="status"
          aria-label="Loading balance"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          {...props}
        >
          <motion.div
            className={skeletonStyles({ size })}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {showDollarValue && (
            <motion.div
              className={cn(skeletonStyles({ size }), 'h-4 w-16')}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(balanceDisplayStyles({ size }), className)}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      >
        <div className={balanceValueStyles({ size })}>
          <motion.span aria-label={`${balance} LTZ`}>{formattedBalance}</motion.span>
          {showLabel && (
            <motion.span
              className={balanceLabelStyles({ size })}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              LTZ
            </motion.span>
          )}
        </div>
        <AnimatePresence>
          {showDollarValue && (
            <motion.span
              className={dollarValueStyles({ size })}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ delay: 0.15 }}
            >
              <motion.span>{dollarValue}</motion.span>
              <span> value</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

BalanceDisplayMotion.displayName = 'BalanceDisplayMotion';
