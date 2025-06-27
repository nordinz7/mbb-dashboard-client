import { useState, useCallback, useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import {
  TransactionQueryParams,
  Transaction,
} from '../types/transaction.types';
import { TransactionTable } from './TranscationTable';
import { PaginationComponent, usePagination } from '../../../shared';

type TransactionListProps = {} & Omit<
  TransactionQueryParams,
  'limit' | 'offset'
>;

export const TransactionList = ({
  ...initialFilters
}: TransactionListProps) => {
  const { limit, offset, handlePageChange, resetPagination } = usePagination();
  const [filters, setFilters] =
    useState<Partial<TransactionQueryParams>>(initialFilters);
  const [currentSort, setCurrentSort] =
    useState<TransactionQueryParams['sort']>();

  // Memoize the combined filters to prevent unnecessary re-renders
  const combinedFilters = useMemo(
    () => ({
      ...filters,
      sort: currentSort,
      limit,
      offset,
    }),
    [filters, currentSort, limit, offset],
  );

  const { transactions, loading, error } = useTransactions(combinedFilters);

  const handleFilter = useCallback(
    (newFilters: Partial<TransactionQueryParams>) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
      resetPagination(); // Reset to first page when filters change
    },
    [resetPagination],
  );

  const handleSort = useCallback(
    (column: keyof Transaction) => {
      let newSort: TransactionQueryParams['sort'];

      if (currentSort === column) {
        // If already sorting by this column ascending, switch to descending
        newSort = `-${column}` as TransactionQueryParams['sort'];
      } else if (currentSort === `-${column}`) {
        // If sorting descending, remove sort
        newSort = undefined;
      } else {
        // Otherwise, sort ascending
        newSort = column;
      }

      setCurrentSort(newSort);
      resetPagination(); // Reset to first page when sort changes
    },
    [currentSort, resetPagination],
  );

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error loading transactions: {error}</span>
      </div>
    );
  }

  if (!transactions || transactions.rows.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-base-content/60">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Transactions
          {transactions && (
            <span className="text-sm font-normal text-base-content/60 ml-2">
              ({transactions.total} total)
            </span>
          )}
        </h2>
      </div>

      <TransactionTable
        list={transactions.rows}
        offset={offset}
        onSort={handleSort}
        currentSort={currentSort}
        onFilter={handleFilter}
        filters={filters}
      />

      <PaginationComponent
        limit={transactions.limit}
        total={transactions.total}
        offset={transactions.offset}
        onPageChange={handlePageChange}
        disabled={loading}
      />
    </div>
  );
};
