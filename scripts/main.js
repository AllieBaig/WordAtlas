// File: scripts/main.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { registerGlobalErrorHandlers } from './utils/errorHandler.js';
import { initFontSelector } from './utils/fontControls.js';
import { applyUserSettings, initSettingsPanel } from './utils/settings.js'; // Changed 'initSettings' to 'applyUserSettings'
//import { initSettingsPanel } from './utils/settings.js';
import { injectDebugTools } from './utils/debugTools.js';
import { versionMap } from './utils/version.js';

// Initialize global error logging
registerGlobalErrorHandlers();

// Initialize interface modules
initFontSelector();
initSettingsPanel();

// Inject debug panel if "?debug" is in the URL
injectDebugTools(); // internally checks for ?debug

// Optionally force test error (for development only)
// console.log(nonExistentVariable); // Uncomment only when testing

// Display version info in footer (optional visual mode indicator)
const footer = document.getElementById('verInfo');
if (footer) {
  const mode = localStorage.getItem('wordatlas-version') || 'v-latest';
  footer.textContent = `Mode: ${mode} | v${versionMap.app || '1.0'}`;
}
