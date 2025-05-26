
// 25th, 07:10

// File: scripts/utils/eventBinder.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Event Binder Utility
 * Prevents duplicate listeners and supports delegated event handling.
 * Ideal for binding menu buttons, footer toggles, settings controls.
 */

const boundEvents = new WeakMap();

/**
 * Binds a safe event listener that avoids duplicates.
 * @param {Element} el - Target DOM element
 * @param {string} type - Event type (e.g., 'click')
 * @param {Function} handler - Function to execute
 */
export function bindEvent(el, type, handler) {
  if (!el || typeof handler !== 'function') return;

  const key = `${type}`;

  if (!boundEvents.has(el)) {
    boundEvents.set(el, new Map());
  }

  const handlers = boundEvents.get(el);
  if (handlers.has(key)) {
    el.removeEventListener(type, handlers.get(key));
  }

  el.addEventListener(type, handler);
  handlers.set(key, handler);
}

/**
 * Delegated event binding using selectors
 * @param {Element} parent - Parent container (e.g., document)
 * @param {string} selector - Target child selector
 * @param {string} type - Event type
 * @param {Function} handler - Callback with (event, matchedElement)
 */
export function bindDelegated(parent, selector, type, handler) {
  if (!parent || typeof handler !== 'function') return;

  parent.addEventListener(type, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler(e, target);
    }
  });
}
