

// File: scripts/utils/errorHandler.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const STORAGE_KEY = 'wordatlas-error-log';

/**
 * Save error to localStorage
 * @param {string} type - Error type e.g., 'Runtime', 'ModuleExport'
 * @param {string} message - Error message
 * @param {string} source - File or module
 * @param {string} lineno - Line number
 * @param {string} colno - Column number
 * @param {string} stack - Stack trace
 * @param {string} initiator - Top stack trace line (if available)
 */
export function logError(type, message, source = '', lineno = '', colno = '', stack = '', initiator = '') {
  const error = {
    type,
    message,
    source,
    lineno,
    colno,
    stack,
    initiator,
    time: new Date().toLocaleString()
  };
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  existing.push(error);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/**
 * Log a module import that failed to export an expected function
 * @param {string} file - File path
 * @param {string} expectedExport - Export name (e.g. "init")
 */
export function logModuleImportFailure(file, expectedExport) {
  const msg = `Module "${file}" does not export expected function "${expectedExport}".`;
  const stack = new Error().stack;
  const initiator = stack?.split('\n')[2]?.trim() || '';
  logError('ModuleExport', msg, file, '', '', stack, initiator);
}

/**
 * Retrieve all saved logs
 * @returns {Array} - Array of error objects
 */
export function getErrorLog() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Clear saved error logs
 */
export function clearErrorLog() {
  localStorage.removeItem(STORAGE_KEY);
}

// Auto-capture uncaught runtime errors
window.addEventListener('error', (e) => {
  const initiator = e.error?.stack?.split('\n')[1]?.trim() || '';
  logError('Runtime', e.message, e.filename, e.lineno, e.colno, e.error?.stack || '', initiator);
});

// Auto-capture unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
  const reason = e.reason?.message || e.reason || 'Unknown reason';
  const stack = e.reason?.stack || '';
  const initiator = stack?.split('\n')[1]?.trim() || '';
  logError('PromiseRejection', reason, location.href, '', '', stack, initiator);
});

