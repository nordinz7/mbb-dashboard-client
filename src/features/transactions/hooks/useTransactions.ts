import { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/transactions.service';
import {
  TransactionFilters,
  Transactions,
  TransactionSortOptions,
} from '../types/transaction.types';

export function useTransactions(
  filters: TransactionFilters = {},
  sort: TransactionSortOptions = { field: 'date', direction: 'desc' },
  limit = 50,
  offset = 0,
) {
  const [transactions, setTransactions] = useState<Transactions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          ...filters,
          sortBy: sort.field,
          sortDirection: sort.direction,
          limit,
          offset,
        };

        const result = await fetchTransactions(params);
        setTransactions(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load transactions',
        );
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [filters, sort, limit, offset]);

  return {
    transactions,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
    },
  };
}
