// Common API response types
export type Pagination = {
  limit: number;
  offset: number;
  total: number;
};

export type ListResponse<T> = {
  rows: T[];
} & Pagination;

// Common utility types
export type ApiError = {
  message: string;
  code?: string;
  details?: unknown;
};

export type SortParams = {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};
