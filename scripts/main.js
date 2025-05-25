// File: scripts/main.js
// Edited by Gemini
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { applyFontSettings } from './utils/fontControls.js';
// Changed import names from 'applyTheme' to 'applyUserSettings'
// and from 'initSettings' to 'initSettingsPanel'
import { applyUserSettings, initSettingsPanel } from './utils/settings.js'; // <--- UPDATED IMPORTS
import { trackVisit } from './utils/version.js';
import { showMenu, togglePanel } from './utils/menuVisibility.js';
import { updateVisibility } from './utils/menuVisibility.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Theme from localStorage (light/dark/system)
    applyUserSettings(); // <--- UPDATED FUNCTION CALL

    // Font scaling from settings
    applyFontSettings();

    // Initialize settings panel (e.g., version toggle).
    // It requires a DOM element for the settings panel.
    // We'll get the element using its ID from index.html.
    const settingsPanelElement = document.getElementById('settingsPanel') || document.getElementById('settings-panel');
    if (settingsPanelElement) {
        initSettingsPanel(settingsPanelElement); // <--- UPDATED FUNCTION CALL WITH ARGUMENT
    } else {
        console.warn("Settings panel element not found for initialization in main.js. Some settings features may not work.");
    }

    // Show menu after cleanup
    updateVisibility(true);
    showMenu();

    // Version tracking
    trackVisit();
  } catch (err) {
    console.error('💥 Error during main.js init:', err);
  }
});
