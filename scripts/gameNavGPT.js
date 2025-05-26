/**
 * Handles navigation between game modes and main menu screen.
 * Dynamically imports mode scripts with language-based resolution.
 * Used by: main.js to resume last mode on startup.
 * Related: errorUI.js, settings.js, regular-xx.js mode files.
 * Handles ES module default/init fallback and shows error if loading fails.
 * MIT License: https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE
 * Timestamp: 2025-05-27 19:05 | File: scripts/gameNavigation.js
 */

import { showErrorToast } from './utils/errorUI.js';

const currentLang = localStorage.getItem('lang') || 'en';

const modeMap = {
  regular: `./modes/regular${currentLang === 'en' ? '' : '-' + currentLang}.js`,
  wordRelic: './modes/wordRelic.js',
  wordSafari: './modes/wordSafari.js',
  dice: './modes/dice.js',
  atlas: './modes/atlas.js',
  trail: './modes/trail.js',
  versus: './modes/versus.js',
  nearby: './modes/nearby.js',
  mixlingo: './modes/mixlingo.js'
};

export function showMenu() {
  const menu = document.getElementById('menu');
  const game = document.getElementById('game');
  if (menu) menu.classList.add('active');
  if (game) {
    game.classList.remove('active');
    game.innerHTML = '';
  }
  document.body.classList.remove('in-game');
}

export async function navigateToMode(mode) {
  const modulePath = modeMap[mode];
  if (!modulePath) {
    showErrorToast(`Unknown mode: ${mode}`);
    return;
  }

  try {
    const mod = await import(modulePath);
    const init = mod.init || mod.default;
    if (typeof init === 'function') {
      document.getElementById('menu')?.classList.remove('active');
      document.getElementById('game')?.classList.add('active');
      document.body.classList.add('in-game');
      localStorage.setItem('lastMode', mode);
      init({ showMenu });
    } else {
      showErrorToast(`⚠️ Module loaded but no valid init() in ${mode}`);
    }
  } catch (err) {
    console.error(`❌ Failed to load: ${modulePath}`, err);
    showErrorToast(`❌ Failed to load "${mode}". Check script or retry.`);
  }
}

export function getLastMode() {
  return localStorage.getItem('lastMode');
}

export default function initNavigation() {
  const buttons = document.querySelectorAll('.menu-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (mode) navigateToMode(mode);
    });
  });
}
