// Common API response types
export type ListResponse<T> = {
  rows: T[];
  total: number;
  limit: number;
  offset: number;
};

// Common utility types
export type ApiError = {
  message: string;
  code?: string;
  details?: unknown;
};

export type PaginationParams = {
  limit?: number;
  offset?: number;
};

export type SortParams = {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};
