/**
 * Format a number as currency
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @param currency - Currency symbol (default: $)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number,
  decimals = 2,
  currency = '$'
): string => {
  // Handle small numbers (less than 0.01)
  if (value < 0.01 && value > 0) {
    return `${currency}${value.toFixed(6)}`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format a number as percentage
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string with sign
 */
export const formatPercentage = (
  value: number,
  decimals = 2
): string => {
  const formattedValue = Math.abs(value).toFixed(decimals);
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${formattedValue}%`;
};

/**
 * Format a number with appropriate suffixes for large values (K, M, B, T)
 * @param value - The number to format
 * @returns Formatted string with suffix
 */
export const formatCompactNumber = (value: number): string => {
  if (value < 1000) {
    return value.toString();
  }
  
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const suffixIndex = Math.floor(Math.log10(value) / 3);
  const shortValue = (value / Math.pow(1000, suffixIndex)).toFixed(1);
  
  return `${shortValue}${suffixes[suffixIndex]}`;
};

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};