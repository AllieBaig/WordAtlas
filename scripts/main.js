// File: scripts/main.js
// Edited by Gemini (FINAL CONSOLIDATED FIXES)
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { applyFontSettings } from './utils/fontControls.js';
import { applyUserSettings, initSettingsPanel } from './utils/settings.js';
import { trackVisit } from './utils/version.js';
// THIS IS THE CRUCIAL LINE: showMenu and togglePanel come from menuVisibility.js
import { showMenu, togglePanel } from './utils/menuVisibility.js'; 

// navigateToMode is exported by gameNavigation.js
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

    // showMenu() is now correctly imported from menuVisibility.js
    // Removed updateVisibility(true); as it's not exported by menuVisibility.js and showMenu() serves a similar purpose.
    showMenu(); // This should now work correctly.

    // Version tracking
    trackVisit(); 

  } catch (err) {
    console.error('💥 Error during main.js init:', err);
  }
});
