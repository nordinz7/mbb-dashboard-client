import { fetchFromApi } from '../../../shared/api/client';
import { ListResponse } from '../../../shared/types';
import { BankStatement } from '../types/bank-statement.types';

export type BankStatements = ListResponse<BankStatement>;

export async function fetchBankStatements(
  params: Record<string, string | number | undefined>,
): Promise<BankStatements> {
  return fetchFromApi(
    'bank-statements',
    params,
    'Failed to fetch bank statements',
  );
}

export async function fetchBankStatementById(
  id: number,
): Promise<BankStatement> {
  return fetchFromApi(
    `bank-statements/${id}`,
    {},
    `Failed to fetch bank statement ${id}`,
  );
}
