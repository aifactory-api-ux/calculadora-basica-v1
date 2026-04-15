/**
 * ErrorMessage component - Displays error messages to the user
 * Shows validation errors and API errors in a user-friendly way
 * @returns {HTMLElement} Error message DOM element
 */
export default function ErrorMessage() {
  const container = document.createElement('div');
  container.className = 'error-message';
  container.style.display = 'none';
  
  const icon = document.createElement('span');
  icon.className = 'error-icon';
  icon.textContent = '⚠';
  
  const text = document.createElement('span');
  text.className = 'error-text';
  text.textContent = '';
  
  container.appendChild(icon);
  container.appendChild(text);
  
  /**
   * Update the error message display
   * @param {string|null} error - The error message to display
   */
  function update(error) {
    if (error) {
      text.textContent = error;
      container.style.display = 'flex';
      container.classList.add('visible');
    } else {
      text.textContent = '';
      container.style.display = 'none';
      container.classList.remove('visible');
    }
  }
  
  // Expose update method
  container.update = update;
  
  return container;
}