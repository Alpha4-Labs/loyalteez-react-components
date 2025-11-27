'use client';

import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';
import type { FilterBarProps, FilterChipProps, FilterDropdownProps, ViewMode } from './types';

// ============================================
// Filter Chip
// ============================================

export const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ label, active, count, icon, onToggle, onRemove, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onToggle}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all',
          active
            ? 'bg-ltz-purple/20 text-ltz-purple border-ltz-purple/30 border'
            : 'border border-transparent bg-ltz-bg-tertiary text-ltz-text-secondary hover:border-ltz-border hover:text-ltz-text-primary',
          className
        )}
        {...props}
      >
        {icon}
        <span>{label}</span>
        {count !== undefined && (
          <span className={cn('text-xs', active ? 'text-ltz-purple/70' : 'text-ltz-text-muted')}>
            ({count})
          </span>
        )}
        {active && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="hover:bg-ltz-purple/30 ml-0.5 rounded-full p-0.5"
            aria-label={`Remove ${label} filter`}
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </button>
    );
  }
);
FilterChip.displayName = 'FilterChip';

// ============================================
// Filter Dropdown
// ============================================

export const FilterDropdown = forwardRef<HTMLDivElement, FilterDropdownProps>(
  ({ group, activeOptions, onOptionsChange, className, ...props }, _ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOptionToggle = useCallback(
      (optionId: string) => {
        if (group.multiple) {
          if (activeOptions.includes(optionId)) {
            onOptionsChange(activeOptions.filter((id) => id !== optionId));
          } else {
            onOptionsChange([...activeOptions, optionId]);
          }
        } else {
          onOptionsChange(activeOptions.includes(optionId) ? [] : [optionId]);
          setIsOpen(false);
        }
      },
      [group.multiple, activeOptions, onOptionsChange]
    );

    const hasActive = activeOptions.length > 0;

    return (
      <div ref={dropdownRef} className={cn('relative', className)} {...props}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
            hasActive
              ? 'bg-ltz-purple/20 text-ltz-purple border-ltz-purple/30 border'
              : 'border border-transparent bg-ltz-bg-tertiary text-ltz-text-secondary hover:border-ltz-border'
          )}
        >
          <span>{group.label}</span>
          {hasActive && (
            <span className="bg-ltz-purple flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
              {activeOptions.length}
            </span>
          )}
          <svg
            className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-2 min-w-[180px] animate-ltz-fade-in rounded-xl border border-ltz-border bg-ltz-bg-secondary p-2 shadow-xl">
            {group.options.map((option) => {
              const isActive = activeOptions.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionToggle(option.id)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-ltz-purple/10 text-ltz-purple'
                      : 'text-ltz-text-secondary hover:bg-ltz-bg-tertiary hover:text-ltz-text-primary'
                  )}
                >
                  {/* Checkbox for multiple */}
                  {group.multiple && (
                    <div
                      className={cn(
                        'flex h-4 w-4 items-center justify-center rounded border',
                        isActive ? 'border-ltz-purple bg-ltz-purple' : 'border-ltz-border'
                      )}
                    >
                      {isActive && (
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  )}
                  {option.icon}
                  <span className="flex-1 text-left">{option.label}</span>
                  {option.count !== undefined && (
                    <span className="text-xs text-ltz-text-muted">{option.count}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
FilterDropdown.displayName = 'FilterDropdown';

// ============================================
// View Mode Toggle
// ============================================

function ViewModeToggle({
  viewMode,
  onChange,
}: {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  return (
    <div className="flex rounded-lg border border-ltz-border bg-ltz-bg-tertiary p-1">
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={cn(
          'rounded-md p-1.5 transition-colors',
          viewMode === 'grid'
            ? 'bg-ltz-bg-secondary text-ltz-text-primary'
            : 'text-ltz-text-muted hover:text-ltz-text-secondary'
        )}
        aria-label="Grid view"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        className={cn(
          'rounded-md p-1.5 transition-colors',
          viewMode === 'list'
            ? 'bg-ltz-bg-secondary text-ltz-text-primary'
            : 'text-ltz-text-muted hover:text-ltz-text-secondary'
        )}
        aria-label="List view"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

// ============================================
// FilterBar
// ============================================

/**
 * A comprehensive filter bar for marketplace filtering, sorting, and view modes.
 *
 * @example
 * <FilterBar
 *   filters={[
 *     { id: 'category', label: 'Category', options: [...] },
 *     { id: 'brand', label: 'Brand', options: [...], multiple: true },
 *   ]}
 *   activeFilters={{ category: ['food'], brand: ['nike', 'adidas'] }}
 *   onFilterChange={(groupId, optionIds) => ...}
 *   sortOptions={[
 *     { id: 'newest', label: 'Newest' },
 *     { id: 'price-low', label: 'Price: Low to High' },
 *   ]}
 *   activeSort="newest"
 *   onSortChange={(sortId) => ...}
 *   viewMode="grid"
 *   onViewModeChange={(mode) => ...}
 *   showSearch
 *   searchValue={search}
 *   onSearchChange={setSearch}
 * />
 */
export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      filters = [],
      activeFilters = {},
      onFilterChange,
      sortOptions = [],
      activeSort,
      onSortChange,
      showViewToggle = true,
      viewMode = 'grid',
      onViewModeChange,
      showSearch = false,
      searchValue = '',
      onSearchChange,
      searchPlaceholder = 'Search...',
      showClearAll = true,
      onClearAll,
      totalResults,
      rightContent,
      compact = false,
      className,
      ...props
    },
    ref
  ) => {
    const hasActiveFilters = Object.values(activeFilters).some((arr) => arr.length > 0);

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-center gap-3',
          compact ? 'flex-col items-stretch' : '',
          className
        )}
        {...props}
      >
        {/* Search */}
        {showSearch && (
          <div className="relative flex-shrink-0">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ltz-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="focus:border-ltz-purple focus:ring-ltz-purple/50 w-full min-w-[200px] rounded-lg border border-ltz-border bg-ltz-bg-tertiary py-2 pl-10 pr-4 text-sm text-ltz-text-primary placeholder-ltz-text-muted focus:outline-none focus:ring-1"
            />
          </div>
        )}

        {/* Filter Dropdowns */}
        {filters.map((group) => (
          <FilterDropdown
            key={group.id}
            group={group}
            activeOptions={activeFilters[group.id] || []}
            onOptionsChange={(optionIds) => onFilterChange?.(group.id, optionIds)}
          />
        ))}

        {/* Sort Dropdown */}
        {sortOptions.length > 0 && (
          <div className="relative">
            <select
              value={activeSort}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="focus:border-ltz-purple appearance-none rounded-lg border border-ltz-border bg-ltz-bg-tertiary px-3 py-2 pr-8 text-sm text-ltz-text-secondary focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ltz-text-muted"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Clear All */}
        {showClearAll && hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm text-ltz-text-muted hover:text-ltz-text-secondary"
          >
            Clear all
          </button>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Results count */}
        {totalResults !== undefined && (
          <span className="text-sm text-ltz-text-muted">
            {totalResults} {totalResults === 1 ? 'result' : 'results'}
          </span>
        )}

        {/* Right content */}
        {rightContent}

        {/* View Mode Toggle */}
        {showViewToggle && onViewModeChange && (
          <ViewModeToggle viewMode={viewMode} onChange={onViewModeChange} />
        )}
      </div>
    );
  }
);
FilterBar.displayName = 'FilterBar';
