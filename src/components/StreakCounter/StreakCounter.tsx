'use client';

import { forwardRef, useMemo, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { FlameIcon } from './FlameIcon';
import {
  streakContainerStyles,
  streakNumberStyles,
  streakLabelStyles,
  streakMessageStyles,
  flameContainerStyles,
  milestoneContainerStyles,
  milestoneIndicatorStyles,
  breakWarningStyles,
  bestStreakStyles,
} from './StreakCounter.styles';
import { DEFAULT_MILESTONES, DEFAULT_MESSAGES, getFlameIntensity, getStreakMessage } from './types';
import type { StreakCounterProps, StreakMilestone } from './types';

/**
 * A gamification component for displaying user streaks with animated flame effects.
 *
 * @example
 * // Basic usage
 * <StreakCounter streak={7} />
 *
 * @example
 * // With all options
 * <StreakCounter
 *   streak={14}
 *   streakType="daily"
 *   size="lg"
 *   showFlame
 *   showMilestones
 *   showMessage
 *   bestStreak={21}
 *   animated
 * />
 *
 * @example
 * // Custom milestones
 * <StreakCounter
 *   streak={5}
 *   milestones={[3, 7, 14, 30]}
 *   onMilestoneReached={(milestone) => console.log(`Reached ${milestone}!`)}
 * />
 *
 * @example
 * // With break warning
 * <StreakCounter
 *   streak={10}
 *   breakWarning={{ hoursRemaining: 4, show: true }}
 * />
 */
export const StreakCounter = forwardRef<HTMLDivElement, StreakCounterProps>(
  (
    {
      streak,
      streakType = 'daily',
      typeLabel,
      size = 'md',
      showFlame = true,
      flameIntensity: providedIntensity,
      milestones = DEFAULT_MILESTONES,
      showMilestones = true,
      showMessage = true,
      messages = DEFAULT_MESSAGES,
      bestStreak,
      animated = true,
      onMilestoneReached,
      breakWarning,
      className,
      ...props
    },
    ref
  ) => {
    // Calculate intensity
    const intensity = providedIntensity ?? getFlameIntensity(streak);

    // Animated counter state
    const [displayCount, setDisplayCount] = useState(animated ? 0 : streak);
    const prevStreak = useRef(streak);

    // Animate counter on change
    useEffect(() => {
      if (!animated) {
        setDisplayCount(streak);
        return;
      }

      const start = prevStreak.current;
      const end = streak;
      const duration = 500; // ms
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * eased);

        setDisplayCount(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      prevStreak.current = streak;
    }, [streak, animated]);

    // Get label
    const label = useMemo(() => {
      if (typeLabel) return typeLabel;
      if (streakType === 'daily') return 'Day Streak';
      if (streakType === 'weekly') return 'Week Streak';
      return 'Streak';
    }, [typeLabel, streakType]);

    // Get message
    const message = useMemo(
      () => getStreakMessage(streak, { ...DEFAULT_MESSAGES, ...messages }),
      [streak, messages]
    );

    // Normalize milestones
    const normalizedMilestones = useMemo<StreakMilestone[]>(() => {
      return milestones.map((m) => (typeof m === 'number' ? { count: m, label: `${m}` } : m));
    }, [milestones]);

    // Check for milestone reached
    useEffect(() => {
      if (onMilestoneReached) {
        const reachedMilestone = normalizedMilestones.find((m) => m.count === streak);
        if (reachedMilestone) {
          onMilestoneReached(reachedMilestone.count);
        }
      }
    }, [streak, normalizedMilestones, onMilestoneReached]);

    // Find current milestone progress
    const milestoneProgress = useMemo(() => {
      const sorted = [...normalizedMilestones].sort((a, b) => a.count - b.count);
      let current = 0;
      for (const m of sorted) {
        if (streak >= m.count) current = m.count;
      }
      const nextMilestone = sorted.find((m) => m.count > streak);
      return { current, next: nextMilestone?.count || null };
    }, [streak, normalizedMilestones]);

    return (
      <div
        ref={ref}
        className={cn(streakContainerStyles({ size, intensity }), className)}
        {...props}
      >
        {/* Flame Icon */}
        {showFlame && (
          <div className={cn(flameContainerStyles({ size, intensity }))}>
            <FlameIcon intensity={intensity} className="h-full w-full" />
          </div>
        )}

        {/* Streak Number */}
        <div className="flex items-baseline gap-1">
          <span className={cn(streakNumberStyles({ size, intensity }))}>{displayCount}</span>
        </div>

        {/* Label */}
        <span className={cn(streakLabelStyles({ size, intensity }))}>{label}</span>

        {/* Message */}
        {showMessage && streak > 0 && (
          <span className={cn(streakMessageStyles({ size, intensity }))}>{message}</span>
        )}

        {/* Milestone Indicators */}
        {showMilestones && normalizedMilestones.length > 0 && (
          <div className={cn(milestoneContainerStyles({ size }))}>
            {normalizedMilestones
              .sort((a, b) => a.count - b.count)
              .slice(0, 5)
              .map((milestone) => (
                <div
                  key={milestone.count}
                  className={cn(
                    milestoneIndicatorStyles({
                      size,
                      reached: streak >= milestone.count,
                      current: milestoneProgress.next === milestone.count,
                    })
                  )}
                  title={`${milestone.label}${milestone.reward ? ` - ${milestone.reward}` : ''}`}
                />
              ))}
          </div>
        )}

        {/* Best Streak */}
        {bestStreak !== undefined && bestStreak > streak && (
          <div className={cn(bestStreakStyles({ size }), 'mt-2')}>
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Best: {bestStreak}
          </div>
        )}

        {/* Break Warning */}
        {breakWarning?.show && (
          <div
            className={cn(
              breakWarningStyles({
                size,
                urgent: breakWarning.hoursRemaining <= 6,
              })
            )}
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {breakWarning.hoursRemaining}h left
          </div>
        )}
      </div>
    );
  }
);

StreakCounter.displayName = 'StreakCounter';
