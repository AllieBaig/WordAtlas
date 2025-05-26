// File: scripts/utils/history.js
// Features:
// - Records daily gameplay answers per mode
// - Stores history in localStorage, grouped by date and mode
// - Used for streaks, review, and future summary screens
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const HISTORY_KEY = 'wordGameHistory';

export function saveAnswer({ mode, question, answer, correct }) {
  const history = getHistory();
  const today = new Date().toISOString().split('T')[0];

  if (!history[today]) history[today] = {};
  if (!history[today][mode]) history[today][mode] = [];

  history[today][mode].push({ question, answer, correct, time: Date.now() });

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}');
}

export function getTodayHistory() {
  const today = new Date().toISOString().split('T')[0];
  const history = getHistory();
  return history[today] || {};
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

