import { ParamsInput } from '../../../shared';
import { convertToQueryParams } from '../../../shared/utils/searchParams.utils';
import { BankStatementQueryParams } from '../types/bank-statement.types';

export function getBankStatementQueryParams(
  input: ParamsInput<BankStatementQueryParams>,
) {
  return convertToQueryParams<BankStatementQueryParams>(input);
}
