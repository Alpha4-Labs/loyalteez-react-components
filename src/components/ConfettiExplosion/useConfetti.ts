'use client';

import { useState, useCallback } from 'react';
import type { ConfettiExplosionProps, UseConfettiReturn } from './types';

/**
 * A hook for imperatively triggering confetti explosions.
 *
 * @example
 * const { fire, isActive } = useConfetti();
 *
 * // Trigger with default options
 * fire();
 *
 * // Trigger with custom options
 * fire({ particleCount: 200, origin: { x: 0.5, y: 0.2 } });
 *
 * // Use in JSX
 * <button onClick={() => fire()}>Celebrate!</button>
 * <ConfettiExplosion {...confettiProps} />
 */
export function useConfetti(): UseConfettiReturn & { props: Partial<ConfettiExplosionProps> } {
  const [isActive, setIsActive] = useState(false);
  const [options, setOptions] = useState<Partial<ConfettiExplosionProps>>({});

  const fire = useCallback((customOptions?: Partial<ConfettiExplosionProps>) => {
    setOptions(customOptions || {});
    setIsActive(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsActive(false);
  }, []);

  return {
    fire,
    isActive,
    props: {
      ...options,
      active: isActive,
      onComplete: handleComplete,
    },
  };
}
