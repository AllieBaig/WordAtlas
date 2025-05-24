// File: scripts/utils/errorHandler.js
// Features:
// - Captures uncaught errors and unhandled promise rejections
// - Stores errors in localStorage for offline log viewing
// - Used by error-log.html and toast/banner feedback
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const LOG_KEY = 'wordatlas-error-log';
const MAX_LOG_ENTRIES = 100;

/**
 * Retrieve stored error log from localStorage
 */
export function getErrorLog() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Save a new error object to localStorage log
 */
export function logError(errorObj) {
  const logs = getErrorLog();
  logs.unshift({ ...errorObj, time: new Date().toLocaleString() });

  if (logs.length > MAX_LOG_ENTRIES) logs.length = MAX_LOG_ENTRIES;
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

/**
 * Clear the stored error log
 */
export function clearErrorLog() {
  localStorage.removeItem(LOG_KEY);
}

/**
 * Global error capture setup
 */
export function registerGlobalErrorHandlers() {
  window.addEventListener('error', (e) => {
    logError({
      type: 'error',
      message: e.message,
      source: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      stack: e.error?.stack || null
    });
  });

  window.addEventListener('unhandledrejection', (e) => {
    logError({
      type: 'promise',
      message: e.reason?.message || String(e.reason),
      stack: e.reason?.stack || null
    });
  });

  console.log('✅ Global error handlers registered');
}
