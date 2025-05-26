// File: scripts/utils/errorUI.js
// Features:
// - Shows a styled error banner with custom message
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Displays an error banner at the top of the page.
 * @param {string} message - Error message to display.
 */
export function showError(message) {
  let box = document.getElementById('mode-error-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'mode-error-box';
    box.style = `
      background: #ffe0e0;
      color: #900;
      font-weight: bold;
      padding: 1rem;
      margin: 1rem auto;
      max-width: 600px;
      border: 1px solid #f99;
      border-radius: 0.5rem;
      text-align: center;
      z-index: 9999;
    `;
    document.body.prepend(box);
  }
  box.textContent = message;
}

/**
 * Alias for showError — used where 'toast' terminology is preferred.
 * @param {string} message
 */
export function showErrorToast(message) {
  showError(message);
}
