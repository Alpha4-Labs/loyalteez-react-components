import { useState, useEffect, useRef, useCallback } from 'react';
import { formatLTZ, formatCompact, ltzToDollars } from '@/utils/formatLTZ';
import type { UseBalanceDisplayOptions, UseBalanceDisplayReturn } from './types';

/**
 * Headless hook for balance display logic.
 * Use this when you need custom UI but want the animation and formatting logic.
 *
 * @example
 * const { formattedBalance, dollarValue, isAnimating } = useBalanceDisplay({
 *   balance: 5420,
 *   animated: true,
 * });
 */
export function useBalanceDisplay({
  balance,
  animated = false,
  compact = false,
}: UseBalanceDisplayOptions): UseBalanceDisplayReturn {
  const [displayValue, setDisplayValue] = useState(balance);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousBalance = useRef(balance);
  const animationRef = useRef<number | null>(null);

  const animateValue = useCallback((from: number, to: number, duration: number = 500) => {
    setIsAnimating(true);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * easeOut;

      setDisplayValue(Math.round(current));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(to);
        setIsAnimating(false);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (animated && previousBalance.current !== balance) {
      animateValue(previousBalance.current, balance);
    } else {
      setDisplayValue(balance);
    }
    previousBalance.current = balance;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [balance, animated, animateValue]);

  const formattedBalance = compact ? formatCompact(displayValue) : formatLTZ(displayValue);
  const dollarValue = ltzToDollars(displayValue);

  return {
    displayValue,
    formattedBalance,
    dollarValue,
    isAnimating,
  };
}
