// File: Site1/scripts/gameNavigation.js
// Fix: Ensure menu buttons work during fallback mode
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { modeMap } from '../utils/modeMap.js';
import { loadGameMode } from '../utils/modeLoader.js';
import { showMenu } from '../utils/menuVisibility.js';
import { showError } from '../utils/errorUI.js';

export function navigateToMode(mode) {
  const scriptFile = modeMap[mode];
  if (!scriptFile) {
    showError(`Unknown mode: "${mode}"`);
    return;
  }

  console.log(`🟡 Attempting to load mode: ${mode}`);
  loadGameMode(scriptFile, showMenu);
}

document.addEventListener('DOMContentLoaded', () => {
  const menuButtons = document.querySelectorAll('.menu-btn');
  if (!menuButtons.length) {
    console.warn('No .menu-btn found in DOM.');
    return;
  }

  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (!mode) return;
      console.log(`🔘 Button clicked: ${mode}`);
      navigateToMode(mode);
    });
  });

  console.log('✅ Site1 fallback gameNavigation.js initialized.');
});
