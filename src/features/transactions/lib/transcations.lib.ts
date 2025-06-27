import { ParamsInput } from '../../../shared';
import { convertToQueryParams } from '../../../shared/utils/searchParams.utils';
import { TransactionQueryParams } from '../types/transaction.types';

function converter(searchParams: URLSearchParams): TransactionQueryParams {
  const result: TransactionQueryParams = {};

  for (const [key, value] of searchParams.entries()) {
    if (value !== undefined && value !== null) {
      // Convert to appropriate type based on key
      switch (key) {
        case 'limit':
        case 'offset':
        case 'bank_statement_id':
          result[key] = Number(value);
          break;
        default:
          result[key] = value;
      }
    }
  }

  return result;
}

export function getTransactionQueryParams(
  input: ParamsInput<TransactionQueryParams>,
) {
  return convertToQueryParams<TransactionQueryParams>(input, converter);
}
