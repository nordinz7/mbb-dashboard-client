// Common API response types
export type Pagination = {
  limit: number;
  offset: number;
  total: number;
};

export type ListResponse<T> = {
  rows: T[];
} & Pagination;

export type SortOption<T extends string> = T | `-${T}`;

export type SearchParamsConvert<T extends Record<string, unknown>> = {
  [K in keyof T]?: T[K] extends string ? T[K] : string;
};

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
