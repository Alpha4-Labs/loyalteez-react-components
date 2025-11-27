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
  if (intensity === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cn('text-ltz-text-muted', className)}>
        <path
          d="M12 22c-4.97 0-9-3.58-9-8 0-2.52 1.17-4.77 3-6.24V6c0-.55.45-1 1-1s1 .45 1 1v1.38c.59-.31 1.22-.55 1.88-.72A7.003 7.003 0 0 1 12 2c1.05 0 2.03.24 2.93.66.66.17 1.29.41 1.88.72V2c0-.55.45-1 1-1s1 .45 1 1v1.76c1.83 1.47 3 3.72 3 6.24 0 4.42-4.03 8-9 8z"
          fill="currentColor"
          opacity="0.3"
        />
      </svg>
    );
  }

  // Color gradients based on intensity
  const gradients = {
    1: { from: '#f97316', to: '#ef4444' },
    2: { from: '#fb923c', to: '#dc2626' },
    3: { from: '#fdba74', via: '#f97316', to: '#dc2626' },
    4: { from: '#fde047', via: '#fb923c', to: '#dc2626' },
    5: { from: '#fef08a', via: '#fbbf24', to: '#ef4444' },
  };

  const colors = gradients[intensity];
  const gradientId = `flame-gradient-${intensity}`;

  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('drop-shadow-lg', className)}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={colors.to} />
          {'via' in colors && <stop offset="50%" stopColor={colors.via} />}
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

      {/* Main flame body */}
      <path
        d="M12 22c-4.97 0-9-3.58-9-8 0-2.21.89-4.21 2.34-5.66.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41C5.64 10.86 5 12.36 5 14c0 3.31 3.13 6 7 6s7-2.69 7-6c0-1.64-.64-3.14-1.75-4.25-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0C20.11 9.79 21 11.79 21 14c0 4.42-4.03 8-9 8z"
        fill={`url(#${gradientId})`}
        filter={intensity >= 4 ? `url(#flame-glow-${intensity})` : undefined}
      />

      {/* Inner flame */}
      <path
        d="M12 2c-.39 0-.77.14-1.06.44-.97 1.02-3.94 4.36-3.94 7.56 0 2.76 2.24 5 5 5s5-2.24 5-5c0-3.2-2.97-6.54-3.94-7.56C12.77 2.14 12.39 2 12 2z"
        fill={`url(#${gradientId})`}
        opacity={intensity >= 3 ? '1' : '0.8'}
        className={intensity >= 4 ? 'animate-pulse' : ''}
      />

      {/* Core flame (brightest part) */}
      {intensity >= 3 && (
        <path
          d="M12 6c-.26 0-.51.1-.71.29C10.56 7.02 9 8.89 9 10.5c0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.61-1.56-3.48-2.29-4.21A.996.996 0 0 0 12 6z"
          fill={intensity >= 4 ? '#fef3c7' : '#fed7aa'}
          className={intensity >= 4 ? 'animate-[ltz-pulse-glow_1s_ease-in-out_infinite]' : ''}
        />
      )}

      {/* Legendary sparkles */}
      {intensity === 5 && (
        <>
          <circle cx="8" cy="8" r="1" fill="#fef08a" className="animate-ping" />
          <circle
            cx="16"
            cy="6"
            r="0.75"
            fill="#fef08a"
            className="animate-ping"
            style={{ animationDelay: '0.3s' }}
          />
          <circle
            cx="14"
            cy="12"
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
