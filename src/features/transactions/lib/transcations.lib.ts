import {
  TransactionParamsInput,
  TransactionQueryParams,
} from '../types/transaction.types';

export function convertToQueryParams(
  input: TransactionParamsInput,
): TransactionQueryParams {
  const searchParams = convertToSearchParams(input);
  const queryParams: TransactionQueryParams = {};

  for (const [key, value] of searchParams.entries()) {
    if (value !== undefined && value !== null) {
      // Convert to appropriate type based on key
      switch (key) {
        case 'limit':
        case 'offset':
          queryParams[key] = Number(value);
          break;
        case 'bank_statement_id':
          queryParams[key] = Number(value);
          break;
        default:
          queryParams[key] = value;
      }
    }
  }

  return queryParams;
}

export function convertToSearchParams(
  input: TransactionParamsInput,
): URLSearchParams {
  let searchParams = new URLSearchParams();

  if (input instanceof URLSearchParams) {
    // If input is already URLSearchParams, just return it
    return input;
  } else if (typeof input === 'string') {
    // If input is a string, parse it as URLSearchParams
    searchParams = new URLSearchParams(input);
  } else {
    // If input is TransactionSearchParams, convert it to URLSearchParams
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    }
  }

  return searchParams;
}
