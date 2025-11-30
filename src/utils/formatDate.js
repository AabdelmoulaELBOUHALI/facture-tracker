/**
 * Convert Excel serial date to YYYY-MM-DD format
 * @param {number} serial - Excel serial date number
 * @returns {string} - Date in YYYY-MM-DD format
 */
export function excelDateToJSDate(serial) {
  if (typeof serial !== 'number') return serial;

  // Excel serial date starts from 1900-01-01 (serial 1)
  // JavaScript date is milliseconds since 1970-01-01
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const year = date_info.getUTCFullYear();
  const month = String(date_info.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date_info.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Format date to dd-MM-yyyy format
 * @param {string} dateString - The date string (YYYY-MM-DD)
 * @returns {string} - Formatted date (dd-MM-yyyy) or '-' if invalid
 */
export function formatDate(dateString) {
  if (!dateString) return '-';

  try {
    // Split the date string to avoid timezone issues
    const parts = dateString.split('-');
    if (parts.length !== 3) return '-';

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    // Validate the parts
    if (!year || !month || !day) return '-';

    return `${day}-${month}-${year}`;
  } catch (error) {
    return '-';
  }
}
