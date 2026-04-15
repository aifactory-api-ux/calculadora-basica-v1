/**
 * ResultDisplay component - Shows calculation results
 * Displays the numeric result and formatted string representation
 * @returns {HTMLElement} Result display DOM element
 */
export default function ResultDisplay() {
  const container = document.createElement('div');
  container.className = 'result-display';
  
  const label = document.createElement('div');
  label.className = 'result-label';
  label.textContent = 'Resultado:';
  
  const valueContainer = document.createElement('div');
  valueContainer.className = 'result-value-container';
  
  const numericValue = document.createElement('span');
  numericValue.className = 'result-numeric';
  numericValue.textContent = '--';
  
  const formattedValue = document.createElement('span');
  formattedValue.className = 'result-formatted';
  formattedValue.textContent = '';
  
  valueContainer.appendChild(numericValue);
  valueContainer.appendChild(formattedValue);
  
  container.appendChild(label);
  container.appendChild(valueContainer);
  
  /**
   * Update the display with new result values
   * @param {number|null} result - The numeric result
   * @param {string|null} formattedResult - The formatted result string
   */
  function update(result, formattedResult) {
    if (result !== null && formattedResult !== null) {
      numericValue.textContent = result;
      formattedValue.textContent = `(${formattedResult})`;
      container.classList.add('visible');
    } else {
      numericValue.textContent = '--';
      formattedValue.textContent = '';
      container.classList.remove('visible');
    }
  }
  
  // Expose update method
  container.update = update;
  
  return container;
}