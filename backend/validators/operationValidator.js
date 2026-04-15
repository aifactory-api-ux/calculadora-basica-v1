/**
 * Operation Validator
 * Validates incoming OperationRequest data
 * Uses the shared validation module
 */

const { validateOperationRequest: validateRequest } = require('../shared/validation');

/**
 * Validates an OperationRequest object
 * @param {any} reqBody - The request body to validate
 * @returns {{isValid: boolean, error?: string}}
 */
function validateOperationRequest(reqBody) {
  return validateRequest(reqBody);
}

module.exports = { validateOperationRequest };
