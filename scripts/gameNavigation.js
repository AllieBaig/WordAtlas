// File: scripts/gameNavigation.js
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { modeMap } from './utils/modeMap.js';
import { loadGameMode } from './utils/modeLoader.js';
import { showMenu } from './utils/menuVisibility.js';
import { showError } from './utils/errorUI.js';

export function navigateToMode(mode) {
  const file = modeMap[mode];
  if (!file) return showError(`Unknown mode: ${mode}`);
  loadGameMode(file, showMenu);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      navigateToMode(mode);
    });
  });
});
