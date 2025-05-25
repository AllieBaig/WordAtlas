// File: scripts/main.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { applyFontSettings } from './utils/fontControls.js';
import { applyTheme, initSettings } from './utils/settings.js';
import { trackVisit } from './utils/version.js';
import { showMenu } from './gameNavigation.js';
import { updateVisibility } from './utils/menuVisibility.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Theme from localStorage (light/dark/system)
    applyTheme();

    // Font scaling from settings
    applyFontSettings();

    // Initialize font slider, theme & difficulty toggles
    initSettings();

    // Show menu after cleanup
    updateVisibility(true);
    showMenu();

    // Version tracking
    trackVisit();
  } catch (err) {
    console.error('💥 Error during main.js init:', err);
  }
});

