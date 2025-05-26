
// File: scripts/utils/errorHandler.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Error Handler Utility
 * Captures window errors and unhandled rejections.
 * Stores logs in localStorage grouped by day/week/month.
 * Includes module parse/runtime error support and optional hints.
 */

const STORAGE_KEY = 'errorLogHistory';

function getTodayKey() {
  const d = new Date();
  return d.toISOString().split('T')[0]; // e.g., '2025-05-25'
}

function getWeekKey() {
  const d = new Date();
  const year = d.getFullYear();
  const week = Math.ceil((((d - new Date(year, 0, 1)) / 86400000) + d.getDay() + 1) / 7);
  return `${year}-W${week}`;
}

function getMonthKey() {
  const d = new Date();
  return d.toISOString().slice(0, 7); // e.g., '2025-05'
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

function formatErrorEntry(type, message, source, lineno, colno, stack) {
  return {
    type,
    message,
    source,
    lineno,
    colno,
    stack: stack || '',
    time: new Date().toLocaleString()
  };
}

function logError(type, msg, source, lineno, colno, error) {
  const log = getStoredLog();
  const entry = formatErrorEntry(type, msg, source, lineno, colno, error?.stack);

  const today = getTodayKey();
  const week = getWeekKey();
  const month = getMonthKey();

  log[today] = log[today] || [];
  log[week] = log[week] || [];
  log[month] = log[month] || [];

  log[today].push(entry);
  log[week].push(entry);
  log[month].push(entry);

  saveLog(log);

  // Optional dev log
  if (import.meta?.url?.includes('localhost') || location.search.includes('debug')) {
    console.warn('Logged Error:', entry);
  }
}

export function getErrorLog(range = 'today') {
  const log = getStoredLog();
  if (range === 'week') return log[getWeekKey()] || [];
  if (range === 'month') return log[getMonthKey()] || [];
  return log[getTodayKey()] || [];
}

export function clearErrorLog() {
  localStorage.removeItem(STORAGE_KEY);
}

// Main global hooks
window.addEventListener('error', (e) => {
  logError('error', e.message, e.filename, e.lineno, e.colno, e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  logError('rejection', e.reason?.message || 'Promise rejection', '', 0, 0, e.reason?.stack);
});
