import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchBankStatements } from '../services/bank-statements.service';
import {
  BankStatementQueryParams,
  BankStatements,
} from '../types/bank-statement.types';
import { getBankStatementQueryParams } from '../lib/bank-statements.lib';
import { convertToSearchParams } from '../../../shared/utils/searchParams.utils';

export function useBankStatements(
  initialFilters: BankStatementQueryParams = {},
) {
  const [bankStatements, setBankStatements] = useState<BankStatements | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] =
    useState<BankStatementQueryParams>({});
  const isInitialized = useRef(false);

  // Get filters from URL search params
  const getFiltersFromUrl = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return getBankStatementQueryParams(urlParams);
  }, []);

  // Update URL search params when filters change
  const updateUrlParams = useCallback(
    (newFilters: BankStatementQueryParams) => {
      const searchParams = convertToSearchParams(newFilters);
      const url = new URL(window.location.href);
      url.search = searchParams.toString();
      window.history.replaceState({}, '', url.toString());
    },
    [],
  );

  const loadBankStatements = useCallback(
    async (filters: BankStatementQueryParams) => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchBankStatements({
          limit: 50,
          offset: 0,
          ...filters,
        });
        setBankStatements(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load bank statements',
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
      loadBankStatements(mergedFilters);
      isInitialized.current = true;
    }
  }, [initialFilters, getFiltersFromUrl, loadBankStatements]);

  // Update filters and sync with URL
  const updateFilters = useCallback(
    (newFilters: BankStatementQueryParams) => {
      const mergedFilters = { ...currentFilters, ...newFilters };
      setCurrentFilters(mergedFilters);
      updateUrlParams(mergedFilters);
      loadBankStatements(mergedFilters);
    },
    [currentFilters, updateUrlParams, loadBankStatements],
  );

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlFilters = getFiltersFromUrl();
      setCurrentFilters(urlFilters);
      loadBankStatements(urlFilters);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getFiltersFromUrl, loadBankStatements]);

  const refetch = useCallback(() => {
    loadBankStatements(currentFilters);
  }, [loadBankStatements, currentFilters]);

  return {
    bankStatements,
    loading,
    error,
    filters: currentFilters,
    updateFilters,
    refetch,
  };
}
