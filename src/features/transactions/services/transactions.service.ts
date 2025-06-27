import { fetchFromApi } from '../../../shared/api/client';
import { ListResponse } from '../../../shared/types';
import { Transaction } from '../types/transaction.types';

export type Transactions = ListResponse<Transaction>;

export async function fetchTransactions(
  params: Record<string, string | number | undefined>,
): Promise<Transactions> {
  return fetchFromApi('transactions', params, 'Failed to fetch transactions');
}

export async function fetchTransactionById(id: number): Promise<Transaction> {
  return fetchFromApi(
    `transactions/${id}`,
    {},
    `Failed to fetch transaction ${id}`,
  );
}

export async function searchTransactions(
  query: string,
  params: Record<string, string | number | undefined> = {},
): Promise<Transactions> {
  return fetchFromApi(
    'transactions/search',
    { ...params, q: query },
    'Failed to search transactions',
  );
}
