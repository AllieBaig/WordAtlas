// Timestamp: 2025-05-27 17:35
// File: scripts/main.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { applyUserSettings, toggleSettingsPanel, toggleEasyMode } from './utils/settings.js';
import { toggleToolsPanel } from './utils/debugTools.js';
import { applyFontScaling } from './utils/fontControls.js';
import { initSettingsPanel } from './utils/settings.js';
import { bindGameButtons } from './utils/eventBinder.js';

export function init() {
  applyUserSettings();
  applyFontScaling();
  initSettingsPanel();
  bindGameButtons(); // enable mode buttons

  // Footer buttons
  document.getElementById('toggleSettings')?.addEventListener('click', toggleSettingsPanel);
  document.getElementById('toggleTools')?.addEventListener('click', toggleToolsPanel);
  document.getElementById('toggleEasyMode')?.addEventListener('click', toggleEasyMode);
}
