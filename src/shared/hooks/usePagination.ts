import { useState, useCallback } from 'react';
import { PAGINATION } from '../constants';

export interface UsePaginationOptions {
  initialLimit?: number;
  initialOffset?: number;
}

export interface UsePaginationReturn {
  limit: number;
  offset: number;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
  handlePageChange: (newOffset: number) => void;
  resetPagination: () => void;
}

export function usePagination(
  options: UsePaginationOptions = {}
): UsePaginationReturn {
  const {
    initialLimit = PAGINATION.DEFAULT_LIMIT,
    initialOffset = PAGINATION.DEFAULT_OFFSET,
  } = options;

  const [limit, setLimit] = useState<number>(initialLimit);
  const [offset, setOffset] = useState<number>(initialOffset);

  const handlePageChange = useCallback((newOffset: number) => {
    setOffset(newOffset);
  }, []);

  const resetPagination = useCallback(() => {
    setOffset(initialOffset);
    setLimit(initialLimit);
  }, [initialLimit, initialOffset]);

  return {
    limit,
    offset,
    setLimit,
    setOffset,
    handlePageChange,
    resetPagination,
  };
}
