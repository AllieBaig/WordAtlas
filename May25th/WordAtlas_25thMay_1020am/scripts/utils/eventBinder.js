

// File: scripts/utils/eventBinder.js
// Features:
// - Safely add event listeners and remove them all on cleanup
// - Prevents double bindings and memory leaks
// - Reusable across modes and settings panels
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const listeners = [];

/**
 * Binds an event and tracks it for cleanup
 * @param {Element} el
 * @param {string} type
 * @param {Function} handler
 */
export function bind(el, type, handler) {
  if (!el) return;
  el.addEventListener(type, handler);
  listeners.push({ el, type, handler });
}

/**
 * Remove all tracked event listeners
 */
export function clearAllBindings() {
  for (const { el, type, handler } of listeners) {
    el.removeEventListener(type, handler);
  }
  listeners.length = 0;
}

