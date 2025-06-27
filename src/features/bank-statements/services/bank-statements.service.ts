import { fetchFromApi } from '../../../shared/api/client';
import { BankStatement, BankStatements } from '../types/bank-statement.types';

export async function fetchBankStatementById(
  id: number,
): Promise<BankStatement> {
  return fetchFromApi(
    `bank-statements/${id}`,
    {},
    `Failed to fetch bank statement ${id}`,
  );
}

export async function fetchBankStatements(
  params: Record<string, string | number | undefined>,
): Promise<BankStatements> {
  return fetchFromApi(
    'bank-statements',
    params,
    'Failed to fetch bank statements',
  );
}
