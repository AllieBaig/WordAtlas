// File: scripts/utils/errorHandler.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Logs an error object to localStorage
 * @param {Object} error
 */
export function logError(error) {
  const logs = JSON.parse(localStorage.getItem('errorLog') || '[]');
  const updated = {
    ...error,
    hint: detectHint(error)
  };
  logs.unshift(updated);
  localStorage.setItem('errorLog', JSON.stringify(logs.slice(0, 100)));
}

/**
 * Returns stored error logs
 */
export function getErrorLog() {
  return JSON.parse(localStorage.getItem('errorLog') || '[]');
}

/**
 * Clears the error log
 */
export function clearErrorLog() {
  localStorage.removeItem('errorLog');
}

/**
 * Extracts likely script/module name from stack
 */
function extractModuleFromStack(stack = '') {
  const match = stack.match(/(scripts\/[^\s'")]+)/i);
  return match ? match[1] : '';
}

/**
 * Adds developer-friendly hints based on message or stack
 */
function detectHint(error) {
  const msg = error?.message?.toLowerCase() || '';
  const stack = error?.stack?.toLowerCase() || '';
  const suspectedModule = extractModuleFromStack(stack);

  if (msg.includes('not a function') || msg.includes('undefined')) {
    return `🔁 Possible circular import or missing export ${suspectedModule ? `in ${suspectedModule}` : ''}`;
  }
  if (msg.includes('unexpected token')) {
    return `🧩 Syntax error — possibly invalid JSON or broken module ${suspectedModule ? `(${suspectedModule})` : ''}`;
  }
  if (msg.includes('dynamically imported module')) {
    return `🌐 Module load failed — check import path or extension ${suspectedModule ? `→ ${suspectedModule}` : ''}`;
  }
  if (msg.includes('cors')) {
    return `🚫 CORS error — verify GitHub Pages access`;
  }
  return '';
}

// Global error listeners
window.addEventListener('error', event => {
  const { message, filename, lineno, colno, error } = event;
  logError({
    type: 'error',
    message,
    source: filename,
    lineno,
    colno,
    stack: error?.stack || '',
    time: new Date().toLocaleString()
  });
});

window.addEventListener('unhandledrejection', event => {
  const message = event.reason?.message || event.reason?.toString() || 'Unhandled rejection';
  const stack = event.reason?.stack || '';

  logError({
    type: 'promise',
    message,
    source: '',
    lineno: '',
    colno: '',
    stack,
    time: new Date().toLocaleString()
  });
});
