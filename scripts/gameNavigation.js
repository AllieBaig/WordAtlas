

// File: scripts/gameNavigation.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu, showMenu } from './utils/menuVisibility.js';
import { logError, logModuleImportFailure } from './utils/errorHandler.js';

const asciiMode = localStorage.getItem('asciiMode') === 'true';

const modeMap = {
  regular: asciiMode ? './ascii/regular.js' : './modes/regular.js',
  wordRelic: asciiMode ? './ascii/wordRelic.js' : './modes/wordRelic.js',
  wordSafari: asciiMode ? './ascii/wordSafari.js' : './modes/wordSafari.js',
  dice: asciiMode ? './ascii/dice.js' : './modes/dice.js',
  atlas: asciiMode ? './ascii/atlas.js' : './modes/atlas.js',
  trail: asciiMode ? './ascii/trail.js' : './modes/trail.js',
  versus: asciiMode ? './ascii/versus.js' : './modes/versus.js',
  nearby: asciiMode ? './ascii/nearby.js' : './modes/nearby.js',
  mixlingo: asciiMode ? './ascii/mixlingo.js' : './modes/mixlingo.js'
};

export async function navigateToMode(mode) {
  const modulePath = modeMap[mode];

  if (!modulePath) {
    logError('Navigation', `Invalid game mode: ${mode}`, location.href);
    return alert(`Unknown mode: ${mode}`);
  }

  try {
    const mod = await import(modulePath);
    if (typeof mod.init !== 'function') {
      logModuleImportFailure(modulePath, 'init');
      return alert(`⚠️ "${mode}" module loaded but has no export named "init"`);
    }
    mod.init({ showMenu });
  } catch (err) {
    logError('ModuleLoad', err.message, modulePath);
    alert(`⚠️ Failed to load "${mode}" mode. See error log.`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game');
  const buttons = document.querySelectorAll('.menu-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      navigateToMode(mode);
    });
  });

  if (!gameContainer) {
    const div = document.createElement('section');
    div.id = 'game';
    div.className = 'game-container';
    document.body.appendChild(div);
  }
});

