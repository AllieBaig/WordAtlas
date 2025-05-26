// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Logs an error object to localStorage under various time-based keys.
 * @param {Object} error - Error object containing details like message, stack, etc.
 */
export function logError(error) {
  const entry = {
    ...error,
    hint: detectHint(error),
    time: new Date().toLocaleString(),
  };

  ['default', 'daily', 'weekly', 'monthly'].forEach(period => {
    const key = period === 'default' ? 'errorLog' : getDateKey(period);
    const logs = JSON.parse(localStorage.getItem(key) || '[]');
    logs.unshift(entry);
    localStorage.setItem(key, JSON.stringify(logs.slice(0, 100)));
  });
}

/**
 * Retrieves error logs for a specific period.
 * @param {string} period - One of 'default', 'daily', 'weekly', or 'monthly'.
 * @returns {Array} List of error log entries.
 */
export function getErrorLog(period = 'default') {
  const key = period === 'default' ? 'errorLog' : getDateKey(period);
  return JSON.parse(localStorage.getItem(key) || '[]');
}

/**
 * Clears error logs for a specific period.
 * @param {string} period - One of 'default', 'daily', 'weekly', or 'monthly'.
 */
export function clearErrorLog(period = 'default') {
  const key = period === 'default' ? 'errorLog' : getDateKey(period);
  localStorage.removeItem(key);
}

/**
 * Optional named export for catching import-related failures explicitly.
 * @param {Error} error
 */
export function logModuleImportFailure(error) {
  logError({
    type: 'module-import',
    message: error?.message || 'Module import failed',
    stack: error?.stack || '',
    source: '',
    lineno: '',
    colno: '',
  });
}

/**
 * Returns a date-specific localStorage key based on the period.
 */
function getDateKey(period = 'daily') {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');

  switch (period) {
    case 'daily':
      return `errorLog_daily_${yyyy}-${mm}-${dd}`;
    case 'weekly': {
      const firstJan = new Date(yyyy, 0, 1);
      const week = Math.ceil(((now - firstJan) / 86400000 + firstJan.getDay() + 1) / 7);
      return `errorLog_weekly_${yyyy}-W${week}`;
    }
    case 'monthly':
      return `errorLog_monthly_${yyyy}-${mm}`;
    default:
      return 'errorLog';
  }
}

/**
 * Tries to extract the likely module or script from a stack trace.
 */
function extractModuleFromStack(stack = '') {
  const match = stack.match(/(scripts\/[^\s'")]+)/i);
  return match ? match[1] : '';
}

/**
 * Provides a user-friendly hint based on common error patterns.
 */
function detectHint(error) {
  const msg = error?.message?.toLowerCase() || '';
  const stack = error?.stack?.toLowerCase() || '';
  const suspectedModule = extractModuleFromStack(stack);

  if (msg.includes('not a function') || msg.includes('undefined')) {
    return `🔁 Possible circular import or missing export${suspectedModule ? ` in ${suspectedModule}` : ''}`;
  }
  if (msg.includes('unexpected token')) {
    return `🧩 Syntax error — possibly invalid JSON or broken module${suspectedModule ? ` (${suspectedModule})` : ''}`;
  }
  if (msg.includes('dynamically imported module')) {
    return `🌐 Module load failed — check import path or extension${suspectedModule ? ` → ${suspectedModule}` : ''}`;
  }
  if (msg.includes('cors')) {
    return `🚫 CORS error — check GitHub Pages or fetch policy`;
  }

  return '';
}

// Auto-capture global errors and unhandled rejections
window.addEventListener('error', ({ message, filename, lineno, colno, error }) => {
  logError({
    type: 'error',
    message,
    source: filename,
    lineno,
    colno,
    stack: error?.stack || '',
  });
});

window.addEventListener('unhandledrejection', ({ reason }) => {
  const message = reason?.message || reason?.toString() || 'Unhandled rejection';
  logError({
    type: 'promise',
    message,
    source: '',
    lineno: '',
    colno: '',
    stack: reason?.stack || '',
  });
});
