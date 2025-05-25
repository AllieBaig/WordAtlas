// File: scripts/utils/errorHandler.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

export function logError(error) {
  const entry = {
    ...error,
    hint: detectHint(error),
    time: new Date().toLocaleString()
  };

  ['default', 'daily', 'weekly', 'monthly'].forEach(type => {
    const key = type === 'default' ? 'errorLog' : getDateKey(type);
    const logs = JSON.parse(localStorage.getItem(key) || '[]');
    logs.unshift(entry);
    localStorage.setItem(key, JSON.stringify(logs.slice(0, 100)));
  });
}

export function getErrorLog(period = 'default') {
  const key = period === 'default' ? 'errorLog' : getDateKey(period);
  return JSON.parse(localStorage.getItem(key) || '[]');
}

export function clearErrorLog(period = 'default') {
  const key = period === 'default' ? 'errorLog' : getDateKey(period);
  localStorage.removeItem(key);
}

function getDateKey(type = 'daily') {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');

  if (type === 'daily') return `errorLog_daily_${yyyy}-${mm}-${dd}`;
  if (type === 'weekly') {
    const firstJan = new Date(yyyy, 0, 1);
    const week = Math.ceil(((now - firstJan) / 86400000 + firstJan.getDay() + 1) / 7);
    return `errorLog_weekly_${yyyy}-W${week}`;
  }
  if (type === 'monthly') return `errorLog_monthly_${yyyy}-${mm}`;
  return 'errorLog';
}

function extractModuleFromStack(stack = '') {
  const match = stack.match(/(scripts\/[^\s'")]+)/i);
  return match ? match[1] : '';
}

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
    return `🚫 CORS error — check GitHub Pages or fetch policy`;
  }

  return '';
}

window.addEventListener('error', event => {
  const { message, filename, lineno, colno, error } = event;
  logError({
    type: 'error',
    message,
    source: filename,
    lineno,
    colno,
    stack: error?.stack || ''
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
    stack
  });
});

