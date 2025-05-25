
// File: scripts/main.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { bindGameButtons } from './utils/eventBinder.js';
import { initSettings } from './utils/settings.js';
import { applyFontScaling } from './utils/fontControls.js';
import { togglePanel, showGameOnly } from './utils/menuVisibility.js';
import { initVersionToggle } from './utils/version.js';
import { showErrorToast } from './utils/errorUI.js';

const scriptBase = './scripts/';
const fallbackBase = './Site1/scripts/';
let isFallback = false;

/**
 * Attempts to dynamically import a script, with fallback to Site1
 */
async function loadSafe(path) {
  try {
    return await import(scriptBase + path);
  } catch (e) {
    console.warn(`⚠️ Failed: ${path} from ${scriptBase}, retrying Site1...`);
    isFallback = true;
    try {
      return await import(fallbackBase + path);
    } catch (err) {
      console.error(`❌ Failed to load: ${path}`, err);
      showErrorToast(`Failed to load ${path}`);
      throw err;
    }
  }
}

/**
 * Application startup logic
 */
async function initApp() {
  try {
    const [
      { default: initNavigation },
      { initSettingsPanel }
    ] = await Promise.all([
      loadSafe('gameNavigation.js'),
      loadSafe('utils/settings.js')
    ]);

    initNavigation();             // Load game modes + buttons
    initSettingsPanel();         // Render user settings UI
    bindGameButtons();           // Enable mode buttons
    initSettings();              // Apply saved settings
    applyFontScaling();          // Dynamic font scaling
    initVersionToggle();         // Display fallback badge if needed
    togglePanel('menu');         // Show main menu
  } catch (err) {
    console.error('❌ App failed to initialize.', err);
    showErrorToast('App init failed.');
  }
}

// Start app on DOM load
document.addEventListener('DOMContentLoaded', initApp);

