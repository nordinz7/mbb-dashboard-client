export type Transaction = {
  id: number;
  date: string;
  amount: number;
  description: string;
  balance: number;
  created_at: string;
};

export type BankStatement = {
  id: number;
  account_number: string;
  date: string;
  created_at: string;
  updated_at: string;
};

export type ListResponse<T> = {
  rows: T[];
  total: number;
  limit: number;
  offset: number;
};

export type Transactions = ListResponse<Transaction>;
export type BankStatements = ListResponse<BankStatement>;
