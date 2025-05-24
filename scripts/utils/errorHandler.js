// File: scripts/utils/errorHandler.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const STORAGE_KEY = 'wordatlas-error-log';

/**
 * Save error to localStorage
 */
export function logError(type, message, source = '', lineno = '', colno = '', stack = '') {
  const error = {
    type,
    message,
    source,
    lineno,
    colno,
    stack,
    time: new Date().toLocaleString()
  };
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  existing.push(error);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/**
 * Specialized logger for missing module exports
 */
export function logModuleImportFailure(file, expectedExport) {
  const msg = `Module "${file}" does not export expected function "${expectedExport}".`;
  logError('ModuleExport', msg, file);
}

/**
 * Retrieve all error logs
 */
export function getErrorLog() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Clear all saved logs
 */
export function clearErrorLog() {
  localStorage.removeItem(STORAGE_KEY);
}

// Auto-capture global errors
window.addEventListener('error', (e) => {
  logError('Runtime', e.message, e.filename, e.lineno, e.colno, e.error?.stack || '');
});

// Auto-capture unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
  logError('PromiseRejection', e.reason?.message || e.reason, location.href, '', '', e.reason?.stack || '');
});
