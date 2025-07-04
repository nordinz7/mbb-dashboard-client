import { ParamsInput } from '../types';

function defaultConverter<T extends Record<string, unknown>>(
  searchParams: URLSearchParams,
): T {
  const result: Record<string, unknown> = {};

  for (const [key, value] of searchParams.entries()) {
    if (value !== undefined && value !== null) {
      // Convert to appropriate type based on key
      switch (key) {
        case 'limit':
        case 'offset':
          result[key] = Number(value);
          break;
        default:
          result[key] = value;
      }
    }
  }

  return result as T;
}

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
  converter?: (value: URLSearchParams) => T,
): T {
  const searchParams = convertToSearchParams(input);
  return converter
    ? converter(searchParams)
    : defaultConverter<T>(searchParams);
}
