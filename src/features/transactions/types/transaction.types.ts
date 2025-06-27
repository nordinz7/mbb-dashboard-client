import { ListResponse, SearchParamsConvert, SortOption } from '../../../shared';

export type Transaction = {
  id: number;
  date: string;
  amount: number;
  description: string;
  balance: number;
  created_at: string;
};

export type Transactions = ListResponse<Transaction>;

export type TransactionQueryParams = {
  limit?: number;
  offset?: number;
  bank_statement_id?: number;
  q?: string;
  date_from?: string;
  date_to?: string;
  sort?: SortOption<keyof Transaction>;
};

export type TransactionSearchParams =
  SearchParamsConvert<TransactionQueryParams>;

export type TransactionParamsInput =
  | URLSearchParams
  | string
  | TransactionSearchParams;
