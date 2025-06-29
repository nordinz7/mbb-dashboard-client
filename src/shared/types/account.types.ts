export interface AccountNumber {
  account_number: string;
}

export interface AccountNumbersResponse {
  rows: AccountNumber[];
  total: number;
}

export interface AccountNumbersParams {
  q?: string;
  limit?: number;
  offset?: number;
  sort?: string;
}
