import { fetchFromApi } from '../../shared/api/client';
import {
  AccountNumbersResponse,
  AccountNumbersParams,
} from '../../shared/types/account.types';

export const accountService = {
  async getAccountNumbers(
    params: AccountNumbersParams = {},
  ): Promise<AccountNumbersResponse> {
    const defaultParams = {
      limit: 50,
      offset: 0,
      sort: 'account_number',
      ...params,
    };

    return fetchFromApi(
      'account-numbers',
      defaultParams,
      'Failed to fetch account numbers',
    );
  },
};
