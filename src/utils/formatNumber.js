/**
 * Format numbers for display:
 * - 2000 -> 2K
 * - 2500 -> 2.5K
 * - 2000.1 -> 2000.1 (keep as-is)
 * - 2001 -> 2001 (keep as-is)
 * @param {number} value - The number to format
 * @returns {string|number} - Formatted number or original if it has decimals
 */
export function formatNumber(value) {
  if (typeof value !== 'number' || isNaN(value)) return value;

  // Check if the number has decimals
  const hasDecimals = value % 1 !== 0;

  // If it has decimals, return as-is with 1 decimal place
  if (hasDecimals) {
    return value.toFixed(1);
  }

  // For whole numbers, format to K if >= 1000 and exactly divisible by certain amounts
  if (value >= 1000) {
    const thousands = value / 1000;

    // Only format as "K" if the result is clean (whole number or .5)
    if (thousands % 1 === 0) {
      // Whole thousands: 2000 -> 2K, 3000 -> 3K
      return `${thousands}K`;
    } else if ((thousands * 10) % 5 === 0) {
      // Half thousands: 2500 -> 2.5K, 3500 -> 3.5K
      return `${thousands.toFixed(1)}K`;
    }

    // Otherwise keep as-is: 2001, 2100, etc.
    return value;
  }

  return value;
}
