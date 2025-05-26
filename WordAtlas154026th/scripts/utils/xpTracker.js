
// File: scripts/utils/xpTracker.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const XP_KEY = 'xpTracker';

/**
 * Get current XP data from localStorage
 * @returns {{ total: number, log: Array }}
 */
export function getXPData() {
  const data = JSON.parse(localStorage.getItem(XP_KEY)) || {
    total: 0,
    log: [] // [{ amount: 10, reason: 'Correct answer', mode: 'wordRelic', time }]
  };
  return data;
}

/**
 * Add XP to the current user session
 * @param {number} amount
 * @param {string} reason - e.g., "Correct answer"
 * @param {string} mode - game mode name
 */
export function addXP(amount, reason, mode = 'unknown') {
  const data = getXPData();
  data.total += amount;

  data.log.unshift({
    amount,
    reason,
    mode,
    time: new Date().toLocaleString()
  });

  // Keep recent 50 logs
  data.log = data.log.slice(0, 50);
  localStorage.setItem(XP_KEY, JSON.stringify(data));
}

/**
 * Reset all XP (for testing/debug)
 */
export function resetXP() {
  localStorage.removeItem(XP_KEY);
}

/**
 * Show XP summary as text
 * @returns {string}
 */
export function getXPSummary() {
  const data = getXPData();
  return `⭐ XP: ${data.total} points from ${data.log.length} events`;
}

