import { useCalculatorInstance } from '../hooks/useCalculator.js';
import ResultDisplay from './ResultDisplay.js';
import ErrorMessage from './ErrorMessage.js';

/**
 * Calculator component - Main UI for the calculator
 * Provides input fields for operands, operation selection, and action buttons
 * @returns {HTMLElement} Calculator DOM element
 */
export default function Calculator() {
  const calculator = useCalculatorInstance();
  const container = document.createElement('div');
  container.className = 'calculator';
  
  // Create sub-components
  const resultDisplay = ResultDisplay();
  const errorMessage = ErrorMessage();
  
  // State for UI updates
  let operand1Input, operand2Input, addBtn, subtractBtn, calculateBtn, clearBtn;
  
  /**
   * Render the calculator UI
   */
  function render() {
    const state = calculator.getState();
    
    // Title
    const title = document.createElement('h1');
    title.className = 'calculator-title';
    title.textContent = 'Calculadora Básica v1';
    
    // Operand 1 input
    const operand1Label = document.createElement('label');
    operand1Label.className = 'input-label';
    operand1Label.textContent = 'Primer Operando:';
    operand1Label.setAttribute('for', 'operand1');
    
    operand1Input = document.createElement('input');
    operand1Input.type = 'number';
    operand1Input.id = 'operand1';
    operand1Input.className = 'calculator-input';
    operand1Input.value = state.operand1;
    operand1Input.placeholder = 'Ingrese primer número';
    operand1Input.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      calculator.setOperand1(isNaN(value) ? 0 : value);
    });
    
    // Operand 2 input
    const operand2Label = document.createElement('label');
    operand2Label.className = 'input-label';
    operand2Label.textContent = 'Segundo Operando:';
    operand2Label.setAttribute('for', 'operand2');
    
    operand2Input = document.createElement('input');
    operand2Input.type = 'number';
    operand2Input.id = 'operand2';
    operand2Input.className = 'calculator-input';
    operand2Input.value = state.operand2;
    operand2Input.placeholder = 'Ingrese segundo número';
    operand2Input.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      calculator.setOperand2(isNaN(value) ? 0 : value);
    });
    
    // Operation buttons
    const operationLabel = document.createElement('label');
    operationLabel.className = 'input-label';
    operationLabel.textContent = 'Operación:';
    
    const operationContainer = document.createElement('div');
    operationContainer.className = 'operation-buttons';
    
    addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = `operation-btn ${state.operation === 'add' ? 'active' : ''}`;
    addBtn.textContent = 'Suma (+)';
    addBtn.addEventListener('click', () => {
      calculator.setOperation('add');
    });
    
    subtractBtn = document.createElement('button');
    subtractBtn.type = 'button';
    subtractBtn.className = `operation-btn ${state.operation === 'subtract' ? 'active' : ''}`;
    subtractBtn.textContent = 'Resta (-)';
    subtractBtn.addEventListener('click', () => {
      calculator.setOperation('subtract');
    });
    
    operationContainer.appendChild(addBtn);
    operationContainer.appendChild(subtractBtn);
    
    // Action buttons
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'action-buttons';
    
    calculateBtn = document.createElement('button');
    calculateBtn.type = 'button';
    calculateBtn.className = 'calculate-btn';
    calculateBtn.textContent = state.loading ? 'Calculando...' : 'Calcular';
    calculateBtn.disabled = state.loading;
    calculateBtn.addEventListener('click', () => {
      calculator.calculate();
    });
    
    clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'clear-btn';
    clearBtn.textContent = 'Limpiar (C)';
    clearBtn.addEventListener('click', () => {
      calculator.clear();
    });
    
    actionsContainer.appendChild(calculateBtn);
    actionsContainer.appendChild(clearBtn);
    
    // Build container structure
    container.innerHTML = '';
    container.appendChild(title);
    container.appendChild(operand1Label);
    container.appendChild(operand1Input);
    container.appendChild(operand2Label);
    container.appendChild(operand2Input);
    container.appendChild(operationLabel);
    container.appendChild(operationContainer);
    container.appendChild(actionsContainer);
    container.appendChild(resultDisplay);
    container.appendChild(errorMessage);
    
    // Update sub-components
    updateResultDisplay(state);
    updateErrorMessage(state);
    updateButtons(state);
  }
  
  /**
   * Update result display component
   * @param {Object} state - Current calculator state
   */
  function updateResultDisplay(state) {
    resultDisplay.update(state.result, state.formattedResult);
  }

  /**
   * Update error message component
   * @param {Object} state - Current calculator state
   */
  function updateErrorMessage(state) {
    errorMessage.update(state.error);
  }

  /**
   * Update buttons (active state, disabled, etc)
   * @param {Object} state - Current calculator state
   */
  function updateButtons(state) {
    if (addBtn) {
      addBtn.className = `operation-btn ${state.operation === 'add' ? 'active' : ''}`;
    }
    if (subtractBtn) {
      subtractBtn.className = `operation-btn ${state.operation === 'subtract' ? 'active' : ''}`;
    }
    if (calculateBtn) {
      calculateBtn.textContent = state.loading ? 'Calculando...' : 'Calcular';
      calculateBtn.disabled = state.loading;
    }
  }

  // Subscribe to calculator state changes
  calculator.subscribe(render);

  // Initial render
  render();

  return container;
}
