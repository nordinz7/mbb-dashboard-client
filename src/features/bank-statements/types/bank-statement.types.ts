import { ListResponse, SearchParamsConvert, SortOption } from '../../../shared';

export type BankStatement = {
  id: number;
  account_number: string;
  date: string;
  created_at: string;
  updated_at: string;
};

export type BankStatements = ListResponse<BankStatement>;

export type BankStatementUploadResponse = {
  bank_statement_id: number;
  date: string;
  account_number: string;
  success: boolean;
  message: string;
  fileName: string;
};

export type BankStatementUploadResponses = BankStatementUploadResponse[];

export type BankStatementQueryParams = {
  limit?: number;
  offset?: number;
  account_number?: string;
  date_from?: string;
  date_to?: string;
  sort?: SortOption<keyof BankStatement>;
};

export type BankStatementSearchParams =
  SearchParamsConvert<BankStatementQueryParams>;
