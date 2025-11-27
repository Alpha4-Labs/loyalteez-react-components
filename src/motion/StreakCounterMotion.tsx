'use client';

import { forwardRef, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import {
  streakContainerStyles,
  flameContainerStyles,
  streakNumberStyles,
  streakLabelStyles,
  milestoneIndicatorStyles,
  milestoneContainerStyles,
  breakWarningStyles,
  bestStreakStyles,
} from '@/components/StreakCounter/StreakCounter.styles';
import {
  DEFAULT_MILESTONES,
  DEFAULT_MESSAGES,
  getFlameIntensity,
  getStreakMessage,
} from '@/components/StreakCounter/types';
import type { StreakCounterProps, StreakMilestone } from '@/components/StreakCounter/types';

// Animated Flame Icon with physics
function AnimatedFlameIcon({
  intensity,
  className,
}: {
  intensity: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
}) {
  const flameColors = {
    0: { outer: '#888', inner: '#999', core: '#AAA' },
    1: { outer: '#FF6B35', inner: '#FF9F1C', core: '#FFE66D' },
    2: { outer: '#FF5722', inner: '#FF9800', core: '#FFEB3B' },
    3: { outer: '#F44336', inner: '#FF5722', core: '#FF9800' },
    4: { outer: '#E91E63', inner: '#F44336', core: '#FF5722' },
    5: { outer: '#9C27B0', inner: '#E91E63', core: '#F44336' },
  };

  const colors = flameColors[intensity];

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: 1,
        rotate: [-2, 2, -2],
      }}
      transition={{
        scale: { duration: 0.5 + intensity * 0.1, repeat: Infinity, repeatType: 'reverse' },
        rotate: { duration: 0.3, repeat: Infinity, repeatType: 'reverse' },
        opacity: { duration: 0.3 },
      }}
    >
      {/* Outer flame */}
      <motion.path
        d="M12 2C12 2 8 6 8 10C8 12 9 14 10 15C9 14 8 12 8 10C8 8 10 6 12 4C14 6 16 8 16 10C16 12 15 14 14 15C15 14 16 12 16 10C16 6 12 2 12 2Z"
        fill={colors.outer}
        animate={{
          d: [
            'M12 2C12 2 8 6 8 10C8 12 9 14 10 15C9 14 8 12 8 10C8 8 10 6 12 4C14 6 16 8 16 10C16 12 15 14 14 15C15 14 16 12 16 10C16 6 12 2 12 2Z',
            'M12 1C12 1 7 5 7 10C7 13 9 15 10 16C9 15 7 13 7 10C7 7 10 5 12 3C14 5 17 7 17 10C17 13 15 15 14 16C15 15 17 13 17 10C17 5 12 1 12 1Z',
          ],
        }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
      />
      {/* Inner flame */}
      <motion.path
        d="M12 6C12 6 10 8 10 11C10 13 11 14 12 15C13 14 14 13 14 11C14 8 12 6 12 6Z"
        fill={colors.inner}
        animate={{
          scale: [1, 1.15, 1],
          y: [0, -1, 0],
        }}
        transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
      />
      {/* Core flame */}
      <motion.path
        d="M12 10C12 10 11 11 11 12.5C11 13.5 11.5 14 12 14.5C12.5 14 13 13.5 13 12.5C13 11 12 10 12 10Z"
        fill={colors.core}
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse' }}
      />
    </motion.svg>
  );
}

/**
 * Enhanced StreakCounter with Framer Motion animations.
 * Features physics-based flame animation, smooth number transitions,
 * and animated milestone celebrations.
 *
 * @example
 * import { StreakCounterMotion } from '@loyalteez/react-components/motion';
 *
 * <StreakCounterMotion
 *   streak={14}
 *   bestStreak={21}
 *   onMilestoneReached={(count) => celebrate(count)}
 * />
 */
export const StreakCounterMotion = forwardRef<HTMLDivElement, StreakCounterProps>(
  (
    {
      streak,
      streakType = 'daily',
      size = 'md',
      showFlame = true,
      showMilestones = true,
      showMessage = true,
      milestones = DEFAULT_MILESTONES,
      messages = DEFAULT_MESSAGES,
      bestStreak,
      breakWarning,
      onMilestoneReached,
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
    const intensity = getFlameIntensity(streak);
    const mergedMessages = { ...DEFAULT_MESSAGES, ...messages };
    const message = showMessage ? getStreakMessage(streak, mergedMessages) : null;

    // Spring animation for smooth number transitions
    const springValue = useSpring(streak, {
      stiffness: 120,
      damping: 20,
      mass: 0.5,
    });
    const displayCount = useTransform(springValue, (v) => Math.round(v));

    // Normalize milestones
    const normalizedMilestones: StreakMilestone[] = milestones.map((m) =>
      typeof m === 'number' ? { count: m, label: `${m}` } : m
    );

    // Check for milestone reached
    useEffect(() => {
      if (onMilestoneReached) {
        const reachedMilestone = normalizedMilestones.find((m) => m.count === streak);
        if (reachedMilestone) {
          onMilestoneReached(reachedMilestone.count);
        }
      }
    }, [streak, normalizedMilestones, onMilestoneReached]);

    const streakTypeLabel = streakType === 'daily' ? 'day' : streakType === 'weekly' ? 'week' : '';

    return (
      <motion.div
        ref={ref}
        className={cn(streakContainerStyles({ size }), className)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      >
        {/* Flame Icon */}
        {showFlame && (
          <div className={cn(flameContainerStyles({ size, intensity }))}>
            <AnimatedFlameIcon intensity={intensity} className="h-full w-full" />
          </div>
        )}

        {/* Streak Number */}
        <div className="flex items-baseline gap-1">
          <motion.span
            className={cn(streakNumberStyles({ size, intensity }))}
            key={streak}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {displayCount}
          </motion.span>
          {streakTypeLabel && (
            <span className={cn(streakLabelStyles({ size }))}>
              {streak === 1 ? streakTypeLabel : `${streakTypeLabel}s`}
            </span>
          )}
        </div>

        {/* Message */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.span
              key={message}
              className={cn(streakLabelStyles({ size }), 'text-center')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {message}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Milestones */}
        {showMilestones && normalizedMilestones.length > 0 && (
          <div className={cn(milestoneContainerStyles({ size }), 'mt-2')}>
            {normalizedMilestones.map((milestone, i) => {
              const reached = streak >= milestone.count;
              return (
                <motion.div
                  key={milestone.count}
                  className={cn(milestoneIndicatorStyles({ size, reached }))}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 400, damping: 15 }}
                  whileHover={{ scale: 1.2 }}
                  title={`${milestone.count} ${streakTypeLabel}${milestone.count !== 1 ? 's' : ''}`}
                >
                  {reached && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 10 }}
                    >
                      🔥
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Best Streak */}
        <AnimatePresence>
          {bestStreak !== undefined && bestStreak > streak && (
            <motion.div
              className={cn(bestStreakStyles({ size }), 'mt-2')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Best: {bestStreak}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Break Warning */}
        <AnimatePresence>
          {breakWarning?.show && (
            <motion.div
              className={cn(
                breakWarningStyles({ size, urgent: (breakWarning.hoursRemaining ?? 24) <= 4 })
              )}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{ opacity: 0, y: -10 }}
            >
              <motion.svg
                className="h-3 w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </motion.svg>
              {`${breakWarning.hoursRemaining}h left`}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

StreakCounterMotion.displayName = 'StreakCounterMotion';
