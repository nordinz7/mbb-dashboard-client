import { ListResponse } from '../../../shared';

export type BankStatement = {
  id: number;
  account_number: string;
  date: string;
  created_at: string;
  updated_at: string;
};

export type BankStatements = ListResponse<BankStatement>;

export type BankStatementFilters = {
  startDate?: string;
  endDate?: string;
  accountNumber?: string;
};
