import { ParamsInput } from '../types';

export function convertToSearchParams<T extends Record<string, unknown>>(
  input: ParamsInput<T>,
): URLSearchParams {
  if (input instanceof URLSearchParams) {
    // If input is already URLSearchParams, just return it
    return input;
  }

  if (typeof input === 'string') {
    // If input is a string, parse it as URLSearchParams
    return new URLSearchParams(input);
  }

  // If input is an object, convert it to URLSearchParams
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
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
