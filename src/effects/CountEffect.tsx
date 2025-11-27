'use client';

import { forwardRef, useEffect, useState, useCallback, useRef } from 'react';
import { cn } from '@/utils/cn';
import type { CountEffectProps, EffectIntensity } from './types';

// Easing functions
const EASINGS = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  bounce: (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
  overshoot: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

// Duration by intensity
const INTENSITY_DURATION: Record<EffectIntensity, number> = {
  subtle: 500,
  normal: 1000,
  intense: 1500,
  extreme: 2500,
};

// Default number formatter
const defaultFormat = (value: number): string => {
  return value.toLocaleString('en-US');
};

/**
 * A dramatic count-up effect with various animation styles.
 * Perfect for displaying points earned, balance changes, or dramatic reveals.
 *
 * @example
 * // Basic count-up
 * <CountEffect value={1500} />
 *
 * @example
 * // Slot machine style reveal
 * <CountEffect
 *   value={jackpotAmount}
 *   variant="slot"
 *   intensity="extreme"
 *   showDelta
 * />
 *
 * @example
 * // Scramble then settle
 * <CountEffect
 *   value={score}
 *   from={previousScore}
 *   variant="scramble"
 *   easing="bounce"
 * />
 */
export const CountEffect = forwardRef<HTMLDivElement, CountEffectProps>(
  (
    {
      value,
      from = 0,
      variant = 'simple',
      intensity = 'normal',
      speed = 'normal',
      duration: customDuration,
      format = defaultFormat,
      easing = 'easeOut',
      showDelta = false,
      onComplete,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState(from);
    const [isAnimating, setIsAnimating] = useState(false);
    const [scrambleChars, setScrambleChars] = useState<string[]>([]);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const previousValueRef = useRef(from);

    // Calculate duration
    const baseDuration = customDuration ?? INTENSITY_DURATION[intensity];
    const speedMultiplier =
      speed === 'slow' ? 1.5 : speed === 'normal' ? 1 : speed === 'fast' ? 0.6 : 0.3;
    const duration = baseDuration * speedMultiplier;

    const easingFn = EASINGS[easing];
    const delta = value - previousValueRef.current;
    const isPositive = delta >= 0;

    // Simple count animation
    const animateSimple = useCallback(
      (timestamp: number) => {
        if (startTimeRef.current === 0) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFn(progress);

        const startValue = previousValueRef.current;
        const currentValue = Math.round(startValue + (value - startValue) * easedProgress);
        setDisplayValue(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateSimple);
        } else {
          setIsAnimating(false);
          previousValueRef.current = value;
          onComplete?.();
        }
      },
      [duration, easingFn, onComplete, value]
    );

    // Scramble animation
    const animateScramble = useCallback(
      (timestamp: number) => {
        if (startTimeRef.current === 0) {
          startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const targetStr = format(value);
        const chars = targetStr.split('');

        // Each character settles at different times
        const settledChars = chars.map((char, i) => {
          const charProgress = Math.min((progress * chars.length - i) / 1, 1);
          if (charProgress >= 1) return char;
          if (/\d/.test(char)) {
            return String(Math.floor(Math.random() * 10));
          }
          return char;
        });

        setScrambleChars(settledChars);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateScramble);
        } else {
          setDisplayValue(value);
          setScrambleChars([]);
          setIsAnimating(false);
          previousValueRef.current = value;
          onComplete?.();
        }
      },
      [duration, format, onComplete, value]
    );

    // Start animation when value changes
    useEffect(() => {
      if (value !== previousValueRef.current) {
        setIsAnimating(true);
        startTimeRef.current = 0;

        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        if (variant === 'scramble') {
          animationRef.current = requestAnimationFrame(animateScramble);
        } else {
          animationRef.current = requestAnimationFrame(animateSimple);
        }
      }

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [value, variant, animateSimple, animateScramble]);

    // Render based on variant
    const renderContent = () => {
      const displayStr =
        variant === 'scramble' && scrambleChars.length > 0
          ? scrambleChars.join('')
          : format(displayValue);

      switch (variant) {
        case 'slot':
          return (
            <div className="relative overflow-hidden">
              <div
                className={cn(
                  'transition-transform duration-100',
                  isAnimating && 'animate-[slot-roll_0.1s_linear_infinite]'
                )}
              >
                {displayStr}
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  @keyframes slot-roll {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-50%); }
                    100% { transform: translateY(0); }
                  }
                `,
                }}
              />
            </div>
          );

        case 'flip':
          return (
            <div className="flex">
              {displayStr.split('').map((char, i) => (
                <span
                  key={i}
                  className={cn(
                    'inline-block transition-transform',
                    isAnimating && 'animate-[flip-char_0.3s_ease-out]'
                  )}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {char}
                </span>
              ))}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  @keyframes flip-char {
                    0% { transform: rotateX(90deg); }
                    100% { transform: rotateX(0deg); }
                  }
                `,
                }}
              />
            </div>
          );

        case 'cascade':
          return (
            <div className="flex">
              {displayStr.split('').map((char, i) => (
                <span
                  key={i}
                  className={cn(
                    'inline-block',
                    isAnimating && 'animate-[cascade-in_0.4s_ease-out_forwards]'
                  )}
                  style={{
                    animationDelay: `${i * 80}ms`,
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'translateY(-20px)' : 'translateY(0)',
                  }}
                >
                  {char}
                </span>
              ))}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  @keyframes cascade-in {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                  }
                `,
                }}
              />
            </div>
          );

        case 'typewriter': {
          const visibleLength = Math.floor(
            displayStr.length * (isAnimating ? 0 : 1) +
              (isAnimating
                ? (Date.now() - startTimeRef.current) / (duration / displayStr.length)
                : 0)
          );
          return (
            <span>
              {displayStr.slice(0, Math.min(visibleLength, displayStr.length))}
              {isAnimating && <span className="animate-pulse">|</span>}
            </span>
          );
        }

        case 'scramble':
        case 'simple':
        default:
          return <span>{displayStr}</span>;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 tabular-nums',
          isAnimating && 'will-change-contents',
          className
        )}
        style={style}
        {...props}
      >
        {renderContent()}

        {/* Delta indicator */}
        {showDelta && delta !== 0 && (
          <span
            className={cn(
              'text-sm font-medium transition-opacity',
              isPositive ? 'text-emerald-400' : 'text-red-400',
              isAnimating ? 'opacity-100' : 'opacity-0'
            )}
          >
            {isPositive ? '+' : ''}
            {format(delta)}
          </span>
        )}

        {children}
      </div>
    );
  }
);

CountEffect.displayName = 'CountEffect';

// ============================================
// Convenience Components
// ============================================

export const SlotCounter = forwardRef<HTMLDivElement, Omit<CountEffectProps, 'variant'>>(
  (props, ref) => <CountEffect ref={ref} variant="slot" {...props} />
);
SlotCounter.displayName = 'SlotCounter';

export const FlipCounter = forwardRef<HTMLDivElement, Omit<CountEffectProps, 'variant'>>(
  (props, ref) => <CountEffect ref={ref} variant="flip" {...props} />
);
FlipCounter.displayName = 'FlipCounter';

export const CascadeCounter = forwardRef<HTMLDivElement, Omit<CountEffectProps, 'variant'>>(
  (props, ref) => <CountEffect ref={ref} variant="cascade" {...props} />
);
CascadeCounter.displayName = 'CascadeCounter';

export const ScrambleCounter = forwardRef<HTMLDivElement, Omit<CountEffectProps, 'variant'>>(
  (props, ref) => <CountEffect ref={ref} variant="scramble" {...props} />
);
ScrambleCounter.displayName = 'ScrambleCounter';

// ============================================
// Hook for imperative control
// ============================================

export function useCountUp(options?: Partial<CountEffectProps>) {
  const [value, setValue] = useState(options?.from ?? 0);
  const [from, setFrom] = useState(options?.from ?? 0);

  const countTo = useCallback(
    (target: number) => {
      setFrom(value);
      setValue(target);
    },
    [value]
  );

  const reset = useCallback((initialValue = 0) => {
    setFrom(initialValue);
    setValue(initialValue);
  }, []);

  return {
    value,
    from,
    countTo,
    reset,
    props: {
      value,
      from,
      ...options,
    },
  };
}
