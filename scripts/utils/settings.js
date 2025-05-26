// File: scripts/main.js
// Edited by Gemini (Consolidated to match user's NEW settings.js and preserve other fixes)
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Main App Loader
 * Initializes UI toggles, settings/tools, easyMode, and resume-last-mode support.
 * Also logs time taken from page load to interactive mode.
 */

// --- Essential Core App Initializations ---
// These functions apply saved settings, initialize UI components, and bind core events.
// NOTE: Imports and calls related to settings are adjusted based on your latest settings.js
import { getSettings, injectSettingsPanel, setFont, toggleEasyMode } from './utils/settings.js'; // Updated imports from settings.js
import { applyFontScaling } from './utils/fontControls.js'; // Assumed still needed and functional
import { initVersionToggle } from './utils/version.js'; // Assumed still needed and functional
import { injectDebugTools } from './utils/debugTools.js'; // Assumed still needed and functional
import { bindGameButtons, bindEvent } from './utils/eventBinder.js'; // Assumed still needed and functional
import initNavigation, { getLastMode, navigateToMode } from './gameNavigation.js'; // Assumed still needed and functional

// No direct import for showErrorToast here if it's primarily used by other modules (as per your structure).

document.addEventListener('DOMContentLoaded', () => {
  const startTime = performance.now();

  // 1. Get initial settings (from user's new settings.js)
  const initialSettings = getSettings();

  // 2. Apply initial font setting
  setFont(initialSettings.font); // Uses the setFont from your new settings.js

  // 3. Apply easy mode class to body based on initial setting
  document.body.classList.toggle('easy-mode', initialSettings.easyMode);

  // 4. Apply font scaling (from fontControls.js)
  applyFontScaling(); // This assumes applyFontScaling from fontControls.js works alongside setFont.

  // 5. Initialize app version mode toggle (in footer)
  initVersionToggle();

  // 6. Initialize debug tools panel (if `?debug` is in URL)
  // This function *creates* the panel and appends it to the body.
  injectDebugTools();

  // 7. Initialize main game navigation (ensures game container exists if needed)
  initNavigation();

  // 8. Bind main game menu buttons
  bindGameButtons();

  // --- User's Specific UI Toggle Logic (Integrated and Corrected) ---

  // Easy Mode toggle in footer
  const easyToggle = document.getElementById('easyToggle');
  if (easyToggle) {
    easyToggle.checked = initialSettings.easyMode; // Set initial state from settings
    bindEvent(easyToggle, 'change', (e) => {
      toggleEasyMode(e.target.checked);
      // Re-apply easy mode class to body, as toggleEasyMode in settings.js only saves to localStorage
      document.body.classList.toggle('easy-mode', e.target.checked);
    });
  }

  // Toggle Settings panel
  const settingsBtn = document.getElementById('toggleSettings'); // Assuming you have this button in index.html
  const settingsPanel = document.getElementById('settingsPanel');
  if (settingsBtn && settingsPanel) {
    bindEvent(settingsBtn, 'click', () => {
      settingsPanel.classList.toggle('hidden');
      // Call injectSettingsPanel. This function handles setting innerHTML and binding events.
      // Since it recreates innerHTML each time, no 'initialized' check is strictly needed for its core function.
      injectSettingsPanel(); // No argument needed as per your latest settings.js
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

