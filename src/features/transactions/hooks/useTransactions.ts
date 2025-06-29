import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchTransactions } from '../services/transactions.service';
import {
  TransactionQueryParams,
  Transactions,
} from '../types/transaction.types';
import { getTransactionQueryParams } from '../lib/transcations.lib';
import { convertToSearchParams } from '../../../shared/utils/searchParams.utils';

export function useTransactions(initialFilters: TransactionQueryParams = {}) {
  const [transactions, setTransactions] = useState<Transactions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<TransactionQueryParams>(
    {},
  );
  const isInitialized = useRef(false);

  // Get filters from URL search params
  const getFiltersFromUrl = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return getTransactionQueryParams(urlParams);
  }, []);

  // Update URL search params when filters change
  const updateUrlParams = useCallback((newFilters: TransactionQueryParams) => {
    const searchParams = convertToSearchParams(newFilters);
    const url = new URL(window.location.href);
    url.search = searchParams.toString();
    window.history.replaceState({}, '', url.toString());
  }, []);

  const loadTransactions = useCallback(
    async (filters: TransactionQueryParams) => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchTransactions({
          limit: 50,
          offset: 0,
          ...filters,
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

  // Initialize from URL on mount
  useEffect(() => {
    if (!isInitialized.current) {
      const urlFilters = getFiltersFromUrl();
      const mergedFilters = { ...initialFilters, ...urlFilters };

      setCurrentFilters(mergedFilters);
      loadTransactions(mergedFilters);
      isInitialized.current = true;
    }
  }, [initialFilters, getFiltersFromUrl, loadTransactions]);

  // Update filters and sync with URL
  const updateFilters = useCallback(
    (newFilters: TransactionQueryParams) => {
      const mergedFilters = { ...currentFilters, ...newFilters };
      setCurrentFilters(mergedFilters);
      updateUrlParams(mergedFilters);
      loadTransactions(mergedFilters);
    },
    [currentFilters, updateUrlParams, loadTransactions],
  );

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlFilters = getFiltersFromUrl();
      setCurrentFilters(urlFilters);
      loadTransactions(urlFilters);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getFiltersFromUrl, loadTransactions]);

  const refetch = useCallback(() => {
    loadTransactions(currentFilters);
  }, [loadTransactions, currentFilters]);

  return {
    transactions,
    loading,
    error,
    filters: currentFilters,
    updateFilters,
    refetch,
  };
}
