
// 25th 7:10

// File: scripts/main.js
// Edited by Gemini (Consolidated user's new logic with all essential initializations)
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Main App Loader
 * Initializes UI toggles, settings/tools, easyMode, and resume-last-mode support.
 * Also logs time taken from page load to interactive mode.
 */





///////////////

// GPT file
//import { toggleEasyMode } from './utils/settings.js';
//import { injectToolsPanel } from './utils/debugTools.js';
//import { injectSettingsPanel } from './utils/settings.js';
//import { bindEvent } from './utils/eventBinder.js';
//import { getLastMode, navigateToMode } from './gameNavigation.js';


/////////////////////////
// --- Essential Core App Initializations ---
// These functions apply saved settings, initialize UI components, and bind core events.
import { applyUserSettings, initSettingsPanel, toggleEasyMode } from './utils/settings.js';
import { applyFontScaling } from './utils/fontControls.js';
import { initVersionToggle } from './utils/version.js';
import { injectDebugTools } from './utils/debugTools.js'; // Corrected import name
import { bindGameButtons, bindEvent } from './utils/eventBinder.js';
import initNavigation, { getLastMode, navigateToMode } from './gameNavigation.js'; // Default import for initNavigation

// No direct import for showErrorToast here if it's primarily used by other modules.
// If main.js directly uses it, uncomment:
// import { showErrorToast } from './utils/errorUI.js';

document.addEventListener('DOMContentLoaded', () => {
  const startTime = performance.now();

  // added by Allie only global error
  // Initialize error logging globally
  registerGlobalErrorHandlers();

  // 1. Apply saved user settings (font, theme, contrast)
  applyUserSettings();

  // 2. Apply font scaling based on user settings
  applyFontScaling(); // This might need a mode argument depending on your font strategy (e.g., 'global')

  // 3. Initialize app version mode toggle (in footer)
  initVersionToggle();

  // 4. Initialize debug tools panel (if `?debug` is in URL)
  // This function *creates* the panel and appends it to the body.
  injectDebugTools();

  // 5. Initialize main game navigation (ensures game container exists if needed)
  // The menu button binding is now handled by bindGameButtons.
  initNavigation();

  // 6. Bind main game menu buttons
  bindGameButtons();

  // --- User's Specific UI Toggle Logic (Integrated and Corrected) ---

  // Easy Mode toggle
  const easyToggle = document.getElementById('easyToggle');
  if (easyToggle) {
    const saved = localStorage.getItem('easyMode') === 'true';
    easyToggle.checked = saved;
    bindEvent(easyToggle, 'change', (e) => {
      toggleEasyMode(e.target.checked);
    });
  }

  // Toggle Settings panel
  const settingsBtn = document.getElementById('toggleSettings'); // Assuming you have this button in index.html
  const settingsPanel = document.getElementById('settingsPanel');
  if (settingsBtn && settingsPanel) {
    bindEvent(settingsBtn, 'click', () => {
      settingsPanel.classList.toggle('hidden');
      // Initialize settings panel controls *when it's first shown* if not already.
      // This call needs the panel element.
      // Check if it's already initialized to prevent duplicates.
      if (!settingsPanel.dataset.initialized) { // Use a data attribute to track initialization
        initSettingsPanel(settingsPanel); // Corrected function name
        settingsPanel.dataset.initialized = 'true';
      }
    });
  }

  // Toggle Tools panel (This logic assumes injectDebugTools creates the panel once)
  const toolsBtn = document.getElementById('toggleTools'); // Assuming you have this button in index.html
  const toolsPanel = document.getElementById('toolsPanel'); // Assuming you have this panel in index.html
  if (toolsBtn && toolsPanel) {
    bindEvent(toolsBtn, 'click', () => {
      // The debug panel is created by injectDebugTools on load (if ?debug is present).
      // Here, we just toggle its visibility.
      toolsPanel.classList.toggle('hidden');
      // If you want toolsPanel to be injected by clicking this button regardless of ?debug,
      // injectDebugTools would need to be modified, or you'd need a separate injectToolsPanel export.
      // For now, assuming injectDebugTools already created it.
      // If it's not present (e.g., no ?debug), this will just toggle nothing.
    });
  }

  // Auto-resume last mode if available
  const last = getLastMode();
  if (last) {
    console.info(`🔁 Resuming last mode: ${last}`);
    navigateToMode(last);
  }

  // Log load time
  const loadTime = (performance.now() - startTime).toFixed(1);
  console.log(`⚡ WordAtlas UI loaded in ${loadTime}ms`);
});

import { toggleSettingsPanel } from './utils/settings.js';
import { toggleToolsPanel } from './utils/debugTools.js';

document.getElementById('toggleSettings')?.addEventListener('click', toggleSettingsPanel);
document.getElementById('toggleTools')?.addEventListener('click', toggleToolsPanel);



