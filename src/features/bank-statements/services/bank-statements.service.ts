import { fetchFromApi } from '../../../shared/api/client';
import {
  BankStatement,
  BankStatementQueryParams,
  BankStatements,
  BankStatementUploadResponses,
} from '../types/bank-statement.types';
import config from '../../../shared/config/app.config';

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
  params: BankStatementQueryParams,
): Promise<BankStatements> {
  return fetchFromApi(
    'bank-statements',
    params,
    'Failed to fetch bank statements',
  );
}

export async function uploadBankStatements(
  files: FileList,
): Promise<BankStatementUploadResponses> {
  const formData = new FormData();

  // Add all selected files to the form data
  Array.from(files).forEach((file) => {
    formData.append('file', file);
  });

  const response = await fetch(`${config.API_URL}/api/bank-statements/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload bank statements');
  }

  return response.json();
}
