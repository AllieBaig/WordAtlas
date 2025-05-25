// File: scripts/gameNavigation.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Game Navigation
 * Handles mode switching, dynamic import with fallback,
 * dual export support (init or default), error logging, and
 * localStorage tracking of last successfully launched mode.
 */

import { showErrorToast } from './utils/errorUI.js';
import { showMenu, hideMenu } from './utils/menuVisibility.js';
import { logError } from './utils/errorHandler.js';

let isFallback = false;
const fallbackBase = './Site1/scripts/';
const mainBase = './scripts/';
const MODE_KEY = 'lastMode'; // storage key for last played mode

// Map mode name to script path
const modeMap = {
  regular: 'modes/regular.js',
  wordRelic: 'modes/wordRelic.js',
  wordSafari: 'modes/wordSafari.js',
  dice: 'modes/dice.js',
  atlas: 'modes/atlas.js',
  trail: 'modes/trail.js',
  versus: 'modes/versus.js',
  nearby: 'modes/nearby.js',
  mixlingo: 'modes/mixlingo.js'
};

/**
 * Dynamically import module from main or fallback folder
 */
async function loadSafe(path) {
  try {
    return await import(mainBase + path);
  } catch (e1) {
    console.warn(`⚠️ Main load failed: ${path}. Trying fallback...`);
    isFallback = true;
    try {
      return await import(fallbackBase + path);
    } catch (e2) {
      const source = fallbackBase + path;
      logError(e2, source, {
        type: e2 instanceof SyntaxError ? 'ParseError' : 'LoadError'
      });
      showErrorToast(`🧨 Could not load: ${path}`);
      throw e2;
    }
  }
}

/**
 * Load and run a game mode module
 */
export async function navigateToMode(mode) {
  const file = modeMap[mode];
  if (!file) {
    showErrorToast(`Unknown mode: "${mode}"`);
    return;
  }

  try {
    const mod = await loadSafe(file);
    const initFn = mod.init || mod.default;

    if (typeof initFn === 'function') {
      hideMenu();
      localStorage.setItem(MODE_KEY, mode);
      showErrorToast(`✅ Loaded: ${mode}${isFallback ? ' (Site1)' : ''}`);
      initFn({ showMenu });
    } else {
      throw new Error(`Module "${mode}" has no default or init function.`);
    }
  } catch (err) {
    const origin = (isFallback ? fallbackBase : mainBase) + file;
    logError(err, origin, {
      type: err instanceof SyntaxError ? 'ParseError' : 'ModuleError'
    });
    showErrorToast(`❌ Error loading "${mode}"`);
    console.error(`❌ Load failed: ${origin}`, err);
  }
}

/**
 * Attach click handlers to all mode buttons
 */
function initMenuButtons() {
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (mode) navigateToMode(mode);
    });
  });
}

/**
 * Retrieve last loaded mode from storage
 */
export function getLastMode() {
  return localStorage.getItem(MODE_KEY) || null;
}

document.addEventListener('DOMContentLoaded', initMenuButtons);
