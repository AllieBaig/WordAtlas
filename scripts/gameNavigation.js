// File: scripts/main.js
// Edited by Gemini
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { applyFontSettings } from './utils/fontControls.js';
import { applyUserSettings, initSettingsPanel } from './utils/settings.js';
import { trackVisit } from './utils/version.js';
// CHANGE THIS LINE: Import 'showMenu' from its actual source: menuVisibility.js
import { showMenu } from './utils/menuVisibility.js'; // <--- UPDATED IMPORT
import { updateVisibility } from './utils/menuVisibility.js'; // Already importing this for updateVisibility

// Note: gameNavigation.js itself exports navigateToMode, so we still need that:
import { navigateToMode } from './gameNavigation.js';


document.addEventListener('DOMContentLoaded', () => {
  try {
    // Theme from localStorage (light/dark/system)
    applyUserSettings();

    // Font scaling from settings
    applyFontSettings();

    // Initialize settings panel (e.g., version toggle).
    const settingsPanelElement = document.getElementById('settingsPanel') || document.getElementById('settings-panel');
    if (settingsPanelElement) {
        initSettingsPanel(settingsPanelElement);
    } else {
        console.warn("Settings panel element not found for initialization in main.js. Some settings features may not work.");
    }

    // Show menu after cleanup
    // showMenu() is now correctly imported from menuVisibility.js
    updateVisibility(true); // Assuming this is also from menuVisibility.js
    showMenu(); // <--- This call should now work if menuVisibility.js exports it

    // Version tracking
    trackVisit();
  } catch (err) {
    console.error('💥 Error during main.js init:', err);
  }
});
