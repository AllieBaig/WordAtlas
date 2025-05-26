// File: scripts/utils/streak.js
// Features:
// - Tracks user's daily play streak across all modes
// - Updates when a mode is played on a new date
// - Resets if a day is missed
// - Stores data in localStorage
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const STREAK_KEY = 'wordGameStreak';

export function getStreak() {
  const data = JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');
  return {
    count: data.count || 0,
    lastDate: data.lastDate || null
  };
}

export function updateStreak() {
  const today = new Date().toISOString().split('T')[0];
  const stored = getStreak();

  if (stored.lastDate === today) return; // already updated today

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const newCount = (stored.lastDate === yesterday) ? stored.count + 1 : 1;

  localStorage.setItem(STREAK_KEY, JSON.stringify({
    count: newCount,
    lastDate: today
  }));
}

export function resetStreak() {
  localStorage.removeItem(STREAK_KEY);
}

