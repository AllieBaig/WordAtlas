// File: scripts/gameNavigation.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Game Navigation
 * Handles mode switching, dynamic module import with fallback,
 * and structured error logging including parse-time (SyntaxError).
 */

import { getSettings } from './utils/settings.js';
import { showErrorToast } from './utils/errorUI.js';
import { showMenu, hideMenu } from './utils/menuVisibility.js';
import { logError } from './utils/errorHandler.js';

let isFallback = false;
const fallbackBase = './Site1/scripts/';
const mainBase = './scripts/';

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
 * Load a module safely with fallback support (Site1/)
 */
async function loadSafe(path) {
  const fullPath = mainBase + path;
  const fallbackPath = fallbackBase + path;

  try {
    return await import(fullPath);
  } catch (err) {
    console.warn(`⚠️ Failed: ${path} from main scripts, retrying Site1...`);
    isFallback = true;
    try {
      return await import(fallbackPath);
    } catch (fallbackErr) {
      console.error(`❌ Both primary and fallback failed for ${path}`, fallbackErr);
      logError(fallbackErr, fallbackPath, {
        type: fallbackErr instanceof SyntaxError ? 'ParseError' : 'LoadError'
      });
      showErrorToast(`🧨 Module load failed: ${path}`);
      throw fallbackErr;
    }
  }
}

/**
 * Dynamically navigate to a mode
 */
export async function navigateToMode(mode) {
  const file = modeMap[mode];
  if (!file) {
    showErrorToast(`Unknown mode: "${mode}"`);
    return;
  }

  try {
    const module = await loadSafe(file);
    if (typeof module?.default === 'function') {
      hideMenu();
      module.default({ showMenu });
    } else {
      throw new Error(`Module "${mode}" loaded but has no default export.`);
    }
  } catch (err) {
    const origin = isFallback ? fallbackBase + file : mainBase + file;
    logError(err, origin, {
      type: err instanceof SyntaxError ? 'ParseError' : 'ModuleError'
    });
    showErrorToast(`⚠️ Error loading "${mode}"`);
    console.error(`Module load error in ${origin}:`, err);
  }
}

/**
 * Bind all mode buttons on page load
 */
function initMenuButtons() {
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (mode) navigateToMode(mode);
    });
  });
}

document.addEventListener('DOMContentLoaded', initMenuButtons);

