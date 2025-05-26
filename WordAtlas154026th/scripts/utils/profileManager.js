// File: scripts/utils/profileManager.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Profile Manager
 * Handles creating, storing, and retrieving a unique user profile
 * without requiring login. Supports nickname, UUID, and word-pair fallback.
 */

const PROFILE_KEY = 'userProfile';

/**
 * Load profile from localStorage
 */
export function getStoredProfile() {
  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Save profile to localStorage
 */
export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

/**
 * Get or create a user profile
 * Priority:
 * 1. Stored profile
 * 2. Prompt for nickname
 * 3. Word-pair fallback
 */
export function getOrCreateProfile() {
  const existing = getStoredProfile();
  if (existing) return existing;

  const nickname = prompt('Enter a fun nickname (e.g. SunnyJane):');
  let id = '';

  if (nickname && nickname.trim().length >= 3) {
    id = nickname.trim() + '-' + shortDeviceHash();
  } else {
    const autoNick = generateWordPair();
    id = autoNick + '-' + shortDeviceHash();
  }

  const newProfile = {
    id,
    nickname: nickname || generateWordPair(),
    created: new Date().toISOString(),
    stats: {
      xp: 0,
      streak: 0
    },
    settings: {}
  };

  saveProfile(newProfile);
  return newProfile;
}

/**
 * Generate a fun, memorable word pair (e.g., BrightFox)
 */
function generateWordPair() {
  const adjectives = ['Happy', 'Bold', 'Clever', 'Sunny', 'Brave', 'Swift', 'Bright'];
  const animals = ['Fox', 'Owl', 'Tiger', 'Lion', 'Penguin', 'Otter', 'Falcon'];

  const a = adjectives[Math.floor(Math.random() * adjectives.length)];
  const b = animals[Math.floor(Math.random() * animals.length)];

  return a + b;
}

/**
 * Generate a basic device fingerprint hash (short form)
 * Uses userAgent, screen size, and timezone
 */
function shortDeviceHash() {
  const base = navigator.userAgent + screen.width + screen.height + Intl.DateTimeFormat().resolvedOptions().timeZone;
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    hash = ((hash << 5) - hash) + base.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).substring(0, 5);
}

