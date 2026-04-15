/**
 * Input Validation for Calculadora Basica v1
 * Validates OperationRequest data according to contract specifications
 */

/**
 * Validates an OperationRequest object
 * @param {any} data - The request data to validate
 * @returns {{isValid: boolean, error?: string}}
 */
function validateOperationRequest(data) {
  // Check if data exists and is an object
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'operand1 is required' };
  }
  
  // Validate operand1
  if (data.operand1 === undefined || data.operand1 === null) {
    return { isValid: false, error: 'operand1 is required' };
  }
  
  if (typeof data.operand1 !== 'number') {
    return { isValid: false, error: 'operand1 must be a number' };
  }
  
  // Validate operand2
  if (data.operand2 === undefined || data.operand2 === null) {
    return { isValid: false, error: 'operand2 is required' };
  }
  
  if (typeof data.operand2 !== 'number') {
    return { isValid: false, error: 'operand2 must be a number' };
  }
  
  // Validate operation
  if (data.operation === undefined || data.operation === null) {
    return { isValid: false, error: "operation must be 'add' or 'subtract'" };
  }
  
  if (typeof data.operation !== 'string') {
    return { isValid: false, error: "operation must be 'add' or 'subtract'" };
  }
  
  if (data.operation !== 'add' && data.operation !== 'subtract') {
    return { isValid: false, error: "operation must be 'add' or 'subtract'" };
  }
  
  return { isValid: true };
}

module.exports = { validateOperationRequest };
