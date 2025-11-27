'use client';

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { formatLTZ } from '@/utils/formatLTZ';
import type {
  Toast,
  ToastType,
  ToastOptions,
  RewardToastOptions,
  ToastContextValue,
  ToastProviderProps,
  ToastPosition,
} from './types';

const ToastContext = createContext<ToastContextValue | null>(null);

let toastIdCounter = 0;

export function ToastProvider({
  children,
  position = 'top-right',
  defaultDuration = 5000,
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, options: ToastOptions): string => {
      const id = `toast-${++toastIdCounter}`;
      const duration = options.duration ?? defaultDuration;

      const toast: Toast = {
        id,
        type,
        title: options.title,
        description: options.description,
        icon: options.icon,
        duration,
        confetti: options.confetti,
        action: options.action,
        createdAt: Date.now(),
      };

      setToasts((prev) => {
        // Remove oldest if at max
        const updated = prev.length >= maxToasts ? prev.slice(1) : prev;
        return [...updated, toast];
      });

      // Auto-remove after duration
      if (duration > 0) {
        const timer = setTimeout(() => removeToast(id), duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [defaultDuration, maxToasts, removeToast]
  );

  const clearAll = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  // Convenience methods
  const reward = useCallback(
    (options: RewardToastOptions): string => {
      const title = `+${formatLTZ(options.amount)} ${options.label || 'LTZ'}`;
      return addToast('reward', {
        title,
        description: options.description,
        icon: options.icon,
        duration: options.duration,
        confetti: options.confetti ?? true,
        action: options.action,
      });
    },
    [addToast]
  );

  const success = useCallback(
    (options: ToastOptions): string => addToast('success', options),
    [addToast]
  );

  const error = useCallback(
    (options: ToastOptions): string =>
      addToast('error', { ...options, duration: options.duration ?? 0 }),
    [addToast]
  );

  const warning = useCallback(
    (options: ToastOptions): string => addToast('warning', options),
    [addToast]
  );

  const info = useCallback(
    (options: ToastOptions): string => addToast('info', options),
    [addToast]
  );

  const value: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    clearAll,
    reward,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} position={position} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Internal Toast Container
function ToastContainer({
  toasts,
  position,
  onClose,
}: {
  toasts: Toast[];
  position: ToastPosition;
  onClose: (id: string) => void;
}) {
  const positionClasses: Record<ToastPosition, string> = {
    'top-right': 'top-0 right-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-0 left-0',
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className={`pointer-events-none fixed z-50 flex flex-col gap-2 p-4 ${positionClasses[position]}`}
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => onClose(toast.id)} />
      ))}
    </div>
  );
}

// Internal Toast Item
import { TOAST_TYPE_CONFIG } from './types';

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const config = TOAST_TYPE_CONFIG[toast.type];

  return (
    <div
      className={`pointer-events-auto min-w-[300px] max-w-md animate-ltz-slide-in-right rounded-xl border p-4 shadow-lg backdrop-blur-sm ${config.bgClass} `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg ${config.iconBgClass}`}
        >
          {toast.icon || config.icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-grow">
          <h4 className="font-bold text-ltz-text-primary">{toast.title}</h4>
          {toast.description && (
            <p className="mt-0.5 text-sm text-ltz-text-secondary">{toast.description}</p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-ltz-cyan hover:text-ltz-cyan/80 mt-2 text-sm font-medium transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-ltz-text-muted transition-colors hover:bg-ltz-bg-tertiary hover:text-ltz-text-primary"
          aria-label="Close notification"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Progress bar for duration */}
      {toast.duration && toast.duration > 0 && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-ltz-bg-tertiary">
          <div
            className="ltz-bg-gradient-primary h-full rounded-full"
            style={{
              animation: `shrink ${toast.duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
