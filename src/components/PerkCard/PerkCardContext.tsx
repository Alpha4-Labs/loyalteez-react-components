'use client';

import { createContext, useContext, useMemo } from 'react';
import type {
  PerkCardContextValue,
  PerkData,
  PerkCardVariant,
  PerkCardSize,
  ClaimState,
} from './types';

const PerkCardContext = createContext<PerkCardContextValue | null>(null);

export interface PerkCardProviderProps {
  perk: PerkData;
  variant: PerkCardVariant;
  size: PerkCardSize;
  interactive: boolean;
  userBalance?: number | bigint;
  isFavorited: boolean;
  claimState: ClaimState;
  onClaim?: () => void;
  onFavorite?: () => void;
  onClick?: () => void;
  children: React.ReactNode;
}

export function PerkCardProvider({
  perk,
  variant,
  size,
  interactive,
  userBalance,
  isFavorited,
  claimState,
  onClaim,
  onFavorite,
  onClick,
  children,
}: PerkCardProviderProps) {
  // Calculate if user can afford the perk
  const canAfford = useMemo(() => {
    if (userBalance === undefined) return true; // Assume can afford if no balance provided
    const balance = typeof userBalance === 'bigint' ? userBalance : BigInt(userBalance);
    const price = typeof perk.price === 'bigint' ? perk.price : BigInt(perk.price);
    return balance >= price;
  }, [userBalance, perk.price]);

  const value = useMemo<PerkCardContextValue>(
    () => ({
      perk,
      variant,
      size,
      interactive,
      canAfford,
      userBalance,
      isFavorited,
      claimState,
      onClaim,
      onFavorite,
      onClick,
    }),
    [
      perk,
      variant,
      size,
      interactive,
      canAfford,
      userBalance,
      isFavorited,
      claimState,
      onClaim,
      onFavorite,
      onClick,
    ]
  );

  return <PerkCardContext.Provider value={value}>{children}</PerkCardContext.Provider>;
}

export function usePerkCard(): PerkCardContextValue {
  const context = useContext(PerkCardContext);
  if (!context) {
    throw new Error('usePerkCard must be used within a PerkCard component');
  }
  return context;
}

export function usePerkCardOptional(): PerkCardContextValue | null {
  return useContext(PerkCardContext);
}
