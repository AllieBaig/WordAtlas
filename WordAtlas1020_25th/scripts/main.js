// File: scripts/main.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { registerGlobalErrorHandlers } from './utils/errorHandler.js';
import { initFontSelector } from './utils/fontControls.js';
import { initSettingsPanel } from './utils/settings.js';
import { injectDebugTools } from './utils/debugTools.js';
import { versionMap } from './utils/version.js'; // <-- CHANGE THIS LINE: Import 'versionMap'

// Initialize error logging globally
registerGlobalErrorHandlers();

// File: scripts/main.js
// ...
//registerGlobalErrorHandlers();

// TEMPORARY: Force an error to test the log
// This will cause a ReferenceError because 'nonExistentVariable' is not defined
console.log(nonExistentVariable);

// Initialize user interface modules
// ... (rest of your code)

// Initialize user interface modules
initFontControls();
initSettingsPanel();

// Inject debug panel if "?debug" is in URL
if (location.search.includes('debug')) {
  injectDebugTools();
}

// Show version mode visually in footer
const footer = document.getElementById('verInfo');
if (footer) {
  const mode = localStorage.getItem('wordatlas-version') || 'v-latest';
  // CHANGE THIS LINE: Use 'versionMap.app' instead of 'appVersion'
  footer.textContent = `Mode: ${mode} | v${versionMap.app}`;
}
