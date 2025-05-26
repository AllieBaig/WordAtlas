// File: scripts/utils/errorHandler.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const STORAGE_KEY = 'errorLog';

function getTodayKey() {
  return new Date().toISOString().split('T')[0]; // e.g., "2025-05-27"
}

function getStoredLog() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLog(log) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

function createEntry(data) {
  return {
    type: data.type || 'Error',
    message: data.message || '(no message)',
    source: data.source || '',
    lineno: data.lineno || '',
    colno: data.colno || '',
    stack: data.stack || '',
    time: new Date().toLocaleString()
  };
}

export function logError(data) {
  const log = getStoredLog();
  const today = getTodayKey();
  log[today] = log[today] || [];
  log[today].push(createEntry(data));
  saveLog(log);
}

export function logWarning(message, source = '') {
  logError({ type: 'Warning', message, source });
}

export function logDeprecation(message, source = '') {
  logError({ type: 'Deprecation', message, source });
}

export function logConflict(message, sourceA = '', sourceB = '') {
  logError({
    type: 'Conflict',
    message: `${message} [${sourceA} vs ${sourceB}]`,
    source: 'ConflictDetector'
  });
}

export function getErrorLog(range = 'today') {
  const log = getStoredLog();
  const today = getTodayKey();

  if (range === 'today') {
    return log[today] || [];
  }

  const entries = [];
  const now = new Date();
  const compareDays = (d1, d2) => {
    const diff = (d1 - d2) / (1000 * 60 * 60 * 24);
    return diff;
  };

  for (const date in log) {
    const dateObj = new Date(date);
    const diffDays = compareDays(now, dateObj);
    if ((range === 'week' && diffDays <= 7) || (range === 'month' && diffDays <= 30)) {
      entries.push(...log[date]);
    }
  }

  return entries.sort((a, b) => new Date(b.time) - new Date(a.time));
}

export function clearErrorLog() {
  localStorage.removeItem(STORAGE_KEY);
}

// Global handler bindings
window.addEventListener('error', e => {
  logError({
    type: 'Error',
    message: e.message,
    source: e.filename,
    lineno: e.lineno,
    colno: e.colno,
    stack: e.error?.stack
  });
});

window.addEventListener('unhandledrejection', e => {
  logError({
    type: 'UnhandledRejection',
    message: e.reason?.message || String(e.reason),
    stack: e.reason?.stack || '',
    source: 'Promise'
  });
});

