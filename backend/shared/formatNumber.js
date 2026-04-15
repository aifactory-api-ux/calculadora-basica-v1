/**
 * Number Formatting Utilities for Calculadora Basica v1
 * Formats numbers with thousands separators and two decimal places
 */

/**
 * Formats a number to a string with two decimal places and thousands separator
 * @param {number} num - The number to format
 * @returns {string} Formatted number string (e.g., "1,234.56")
 * @throws {Error} If input is not a number
 */
function formatNumber(num) {
  // Validate input is a number
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Input must be a valid number');
  }
  
  // Format with two decimal places and thousands separator
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatted;
}

module.exports = { formatNumber };
