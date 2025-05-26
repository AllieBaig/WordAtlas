
// 25th, 07:10

// File: scripts/main.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Main App Loader
 * Initializes UI toggles, settings/tools, easyMode, and resume-last-mode support.
 * Also logs time taken from page load to interactive mode.
 */

import { toggleEasyMode } from './utils/settings.js';
import { injectToolsPanel } from './utils/debugTools.js';
import { injectSettingsPanel } from './utils/settings.js';
import { bindEvent } from './utils/eventBinder.js';
import { getLastMode, navigateToMode } from './gameNavigation.js';

document.addEventListener('DOMContentLoaded', () => {
  const startTime = performance.now();

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
  const settingsBtn = document.getElementById('toggleSettings');
  const settingsPanel = document.getElementById('settingsPanel');
  if (settingsBtn && settingsPanel) {
    bindEvent(settingsBtn, 'click', () => {
      settingsPanel.classList.toggle('hidden');
      injectSettingsPanel();
    });
  }

  // Toggle Tools panel
  const toolsBtn = document.getElementById('toggleTools');
  const toolsPanel = document.getElementById('toolsPanel');
  if (toolsBtn && toolsPanel) {
    bindEvent(toolsBtn, 'click', () => {
      toolsPanel.classList.toggle('hidden');
      injectToolsPanel();
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

