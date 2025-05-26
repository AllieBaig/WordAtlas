// Timestamp: 2025-05-27 17:35
// File: scripts/main.js
// Edited by Gemini (Adapted to new toggle APIs, re-added missing features)
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Main App Loader
 * Initializes UI toggles, settings/tools, easyMode, and resume-last-mode support.
 * Also logs time taken from page load to interactive mode.
 */

// --- Essential Core App Initializations ---
// NOTE: All imports are now consistent with the latest files provided/fixed.
import { applyUserSettings, initSettingsPanel, toggleSettingsPanel, toggleEasyMode } from './utils/settings.js';
import { applyFontScaling } from './utils/fontControls.js';
import { initVersionToggle } from './utils/version.js';
import { initDebugTools, toggleToolsPanel } from './utils/debugTools.js'; // Changed injectDebugTools to initDebugTools
import { bindGameButtons } from './utils/eventBinder.js'; // bindEvent not directly used in main.js now
import initNavigation, { getLastMode, navigateToMode } from './gameNavigation.js';
import { registerGlobalErrorHandlers } from './utils/errorHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const startTime = performance.now();

  // Initialize error logging globally
  registerGlobalErrorHandlers();

  // 1. Apply saved user settings (font, theme, contrast)
  applyUserSettings();

  // 2. Apply font scaling based on user settings
  applyFontScaling();

  // 3. Initialize app version mode toggle (in footer)
  initVersionToggle();

  // 4. Initialize debug tools panel (if `?debug` is in URL)
  initDebugTools(); // Initialize the panel content and internal listeners

  // 5. Initialize main game navigation (ensures game container exists if needed)
  initNavigation();

  // 6. Initialize settings panel content and its internal listeners
  // This needs to be called after settingsPanel element is in DOM, and before its toggle is used.
  initSettingsPanel();


  // --- Bind UI Toggle Logic ---

  // Footer buttons to toggle panels (using new toggle functions)
  document.getElementById('toggleSettings')?.addEventListener('click', toggleSettingsPanel);
  document.getElementById('toggleTools')?.addEventListener('click', toggleToolsPanel);

  // Easy Mode toggle in footer
  const easyToggleFooter = document.getElementById('easyToggle');
  if (easyToggleFooter) {
    easyToggleFooter.checked = localStorage.getItem('easyMode') === 'true'; // Set initial state
    easyToggleFooter.addEventListener('change', toggleEasyMode); // Pass event object to toggleEasyMode
  }

  // Bind main game menu buttons (this also handles showing/hiding menu and navigating to modes)
  bindGameButtons();

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

// 🌐 Language selector handling
  const langSelector = document.getElementById('langSelect');
  if (langSelector) {
    langSelector.value = localStorage.getItem('lang') || 'en';

    langSelector.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      localStorage.setItem('lang', selectedLang);
      location.reload(); // Refresh to apply language-specific script
    });
  }
//});


