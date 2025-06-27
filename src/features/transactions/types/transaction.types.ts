import { ListResponse } from '../../../shared';

export type Transaction = {
  id: number;
  date: string;
  amount: number;
  description: string;
  balance: number;
  created_at: string;
};

export type Transactions = ListResponse<Transaction>;

export type TransactionFilters = {
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  description?: string;
};

export type TransactionSortOptions = {
  field: 'date' | 'amount' | 'description';
  direction: 'asc' | 'desc';
};
