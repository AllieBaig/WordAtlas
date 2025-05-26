// File: scripts/utils/menuVisibility.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

// Show the main menu and hide the game screen
export function showMenu() {
  document.getElementById('menu')?.classList.add('active');
  document.getElementById('game')?.classList.remove('active');
}

// Hide the menu and show the game screen
export function hideMenu() {
  document.getElementById('menu')?.classList.remove('active');
  document.getElementById('game')?.classList.add('active');
}
