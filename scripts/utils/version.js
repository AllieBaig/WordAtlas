// File: scripts/utils/version.js
// Edited by Gemini (Added initVersionToggle export)
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Version Utility
 * Tracks and compares app versions between current and last session.
 * Useful for notifying users about new updates or clearing cache.
 */

export const APP_VERSION = '1.0.0';
export const VERSION_DATE = '2025-05-25'; // Current date for version tracking
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
 * Inject current version into a DOM element.
 * Defaults to an element with id='footer-version'.
 */
export function injectVersionDisplay(targetId = 'footer-version') {
  const el = document.getElementById(targetId);
  if (el) {
    el.textContent = getVersionLabel();
  } else {
    console.warn(`Element with ID '${targetId}' not found for version display.`);
  }
}

/**
 * Compare stored version with current app version.
 * @param {Function} onUpdate - Callback function if version changed (receives previous and new version).
 */
export function checkForVersionChange(onUpdate) {
  const previous = localStorage.getItem(STORAGE_KEY);

  if (previous && previous !== APP_VERSION) {
    console.log(`App updated from ${previous} to ${APP_VERSION}.`);
    if (typeof onUpdate === 'function') {
      onUpdate(previous, APP_VERSION);
    }
  }

  // Always store current version after check
  localStorage.setItem(STORAGE_KEY, APP_VERSION);
}

/**
 * Initializes version-related features, such as displaying the version and checking for updates.
 * This is the function main.js expects to import and call.
 */
export function initVersionToggle() {
    // Inject the version label into an element (e.g., in the footer).
    // You might want to add a <span> with id="footer-version" inside your <footer> in index.html
    // For example:
    // <p>... © 2025 AllieBaig — <span id="footer-version"></span></p>
    injectVersionDisplay('footer-version');
    console.log('✅ App version display initialized.');

    // Optionally, check for version changes and react
    checkForVersionChange((prevVersion, newVersion) => {
        // You could import showErrorToast from errorUI.js here if you want to show a notification.
        // For example:
        // import { showErrorToast } from './errorUI.js';
        // showErrorToast(`App updated to v${newVersion}!`, 'info', 5000);
    });
}

