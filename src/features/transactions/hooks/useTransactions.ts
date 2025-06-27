import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchTransactions } from '../services/transactions.service';
import {
  TransactionQueryParams,
  Transactions,
} from '../types/transaction.types';

export function useTransactions(filters: TransactionQueryParams) {
  const [transactions, setTransactions] = useState<Transactions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filtersRef = useRef<string>('');

  const loadTransactions = useCallback(
    async (newFilters: TransactionQueryParams) => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchTransactions({
          limit: 50,
          offset: 0,
          ...newFilters,
        });
        setTransactions(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load transactions',
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    // Create a stable string representation of filters for comparison
    const filtersString = JSON.stringify(filters);

    // Only fetch if filters actually changed
    if (filtersRef.current !== filtersString) {
      filtersRef.current = filtersString;
      loadTransactions(filters);
    }
  }, [filters, loadTransactions]);

  const refetch = async (input: TransactionQueryParams = {}) =>
    loadTransactions(input);

  return {
    transactions,
    loading,
    error,
    refetch,
  };
}
