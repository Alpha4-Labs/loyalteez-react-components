'use client';

import { forwardRef, useMemo } from 'react';
import { cn } from '@/utils/cn';
import { formatLTZ } from '@/utils/formatLTZ';
import {
  leaderboardContainerStyles,
  leaderboardHeaderStyles,
  entryContainerStyles,
  rankStyles,
  medalStyles,
  avatarStyles,
  nameStyles,
  scoreStyles,
  scoreLabelStyles,
  rankChangeStyles,
  currentUserCardStyles,
  emptyStateStyles,
} from './Leaderboard.styles';
import { MEDAL_COLORS } from './types';
import type { LeaderboardProps, LeaderboardEntry, LeaderboardSize } from './types';

// Medal Icon Component
function MedalIcon({ rank, size }: { rank: 1 | 2 | 3; size: LeaderboardSize }) {
  const colors = MEDAL_COLORS[rank];

  return (
    <div
      className={cn(
        medalStyles({ size }),
        `bg-gradient-to-br ${colors.bg} ${colors.glow}`,
        colors.text
      )}
    >
      {rank}
    </div>
  );
}

// Rank Change Indicator
function RankChangeIndicator({
  currentRank,
  previousRank,
  size,
}: {
  currentRank: number;
  previousRank?: number;
  size: LeaderboardSize;
}) {
  if (previousRank === undefined) return null;

  const change = previousRank - currentRank;
  const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'same';

  if (direction === 'same') return null;

  return (
    <span className={cn(rankChangeStyles({ size, direction }))}>
      {direction === 'up' ? (
        <>
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {Math.abs(change)}
        </>
      ) : (
        <>
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {Math.abs(change)}
        </>
      )}
    </span>
  );
}

// Single Entry Component
function LeaderboardEntryRow({
  entry,
  isCurrentUser,
  showMedal,
  showRankChange,
  showAvatar,
  size,
  animated,
  animationDelay,
  scoreLabel,
  onClick,
}: {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
  showMedal: boolean;
  showRankChange: boolean;
  showAvatar: boolean;
  size: LeaderboardSize;
  animated: boolean;
  animationDelay: number;
  scoreLabel: string;
  onClick?: () => void;
}) {
  const isTopThree = entry.rank <= 3;
  const rankVariant = entry.rank <= 3 ? (entry.rank as 1 | 2 | 3) : 'default';

  return (
    <div
      className={cn(
        entryContainerStyles({
          size,
          isCurrentUser,
          isTopThree,
          clickable: !!onClick,
        }),
        animated && 'animate-ltz-slide-in-up'
      )}
      style={animated ? { animationDelay: `${animationDelay}ms` } : undefined}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Rank / Medal */}
      {showMedal && isTopThree ? (
        <MedalIcon rank={entry.rank as 1 | 2 | 3} size={size} />
      ) : (
        <span className={cn(rankStyles({ size, rank: rankVariant }))}>#{entry.rank}</span>
      )}

      {/* Avatar */}
      {showAvatar && (
        <div className={cn(avatarStyles({ size, isCurrentUser }))}>
          {entry.avatar ? (
            <img src={entry.avatar} alt={entry.name} className="h-full w-full object-cover" />
          ) : (
            <div className="from-ltz-purple to-ltz-cyan flex h-full w-full items-center justify-center bg-gradient-to-br text-sm font-bold text-white">
              {entry.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      )}

      {/* Name & Badge */}
      <div className="min-w-0 flex-grow">
        <div className="flex items-center gap-2">
          <span className={cn(nameStyles({ size, isCurrentUser }))}>
            {entry.name}
            {isCurrentUser && <span className="ml-1 text-xs text-ltz-text-muted">(You)</span>}
          </span>
          {entry.badge}
        </div>
        {showRankChange && (
          <RankChangeIndicator
            currentRank={entry.rank}
            previousRank={entry.previousRank}
            size={size}
          />
        )}
      </div>

      {/* Score */}
      <div className="flex flex-shrink-0 flex-col items-end">
        <span className={cn(scoreStyles({ size }), 'ltz-text-gradient')}>
          {formatLTZ(entry.score)}
        </span>
        <span className={cn(scoreLabelStyles({ size }))}>{scoreLabel}</span>
      </div>
    </div>
  );
}

/**
 * A leaderboard component for displaying ranked users with medals and animations.
 *
 * @example
 * // Basic usage
 * <Leaderboard entries={leaderboardData} currentUserId="user123" />
 *
 * @example
 * // With custom options
 * <Leaderboard
 *   entries={entries}
 *   currentUserId="user123"
 *   maxDisplay={5}
 *   showMedals
 *   showRankChange
 *   showAvatars
 *   animated
 *   header={<h2>Top Earners</h2>}
 * />
 *
 * @example
 * // With current user card at bottom
 * <Leaderboard
 *   entries={topTen}
 *   currentUserId="user123"
 *   currentUserEntry={{ id: 'user123', name: 'You', score: 1500, rank: 42 }}
 *   showCurrentUserCard
 * />
 */
export const Leaderboard = forwardRef<HTMLDivElement, LeaderboardProps>(
  (
    {
      entries,
      currentUserId,
      maxDisplay = 10,
      showMedals = true,
      showRankChange = true,
      showAvatars = true,
      size = 'md',
      animated = true,
      scoreLabel = 'LTZ',
      showCurrentUserCard = true,
      currentUserEntry,
      onEntryClick,
      emptyState,
      header,
      footer,
      className,
      ...props
    },
    ref
  ) => {
    // Get displayed entries
    const displayedEntries = useMemo(() => entries.slice(0, maxDisplay), [entries, maxDisplay]);

    // Check if current user is in displayed entries
    const currentUserInList = useMemo(
      () => displayedEntries.some((e) => e.id === currentUserId),
      [displayedEntries, currentUserId]
    );

    // Get current user entry for bottom card
    const currentUserData = useMemo(() => {
      if (currentUserInList) return null;
      if (currentUserEntry) return currentUserEntry;
      return entries.find((e) => e.id === currentUserId) || null;
    }, [currentUserInList, currentUserEntry, entries, currentUserId]);

    // Empty state
    if (entries.length === 0) {
      return (
        <div ref={ref} className={cn(leaderboardContainerStyles({ size }), className)} {...props}>
          {header && <div className={cn(leaderboardHeaderStyles({ size }))}>{header}</div>}
          <div className={cn(emptyStateStyles({ size }))}>
            {emptyState || (
              <>
                <svg
                  className="mb-3 h-12 w-12 text-ltz-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="font-medium">No rankings yet</p>
                <p className="text-sm">Be the first to earn points!</p>
              </>
            )}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(leaderboardContainerStyles({ size }), className)} {...props}>
        {/* Header */}
        {header && <div className={cn(leaderboardHeaderStyles({ size }))}>{header}</div>}

        {/* Entries */}
        <div>
          {displayedEntries.map((entry, index) => (
            <LeaderboardEntryRow
              key={entry.id}
              entry={entry}
              isCurrentUser={entry.id === currentUserId}
              showMedal={showMedals}
              showRankChange={showRankChange}
              showAvatar={showAvatars}
              size={size}
              animated={animated}
              animationDelay={index * 50}
              scoreLabel={scoreLabel}
              onClick={onEntryClick ? () => onEntryClick(entry) : undefined}
            />
          ))}
        </div>

        {/* Current User Card (if not in list) */}
        {showCurrentUserCard && currentUserData && (
          <div className={cn(currentUserCardStyles({ size }))}>
            <span className={cn(rankStyles({ size, rank: 'default' }))}>
              #{currentUserData.rank}
            </span>

            {showAvatars && (
              <div className={cn(avatarStyles({ size, isCurrentUser: true }))}>
                {currentUserData.avatar ? (
                  <img
                    src={currentUserData.avatar}
                    alt={currentUserData.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="from-ltz-purple to-ltz-cyan flex h-full w-full items-center justify-center bg-gradient-to-br text-sm font-bold text-white">
                    {currentUserData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}

            <div className="min-w-0 flex-grow">
              <span className={cn(nameStyles({ size, isCurrentUser: true }))}>Your Rank</span>
            </div>

            <div className="flex flex-shrink-0 flex-col items-end">
              <span className={cn(scoreStyles({ size }), 'ltz-text-gradient')}>
                {formatLTZ(currentUserData.score)}
              </span>
              <span className={cn(scoreLabelStyles({ size }))}>{scoreLabel}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        {footer}
      </div>
    );
  }
);

Leaderboard.displayName = 'Leaderboard';
