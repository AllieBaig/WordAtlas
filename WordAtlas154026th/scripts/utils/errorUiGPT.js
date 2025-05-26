
// 25th, 07:10

// File: scripts/utils/errorUI.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Error UI Utility
 * Displays temporary, styled feedback banners for errors, info, or success.
 * Used in game navigation, fallback alerts, module load failures, etc.
 */

let toastContainer = null;

/**
 * Create or reuse toast container
 */
function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '1rem';
    toastContainer.style.left = '50%';
    toastContainer.style.transform = 'translateX(-50%)';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.display = 'flex';
    toastContainer.style.flexDirection = 'column';
    toastContainer.style.gap = '0.5rem';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * Show a toast banner with custom message and type
 * @param {string} message - Message to show
 * @param {string} type - 'error' | 'success' | 'info'
 * @param {number} duration - Auto-dismiss time in ms
 */
export function showErrorToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  toast.style.padding = '0.8em 1.2em';
  toast.style.borderRadius = '0.4em';
  toast.style.color = '#fff';
  toast.style.fontSize = '0.95rem';
  toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  toast.style.maxWidth = '90vw';
  toast.style.margin = '0 auto';

  switch (type) {
    case 'error':
      toast.style.background = '#c0392b';
      break;
    case 'success':
      toast.style.background = '#27ae60';
      break;
    case 'info':
    default:
      toast.style.background = '#2980b9';
      break;
  }

  getToastContainer().appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
}

