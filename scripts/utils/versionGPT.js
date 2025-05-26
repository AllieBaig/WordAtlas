
// File: scripts/utils/version.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Version Utility
 * Tracks and exposes app version and source (main/fallback).
 * Used in error logs, debug panels, and service worker versioning.
 */

export const APP_VERSION = '1.0.0';
export const VERSION_DATE = '2025-05-25';

/**
 * Determine if fallback is active (e.g., Site1)
 */
export function isFallbackActive() {
  return location.pathname.includes('/Site1/') || window.__FALLBACK_MODE__ === true;
}

/**
 * Get version string for display/logging
 */
export function getVersionLabel() {
  return `v${APP_VERSION} ${isFallbackActive() ? '(Fallback Active)' : ''}`;
}

/**
 * Show version in the footer or dev panel
 */
export function injectVersionDisplay(targetId = 'footer-version') {
  const el = document.getElementById(targetId);
  if (el) el.textContent = getVersionLabel();
}
