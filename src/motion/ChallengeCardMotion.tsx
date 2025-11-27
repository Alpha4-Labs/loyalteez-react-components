'use client';

import { forwardRef, useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/utils/cn';
import { formatLTZ } from '@/utils/formatLTZ';
import {
  challengeCardStyles,
  challengeHeaderStyles,
  challengeIconStyles,
  challengeTitleStyles,
  challengeDescriptionStyles,
  challengeTimerStyles,
  challengeProgressStyles,
  challengeProgressBarStyles,
  challengeProgressFillStyles,
  challengeRewardStyles,
  challengeRewardAmountStyles,
  challengeClaimButtonStyles,
  difficultyBadgeStyles,
  categoryBadgeStyles,
} from '@/components/ChallengeCard/ChallengeCard.styles';
import { DIFFICULTY_CONFIG } from '@/components/ChallengeCard/types';
import type { ChallengeCardProps } from '@/components/ChallengeCard/types';

// Timer hook
function useCountdown(endTime?: string | Date) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    if (!endTime) {
      setTimeLeft(null);
      return;
    }

    const calculateTimeLeft = () => {
      const end = new Date(endTime).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        total: diff,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}

function formatTimeDisplay(timeLeft: ReturnType<typeof useCountdown>): string {
  if (!timeLeft) return '--:--:--';
  if (timeLeft.total <= 0) return 'Expired';

  if (timeLeft.days > 0) {
    return `${timeLeft.days}d ${timeLeft.hours}h`;
  }
  if (timeLeft.hours > 0) {
    return `${timeLeft.hours}h ${timeLeft.minutes}m`;
  }
  return `${timeLeft.minutes}m ${timeLeft.seconds}s`;
}

// Animated progress bar with spring physics
function AnimatedProgressBar({
  progress,
  status,
  size,
}: {
  progress: number;
  status: string;
  size: string;
}) {
  const springProgress = useSpring(progress, { stiffness: 100, damping: 30 });
  const width = useTransform(springProgress, (v) => `${Math.min(100, v)}%`);

  return (
    <div className={cn(challengeProgressBarStyles({ size: size as 'sm' | 'md' | 'lg' }))}>
      <motion.div
        className={cn(challengeProgressFillStyles({ status: status as 'active' | 'completed' | 'expired' | 'locked' }))}
        style={{ width }}
        initial={{ width: 0 }}
        transition={{ duration: 0.5 }}
      />
      {/* Shimmer effect */}
      {status === 'active' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
      )}
    </div>
  );
}

/**
 * Enhanced ChallengeCard with Framer Motion animations.
 * Features animated progress bars, pulsing timers, and spring physics.
 *
 * @example
 * import { ChallengeCardMotion } from '@loyalteez/react-components/motion';
 *
 * <ChallengeCardMotion
 *   challenge={challengeData}
 *   onClaim={handleClaim}
 * />
 */
export const ChallengeCardMotion = forwardRef<HTMLDivElement, ChallengeCardProps>(
  (
    {
      challenge,
      size = 'md',
      showTimer = true,
      showProgress = true,
      showDifficulty = true,
      showReward = true,
      animated: _animated = true,
      onClaim,
      onCardClick,
      claimLabel,
      isClaiming = false,
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
    const timeLeft = useCountdown(challenge.endTime);
    const isUrgent = timeLeft && timeLeft.total > 0 && timeLeft.total < 1000 * 60 * 60;

    const progressPercent = useMemo(() => {
      if (challenge.goal) {
        return Math.min(100, (challenge.progress / challenge.goal) * 100);
      }
      return Math.min(100, challenge.progress);
    }, [challenge.progress, challenge.goal]);

    const canClaim = challenge.status === 'completed' || progressPercent >= 100;

    const buttonState = useMemo(() => {
      if (isClaiming) return 'loading';
      if (canClaim && challenge.status !== 'expired') return 'ready';
      return 'disabled';
    }, [canClaim, challenge.status, isClaiming]);

    const buttonLabel = useMemo(() => {
      if (claimLabel) return claimLabel;
      if (isClaiming) return 'Claiming...';
      if (challenge.status === 'completed') return 'Claimed ✓';
      if (challenge.status === 'expired') return 'Expired';
      if (challenge.status === 'locked') return 'Locked';
      if (canClaim) return 'Claim Reward';
      return `${Math.round(progressPercent)}%`;
    }, [claimLabel, isClaiming, challenge.status, canClaim, progressPercent]);

    const handleClick = () => {
      if (onCardClick) onCardClick(challenge);
    };

    const handleClaim = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onClaim && canClaim && !isClaiming && challenge.status !== 'completed') {
        onClaim(challenge.id);
      }
    };

    const difficultyConfig = challenge.difficulty ? DIFFICULTY_CONFIG[challenge.difficulty] : null;

    return (
      <motion.div
        ref={ref}
        className={cn(
          challengeCardStyles({
            size,
            status: challenge.status,
            clickable: !!onCardClick,
          }),
          className
        )}
        onClick={onCardClick ? handleClick : undefined}
        role={onCardClick ? 'button' : undefined}
        tabIndex={onCardClick ? 0 : undefined}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={onCardClick ? { scale: 1.02, y: -4 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        {...props}
      >
        {/* Header */}
        <div className={cn(challengeHeaderStyles({ size }))}>
          {/* Icon */}
          <motion.div
            className={cn(challengeIconStyles({ size, status: challenge.status }))}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
          >
            {challenge.icon || '🎯'}
          </motion.div>

          {/* Title & Description */}
          <div className="min-w-0 flex-grow">
            {challenge.category && (
              <motion.span
                className={cn(categoryBadgeStyles({ size }))}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                {challenge.category}
              </motion.span>
            )}
            <motion.h3
              className={cn(challengeTitleStyles({ size, status: challenge.status }))}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {challenge.title}
            </motion.h3>
            {challenge.description && (
              <motion.p
                className={cn(challengeDescriptionStyles({ size }))}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {challenge.description}
              </motion.p>
            )}
          </div>

          {/* Timer / Difficulty */}
          <div className="flex flex-shrink-0 flex-col items-end gap-1">
            {showTimer && challenge.endTime && challenge.status === 'active' && (
              <motion.div
                className={cn(challengeTimerStyles({ size, urgent: isUrgent ?? false }))}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: isUrgent ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  scale: isUrgent ? { duration: 0.5, repeat: Infinity } : {},
                }}
              >
                <motion.svg
                  className="h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  animate={isUrgent ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </motion.svg>
                {formatTimeDisplay(timeLeft)}
              </motion.div>
            )}
            {showDifficulty && difficultyConfig && (
              <motion.span
                className={cn(difficultyBadgeStyles({ size }), difficultyConfig.color)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {difficultyConfig.icon} {difficultyConfig.label}
              </motion.span>
            )}
          </div>
        </div>

        {/* Progress */}
        {showProgress && (
          <motion.div
            className={cn(challengeProgressStyles({ size }))}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <div className="mb-1 flex items-center justify-between text-xs text-ltz-text-muted">
              <span>Progress</span>
              <motion.span
                className="font-medium tabular-nums"
                key={progressPercent}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {challenge.goal
                  ? `${challenge.progress}/${challenge.goal}`
                  : `${Math.round(progressPercent)}%`}
              </motion.span>
            </div>
            <AnimatedProgressBar progress={progressPercent} status={challenge.status} size={size} />
          </motion.div>
        )}

        {/* Reward */}
        {showReward && (
          <motion.div
            className={cn(challengeRewardStyles({ size }))}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-ltz-text-muted">Reward:</span>
              <motion.span
                className={cn(challengeRewardAmountStyles({ size }))}
                animate={canClaim ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: canClaim ? Infinity : 0, repeatDelay: 2 }}
              >
                {formatLTZ(challenge.reward.amount)}
              </motion.span>
              {challenge.reward.type && (
                <span className="text-xs text-ltz-text-muted">{challenge.reward.type}</span>
              )}
              {challenge.reward.icon}
            </div>

            <motion.button
              type="button"
              onClick={handleClaim}
              disabled={buttonState === 'disabled' || buttonState === 'loading'}
              className={cn(challengeClaimButtonStyles({ size, state: buttonState }))}
              whileHover={buttonState === 'ready' ? { scale: 1.05 } : {}}
              whileTap={buttonState === 'ready' ? { scale: 0.95 } : {}}
            >
              {buttonState === 'loading' && (
                <motion.svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </motion.svg>
              )}
              {buttonLabel}
            </motion.button>
          </motion.div>
        )}

        {/* Locked Overlay */}
        <AnimatePresence>
          {challenge.status === 'locked' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-ltz-bg-primary/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.svg
                  className="mx-auto mb-2 h-8 w-8 text-ltz-text-muted"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </motion.svg>
                <span className="text-sm font-medium text-ltz-text-muted">Locked</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

ChallengeCardMotion.displayName = 'ChallengeCardMotion';

