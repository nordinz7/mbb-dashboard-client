import { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/transactions.service';
import {
  TransactionQueryParams,
  Transactions,
} from '../types/transaction.types';

export function useTransactions(filters?: TransactionQueryParams) {
  const [transactions, setTransactions] = useState<Transactions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = async (newFilters) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchTransactions(newFilters);
      setTransactions(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load transactions',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions(filters);
  }, [filters]);

  const refetch = async (input?: TransactionQueryParams) =>
    loadTransactions(input);

  return {
    transactions,
    loading,
    error,
    refetch,
  };
}
