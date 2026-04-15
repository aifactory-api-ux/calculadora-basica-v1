/**
 * Data Contracts for Calculadora Basica v1
 * Defines the structure and types for API requests and responses
 */

// OperationRequest contract
// Required fields: operand1 (number), operand2 (number), operation ('add' or 'subtract')
const OperationRequest = {
  fields: ['operand1', 'operand2', 'operation'],
  schema: {
    operand1: 'number',
    operand2: 'number',
    operation: "'add' | 'subtract'"
  }
};

// OperationResponse contract
// Required fields: result (number), formattedResult (string)
const OperationResponse = {
  fields: ['result', 'formattedResult'],
  schema: {
    result: 'number',
    formattedResult: 'string'
  }
};

// ErrorResponse contract
// Required field: error (string)
const ErrorResponse = {
  fields: ['error'],
  schema: {
    error: 'string'
  }
};

/**
 * Validates if a given object matches the OperationRequest contract
 * @param {any} data - Data to validate
 * @returns {{isValid: boolean, error?: string}}
 */
function validateOperationRequestContract(data) {
  if (!data || typeof data !== 'object') {
    return { isValid: false };
  }
  
  const hasOperand1 = typeof data.operand1 === 'number';
  const hasOperand2 = typeof data.operand2 === 'number';
  const hasOperation = typeof data.operation === 'string' && 
    (data.operation === 'add' || data.operation === 'subtract');
  
  if (!hasOperand1 || !hasOperand2 || !hasOperation) {
    return { isValid: false };
  }
  
  return { isValid: true };
}

/**
 * Validates if a given object matches the OperationResponse contract
 * @param {any} data - Data to validate
 * @returns {{isValid: boolean, error?: string}}
 */
function validateOperationResponseContract(data) {
  if (!data || typeof data !== 'object') {
    return { isValid: false };
  }
  
  const hasResult = typeof data.result === 'number';
  const hasFormattedResult = typeof data.formattedResult === 'string';
  
  if (!hasResult || !hasFormattedResult) {
    return { isValid: false };
  }
  
  return { isValid: true };
}

/**
 * Validates if a given object matches the ErrorResponse contract
 * @param {any} data - Data to validate
 * @returns {{isValid: boolean, error?: string}}
 */
function validateErrorResponseContract(data) {
  if (!data || typeof data !== 'object') {
    return { isValid: false };
  }
  
  const hasError = typeof data.error === 'string';
  
  if (!hasError) {
    return { isValid: false };
  }
  
  return { isValid: true };
}

module.exports = {
  OperationRequest,
  OperationResponse,
  ErrorResponse,
  validateOperationRequestContract,
  validateOperationResponseContract,
  validateErrorResponseContract
};
