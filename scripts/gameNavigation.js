// File: scripts/gameNavigation.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Game Navigation
 * Handles menu button clicks, mode switching, fallback import, and UI visibility.
 */

import { getSettings } from './utils/settings.js';
import { showErrorToast } from './utils/errorUI.js';
import { hideMenu, showMenu } from './utils/menuVisibility.js';
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
 * Safely import a mode module with fallback support.
 */
async function loadSafe(path) {
  const full = mainBase + path;
  const alt = fallbackBase + path;

  try {
    return await import(full);
  } catch (e) {
    console.warn(`⚠️ Failed: ${path} from ${mainBase}, retrying fallback...`);
    isFallback = true;
    try {
      return await import(alt);
    } catch (err) {
      console.error(`❌ Both failed for ${path}`, err);
      showErrorToast(`Failed to load: ${path}`);
      logError(err, path);
      throw err;
    }
  }
}

/**
 * Navigate to a game mode dynamically.
 */
export async function navigateToMode(mode) {
  const file = modeMap[mode];
  if (!file) {
    showErrorToast(`Unknown mode: ${mode}`);
    return;
  }

  try {
    const module = await loadSafe(file);
    if (typeof module?.default === 'function') {
      hideMenu();
      module.default({ showMenu });
    } else {
      showErrorToast(`Mode "${mode}" is invalid.`);
    }
  } catch (err) {
    console.error(`Module load failed: ${mode}`, err);
  }
}

/**
 * Bind all menu buttons on page load.
 */
function initButtons() {
  const buttons = document.querySelectorAll('.menu-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (mode) {
        navigateToMode(mode);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initButtons);
