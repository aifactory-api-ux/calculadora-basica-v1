/**
 * Calculation Route Handler
 * Handles POST /api/calculate endpoint
 */

const { validateOperationRequest } = require('../validators/operationValidator');
const { formatNumber } = require('../formatters/numberFormatter');
const {
  validateOperationRequestContract,
  validateOperationResponseContract,
  validateErrorResponseContract
} = require('../shared/dataContracts');

/**
 * Performs the calculation operation
 * @param {number} operand1 - First operand
 * @param {number} operand2 - Second operand
 * @param {string} operation - Operation type ('add' or 'subtract')
 * @returns {number} Result of the calculation
 */
function performCalculation(operand1, operand2, operation) {
  if (operation === 'add') {
    return operand1 + operand2;
  } else if (operation === 'subtract') {
    return operand1 - operand2;
  }
  throw new Error(`Unsupported operation: ${operation}`);
}

/**
 * Calculate endpoint handler
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 */
function calculateHandler(req, res) {
  try {
    const { operand1, operand2, operation } = req.body;

    // Validate input using the validator module
    const validationResult = validateOperationRequest(req.body);
    
    if (!validationResult.isValid) {
      const errorResponse = {
        error: validationResult.error || 'Operación no soportada o datos inválidos'
      };
      
      // Validate error response contract
      const contractValidation = validateErrorResponseContract(errorResponse);
      if (!contractValidation.isValid) {
        return res.status(500).json({ error: 'Internal validation error' });
      }
      
      return res.status(400).json(errorResponse);
    }

    // Perform calculation
    const result = performCalculation(operand1, operand2, operation);

    // Format the result
    const formattedResult = formatNumber(result);

    // Build response
    const response = {
      result: result,
      formattedResult: formattedResult
    };

    // Validate response contract
    const contractValidation = validateOperationResponseContract(response);
    if (!contractValidation.isValid) {
      return res.status(500).json({ error: 'Internal response validation error' });
    }

    // Send success response
    return res.status(200).json(response);

  } catch (error) {
    console.error('Calculation error:', error.message);
    
    const errorResponse = {
      error: 'Operación no soportada o datos inválidos'
    };
    
    const contractValidation = validateErrorResponseContract(errorResponse);
    if (!contractValidation.isValid) {
      return res.status(500).json({ error: 'Internal error validation' });
    }
    
    return res.status(400).json(errorResponse);
  }
}

module.exports = { calculateHandler, performCalculation };
