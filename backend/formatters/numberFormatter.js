/**
 * Number Formatter
 * Formats numbers for display
 * Uses the shared formatNumber module
 */

const { formatNumber: formatNum } = require('../shared/formatNumber');

/**
 * Formats a number to a string with two decimal places and thousands separator
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
function formatNumber(num) {
  return formatNum(num);
}

module.exports = { formatNumber };
