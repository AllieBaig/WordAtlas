
// File: scripts/utils/statsTracker.js
// Features:
// - Tracks gameplay sessions with mode, emoji, and duration
// - Aggregates stats per mode for usage analysis
// - Used to power stats view and emoji heatmaps
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const STORAGE_KEY = 'globalGameStats';

/**
 * Log a completed game session
 * @param {Object} session { mode, emoji, startTime, endTime, location? }
 */
export function logGameSession({ mode, emoji = '', startTime, endTime, location = '' }) {
  const stats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const duration = ((endTime - startTime) / 1000).toFixed(1); // seconds

  stats.push({
    mode,
    emoji,
    location,
    duration: Number(duration),
    time: new Date().toISOString()
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

/**
 * Get raw session log
 * @returns {Array}
 */
export function getStats() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

/**
 * Get aggregated stats by mode
 * @returns {Object}
 */
export function getAggregatedStats() {
  const sessions = getStats();
  const summary = {};

  for (const session of sessions) {
    if (!summary[session.mode]) {
      summary[session.mode] = { count: 0, time: 0, emojiMap: {} };
    }

    summary[session.mode].count += 1;
    summary[session.mode].time += session.duration;

    if (session.emoji) {
      summary[session.mode].emojiMap[session.emoji] = (summary[session.mode].emojiMap[session.emoji] || 0) + 1;
    }
  }

  return summary;
}

/**
 * Clear all stored gameplay stats
 */
export function clearStats() {
  localStorage.removeItem(STORAGE_KEY);
}
