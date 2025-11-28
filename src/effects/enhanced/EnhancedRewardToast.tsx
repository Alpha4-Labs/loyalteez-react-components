'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from 'react';
import { cn } from '@/utils/cn';
import { formatLTZ } from '@/utils/formatLTZ';
import { GlowEffect } from '../GlowEffect';
import { ParticleEffect } from '../ParticleEffect';
import { ShakeEffect } from '../ShakeEffect';
import type { ToastType, ToastPosition } from '@/components/RewardToast/types';

// ============================================
// Types
// ============================================

export interface EnhancedToast {
  id: string;
  type: ToastType;
  title?: string;
  description?: string;
  amount?: number;
  duration?: number;
  showEffects?: boolean;
}

export interface EnhancedToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  showEffects?: boolean;
}

export interface EnhancedRewardOptions extends EnhancedToastOptions {
  amount: number;
}

export interface EnhancedToastContextValue {
  toasts: EnhancedToast[];
  reward: (options: EnhancedRewardOptions) => void;
  success: (options: EnhancedToastOptions) => void;
  error: (options: EnhancedToastOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export interface EnhancedToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
  defaultDuration?: number;
  defaultShowEffects?: boolean;
}

// ============================================
// Context
// ============================================

const EnhancedToastContext = createContext<EnhancedToastContextValue | null>(null);

// ============================================
// Provider
// ============================================

/**
 * Enhanced toast notification system with built-in visual effects.
 * Shows coin particles, glows, and dramatic count reveals for rewards.
 *
 * @example
 * <EnhancedToastProvider defaultShowEffects>
 *   <App />
 * </EnhancedToastProvider>
 *
 * @example
 * // In a component
 * const { reward, success, error } = useEnhancedToast();
 *
 * reward({ amount: 500, title: 'Daily Bonus!' });
 * success({ title: 'Profile Updated' });
 * error({ title: 'Transaction Failed', description: 'Please try again' });
 */
export function EnhancedToastProvider({
  children,
  position = 'top-right',
  maxToasts = 3,
  defaultDuration = 4000,
  defaultShowEffects = true,
}: EnhancedToastProviderProps) {
  const [toasts, setToasts] = useState<EnhancedToast[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Cleanup timers on unmount
  useEffect(() => {
    const currentTimers = timersRef.current;
    return () => {
      currentTimers.forEach(clearTimeout);
    };
  }, []);

  // Generate unique ID
  const generateId = useCallback(() => `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`, []);

  // Add toast
  const addToast = useCallback(
    (toast: Omit<EnhancedToast, 'id'>) => {
      const id = generateId();
      const duration = toast.duration ?? defaultDuration;
      const showEffects = toast.showEffects ?? defaultShowEffects;

      setToasts((prev) => {
        const newToasts = [{ ...toast, id, showEffects }, ...prev];
        return newToasts.slice(0, maxToasts);
      });

      // Auto-dismiss
      const timer = setTimeout(() => {
        dismiss(id);
      }, duration);
      timersRef.current.set(id, timer);

      return id;
    },
    [generateId, defaultDuration, defaultShowEffects, maxToasts]
  );

  // Dismiss toast
  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Dismiss all
  const dismissAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current.clear();
    setToasts([]);
  }, []);

  // Toast creators
  const reward = useCallback(
    (options: EnhancedRewardOptions) => {
      addToast({
        type: 'reward',
        title: options.title ?? 'Reward Earned!',
        amount: options.amount,
        duration: options.duration ?? 5000, // Rewards show longer
        showEffects: options.showEffects,
      });
    },
    [addToast]
  );

  const success = useCallback(
    (options: EnhancedToastOptions) => {
      addToast({
        type: 'success',
        title: options.title ?? 'Success',
        description: options.description,
        duration: options.duration,
        showEffects: options.showEffects,
      });
    },
    [addToast]
  );

  const error = useCallback(
    (options: EnhancedToastOptions) => {
      addToast({
        type: 'error',
        title: options.title ?? 'Error',
        description: options.description,
        duration: options.duration,
        showEffects: options.showEffects,
      });
    },
    [addToast]
  );

  // Position classes
  const positionClasses: Record<ToastPosition, string> = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <EnhancedToastContext.Provider value={{ toasts, reward, success, error, dismiss, dismissAll }}>
      {children}

      {/* Toast Container */}
      <div
        className={cn(
          'pointer-events-none fixed z-[9999] flex flex-col gap-3',
          positionClasses[position]
        )}
        aria-live="polite"
      >
        {toasts.map((toast, index) => (
          <EnhancedToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => dismiss(toast.id)}
            index={index}
          />
        ))}
      </div>
    </EnhancedToastContext.Provider>
  );
}

// ============================================
// Toast Item Component
// ============================================

interface ToastItemProps {
  toast: EnhancedToast;
  onDismiss: () => void;
  index: number;
}

function EnhancedToastItem({ toast, onDismiss, index }: ToastItemProps) {
  const [showParticles, setShowParticles] = useState(toast.showEffects && toast.type === 'reward');
  const [isShaking, setIsShaking] = useState(toast.showEffects && toast.type === 'error');

  // Type-specific styling
  const typeConfig: Record<ToastType, { bg: string; glow: string; icon: ReactNode }> = {
    reward: {
      bg: 'bg-gradient-to-r from-amber-600/90 to-yellow-500/90',
      glow: 'gold',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
        </svg>
      ),
    },
    success: {
      bg: 'bg-emerald-600/90',
      glow: 'green',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      bg: 'bg-red-600/90',
      glow: 'red',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    warning: {
      bg: 'bg-amber-500/90',
      glow: 'gold',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    info: {
      bg: 'bg-blue-600/90',
      glow: 'cyan',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const config = typeConfig[toast.type];

  let content = (
    <div
      className={cn(
        'pointer-events-auto flex min-w-[300px] items-start gap-3 rounded-lg p-4 shadow-xl backdrop-blur-sm',
        'animate-[slideIn_0.3s_ease-out]',
        config.bg
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 text-white">{config.icon}</div>

      {/* Content */}
      <div className="min-w-0 flex-grow">
        <p className="font-semibold text-white">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-sm text-white/80">{toast.description}</p>
        )}
        {toast.type === 'reward' && toast.amount !== undefined && (
          <div className="mt-2">
            <span className="text-2xl font-bold text-white">
              +{formatLTZ(toast.amount)} LTZ
            </span>
          </div>
        )}
      </div>

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="flex-shrink-0 text-white/70 transition-colors hover:text-white"
        aria-label="Dismiss"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* CSS keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slideIn {
              from { opacity: 0; transform: translateX(100%); }
              to { opacity: 1; transform: translateX(0); }
            }
          `,
        }}
      />
    </div>
  );

  // Wrap with effects
  if (toast.showEffects) {
    // Error shake
    if (toast.type === 'error') {
      content = (
        <ShakeEffect
          trigger={isShaking}
          pattern="horizontal"
          intensity="normal"
          onComplete={() => setIsShaking(false)}
        >
          {content}
        </ShakeEffect>
      );
    }

    // Reward particles
    if (toast.type === 'reward') {
      content = (
        <ParticleEffect
          active={showParticles}
          shape="coin"
          motion="rise"
          count={20}
          colors={['#FFD700', '#FFA500', '#DAA520']}
          origin={{ x: 0.5, y: 0.8 }}
          onComplete={() => setShowParticles(false)}
        >
          {content}
        </ParticleEffect>
      );
    }

    // Glow for all types
    content = (
      <GlowEffect
        color={config.glow as 'gold' | 'green' | 'red' | 'cyan'}
        pattern="pulse"
        intensity={toast.type === 'reward' ? 'intense' : 'normal'}
        active
      >
        {content}
      </GlowEffect>
    );
  }

  return content;
}

// ============================================
// Hook
// ============================================

export function useEnhancedToast(): EnhancedToastContextValue {
  const context = useContext(EnhancedToastContext);
  if (!context) {
    throw new Error('useEnhancedToast must be used within EnhancedToastProvider');
  }
  return context;
}

