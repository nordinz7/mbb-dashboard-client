export const API_ENDPOINTS = {
  TRANSACTIONS: 'transactions',
  BANK_STATEMENTS: 'bank-statements',
  SEARCH: 'search',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 50,
  DEFAULT_OFFSET: 0,
  MAX_LIMIT: 1000,
} as const;
