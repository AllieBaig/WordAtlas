
// File: scripts/utils/badges.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const BADGE_KEY = 'badgeTracker';

/**
 * Badge definitions (name, emoji, description, unlock criteria)
 */
const BADGES = [
  { id: 'xp_100', emoji: '🟡', label: 'XP Novice', desc: 'Earn 100 XP', check: data => data.totalXP >= 100 },
  { id: 'xp_500', emoji: '🔵', label: 'XP Explorer', desc: 'Earn 500 XP', check: data => data.totalXP >= 500 },
  { id: 'xp_1000', emoji: '🟣', label: 'XP Master', desc: 'Earn 1000 XP', check: data => data.totalXP >= 1000 },
  { id: 'first_play', emoji: '🎮', label: 'First Game', desc: 'Complete any game', check: data => data.gamesPlayed >= 1 },
  { id: 'streak_3', emoji: '🔥', label: '3-Day Streak', desc: 'Play 3 days in a row', check: data => data.streak >= 3 },
  { id: 'modes_all', emoji: '🌈', label: 'Explorer', desc: 'Play all 7 game modes', check: data => data.modesPlayed.length >= 7 }
];

/**
 * Returns unlocked badges
 */
export function getUnlockedBadges() {
  return JSON.parse(localStorage.getItem(BADGE_KEY) || '[]');
}

/**
 * Evaluates and saves badges if unlocked
 */
export function checkForNewBadges(profile) {
  const unlocked = getUnlockedBadges();
  const unlockedIds = unlocked.map(b => b.id);

  const newlyEarned = BADGES.filter(b => b.check(profile) && !unlockedIds.includes(b.id));

  if (newlyEarned.length) {
    const updated = [...unlocked, ...newlyEarned];
    localStorage.setItem(BADGE_KEY, JSON.stringify(updated));
  }

  return newlyEarned;
}

