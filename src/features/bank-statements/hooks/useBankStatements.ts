import { useState, useEffect } from 'react';
import {
  fetchBankStatements,
  BankStatements,
} from '../services/bank-statements.service';
import { BankStatementFilters } from '../types/bank-statement.types';

export function useBankStatements(
  filters: BankStatementFilters = {},
  limit = 50,
  offset = 0,
) {
  const [bankStatements, setBankStatements] = useState<BankStatements | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBankStatements = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          ...filters,
          limit,
          offset,
        };

        const result = await fetchBankStatements(params);
        setBankStatements(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load bank statements',
        );
      } finally {
        setLoading(false);
      }
    };

    loadBankStatements();
  }, [filters, limit, offset]);

  return {
    bankStatements,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
    },
  };
}
