// Common API response types
export type Pagination = {
  limit: number;
  offset: number;
  total: number;
};

export type PaginationProps = Pagination & {
  onPageChange: (newOffset: number) => void;
  disabled?: boolean;
};

export type ListResponse<T> = {
  rows: T[];
} & Pagination;

export type SortOption<T extends string> = T | `-${T}`;

export type SearchParamsConvert<T extends Record<string, unknown>> = {
  [K in keyof T]?: T[K] extends string ? T[K] : string;
};

export type ParamsInput<T extends Record<string, unknown>> =
  | URLSearchParams
  | string
  | T;
