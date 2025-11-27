import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge for optimal className handling.
 * Use this for all component className props.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

