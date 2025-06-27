import { ParamsInput } from '../types';

export function convertToSearchParams<T extends Record<string, unknown>>(
  input: ParamsInput<T>,
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

export function convertToQueryParams<T extends Record<string, unknown>>(
  input: ParamsInput<T>,
  converter: (value: URLSearchParams) => T,
): T {
  const searchParams = convertToSearchParams(input);
  return converter(searchParams);
}
