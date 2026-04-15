import { validateOperationRequest } from './validation.js';

/**
 * Custom hook for calculator state management and calculation logic
 * Manages operands, operation type, results, errors, and loading state
 * @returns {Object} Calculator state and methods
 */
export function useCalculator() {
  // State variables
  let operand1 = 0;
  let operand2 = 0;
  let operation = 'add';
  let result = null;
  let formattedResult = null;
  let error = null;
  let loading = false;

  // Get API base URL from environment variable
  const API_BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:8080';

  /**
   * Set operand1 value
   * @param {number} value - The operand value
   */
  function setOperand1(value) {
    operand1 = typeof value === 'number' ? value : 0;
    error = null;
  }

  /**
   * Set operand2 value
   * @param {number} value - The operand value
   */
  function setOperand2(value) {
    operand2 = typeof value === 'number' ? value : 0;
    error = null;
  }

  /**
   * Set operation type
   * @param {string} value - Operation type ('add' or 'subtract')
   */
  function setOperation(value) {
    if (value === 'add' || value === 'subtract') {
      operation = value;
      error = null;
    }
  }

  /**
   * Perform the calculation by calling the backend API
   * @returns {Promise<void>}
   */
  async function calculate() {
    // Validate locally first
    const validation = validateOperationRequest({
      operand1,
      operand2,
      operation
    });

    if (!validation.isValid) {
      error = validation.error;
      result = null;
      formattedResult = null;
      loading = false;
      return;
    }

    loading = true;
    error = null;

    try {
      const response = await fetch(`${API_BASE_URL}/api/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operand1,
          operand2,
          operation
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el cálculo');
      }

      result = data.result;
      formattedResult = data.formattedResult;
      error = null;
    } catch (err) {
      error = err.message || 'Error de conexión';
      result = null;
      formattedResult = null;
    } finally {
      loading = false;
    }
  }

  /**
   * Clear all calculator state
   */
  function clear() {
    operand1 = 0;
    operand2 = 0;
    operation = 'add';
    result = null;
    formattedResult = null;
    error = null;
    loading = false;
  }

  return {
    get operand1() { return operand1; },
    get operand2() { return operand2; },
    get operation() { return operation; },
    get result() { return result; },
    get formattedResult() { return formattedResult; },
    get error() { return error; },
    get loading() { return loading; },
    setOperand1,
    setOperand2,
    setOperation,
    calculate,
    clear
  };
}
