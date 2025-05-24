

// File: scripts/utils/menuVisibility.js
// Features:
// - Toggle visibility of the main menu and in-game screen
// - Ensures clean state between modes
// - Can be reused across all mode scripts
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Show the main menu and hide the game view
 */
export function showMenu() {
  document.getElementById('menu')?.classList.add('active');
  const game = document.getElementById('game');
  if (game) {
    game.classList.remove('active');
    game.innerHTML = '';
  }
  document.getElementById('mode-error-box')?.remove();
}

/**
 * Show the in-game view and hide the main menu
 */
export function showGame() {
  const game = document.getElementById('game');
  if (game) game.classList.add('active');
  document.getElementById('menu')?.classList.remove('active');
}

