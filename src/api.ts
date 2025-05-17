import config from './config';

async function fetchFromApi(
  endpoint: string,
  params: Record<string, string | number | undefined>,
  errorMsg: string,
) {
  const url = new URL(`${config.API_URL}/api/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value));
  });
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(errorMsg);
  return res.json();
}

export async function fetchBankStatements(
  params: Record<string, string | number | undefined>,
) {
  return fetchFromApi(
    'bank-statements',
    params,
    'Failed to fetch bank statements',
  );
}

export async function fetchTransactions(
  params: Record<string, string | number | undefined>,
) {
  return fetchFromApi('transactions', params, 'Failed to fetch transactions');
}
