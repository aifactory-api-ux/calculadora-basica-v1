/**
 * Frontend Input Validation
 * Validates OperationRequest data locally before sending to backend
 * Mirrors backend validation logic for immediate feedback
 */

/**
 * Validates an OperationRequest object
 * @param {any} data - The request data to validate
 * @returns {{isValid: boolean, error?: string}}
 */
export function validateOperationRequest(data) {
  // Check if data exists and is an object
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'operand1 is required' };
  }

  // Validate operand1
  if (data.operand1 === undefined || data.operand1 === null) {
    return { isValid: false, error: 'operand1 es requerido' };
  }

  if (typeof data.operand1 !== 'number') {
    return { isValid: false, error: 'operand1 debe ser un número' };
  }

  // Validate operand2
  if (data.operand2 === undefined || data.operand2 === null) {
    return { isValid: false, error: 'operand2 es requerido' };
  }

  if (typeof data.operand2 !== 'number') {
    return { isValid: false, error: 'operand2 debe ser un número' };
  }

  // Validate operation
  if (data.operation === undefined || data.operation === null) {
    return { isValid: false, error: 'operation debe ser \'add\' o \'subtract\'' };
  }

  if (typeof data.operation !== 'string') {
    return { isValid: false, error: 'operation debe ser \'add\' o \'subtract\'' };
  }

  if (data.operation !== 'add' && data.operation !== 'subtract') {
    return { isValid: false, error: 'operation debe ser \'add\' o \'subtract\'' };
  }

  return { isValid: true };
}
