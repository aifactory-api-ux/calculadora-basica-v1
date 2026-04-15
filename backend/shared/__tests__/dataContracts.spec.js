/**
 * Tests for dataContracts.js
 */

const {
  OperationRequest,
  OperationResponse,
  ErrorResponse,
  validateOperationRequestContract,
  validateOperationResponseContract,
  validateErrorResponseContract
} = require('../dataContracts');

describe('dataContracts', () => {
  describe('OperationRequest', () => {
    it('should define OperationRequest with correct required fields and types', () => {
      const validRequest = {
        operand1: 10,
        operand2: 5,
        operation: 'add'
      };
      const result = validateOperationRequestContract(validRequest);
      expect(result.isValid).toBe(true);
    });

    it('should reject OperationRequest missing required fields', () => {
      const missingOperand1 = { operand2: 5, operation: 'add' };
      const missingOperand2 = { operand1: 10, operation: 'add' };
      const missingOperation = { operand1: 10, operand2: 5 };
      
      expect(validateOperationRequestContract(missingOperand1).isValid).toBe(false);
      expect(validateOperationRequestContract(missingOperand2).isValid).toBe(false);
      expect(validateOperationRequestContract(missingOperation).isValid).toBe(false);
    });

    it('should reject OperationRequest with invalid operation value', () => {
      const invalidOperation = { operand1: 10, operand2: 5, operation: 'multiply' };
      const result = validateOperationRequestContract(invalidOperation);
      expect(result.isValid).toBe(false);
    });
  });

  describe('OperationResponse', () => {
    it('should define OperationResponse with correct fields and types', () => {
      const validResponse = {
        result: 15,
        formattedResult: '15.00'
      };
      const result = validateOperationResponseContract(validResponse);
      expect(result.isValid).toBe(true);
    });
  });

  describe('ErrorResponse', () => {
    it('should define ErrorResponse with required error field of type string', () => {
      const validError = { error: 'Something went wrong' };
      const result = validateErrorResponseContract(validError);
      expect(result.isValid).toBe(true);
    });

    it('should reject ErrorResponse missing error field', () => {
      const missingError = { message: 'Something went wrong' };
      const result = validateErrorResponseContract(missingError);
      expect(result.isValid).toBe(false);
    });
  });
});
