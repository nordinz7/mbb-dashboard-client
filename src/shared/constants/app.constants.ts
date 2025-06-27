export const APP_NAME = 'MBB Dashboard';
export const APP_VERSION = '1.0.0';

export const CURRENCY = {
  DEFAULT: 'USD',
  LOCALE: 'en-US',
} as const;

export const DATE_FORMATS = {
  SHORT: { year: 'numeric', month: 'short', day: 'numeric' } as const,
  LONG: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  } as const,
} as const;
