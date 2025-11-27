'use client';

import { forwardRef, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/utils/cn';
import { formatLTZ } from '@/utils/formatLTZ';
import {
  modalOverlayStyles,
  modalContainerStyles,
  modalContentStyles,
  modalHeaderStyles,
  modalBodyStyles,
  modalFooterStyles,
  itemPreviewStyles,
  itemImageStyles,
  stateIconStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
  balanceWarningStyles,
  transactionLinkStyles,
} from './ClaimModal.styles';
import { DEFAULT_LABELS, STATE_CONFIG } from './types';
import type { ClaimModalProps, ClaimState } from './types';

// State Icons
function StateIcon({ state, size }: { state: ClaimState; size: 'sm' | 'md' | 'lg' }) {
  const iconSizeClass = size === 'sm' ? 'w-7 h-7' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10';

  switch (state) {
    case 'processing':
      return (
        <div className={cn(stateIconStyles({ size, state }))}>
          <svg
            className={cn(iconSizeClass, 'text-ltz-cyan animate-spin')}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      );
    case 'success':
      return (
        <div className={cn(stateIconStyles({ size, state }), 'animate-ltz-bounce-in')}>
          <svg
            className={cn(iconSizeClass, 'text-emerald-400')}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    case 'error':
      return (
        <div className={cn(stateIconStyles({ size, state }))}>
          <svg
            className={cn(iconSizeClass, 'text-red-400')}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

/**
 * A modal component for handling claim/transaction flows with multiple states.
 *
 * @example
 * // Basic usage
 * <ClaimModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   item={{ id: '1', title: 'Coffee Reward', cost: 500 }}
 *   state={claimState}
 *   onConfirm={handleClaim}
 *   userBalance={1000}
 * />
 *
 * @example
 * // With transaction tracking
 * <ClaimModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   item={selectedPerk}
 *   state={txState}
 *   onConfirm={handleClaim}
 *   transactionHash={txHash}
 *   explorerUrlTemplate="https://explorer.soneium.org/tx/{hash}"
 * />
 */
export const ClaimModal = forwardRef<HTMLDivElement, ClaimModalProps>(
  (
    {
      isOpen,
      onClose,
      item,
      state = 'idle',
      userBalance,
      onConfirm,
      errorMessage,
      transactionHash,
      explorerUrlTemplate = 'https://explorer.soneium.org/tx/{hash}',
      successMessage,
      estimatedTime,
      customContent,
      size = 'md',
      showConfetti = true,
      closeOnBackdropClick = true,
      autoCloseOnSuccess = 3000,
      labels = {},
      className,
      ...props
    },
    ref
  ) => {
    const mergedLabels = { ...DEFAULT_LABELS, ...labels };
    const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-close on success
    useEffect(() => {
      if (state === 'success' && autoCloseOnSuccess > 0) {
        autoCloseTimerRef.current = setTimeout(onClose, autoCloseOnSuccess);
      }
      return () => {
        if (autoCloseTimerRef.current) {
          clearTimeout(autoCloseTimerRef.current);
        }
      };
    }, [state, autoCloseOnSuccess, onClose]);

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && closeOnBackdropClick && state !== 'processing') {
          onClose();
        }
      },
      [closeOnBackdropClick, onClose, state]
    );

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen && state !== 'processing') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, state]);

    // Check affordability
    const canAfford = userBalance !== undefined ? userBalance >= item.cost : true;
    const stateConfig = STATE_CONFIG[state];

    // Explorer URL
    const explorerUrl = transactionHash
      ? explorerUrlTemplate.replace('{hash}', transactionHash)
      : null;

    if (!isOpen) return null;

    return (
      <>
        {/* Overlay */}
        <div
          className={cn(modalOverlayStyles({ visible: isOpen }))}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        {/* Container */}
        <div
          className={cn(modalContainerStyles({ visible: isOpen }))}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="claim-modal-title"
        >
          {/* Content */}
          <div
            ref={ref}
            className={cn(modalContentStyles({ size, visible: isOpen }), className)}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {/* Header */}
            <div className={cn(modalHeaderStyles({ size }))}>
              <div className="flex items-center justify-between">
                <h2 id="claim-modal-title" className="text-lg font-bold text-ltz-text-primary">
                  {stateConfig.title}
                </h2>
                {state !== 'processing' && (
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ltz-text-muted transition-colors hover:bg-ltz-bg-tertiary hover:text-ltz-text-primary"
                    aria-label="Close"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <p className="mt-1 text-sm text-ltz-text-secondary">{stateConfig.description}</p>
            </div>

            {/* Body */}
            <div className={cn(modalBodyStyles({ size }))}>
              {/* Custom content override */}
              {customContent?.[state] ? (
                customContent[state]
              ) : (
                <>
                  {/* State Icon (for processing/success/error) */}
                  {(state === 'processing' || state === 'success' || state === 'error') && (
                    <div className="mb-6 text-center">
                      <StateIcon state={state} size={size} />

                      {state === 'success' && (
                        <p className="font-medium text-emerald-400">
                          {successMessage || 'Your reward has been claimed!'}
                        </p>
                      )}

                      {state === 'error' && (
                        <p className="font-medium text-red-400">
                          {errorMessage || 'Something went wrong. Please try again.'}
                        </p>
                      )}

                      {state === 'processing' && estimatedTime && (
                        <p className="mt-2 text-sm text-ltz-text-muted">
                          Estimated time: ~{estimatedTime}s
                        </p>
                      )}

                      {/* Transaction Link */}
                      {explorerUrl && (state === 'processing' || state === 'success') && (
                        <a
                          href={explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(transactionLinkStyles(), 'mt-3 inline-flex')}
                        >
                          View Transaction
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Item Preview (for idle/confirming) */}
                  {(state === 'idle' || state === 'confirming') && (
                    <>
                      <div className={cn(itemPreviewStyles({ size }))}>
                        <div className={cn(itemImageStyles({ size }))}>
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="from-ltz-purple to-ltz-cyan flex h-full w-full items-center justify-center bg-gradient-to-br text-2xl">
                              🎁
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-grow">
                          <h3 className="truncate font-bold text-ltz-text-primary">{item.title}</h3>
                          {item.description && (
                            <p className="line-clamp-2 text-sm text-ltz-text-secondary">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Cost */}
                      <div className="mt-4 flex items-center justify-between border-b border-t border-ltz-border py-3">
                        <span className="text-ltz-text-secondary">Cost</span>
                        <span className="ltz-text-gradient text-xl font-bold">
                          {formatLTZ(item.cost)} {item.costLabel || 'LTZ'}
                        </span>
                      </div>

                      {/* Balance Warning */}
                      {userBalance !== undefined && (
                        <div
                          className={cn(
                            balanceWarningStyles({
                              type: canAfford ? 'sufficient' : 'insufficient',
                            }),
                            'mt-4'
                          )}
                        >
                          <svg
                            className="h-4 w-4 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            {canAfford ? (
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            ) : (
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            )}
                          </svg>
                          <span>
                            Your balance: <strong>{formatLTZ(userBalance)} LTZ</strong>
                            {!canAfford && ` (need ${formatLTZ(item.cost - userBalance)} more)`}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className={cn(modalFooterStyles({ size }))}>
              {/* Idle/Confirming State */}
              {(state === 'idle' || state === 'confirming') && (
                <>
                  <button onClick={onClose} className={cn(secondaryButtonStyles({ size }))}>
                    {mergedLabels.cancel}
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={!canAfford}
                    className={cn(
                      primaryButtonStyles({
                        size,
                        variant: canAfford ? 'primary' : 'disabled',
                      })
                    )}
                  >
                    {mergedLabels.confirm}
                  </button>
                </>
              )}

              {/* Processing State */}
              {state === 'processing' && (
                <div className="flex-1 text-center text-sm text-ltz-text-muted">
                  Please wait while we process your transaction...
                </div>
              )}

              {/* Success State */}
              {state === 'success' && (
                <button onClick={onClose} className={cn(primaryButtonStyles({ size }), 'flex-1')}>
                  {mergedLabels.close}
                </button>
              )}

              {/* Error State */}
              {state === 'error' && (
                <>
                  <button onClick={onClose} className={cn(secondaryButtonStyles({ size }))}>
                    {mergedLabels.cancel}
                  </button>
                  <button
                    onClick={onConfirm}
                    className={cn(primaryButtonStyles({ size, variant: 'danger' }), 'flex-1')}
                  >
                    {mergedLabels.retry}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

ClaimModal.displayName = 'ClaimModal';
