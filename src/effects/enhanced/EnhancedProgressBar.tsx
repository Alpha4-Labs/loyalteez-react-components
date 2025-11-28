'use client';

import { forwardRef, useMemo, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { useTone, type ToneId } from '../ToneProvider';
import type { ProgressBarProps } from '@/components/ProgressBar/types';

/**
 * Theme-specific progress bar configurations
 * Each theme gets a unique visual treatment beyond just colors
 */
const THEME_PROGRESS_STYLES: Record<ToneId, {
  containerClass: string;
  barClass: string;
  trackClass: string;
  segments?: number;
  segmentGap?: number;
  customRender?: 'pixels' | 'segments' | 'hearts' | 'orbs' | 'scanlines' | 'bubbles' | 'flames' | 'crystals' | 'circuits' | 'vhs';
  glowColor?: string;
  animation?: string;
}> = {
  default: {
    containerClass: 'rounded-full overflow-hidden',
    barClass: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full',
    trackClass: 'bg-white/10',
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  arcade: {
    containerClass: 'rounded-none border-2 border-yellow-400 p-[2px]',
    barClass: 'bg-yellow-400',
    trackClass: 'bg-black',
    customRender: 'pixels',
    segments: 20,
    segmentGap: 2,
  },
  casino: {
    containerClass: 'rounded-lg border border-amber-500/50 overflow-hidden',
    barClass: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400',
    trackClass: 'bg-gradient-to-b from-zinc-900 to-zinc-800',
    customRender: 'segments',
    segments: 10,
    segmentGap: 3,
    glowColor: 'rgba(245, 158, 11, 0.5)',
  },
  cyberpunk: {
    containerClass: 'rounded-sm border border-cyan-500/50 skew-x-[-5deg]',
    barClass: 'bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400',
    trackClass: 'bg-zinc-900',
    customRender: 'scanlines',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    animation: 'glitch',
  },
  minimal: {
    containerClass: 'rounded-full overflow-hidden',
    barClass: 'bg-white',
    trackClass: 'bg-white/5',
  },
  playful: {
    containerClass: 'rounded-full overflow-hidden border-2 border-pink-400/50',
    barClass: 'bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400',
    trackClass: 'bg-pink-950/30',
    customRender: 'bubbles',
    glowColor: 'rgba(236, 72, 153, 0.4)',
  },
  competitive: {
    containerClass: 'rounded-sm border-l-4 border-red-500 overflow-hidden',
    barClass: 'bg-gradient-to-r from-red-600 via-orange-500 to-red-600',
    trackClass: 'bg-zinc-900',
    customRender: 'flames',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    animation: 'pulse',
  },
  fantasy: {
    containerClass: 'rounded-lg border-2 border-amber-600 overflow-hidden',
    barClass: 'bg-gradient-to-r from-green-500 via-emerald-400 to-green-500',
    trackClass: 'bg-gradient-to-b from-amber-950 to-amber-900',
    customRender: 'hearts',
    glowColor: 'rgba(34, 197, 94, 0.4)',
  },
  scifi: {
    containerClass: 'rounded-sm border border-blue-400/30 overflow-hidden',
    barClass: 'bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500',
    trackClass: 'bg-slate-950',
    customRender: 'circuits',
    glowColor: 'rgba(59, 130, 246, 0.5)',
  },
  retro: {
    containerClass: 'rounded-none border-4 border-double border-green-500 p-1',
    barClass: 'bg-green-500',
    trackClass: 'bg-black',
    customRender: 'vhs',
    glowColor: 'rgba(34, 197, 94, 0.6)',
  },
};

// Pixel block renderer (Arcade style)
function PixelBlocks({ percentage, segments }: { percentage: number; segments: number }) {
  const filledSegments = Math.floor((percentage / 100) * segments);
  
  return (
    <div className="flex gap-[2px] h-full w-full p-[2px]">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex-1 transition-all duration-150',
            i < filledSegments 
              ? 'bg-yellow-400 shadow-[0_0_4px_rgba(250,204,21,0.8)]' 
              : 'bg-yellow-400/20'
          )}
          style={{
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  );
}

// Segment blocks (Casino style)
function SegmentBlocks({ percentage, segments }: { percentage: number; segments: number }) {
  const filledSegments = Math.floor((percentage / 100) * segments);
  
  return (
    <div className="flex gap-[3px] h-full w-full items-center px-1">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex-1 h-3/4 rounded-sm transition-all duration-300',
            i < filledSegments 
              ? 'bg-gradient-to-t from-amber-500 via-yellow-300 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]' 
              : 'bg-zinc-700/50'
          )}
          style={{
            transform: i < filledSegments ? 'scaleY(1)' : 'scaleY(0.8)',
          }}
        />
      ))}
    </div>
  );
}

// Hearts renderer (Fantasy RPG style)
function HeartBar({ percentage }: { percentage: number }) {
  const hearts = 10;
  const filledHearts = Math.floor((percentage / 100) * hearts);
  const partialFill = ((percentage / 100) * hearts) % 1;
  
  return (
    <div className="flex gap-1 h-full w-full items-center justify-center px-2">
      {Array.from({ length: hearts }).map((_, i) => {
        const isFilled = i < filledHearts;
        const isPartial = i === filledHearts && partialFill > 0;
        
        return (
          <div key={i} className="relative">
            {/* Heart shape using CSS */}
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <defs>
                <linearGradient id={`heartGrad${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isFilled ? '#f87171' : '#374151'} />
                  <stop offset="100%" stopColor={isFilled ? '#dc2626' : '#1f2937'} />
                </linearGradient>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={`url(#heartGrad${i})`}
                className={cn(
                  'transition-all duration-300',
                  isFilled && 'drop-shadow-[0_0_4px_rgba(220,38,38,0.8)]'
                )}
              />
              {/* Partial fill overlay */}
              {isPartial && (
                <rect
                  x={24 * (1 - partialFill)}
                  y="0"
                  width={24 * partialFill}
                  height="24"
                  fill="#1f2937"
                  opacity="0.7"
                />
              )}
            </svg>
          </div>
        );
      })}
    </div>
  );
}

// Scanlines overlay (Cyberpunk style)
function ScanlineBar({ percentage }: { percentage: number }) {
  const [glitchOffset, setGlitchOffset] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setGlitchOffset(Math.random() * 4 - 2);
        setTimeout(() => setGlitchOffset(0), 100);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Main bar with glitch effect */}
      <div 
        className="h-full transition-transform"
        style={{ 
          width: `${percentage}%`,
          transform: `translateX(${glitchOffset}px)`,
        }}
      >
        <div className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 relative overflow-hidden">
          {/* Scanline overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
            }}
          />
          {/* Moving highlight */}
          <div 
            className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"
            style={{
              animation: 'shimmer 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      {/* Glitch color channels */}
      {glitchOffset !== 0 && (
        <>
          <div 
            className="absolute inset-0 opacity-50 mix-blend-screen"
            style={{
              width: `${percentage}%`,
              background: 'cyan',
              transform: `translateX(${glitchOffset + 2}px)`,
            }}
          />
          <div 
            className="absolute inset-0 opacity-50 mix-blend-screen"
            style={{
              width: `${percentage}%`,
              background: 'magenta',
              transform: `translateX(${glitchOffset - 2}px)`,
            }}
          />
        </>
      )}
    </div>
  );
}

// Bubbles overlay (Playful style)
function BubbleBar({ percentage }: { percentage: number }) {
  const bubbles = useMemo(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: 4 + Math.random() * 8,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 2,
    })), []
  );
  
  return (
    <div className="relative h-full w-full overflow-hidden rounded-full">
      {/* Fill */}
      <div 
        className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 relative overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        {/* Floating bubbles */}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-white/30 animate-bounce"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: -bubble.size,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent h-1/2" />
      </div>
    </div>
  );
}

// Flames animation (Competitive style)
function FlameBar({ percentage }: { percentage: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 relative"
        style={{ width: `${percentage}%` }}
      >
        {/* Flame tips at the edge */}
        <div className="absolute right-0 top-0 h-full w-4 overflow-hidden">
          <div className="absolute inset-0 animate-pulse">
            <svg viewBox="0 0 16 32" className="h-full w-full" preserveAspectRatio="none">
              <path
                d="M0,0 L16,8 L8,16 L16,24 L0,32 Z"
                fill="url(#flameGrad)"
              />
              <defs>
                <linearGradient id="flameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-orange-400/30 to-yellow-300/50" />
        {/* Animated ember particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-yellow-300 animate-ping"
              style={{
                left: `${70 + Math.random() * 25}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Circuit pattern (Sci-Fi style)
function CircuitBar({ percentage }: { percentage: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 relative"
        style={{ width: `${percentage}%` }}
      >
        {/* Circuit pattern overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.8) 49%, rgba(255,255,255,0.8) 51%, transparent 52%),
              linear-gradient(0deg, transparent 48%, rgba(255,255,255,0.5) 49%, rgba(255,255,255,0.5) 51%, transparent 52%)
            `,
            backgroundSize: '12px 12px',
          }}
        />
        {/* Data flow animation */}
        <div 
          className="absolute inset-y-0 w-2 bg-white/60 blur-sm"
          style={{
            animation: 'dataFlow 1s linear infinite',
          }}
        />
        {/* Nodes */}
        {percentage > 20 && (
          <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        )}
        {percentage > 50 && (
          <div className="absolute left-[50%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        )}
        {percentage > 80 && (
          <div className="absolute left-[80%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        )}
      </div>
    </div>
  );
}

// VHS effect (Retro style)
function VHSBar({ percentage }: { percentage: number }) {
  const [noise, setNoise] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNoise(Math.random());
    }, 100);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Main bar with CRT green */}
      <div 
        className="h-full bg-green-500 relative"
        style={{ 
          width: `${percentage}%`,
          boxShadow: '0 0 10px rgba(34, 197, 94, 0.8), inset 0 0 10px rgba(34, 197, 94, 0.5)',
        }}
      >
        {/* Horizontal scanlines */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)',
          }}
        />
        {/* Noise overlay */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            transform: `translate(${noise * 2}px, 0)`,
          }}
        />
      </div>
      {/* Tracking lines that occasionally appear */}
      {noise > 0.9 && (
        <div 
          className="absolute inset-x-0 h-1 bg-white/50"
          style={{ top: `${noise * 100}%` }}
        />
      )}
    </div>
  );
}

export interface EnhancedProgressBarProps extends Omit<ProgressBarProps, 'variant'> {
  /** Override the theme (defaults to current tone) */
  theme?: ToneId;
  /** Show a glow effect around the bar */
  showGlow?: boolean;
}

export const EnhancedProgressBar = forwardRef<HTMLDivElement, EnhancedProgressBarProps>(
  (
    {
      value,
      max = 100,
      size = 'md',
      showLabel = false,
      formatLabel,
      animated = false,
      showShimmer = false,
      theme,
      showGlow = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { tone } = useTone();
    const currentTheme = theme || (tone?.id as ToneId) || 'default';
    const themeConfig = THEME_PROGRESS_STYLES[currentTheme];

    // Calculate percentage
    const percentage = useMemo(() => {
      const clampedValue = Math.max(0, Math.min(value, max));
      return max > 0 ? (clampedValue / max) * 100 : 0;
    }, [value, max]);

    // Format label
    const labelText = useMemo(() => {
      if (!showLabel) return null;
      if (formatLabel) {
        return formatLabel(value, max, percentage);
      }
      return `${Math.round(percentage)}%`;
    }, [showLabel, formatLabel, value, max, percentage]);

    // Size configurations
    const sizeConfig = {
      sm: { height: 'h-3', text: 'text-xs' },
      md: { height: 'h-5', text: 'text-sm' },
      lg: { height: 'h-7', text: 'text-base' },
      xl: { height: 'h-10', text: 'text-lg' },
    };

    const currentSize = sizeConfig[size] || sizeConfig.md;

    // Render theme-specific progress bar
    const renderBar = () => {
      switch (themeConfig.customRender) {
        case 'pixels':
          return <PixelBlocks percentage={percentage} segments={themeConfig.segments || 20} />;
        case 'segments':
          return <SegmentBlocks percentage={percentage} segments={themeConfig.segments || 10} />;
        case 'hearts':
          return <HeartBar percentage={percentage} />;
        case 'scanlines':
          return <ScanlineBar percentage={percentage} />;
        case 'bubbles':
          return <BubbleBar percentage={percentage} />;
        case 'flames':
          return <FlameBar percentage={percentage} />;
        case 'circuits':
          return <CircuitBar percentage={percentage} />;
        case 'vhs':
          return <VHSBar percentage={percentage} />;
        default:
          // Default smooth bar
          return (
            <div 
              className={cn(
                'h-full transition-all duration-500 relative overflow-hidden rounded-full',
                themeConfig.barClass
              )}
              style={{ width: `${percentage}%` }}
            >
              {showShimmer && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ animation: 'shimmer 2s infinite' }}
                />
              )}
            </div>
          );
      }
    };

    return (
      <div className={cn('flex items-center gap-3', className)} {...props}>
        <div
          ref={ref}
          className={cn(
            'flex-1 relative',
            currentSize.height,
            themeConfig.containerClass,
            themeConfig.trackClass
          )}
          style={{
            boxShadow: showGlow && themeConfig.glowColor 
              ? `0 0 15px ${themeConfig.glowColor}, inset 0 1px 2px rgba(0,0,0,0.3)` 
              : undefined,
            ...style,
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={labelText || `${Math.round(percentage)}% complete`}
        >
          {renderBar()}
        </div>

        {/* Label */}
        {showLabel && labelText && (
          <span className={cn('tabular-nums font-medium text-white/80', currentSize.text)}>
            {labelText}
          </span>
        )}
      </div>
    );
  }
);

EnhancedProgressBar.displayName = 'EnhancedProgressBar';

// Add keyframe animation styles
const styleSheet = typeof document !== 'undefined' ? document.createElement('style') : null;
if (styleSheet) {
  styleSheet.textContent = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
    @keyframes dataFlow {
      0% { left: -8px; }
      100% { left: 100%; }
    }
  `;
  document.head.appendChild(styleSheet);
}

