import type { HTMLAttributes, ReactNode } from 'react';

export type ViewMode = 'grid' | 'list';
export type SortDirection = 'asc' | 'desc';

export interface FilterOption {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon (optional) */
  icon?: ReactNode;
  /** Count (optional) */
  count?: number;
}

export interface FilterGroup {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Filter options */
  options: FilterOption[];
  /** Allow multiple selections */
  multiple?: boolean;
}

export interface SortOption {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Sort direction */
  direction?: SortDirection;
}

export interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Filter groups configuration
   */
  filters?: FilterGroup[];

  /**
   * Currently active filters (map of groupId -> optionId[])
   */
  activeFilters?: Record<string, string[]>;

  /**
   * Filter change handler
   */
  onFilterChange?: (groupId: string, optionIds: string[]) => void;

  /**
   * Sort options
   */
  sortOptions?: SortOption[];

  /**
   * Currently active sort
   */
  activeSort?: string;

  /**
   * Sort change handler
   */
  onSortChange?: (sortId: string) => void;

  /**
   * Show view mode toggle
   * @default true
   */
  showViewToggle?: boolean;

  /**
   * Current view mode
   */
  viewMode?: ViewMode;

  /**
   * View mode change handler
   */
  onViewModeChange?: (mode: ViewMode) => void;

  /**
   * Show search input
   * @default false
   */
  showSearch?: boolean;

  /**
   * Search value
   */
  searchValue?: string;

  /**
   * Search change handler
   */
  onSearchChange?: (value: string) => void;

  /**
   * Search placeholder
   * @default 'Search...'
   */
  searchPlaceholder?: string;

  /**
   * Show clear all button when filters are active
   * @default true
   */
  showClearAll?: boolean;

  /**
   * Clear all handler
   */
  onClearAll?: () => void;

  /**
   * Total results count
   */
  totalResults?: number;

  /**
   * Custom right content
   */
  rightContent?: ReactNode;

  /**
   * Compact mode (mobile-friendly)
   * @default false
   */
  compact?: boolean;
}

export interface FilterChipProps extends HTMLAttributes<HTMLButtonElement> {
  /** Label */
  label: string;
  /** Active state */
  active?: boolean;
  /** Count */
  count?: number;
  /** Icon */
  icon?: ReactNode;
  /** On click */
  onToggle?: () => void;
  /** On remove (when active) */
  onRemove?: () => void;
}

export interface FilterDropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Filter group */
  group: FilterGroup;
  /** Active options */
  activeOptions: string[];
  /** Change handler */
  onOptionsChange: (optionIds: string[]) => void;
}
