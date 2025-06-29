import { useState, useEffect, useCallback } from 'react';
import { accountService } from '../services/account.service';
import { AccountNumber, AccountNumbersParams } from '../types/account.types';

interface UseAccountNumbersReturn {
  accountNumbers: AccountNumber[];
  loading: boolean;
  error: string | null;
  searchAccounts: (query: string) => void;
  hasMore: boolean;
  loadMore: () => void;
}

export const useAccountNumbers = (initialParams: AccountNumbersParams = {}): UseAccountNumbersReturn => {
  const [accountNumbers, setAccountNumbers] = useState<AccountNumber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<AccountNumbersParams>({
    limit: 50,
    offset: 0,
    sort: 'account_number',
    ...initialParams,
  });
  const [hasMore, setHasMore] = useState(true);

  const fetchAccountNumbers = useCallback(async (resetList = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const currentParams = resetList ? { ...params, offset: 0 } : params;
      const response = await accountService.getAccountNumbers(currentParams);
      
      if (resetList) {
        setAccountNumbers(response.rows);
      } else {
        setAccountNumbers(prev => [...prev, ...response.rows]);
      }
      
      setHasMore(response.rows.length === (currentParams.limit || 50));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchAccountNumbers(true);
  }, [fetchAccountNumbers]);

  const searchAccounts = (query: string) => {
    setParams(prev => ({ 
      ...prev, 
      q: query || undefined, 
      offset: 0 
    }));
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setParams(prev => ({ 
        ...prev, 
        offset: (prev.offset || 0) + (prev.limit || 50) 
      }));
      fetchAccountNumbers(false);
    }
  };

  return {
    accountNumbers,
    loading,
    error,
    searchAccounts,
    hasMore,
    loadMore,
  };
};
