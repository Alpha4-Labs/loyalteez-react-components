'use client';

import { forwardRef, useMemo, useState, useEffect } from 'react';
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
} from './ChallengeCard.styles';
import { DIFFICULTY_CONFIG } from './types';
import type { ChallengeCardProps } from './types';

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

// Format time display
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

/**
 * A challenge card component for displaying active challenges with timers and progress.
 *
 * @example
 * // Basic usage
 * <ChallengeCard
 *   challenge={{
 *     id: '1',
 *     title: 'Daily Login',
 *     description: 'Log in 7 days in a row',
 *     progress: 5,
 *     goal: 7,
 *     status: 'active',
 *     reward: { amount: 100 },
 *     endTime: '2024-12-31',
 *   }}
 *   onClaim={handleClaim}
 * />
 *
 * @example
 * // Completed challenge
 * <ChallengeCard
 *   challenge={{
 *     id: '2',
 *     title: 'First Purchase',
 *     progress: 100,
 *     status: 'completed',
 *     reward: { amount: 500 },
 *   }}
 *   onClaim={handleClaim}
 * />
 */
export const ChallengeCard = forwardRef<HTMLDivElement, ChallengeCardProps>(
  (
    {
      challenge,
      size = 'md',
      showTimer = true,
      showProgress = true,
      showDifficulty = true,
      showReward = true,
      animated = true,
      onClaim,
      onCardClick,
      claimLabel,
      isClaiming = false,
      className,
      ...props
    },
    ref
  ) => {
    const timeLeft = useCountdown(challenge.endTime);
    const isUrgent = timeLeft && timeLeft.total > 0 && timeLeft.total < 1000 * 60 * 60; // < 1 hour

    // Calculate progress percentage
    const progressPercent = useMemo(() => {
      if (challenge.goal) {
        return Math.min(100, (challenge.progress / challenge.goal) * 100);
      }
      return Math.min(100, challenge.progress);
    }, [challenge.progress, challenge.goal]);

    // Can claim?
    const canClaim = challenge.status === 'completed' || progressPercent >= 100;

    // Button state
    const buttonState = useMemo(() => {
      if (isClaiming) return 'loading';
      if (canClaim && challenge.status !== 'expired') return 'ready';
      return 'disabled';
    }, [canClaim, challenge.status, isClaiming]);

    // Button label
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
      <div
        ref={ref}
        className={cn(
          challengeCardStyles({
            size,
            status: challenge.status,
            clickable: !!onCardClick,
          }),
          animated && 'animate-ltz-fade-in',
          className
        )}
        onClick={onCardClick ? handleClick : undefined}
        role={onCardClick ? 'button' : undefined}
        tabIndex={onCardClick ? 0 : undefined}
        {...props}
      >
        {/* Header */}
        <div className={cn(challengeHeaderStyles({ size }))}>
          {/* Icon */}
          <div className={cn(challengeIconStyles({ size, status: challenge.status }))}>
            {challenge.icon || '🎯'}
          </div>

          {/* Title & Description */}
          <div className="min-w-0 flex-grow">
            {challenge.category && (
              <span className={cn(categoryBadgeStyles({ size }))}>{challenge.category}</span>
            )}
            <h3 className={cn(challengeTitleStyles({ size, status: challenge.status }))}>
              {challenge.title}
            </h3>
            {challenge.description && (
              <p className={cn(challengeDescriptionStyles({ size }))}>{challenge.description}</p>
            )}
          </div>

          {/* Timer / Difficulty */}
          <div className="flex flex-shrink-0 flex-col items-end gap-1">
            {showTimer && challenge.endTime && challenge.status === 'active' && (
              <div className={cn(challengeTimerStyles({ size, urgent: isUrgent ?? false }))}>
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {formatTimeDisplay(timeLeft)}
              </div>
            )}
            {showDifficulty && difficultyConfig && (
              <span className={cn(difficultyBadgeStyles({ size }), difficultyConfig.color)}>
                {difficultyConfig.icon} {difficultyConfig.label}
              </span>
            )}
          </div>
        </div>

        {/* Progress */}
        {showProgress && (
          <div className={cn(challengeProgressStyles({ size }))}>
            <div className="mb-1 flex items-center justify-between text-xs text-ltz-text-muted">
              <span>Progress</span>
              <span className="font-medium tabular-nums">
                {challenge.goal
                  ? `${challenge.progress}/${challenge.goal}`
                  : `${Math.round(progressPercent)}%`}
              </span>
            </div>
            <div className={cn(challengeProgressBarStyles({ size }))}>
              <div
                className={cn(challengeProgressFillStyles({ status: challenge.status }))}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Reward */}
        {showReward && (
          <div className={cn(challengeRewardStyles({ size }))}>
            <div className="flex items-center gap-2">
              <span className="text-sm text-ltz-text-muted">Reward:</span>
              <span className={cn(challengeRewardAmountStyles({ size }))}>
                {formatLTZ(challenge.reward.amount)}
              </span>
              {challenge.reward.type && (
                <span className="text-xs text-ltz-text-muted">{challenge.reward.type}</span>
              )}
              {challenge.reward.icon}
            </div>

            <button
              type="button"
              onClick={handleClaim}
              disabled={buttonState === 'disabled' || buttonState === 'loading'}
              className={cn(challengeClaimButtonStyles({ size, state: buttonState }))}
            >
              {buttonState === 'loading' && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
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
                </svg>
              )}
              {buttonLabel}
            </button>
          </div>
        )}

        {/* Locked Overlay */}
        {challenge.status === 'locked' && (
          <div className="absolute inset-0 flex items-center justify-center bg-ltz-bg-primary/50 backdrop-blur-sm">
            <div className="text-center">
              <svg
                className="mx-auto mb-2 h-8 w-8 text-ltz-text-muted"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-ltz-text-muted">Locked</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ChallengeCard.displayName = 'ChallengeCard';
