'use client';

import { cn } from '@/utils/cn';

interface FlameIconProps {
  intensity: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
}

/**
 * Animated flame icon with intensity-based colors and effects
 */
export function FlameIcon({ intensity, className }: FlameIconProps) {
  // Color gradients based on intensity
  const gradients = {
    0: { from: '#6b7280', to: '#4b5563' },
    1: { from: '#f97316', to: '#ef4444' },
    2: { from: '#fb923c', to: '#dc2626' },
    3: { from: '#fdba74', via: '#f97316', to: '#dc2626' },
    4: { from: '#fde047', via: '#fb923c', to: '#dc2626' },
    5: { from: '#fef08a', via: '#fbbf24', to: '#ef4444' },
  };

  const colors = gradients[intensity];
  const gradientId = `flame-gradient-${intensity}-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('drop-shadow-lg', className)}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={colors.to} />
          {'via' in colors && <stop offset="50%" stopColor={(colors as { via: string }).via} />}
          <stop offset="100%" stopColor={colors.from} />
        </linearGradient>
        {intensity >= 4 && (
          <filter id={`flame-glow-${intensity}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Flame shape - proper droplet/flame path */}
      <path
        d="M12 2C12 2 7 8.5 7 13.5C7 17.09 9.24 20 12 20C14.76 20 17 17.09 17 13.5C17 8.5 12 2 12 2Z"
        fill={`url(#${gradientId})`}
        filter={intensity >= 4 ? `url(#flame-glow-${intensity})` : undefined}
        opacity={intensity === 0 ? 0.4 : 1}
        className={intensity >= 3 ? 'animate-[ltz-float_1.5s_ease-in-out_infinite]' : ''}
      />

      {/* Inner flame highlight */}
      {intensity >= 2 && (
        <path
          d="M12 6C12 6 9 10 9 13C9 15.21 10.34 17 12 17C13.66 17 15 15.21 15 13C15 10 12 6 12 6Z"
          fill={intensity >= 4 ? '#fef3c7' : intensity >= 3 ? '#fed7aa' : '#fdba74'}
          opacity={0.9}
        />
      )}

      {/* Core flame (brightest part) */}
      {intensity >= 4 && (
        <path
          d="M12 10C12 10 10.5 12 10.5 13.5C10.5 14.88 11.17 16 12 16C12.83 16 13.5 14.88 13.5 13.5C13.5 12 12 10 12 10Z"
          fill="#fef9c3"
          className="animate-pulse"
        />
      )}

      {/* Legendary sparkles */}
      {intensity === 5 && (
        <>
          <circle cx="8" cy="10" r="1" fill="#fef08a" className="animate-ping" />
          <circle
            cx="16"
            cy="10"
            r="0.75"
            fill="#fef08a"
            className="animate-ping"
            style={{ animationDelay: '0.3s' }}
          />
          <circle
            cx="12"
            cy="5"
            r="0.5"
            fill="#fef08a"
            className="animate-ping"
            style={{ animationDelay: '0.6s' }}
          />
        </>
      )}
    </svg>
  );
}
