import { fetchFromApi } from '../../../shared/api/client';
import { Transaction, Transactions } from '../types/transaction.types';

export async function fetchTransactionById(id: number): Promise<Transaction> {
  return fetchFromApi(
    `transactions/${id}`,
    {},
    `Failed to fetch transaction ${id}`,
  );
}

export async function fetchTransactions(
  params: Record<string, string | number | undefined>,
): Promise<Transactions> {
  return fetchFromApi('transactions', params, 'Failed to fetch transactions');
}
