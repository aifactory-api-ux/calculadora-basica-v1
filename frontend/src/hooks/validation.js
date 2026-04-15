/**
 * Validation utilities for calculator operations
 * Exports validateOperationRequest for use in useCalculator.js
 */

/**
 * Validate the operation request payload
 * @param {Object} payload - { operand1, operand2, operation }
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export function validateOperationRequest(payload) {
  const { operand1, operand2, operation } = payload;
  if (typeof operand1 !== 'number' || typeof operand2 !== 'number') {
    return { isValid: false, error: 'Los operandos deben ser números.' };
  }
  if (!['add', 'subtract'].includes(operation)) {
    return { isValid: false, error: 'Operación no válida.' };
  }
  return { isValid: true, error: null };
}
