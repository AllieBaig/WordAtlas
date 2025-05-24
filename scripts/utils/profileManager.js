

// File: scripts/utils/profileManager.js
// Features:
// - Creates persistent profile ID via device + nickname or auto words
// - Fallback if storage clears or ID is missing
// - Stores nickname, ID, and optional traits in localStorage
// - Can be used to sync with global stats or QR transfer
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const STORAGE_KEY = 'wordProfile';
const DEFAULT_PREFIX = 'user-';

function generateUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11)
    .replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function generateWordPair() {
  const animals = ['Owl', 'Tiger', 'Lion', 'Whale', 'Fox', 'Bear'];
  const moods = ['Happy', 'Calm', 'Fierce', 'Silly', 'Quiet', 'Bright'];
  return `${pick(moods)}${pick(animals)}`;
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Get current profile object from storage
 */
export function getProfile() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
}

/**
 * Set new profile (object)
 */
export function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

/**
 * Ensure a profile exists — generate one if needed
 */
export function ensureProfile() {
  let profile = getProfile();

  if (profile?.id) return profile;

  const id = generateUUID();
  const nickname = generateWordPair();
  profile = { id, nickname, created: Date.now() };

  saveProfile(profile);
  return profile;
}

/**
 * Get ID only
 */
export function getProfileID() {
  return ensureProfile().id;
}

/**
 * Get display nickname
 */
export function getNickname() {
  return ensureProfile().nickname;
}

