
// File: scripts/gameNavigation.js
// Features:
// - Main controller for navigation and UI state
// - Uses modeLoader, errorUI, and modeMap modules
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { showError } from './utils/errorUI.js';
import { modeMap } from './utils/modeMap.js';
import { loadGameMode } from './utils/modeLoader.js';

export function showMenu() {
  document.getElementById('menu')?.classList.add('active');
  const game = document.getElementById('game');
  if (game) {
    game.classList.remove('active');
    game.innerHTML = '';
  }
  document.getElementById('mode-error-box')?.remove();
}

export async function navigateToMode(mode) {
  if (!modeMap[mode]) {
    showError(`Unknown mode "${mode}"`);
    return;
  }
  await loadGameMode(modeMap[mode], showMenu);
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game');
  if (container) container.classList.add('game-container');

  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      navigateToMode(mode);
    });
  });
});
