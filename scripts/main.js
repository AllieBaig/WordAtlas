// File: scripts/main.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { applyFontSettings } from './utils/fontControls.js';
import { applyTheme } from './utils/settings.js';
import { trackVisit } from './utils/version.js';
import { showMenu } from './gameNavigation.js';
import { updateVisibility } from './utils/menuVisibility.js';
import { initSettings } from './utils/settings.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    applyTheme();              // Apply light/dark/system theme
    applyFontSettings();       // Load and apply user font preference
    updateVisibility(true);    // Ensure game menu is shown at load
    initSettings();            // Load saved settings
    showMenu();                // Show main mode selection menu
    trackVisit();              // Log version/date visit
  } catch (err) {
    console.error('Main init error:', err);
  }
});

