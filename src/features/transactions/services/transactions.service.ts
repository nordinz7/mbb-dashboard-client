import { fetchFromApi } from '../../../shared/api/client';
import {
  Transaction,
  TransactionQueryParams,
  Transactions,
} from '../types/transaction.types';

export async function fetchTransactionById(
  id: Transaction['id'],
): Promise<Transaction> {
  return fetchFromApi(
    `transactions/${id}`,
    {},
    `Failed to fetch transaction ${id}`,
  );
}

export async function fetchTransactions(
  params: TransactionQueryParams,
): Promise<Transactions> {
  return fetchFromApi('transactions', params, 'Failed to fetch transactions');
}
