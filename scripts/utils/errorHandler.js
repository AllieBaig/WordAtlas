// File: scripts/utils/errorHandler.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const ERROR_LOG_KEY = 'wordatlas-error-log';
const MAX_LOG_ENTRIES = 50;

/**
 * Retrieves the current error log from localStorage.
 * @returns {Array<Object>} An array of error objects.
 */
export function getErrorLog() {
  try {
    const log = localStorage.getItem(ERROR_LOG_KEY);
    return log ? JSON.parse(log) : [];
  } catch (e) {
    console.error('Failed to parse error log from localStorage:', e);
    return [];
  }
}

/**
 * Logs an error to localStorage.
 * @param {string} type - The type of error (e.g., 'ModuleLoad', 'ModuleExport', 'Runtime').
 * @param {string} message - The error message.
 * @param {string} source - The source of the error (e.g., file path, URL).
 * @param {number} [lineno] - Line number.
 * @param {number} [colno] - Column number.
 * @param {Error} [errorObj] - The actual error object, if available (for stack trace).
 */
export function logError(type, message, source, lineno, colno, errorObj) {
  const log = getErrorLog();
  const newEntry = {
    time: new Date().toLocaleString(),
    type: type,
    message: message,
    source: source,
    lineno: lineno,
    colno: colno,
    stack: errorObj?.stack || '' // Safely get stack trace
  };

  log.unshift(newEntry); // Add to the beginning (NEWER ERRORS FIRST)
  if (log.length > MAX_LOG_ENTRIES) {
    log.splice(MAX_LOG_ENTRIES); // Keep only the latest entries
  }

  try {
    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(log));
  } catch (e) {
    console.error('Failed to save error log to localStorage:', e);
  }
}

/**
 * A specialized function to log module import/export failures.
 * @param {string} modulePath - The path of the module that failed to load.
 * @param {string} [expectedExport] - The name of the export that was expected but not found.
 */
export function logModuleImportFailure(modulePath, expectedExport = '') {
  const message = expectedExport
    ? `The requested module '${modulePath}' does not provide an export named '${expectedExport}'.`
    : `Failed to load module: ${modulePath}.`;
  logError('ModuleExport', message, modulePath); // Use 'ModuleExport' type for clarity
}

/**
 * Clears the error log from localStorage.
 */
export function clearErrorLog() {
  localStorage.removeItem(ERROR_LOG_KEY);
  console.log('✅ Error log cleared.');
}

/**
 * Registers global error handlers for uncaught exceptions and unhandled promise rejections.
 */
export function registerGlobalErrorHandlers() { // <-- THIS FUNCTION IS EXPORTED
  window.addEventListener('error', (event) => {
    logError(
      'Runtime',
      event.message,
      event.filename,
      event.lineno,
      event.colno,
      event.error // Pass the actual error object
    );
    console.error('Global Error Handler:', event.message, event);
  });

  window.addEventListener('unhandledrejection', (event) => {
    logError(
      'UnhandledPromise',
      event.reason?.message || String(event.reason),
      event.reason?.fileName || 'Promise Rejection',
      event.reason?.lineNumber,
      event.reason?.columnNumber,
      event.reason // Pass the reason as the error object
    );
    console.error('Global Unhandled Rejection:', event.reason, event);
  });
  console.log('✅ Global error handlers registered.');
}
