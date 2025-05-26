
// File: scripts/modes/regular.js
// Features:
// - Basic Solo Mode
// - Input for Name, Place, Animal, Thing
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.classList.add('active');
  document.getElementById('menu')?.classList.remove('active');

  game.innerHTML = `
    <h2>🧠 Solo Mode</h2>
    <p>Give answers starting with today's letter:</p>
    <ul>
      <li>Name: <input /></li>
      <li>Place: <input /></li>
      <li>Animal: <input /></li>
      <li>Thing: <input /></li>
    </ul>
    <button id="backToMenu">🔙 Back</button>
  `;

  document.getElementById('backToMenu')?.addEventListener('click', showMenu);
}

