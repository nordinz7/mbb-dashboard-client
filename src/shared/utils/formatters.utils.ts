export const formatCurrency = (
  amount: number,
  currency = 'USD',
  locale = 'en-US',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
): string => {
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatDateTime = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
): string => {
  return new Date(dateString).toLocaleString('en-US', options);
};
