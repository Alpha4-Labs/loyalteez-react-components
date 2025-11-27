'use client';

import { forwardRef, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/utils/cn';
import { formatLTZ } from '@/utils/formatLTZ';
import {
  leaderboardContainerStyles,
  leaderboardHeaderStyles,
  entryContainerStyles,
  rankStyles,
  avatarStyles,
  nameStyles,
  scoreStyles,
  rankChangeStyles,
  emptyStateStyles,
  currentUserCardStyles,
} from '@/components/Leaderboard/Leaderboard.styles';
import { MEDAL_COLORS } from '@/components/Leaderboard/types';
import type { LeaderboardProps, LeaderboardEntry, LeaderboardSize } from '@/components/Leaderboard/types';

// Animated Medal Component
function AnimatedMedal({ rank, size }: { rank: 1 | 2 | 3; size: LeaderboardSize }) {
  const colors = MEDAL_COLORS[rank];
  const medalSize = size === 'sm' ? 20 : size === 'md' ? 24 : 32;
  // Extract gradient colors from class strings
  const gradientColors = {
    1: { from: '#facc15', to: '#f59e0b' }, // yellow-400 to amber-500
    2: { from: '#d1d5db', to: '#9ca3af' }, // gray-300 to gray-400
    3: { from: '#fb923c', to: '#ea580c' }, // orange-400 to orange-600
  };
  const gradient = gradientColors[rank];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
      className={colors.glow}
    >
      <svg width={medalSize} height={medalSize} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id={`medal-gradient-${rank}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradient.from} />
            <stop offset="100%" stopColor={gradient.to} />
          </linearGradient>
        </defs>
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          fill={`url(#medal-gradient-${rank})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.text
          x="12"
          y="16"
          textAnchor="middle"
          className={colors.text}
          fill="currentColor"
          fontSize="12"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {rank}
        </motion.text>
      </svg>
    </motion.div>
  );
}

// Animated Score with spring
function AnimatedScore({ score, size }: { score: number; size: LeaderboardSize }) {
  const springValue = useSpring(score, { stiffness: 100, damping: 30 });
  const displayValue = useTransform(springValue, (v) => formatLTZ(Math.round(v)));

  return (
    <motion.span className={cn(scoreStyles({ size }), 'ltz-text-gradient')}>
      {displayValue}
    </motion.span>
  );
}

// Rank change indicator with animation
function AnimatedRankChange({
  direction,
  change,
}: {
  direction: 'up' | 'down';
  change: number;
}) {
  return (
    <motion.div
      className={cn(rankChangeStyles({ direction }))}
      initial={{ opacity: 0, y: direction === 'up' ? 10 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <motion.svg
        className="h-3 w-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        animate={{ y: direction === 'up' ? [-2, 0, -2] : [2, 0, 2] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {direction === 'up' ? (
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        )}
      </motion.svg>
      {change}
    </motion.div>
  );
}

// Single leaderboard entry with animations
function LeaderboardEntryRow({
  entry,
  index,
  size,
  showMedals,
  showRankChange,
  showAvatars,
  isCurrentUser,
}: {
  entry: LeaderboardEntry;
  index: number;
  size: LeaderboardSize;
  showMedals: boolean;
  showRankChange: boolean;
  showAvatars: boolean;
  isCurrentUser: boolean;
}) {
  const rankVariant = entry.rank === 1 ? 1 : entry.rank === 2 ? 2 : entry.rank === 3 ? 3 : 'default';
  const rankChange = entry.previousRank !== undefined ? entry.previousRank - entry.rank : 0;

  return (
    <motion.div
      layout
      layoutId={`entry-${entry.id}`}
      className={cn(entryContainerStyles({ size, isCurrentUser }))}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{
        layout: { type: 'spring', stiffness: 300, damping: 30 },
        delay: index * 0.05,
      }}
      whileHover={{ backgroundColor: 'rgba(108, 51, 234, 0.1)' }}
    >
      {/* Rank / Medal */}
      {showMedals && entry.rank <= 3 ? (
        <AnimatedMedal rank={entry.rank as 1 | 2 | 3} size={size} />
      ) : (
        <motion.span
          className={cn(rankStyles({ size, rank: rankVariant as 1 | 2 | 3 | 'default' }))}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 + 0.1 }}
        >
          #{entry.rank}
        </motion.span>
      )}

      {/* Avatar */}
      {showAvatars && (
        <motion.div
          className={cn(avatarStyles({ size, isCurrentUser }))}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 + 0.15, type: 'spring', stiffness: 400 }}
          whileHover={{ scale: 1.1 }}
        >
          {entry.avatar ? (
            <img src={entry.avatar} alt={entry.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ltz-purple to-ltz-cyan text-sm font-bold text-white">
              {entry.name.charAt(0).toUpperCase()}
            </div>
          )}
        </motion.div>
      )}

      {/* Name & Badge */}
      <div className="min-w-0 flex-grow">
        <div className="flex items-center gap-2">
          <motion.span
            className={cn(nameStyles({ size, isCurrentUser }))}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 + 0.2 }}
          >
            {entry.name}
            {isCurrentUser && <span className="ml-1 text-xs text-ltz-text-muted">(You)</span>}
          </motion.span>
          {entry.badge}
        </div>
      </div>

      {/* Score */}
      <div className="flex flex-shrink-0 flex-col items-end">
        <AnimatedScore score={entry.score} size={size} />
        {showRankChange && rankChange !== 0 && (
          <AnimatedRankChange
            direction={rankChange > 0 ? 'up' : 'down'}
            change={Math.abs(rankChange)}
          />
        )}
      </div>
    </motion.div>
  );
}

/**
 * Enhanced Leaderboard with Framer Motion animations.
 * Features staggered entry animations, layout animations for rank changes,
 * and spring-based score updates.
 *
 * @example
 * import { LeaderboardMotion } from '@loyalteez/react-components/motion';
 *
 * <LeaderboardMotion
 *   entries={leaderboardData}
 *   currentUserId="user123"
 *   showMedals
 *   showRankChange
 * />
 */
export const LeaderboardMotion = forwardRef<HTMLDivElement, LeaderboardProps>(
  (
    {
      entries,
      currentUserId,
      maxDisplay = 10,
      showMedals = true,
      showRankChange = true,
      showAvatars = true,
      size = 'md',
      animated: _animated = true,
      header,
      emptyState,
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
    const displayedEntries = useMemo(() => entries.slice(0, maxDisplay), [entries, maxDisplay]);

    const currentUserInList = currentUserId
      ? displayedEntries.some((e) => e.id === currentUserId)
      : false;

    const currentUserData = currentUserId && !currentUserInList
      ? entries.find((e) => e.id === currentUserId)
      : null;

    if (entries.length === 0) {
      return (
        <motion.div
          ref={ref}
          className={cn(leaderboardContainerStyles({ size }), className)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          {...props}
        >
          {header && <div className={cn(leaderboardHeaderStyles({ size }))}>{header}</div>}
          <div className={cn(emptyStateStyles({ size }))}>
            {emptyState || (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <svg className="mb-3 h-12 w-12 text-ltz-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="font-medium">No rankings yet</p>
                <p className="text-sm text-ltz-text-muted">Be the first to earn points!</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(leaderboardContainerStyles({ size }), className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        {...props}
      >
        {/* Header */}
        {header && (
          <motion.div
            className={cn(leaderboardHeaderStyles({ size }))}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {header}
          </motion.div>
        )}

        {/* Entries */}
        <AnimatePresence mode="popLayout">
          {displayedEntries.map((entry, index) => (
            <LeaderboardEntryRow
              key={entry.id}
              entry={entry}
              index={index}
              size={size}
              showMedals={showMedals}
              showRankChange={showRankChange}
              showAvatars={showAvatars}
              isCurrentUser={entry.id === currentUserId}
            />
          ))}
        </AnimatePresence>

        {/* Current user's rank (if not in list) */}
        <AnimatePresence>
          {currentUserData && (
            <motion.div
              className={cn(currentUserCardStyles({ size }))}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: displayedEntries.length * 0.05 }}
            >
              <span className="text-ltz-text-muted">...</span>

              <motion.div
                className={cn(avatarStyles({ size, isCurrentUser: true }))}
                whileHover={{ scale: 1.1 }}
              >
                {currentUserData.avatar ? (
                  <img src={currentUserData.avatar} alt={currentUserData.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ltz-purple to-ltz-cyan text-sm font-bold text-white">
                    {currentUserData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </motion.div>

              <div className="min-w-0 flex-grow">
                <span className={cn(nameStyles({ size, isCurrentUser: true }))}>Your Rank</span>
              </div>

              <div className="flex flex-shrink-0 flex-col items-end">
                <AnimatedScore score={currentUserData.score} size={size} />
                <span className="text-sm font-bold text-ltz-purple">#{currentUserData.rank}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

LeaderboardMotion.displayName = 'LeaderboardMotion';

