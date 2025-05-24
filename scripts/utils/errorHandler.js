// File: scripts/utils/errorHandler.js
// Features:
// - Centralized error logging (console, UI, remote)
// - Global capture of uncaught errors and unhandled promise rejections
// - Local storage for persistent error logs, accessible by error-log.html
// - Safe event listener attachment with built-in error handling
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const LOG_KEY = 'wordatlas-error-log';
const MAX_LOG_ENTRIES = 100; // Maximum number of errors to store in localStorage

/**
 * Optional remote logger function. Should accept an object:
 * { message, level, timestamp, context, source, lineno, colno, stack }
 */
let remoteLogger = null;

/**
 * === Local Storage Log Management ===
 * Functions for interacting with the error log stored in localStorage.
 */

/**
 * Retrieve stored error log from localStorage.
 * @returns {Array<Object>} An array of stored error objects.
 */
export function getErrorLog() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY)) || [];
  } catch (e) {
    console.error("Failed to parse error log from localStorage:", e);
    return [];
  }
}

/**
 * Saves a new error object to the localStorage log.
 * This is an internal helper called by the primary logError function.
 * @param {Object} errorObj - The error object to save.
 */
function saveErrorToLocalStorage(errorObj) {
  const logs = getErrorLog();
  logs.unshift({ ...errorObj, time: new Date().toLocaleString() }); // Add timestamp specific to display

  if (logs.length > MAX_LOG_ENTRIES) {
    logs.length = MAX_LOG_ENTRIES; // Trim to max entries
  }
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

/**
 * Clears the stored error log from localStorage.
 */
export function clearErrorLog() {
  localStorage.removeItem(LOG_KEY);
  console.log('✅ Error log cleared from localStorage.');
}

/**
 * === UI Logging (for error-log.html or dynamic display) ===
 * Helper to append error messages to a designated DOM element.
 */

/**
 * Appends an error message to the error log UI container if available.
 * @param {string} message - The error message.
 * @param {Date} timestamp - The timestamp of the error.
 */
function appendErrorToLogUI(message, timestamp) {
  const errorLogContainer = document.getElementById('errorLog'); // Assumes an element with id 'errorLog' exists
  if (errorLogContainer) {
    const entry = document.createElement('li');
    entry.textContent = `${timestamp.toISOString()}: ${message}`;
    errorLogContainer.appendChild(entry);
  }
}

/**
 * === Primary Logging Function ===
 * Centralized function to log errors across different channels.
 */

/**
 * Logs an error to the console, optionally to a remote service, to a UI log,
 * and saves it to localStorage.
 * @param {string} message - The primary error message.
 * @param {'info'|'warn'|'error'|'debug'} [level='error'] - Severity level for logging.
 * @param {Object} [context={}] - Additional context relevant to the error.
 * @param {Object} [errorDetails={}] - Specific details from the original error object (e.g., stack, filename).
 */
export function logError(message, level = 'error', context = {}, errorDetails = {}) {
  const timestamp = new Date();
  const fullErrorContext = {
    message,
    level,
    timestamp: timestamp.toISOString(), // ISO string for consistent logging
    context,
    ...errorDetails // Merge any provided error details like stack, lineno, etc.
  };

  // 1. Log to UI (if element exists)
  try {
    appendErrorToLogUI(message, timestamp);
  } catch (uiError) {
    console.error("Failed to append to error log UI:", uiError);
  }

  // 2. Log to console
  if (typeof console[level] === 'function') {
    console[level](`[${timestamp.toISOString()}] ${message}`, context);
  } else {
    // Fallback if level is not a standard console method
    console.error(`[${timestamp.toISOString()}] ${message} (Level: ${level})`, context);
  }

  // 3. Log to remote service (if configured)
  try {
    if (remoteLogger) {
      remoteLogger(fullErrorContext);
    }
  } catch (e) {
    console.error("Remote logger failed:", e);
  }

  // 4. Save to localStorage
  saveErrorToLocalStorage(fullErrorContext);
}

/**
 * === Global Error Handling Setup ===
 * Attaches listeners to window for unhandled errors and promise rejections.
 */

/**
 * Configures global error handler options.
 * @param {Object} options
 * @param {function} [options.remote] - A function for remote logging (e.g., to an analytics service).
 */
export function configureErrorHandler({ remote } = {}) {
  if (typeof remote === 'function') {
    remoteLogger = remote;
    console.log('✅ Remote error logger configured.');
  }
}

/**
 * Registers global event listeners to capture uncaught errors and unhandled promise rejections.
 */
export function registerGlobalErrorHandlers() {
  window.addEventListener('error', (e) => {
    logError(
      e.message,
      'error',
      { type: 'uncaught_error', source: e.filename, lineno: e.lineno, colno: e.colno },
      { stack: e.error?.stack || null } // Pass stack separately as errorDetails
    );
  });

  window.addEventListener('unhandledrejection', (e) => {
    const message = e.reason?.message || String(e.reason);
    logError(
      `Unhandled Promise Rejection: ${message}`,
      'error',
      { type: 'unhandled_rejection' },
      { stack: e.reason?.stack || null } // Pass stack separately as errorDetails
    );
  });

  console.log('✅ Global error handlers registered.');
}

/**
 * === Safe Event Listener Attachment ===
 * Wraps event handlers in a try/catch block to log errors.
 */

/**
 * Attaches a safe event listener to a DOM element, wrapping the handler
 * in a try/catch block to prevent crashes and log errors.
 * @param {Element} element - The DOM element to attach the listener to.
 * @param {string} eventType - The type of event to listen for (e.g., 'click', 'submit').
 * @param {Function} handler - The original event handler function.
 * @param {string} [name='unknown_listener'] - An identifier for debugging/logging purposes.
 */
export function attachSafeListener(element, eventType, handler, name = 'unknown_listener') {
  if (!element) {
    logError(`Element not found for listener: ${name}`, 'warn', { elementId: element?.id, eventType });
    return;
  }

  if (typeof handler !== 'function') {
    logError(`Handler for "${name}" is not a function`, 'warn', { eventType, handlerType: typeof handler });
    return;
  }

  function wrappedHandler(event) {
    try {
      handler.call(element, event); // Call handler with element as 'this' context
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logError(
        `Error in ${eventType} handler for "${name}": ${errorMessage}`,
        'error',
        { eventType, listenerName: name, originalEvent: event },
        { stack: error?.stack || null } // Pass stack separately as errorDetails
      );
    }
  }

  element.addEventListener(eventType, wrappedHandler);
  console.log(`✅ Safe listener "${name}" attached to element for "${eventType}" event.`);
}

