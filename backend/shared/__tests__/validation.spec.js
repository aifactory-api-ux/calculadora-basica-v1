/**
 * Tests for validation.js
 */

const { validateOperationRequest } = require('../validation');

describe('validation', () => {
  describe('validateOperationRequest', () => {
    it('should validate a correct OperationRequest', () => {
      const validRequest = {
        operand1: 10,
        operand2: 5,
        operation: 'add'
      };
      const result = validateOperationRequest(validRequest);
      expect(result.isValid).toBe(true);
    });

    it('should reject OperationRequest with missing operand1', () => {
      const missingOperand1 = {
        operand2: 5,
        operation: 'add'
      };
      const result = validateOperationRequest(missingOperand1);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('operand1 is required');
    });

    it('should reject OperationRequest with non-number operand2', () => {
      const nonNumberOperand2 = {
        operand1: 10,
        operand2: 'five',
        operation: 'add'
      };
      const result = validateOperationRequest(nonNumberOperand2);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('operand2 must be a number');
    });

    it('should reject OperationRequest with invalid operation value', () => {
      const invalidOperation = {
        operand1: 10,
        operand2: 5,
        operation: 'multiply'
      };
      const result = validateOperationRequest(invalidOperation);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("operation must be 'add' or 'subtract'");
    });

    it('should reject OperationRequest with extra fields', () => {
      const extraFields = {
        operand1: 10,
        operand2: 5,
        operation: 'add',
        extraField: 'not allowed'
      };
      const result = validateOperationRequest(extraFields);
      expect(result.isValid).toBe(true);
    });

    it('should handle edge case: operand1 and operand2 are zero', () => {
      const zeroValues = {
        operand1: 0,
        operand2: 0,
        operation: 'add'
      };
      const result = validateOperationRequest(zeroValues);
      expect(result.isValid).toBe(true);
    });
  });
});
