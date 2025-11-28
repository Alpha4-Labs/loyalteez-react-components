'use client';

import { forwardRef, useMemo } from 'react';
import { cn } from '@/utils/cn';
import { formatLTZ } from '@/utils/formatLTZ';
import { useTone, type ToneId } from '../ToneProvider';
import { GlowEffect } from '../GlowEffect';
import { ShimmerEffect } from '../ShimmerEffect';
import type { LeaderboardProps, LeaderboardEntry, LeaderboardSize } from '@/components/Leaderboard/types';

// Theme-specific configurations
const THEME_CONFIGS: Record<ToneId, {
  medalColors: {
    1: { bg: string; text: string; glow: string; border: string };
    2: { bg: string; text: string; glow: string; border: string };
    3: { bg: string; text: string; glow: string; border: string };
  };
  entryGradient: string;
  topThreeGlow: boolean;
  shimmerStyle: 'metallic' | 'holographic' | 'gold' | 'neon' | 'frost' | 'fire';
  scoreGradient: string;
  containerBorder: string;
  headerStyle: string;
}> = {
  default: {
    medalColors: {
      1: { bg: 'from-cyan-400 to-purple-500', text: 'text-white', glow: 'shadow-cyan-500/50', border: 'border-cyan-400' },
      2: { bg: 'from-purple-400 to-pink-500', text: 'text-white', glow: 'shadow-purple-500/50', border: 'border-purple-400' },
      3: { bg: 'from-pink-400 to-rose-500', text: 'text-white', glow: 'shadow-pink-500/50', border: 'border-pink-400' },
    },
    entryGradient: 'from-cyan-500/5 via-purple-500/5 to-transparent',
    topThreeGlow: true,
    shimmerStyle: 'neon',
    scoreGradient: 'from-cyan-400 to-purple-400',
    containerBorder: 'border-white/10',
    headerStyle: 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10',
  },
  arcade: {
    medalColors: {
      1: { bg: 'from-yellow-300 to-amber-500', text: 'text-black', glow: 'shadow-yellow-500/60', border: 'border-yellow-400' },
      2: { bg: 'from-pink-400 to-fuchsia-500', text: 'text-white', glow: 'shadow-pink-500/60', border: 'border-pink-400' },
      3: { bg: 'from-cyan-400 to-blue-500', text: 'text-white', glow: 'shadow-cyan-500/60', border: 'border-cyan-400' },
    },
    entryGradient: 'from-yellow-500/10 via-pink-500/10 to-cyan-500/10',
    topThreeGlow: true,
    shimmerStyle: 'holographic',
    scoreGradient: 'from-yellow-400 to-pink-400',
    containerBorder: 'border-yellow-500/30',
    headerStyle: 'bg-gradient-to-r from-yellow-500/20 via-pink-500/20 to-cyan-500/20',
  },
  casino: {
    medalColors: {
      1: { bg: 'from-yellow-300 via-amber-400 to-yellow-600', text: 'text-amber-900', glow: 'shadow-amber-400/70', border: 'border-amber-400' },
      2: { bg: 'from-gray-200 via-gray-300 to-gray-400', text: 'text-gray-800', glow: 'shadow-gray-400/50', border: 'border-gray-300' },
      3: { bg: 'from-orange-400 via-amber-500 to-orange-600', text: 'text-orange-900', glow: 'shadow-orange-400/50', border: 'border-orange-400' },
    },
    entryGradient: 'from-amber-500/10 via-yellow-500/5 to-transparent',
    topThreeGlow: true,
    shimmerStyle: 'gold',
    scoreGradient: 'from-amber-300 to-yellow-500',
    containerBorder: 'border-amber-500/30',
    headerStyle: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10',
  },
  cyberpunk: {
    medalColors: {
      1: { bg: 'from-cyan-400 to-cyan-600', text: 'text-black', glow: 'shadow-cyan-400/80', border: 'border-cyan-400' },
      2: { bg: 'from-fuchsia-400 to-fuchsia-600', text: 'text-white', glow: 'shadow-fuchsia-400/80', border: 'border-fuchsia-400' },
      3: { bg: 'from-lime-400 to-lime-600', text: 'text-black', glow: 'shadow-lime-400/80', border: 'border-lime-400' },
    },
    entryGradient: 'from-cyan-500/10 via-fuchsia-500/10 to-transparent',
    topThreeGlow: true,
    shimmerStyle: 'neon',
    scoreGradient: 'from-cyan-400 to-fuchsia-400',
    containerBorder: 'border-cyan-500/40',
    headerStyle: 'bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20',
  },
  minimal: {
    medalColors: {
      1: { bg: 'from-zinc-600 to-zinc-800', text: 'text-white', glow: 'shadow-zinc-500/30', border: 'border-zinc-500' },
      2: { bg: 'from-zinc-500 to-zinc-700', text: 'text-white', glow: 'shadow-zinc-400/30', border: 'border-zinc-400' },
      3: { bg: 'from-zinc-400 to-zinc-600', text: 'text-white', glow: 'shadow-zinc-300/30', border: 'border-zinc-300' },
    },
    entryGradient: 'from-zinc-500/5 to-transparent',
    topThreeGlow: false,
    shimmerStyle: 'metallic',
    scoreGradient: 'from-zinc-300 to-zinc-500',
    containerBorder: 'border-zinc-700',
    headerStyle: 'bg-zinc-800/50',
  },
  playful: {
    medalColors: {
      1: { bg: 'from-pink-400 to-rose-500', text: 'text-white', glow: 'shadow-pink-500/60', border: 'border-pink-400' },
      2: { bg: 'from-violet-400 to-purple-500', text: 'text-white', glow: 'shadow-violet-500/60', border: 'border-violet-400' },
      3: { bg: 'from-sky-400 to-blue-500', text: 'text-white', glow: 'shadow-sky-500/60', border: 'border-sky-400' },
    },
    entryGradient: 'from-pink-500/10 via-violet-500/10 to-sky-500/10',
    topThreeGlow: true,
    shimmerStyle: 'holographic',
    scoreGradient: 'from-pink-400 via-violet-400 to-sky-400',
    containerBorder: 'border-pink-500/30',
    headerStyle: 'bg-gradient-to-r from-pink-500/20 via-violet-500/20 to-sky-500/20',
  },
  competitive: {
    medalColors: {
      1: { bg: 'from-amber-400 to-yellow-600', text: 'text-amber-900', glow: 'shadow-amber-500/70', border: 'border-amber-400' },
      2: { bg: 'from-slate-300 to-slate-500', text: 'text-slate-900', glow: 'shadow-slate-400/50', border: 'border-slate-300' },
      3: { bg: 'from-orange-500 to-red-600', text: 'text-white', glow: 'shadow-orange-500/60', border: 'border-orange-400' },
    },
    entryGradient: 'from-red-500/10 via-orange-500/10 to-amber-500/10',
    topThreeGlow: true,
    shimmerStyle: 'metallic',
    scoreGradient: 'from-red-400 to-amber-400',
    containerBorder: 'border-red-500/30',
    headerStyle: 'bg-gradient-to-r from-red-500/20 to-amber-500/20',
  },
  fantasy: {
    medalColors: {
      1: { bg: 'from-amber-300 via-yellow-400 to-amber-500', text: 'text-amber-900', glow: 'shadow-amber-400/70', border: 'border-amber-300' },
      2: { bg: 'from-purple-400 via-violet-500 to-purple-600', text: 'text-white', glow: 'shadow-purple-500/60', border: 'border-purple-400' },
      3: { bg: 'from-emerald-400 to-teal-600', text: 'text-white', glow: 'shadow-emerald-500/60', border: 'border-emerald-400' },
    },
    entryGradient: 'from-amber-500/10 via-purple-500/10 to-emerald-500/10',
    topThreeGlow: true,
    shimmerStyle: 'holographic',
    scoreGradient: 'from-amber-400 via-purple-400 to-emerald-400',
    containerBorder: 'border-purple-500/30',
    headerStyle: 'bg-gradient-to-r from-amber-500/10 via-purple-500/20 to-emerald-500/10',
  },
  scifi: {
    medalColors: {
      1: { bg: 'from-blue-400 to-blue-600', text: 'text-white', glow: 'shadow-blue-400/80', border: 'border-blue-400' },
      2: { bg: 'from-slate-400 to-slate-600', text: 'text-white', glow: 'shadow-slate-400/50', border: 'border-slate-400' },
      3: { bg: 'from-teal-400 to-cyan-600', text: 'text-white', glow: 'shadow-teal-400/60', border: 'border-teal-400' },
    },
    entryGradient: 'from-blue-500/10 via-slate-500/5 to-teal-500/10',
    topThreeGlow: true,
    shimmerStyle: 'frost',
    scoreGradient: 'from-blue-400 to-teal-400',
    containerBorder: 'border-blue-500/30',
    headerStyle: 'bg-gradient-to-r from-blue-500/20 to-teal-500/20',
  },
  retro: {
    medalColors: {
      1: { bg: 'from-orange-400 to-pink-500', text: 'text-white', glow: 'shadow-orange-500/60', border: 'border-orange-400' },
      2: { bg: 'from-cyan-400 to-teal-500', text: 'text-white', glow: 'shadow-cyan-500/60', border: 'border-cyan-400' },
      3: { bg: 'from-purple-400 to-violet-500', text: 'text-white', glow: 'shadow-purple-500/60', border: 'border-purple-400' },
    },
    entryGradient: 'from-orange-500/10 via-pink-500/10 to-cyan-500/10',
    topThreeGlow: true,
    shimmerStyle: 'neon',
    scoreGradient: 'from-orange-400 via-pink-400 to-cyan-400',
    containerBorder: 'border-orange-500/30',
    headerStyle: 'bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-cyan-500/20',
  },
};

// Themed Medal Component
function ThemedMedal({ 
  rank, 
  size, 
  config 
}: { 
  rank: 1 | 2 | 3; 
  size: LeaderboardSize; 
  config: typeof THEME_CONFIGS[ToneId];
}) {
  const colors = config.medalColors[rank];
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-bold',
        `bg-gradient-to-br ${colors.bg} ${colors.text}`,
        config.topThreeGlow && `shadow-lg ${colors.glow}`,
        `border-2 ${colors.border}`,
        sizeClasses[size]
      )}
    >
      {rank}
    </div>
  );
}

// Single Entry Component
function ThemedEntryRow({
  entry,
  isCurrentUser,
  showMedal,
  showAvatar,
  size,
  animationDelay,
  scoreLabel,
  onClick,
  config,
  toneId,
}: {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
  showMedal: boolean;
  showAvatar: boolean;
  size: LeaderboardSize;
  animationDelay: number;
  scoreLabel: string;
  onClick?: () => void;
  config: typeof THEME_CONFIGS[ToneId];
  toneId: ToneId;
}) {
  const isTopThree = entry.rank <= 3;
  
  const sizeStyles = {
    sm: 'px-3 py-2.5 gap-2',
    md: 'px-4 py-3.5 gap-3',
    lg: 'px-6 py-4.5 gap-4',
  };

  const avatarSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const nameSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const scoreSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
  };

  // Get rank-specific border color
  const getRankBorderColor = (rank: number) => {
    if (rank === 1) return 'border-l-amber-400';
    if (rank === 2) return 'border-l-gray-300';
    if (rank === 3) return 'border-l-orange-400';
    return '';
  };

  const entryContent = (
    <div
      className={cn(
        'flex items-center transition-all duration-300',
        sizeStyles[size],
        isCurrentUser 
          ? 'bg-purple-500/10 border-l-4 border-l-purple-500' 
          : isTopThree 
            ? `border-l-4 ${getRankBorderColor(entry.rank)} bg-white/[0.02]` 
            : 'hover:bg-white/5',
        'border-b border-white/5 last:border-b-0',
        onClick && 'cursor-pointer'
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Rank / Medal */}
      {showMedal && isTopThree ? (
        <ThemedMedal rank={entry.rank as 1 | 2 | 3} size={size} config={config} />
      ) : (
        <span className={cn(
          'flex items-center justify-center font-bold tabular-nums flex-shrink-0',
          size === 'sm' ? 'w-7 text-xs' : size === 'md' ? 'w-9 text-sm' : 'w-11 text-base',
          'text-white/50'
        )}>
          #{entry.rank}
        </span>
      )}

      {/* Avatar */}
      {showAvatar && (
        <div className={cn(
          'rounded-full bg-white/10 overflow-hidden flex-shrink-0',
          avatarSizes[size],
          isTopThree && `ring-2 ring-offset-2 ring-offset-transparent`,
          isTopThree && entry.rank === 1 && 'ring-amber-400/50',
          isTopThree && entry.rank === 2 && 'ring-gray-400/50',
          isTopThree && entry.rank === 3 && 'ring-orange-400/50',
          isCurrentUser && 'ring-2 ring-purple-500'
        )}>
          {entry.avatar ? (
            <img src={entry.avatar} alt={entry.name} className="h-full w-full object-cover" />
          ) : (
            <div className={cn(
              'flex h-full w-full items-center justify-center text-sm font-bold text-white',
              `bg-gradient-to-br ${config.medalColors[1].bg}`
            )}>
              {entry.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      )}

      {/* Name */}
      <div className="min-w-0 flex-grow">
        <span 
          className={cn(
            'truncate block',
            nameSizes[size],
            isCurrentUser 
              ? 'text-purple-400 font-semibold' 
              : isTopThree 
                ? 'font-bold' 
                : 'text-white/90 font-medium'
          )}
          style={isTopThree && !isCurrentUser ? { 
            color: entry.rank === 1 ? '#fbbf24' : entry.rank === 2 ? '#e5e7eb' : '#fb923c',
            textShadow: '0 0 8px currentColor'
          } : undefined}
        >
          {entry.name}
          {isCurrentUser && <span className="ml-2 text-xs text-white/50">(You)</span>}
        </span>
      </div>

      {/* Score */}
      <div className="flex flex-shrink-0 flex-col items-end">
        <span className={cn(
          'font-bold tabular-nums bg-clip-text text-transparent',
          scoreSizes[size],
          `bg-gradient-to-r ${config.scoreGradient}`
        )}>
          {formatLTZ(entry.score)}
        </span>
        <span className="text-xs text-white/40">{scoreLabel}</span>
      </div>
    </div>
  );

  // Add glow effect for top 3 entries
  if (isTopThree && config.topThreeGlow) {
    const glowColors: Record<number, 'cyan' | 'purple' | 'pink' | 'gold'> = {
      1: toneId === 'casino' || toneId === 'competitive' ? 'gold' : 'cyan',
      2: 'purple',
      3: 'pink',
    };
    
    return (
      <GlowEffect
        color={glowColors[entry.rank] || 'cyan'}
        intensity="subtle"
        pattern="pulse"
        active
      >
        {entryContent}
      </GlowEffect>
    );
  }

  return entryContent;
}

export interface EnhancedLeaderboardProps extends LeaderboardProps {
  /** Enable themed styling based on current tone */
  themed?: boolean;
}

/**
 * Enhanced Leaderboard with theme-aware styling.
 * Automatically adapts its visual flair based on the current tone.
 */
export const EnhancedLeaderboard = forwardRef<HTMLDivElement, EnhancedLeaderboardProps>(
  (
    {
      entries,
      currentUserId,
      maxDisplay = 10,
      showMedals = true,
      showAvatars = true,
      size = 'md',
      scoreLabel = 'LTZ',
      showCurrentUserCard = true,
      currentUserEntry,
      onEntryClick,
      emptyState,
      header,
      footer,
      className,
      themed = true,
      ...props
    },
    ref
  ) => {
    const { tone } = useTone();
    const toneId = tone.id as ToneId;
    const config = themed ? THEME_CONFIGS[toneId] : THEME_CONFIGS.default;

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
        <div 
          ref={ref} 
          className={cn(
            'rounded-2xl border overflow-hidden',
            config.containerBorder,
            'bg-[rgb(20,23,38)]',
            className
          )} 
          {...props}
        >
          {header && (
            <div className={cn('px-4 py-3 border-b border-white/10', config.headerStyle)}>
              {header}
            </div>
          )}
          <div className="flex flex-col items-center justify-center text-center text-white/50 py-12 px-6">
            {emptyState || (
              <>
                <svg
                  className="mb-3 h-12 w-12 opacity-50"
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
      <ShimmerEffect
        variant={config.shimmerStyle}
        intensity="subtle"
        trigger="auto"
        delay={2000}
        duration={3000}
      >
        <div 
          ref={ref} 
          className={cn(
            'rounded-2xl border overflow-hidden',
            config.containerBorder,
            'bg-[rgb(20,23,38)]',
            className
          )} 
          {...props}
        >
          {/* Header */}
          {header && (
            <div className={cn('px-4 py-3 border-b border-white/10', config.headerStyle)}>
              {header}
            </div>
          )}

          {/* Entries */}
          <div>
            {displayedEntries.map((entry, index) => (
              <ThemedEntryRow
                key={entry.id}
                entry={entry}
                isCurrentUser={entry.id === currentUserId}
                showMedal={showMedals}
                showAvatar={showAvatars}
                size={size}
                animationDelay={index * 50}
                scoreLabel={scoreLabel}
                onClick={onEntryClick ? () => onEntryClick(entry) : undefined}
                config={config}
                toneId={toneId}
              />
            ))}
          </div>

          {/* Current User Card (if not in list) */}
          {showCurrentUserCard && currentUserData && (
            <div className={cn(
              'flex items-center gap-3 border-t-2 border-purple-500 bg-purple-500/10',
              size === 'sm' ? 'px-3 py-2' : size === 'md' ? 'px-4 py-3' : 'px-6 py-4'
            )}>
              <span className="flex items-center justify-center font-bold text-white/50 w-9">
                #{currentUserData.rank}
              </span>

              {showAvatars && (
                <div className={cn(
                  'rounded-full bg-white/10 overflow-hidden ring-2 ring-purple-500',
                  size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-12 h-12'
                )}>
                  {currentUserData.avatar ? (
                    <img
                      src={currentUserData.avatar}
                      alt={currentUserData.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className={cn(
                      'flex h-full w-full items-center justify-center text-sm font-bold text-white',
                      `bg-gradient-to-br ${config.medalColors[1].bg}`
                    )}>
                      {currentUserData.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              )}

              <div className="min-w-0 flex-grow">
                <span className="font-semibold text-purple-400">Your Rank</span>
              </div>

              <div className="flex flex-shrink-0 flex-col items-end">
                <span className={cn(
                  'font-bold tabular-nums bg-clip-text text-transparent',
                  `bg-gradient-to-r ${config.scoreGradient}`
                )}>
                  {formatLTZ(currentUserData.score)}
                </span>
                <span className="text-xs text-white/40">{scoreLabel}</span>
              </div>
            </div>
          )}

          {/* Footer */}
          {footer}
        </div>
      </ShimmerEffect>
    );
  }
);

EnhancedLeaderboard.displayName = 'EnhancedLeaderboard';

