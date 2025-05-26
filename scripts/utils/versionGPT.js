// File: scripts/utils/version.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Version Utility
 * Tracks and compares app versions between current and last session.
 * Useful for notifying users about new updates or clearing cache.
 */

export const APP_VERSION = '1.0.0';
export const VERSION_DATE = '2025-05-25';
const STORAGE_KEY = 'lastKnownVersion';

/**
 * Check if current version is fallback
 */
export function isFallbackActive() {
  return location.pathname.includes('/Site1/') || window.__FALLBACK_MODE__ === true;
}

/**
 * Returns label for display or logging
 */
export function getVersionLabel() {
  return `v${APP_VERSION} ${isFallbackActive() ? '(Fallback Active)' : ''}`;
}

/**
 * Inject current version into a DOM element
 */
export function injectVersionDisplay(targetId = 'footer-version') {
  const el = document.getElementById(targetId);
  if (el) el.textContent = getVersionLabel();
}

/**
 * Compare stored version with current app version
 * @param {Function} onUpdate - callback if version changed
 */
export function checkForVersionChange(onUpdate) {
  const previous = localStorage.getItem(STORAGE_KEY);

  if (previous && previous !== APP_VERSION) {
    if (typeof onUpdate === 'function') {
      onUpdate(previous, APP_VERSION);
    }
  }

  // Always store current version
  localStorage.setItem(STORAGE_KEY, APP_VERSION);
}
