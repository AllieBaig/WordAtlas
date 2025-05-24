// File: scripts/modes/regular.js
// Solo Mode: basic input display and back button
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

export default function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.classList.add('active');
  document.getElementById('menu')?.classList.remove('active');

  game.innerHTML = `
    <h2>🧠 Solo Mode</h2>
    <p>Enter a word for each category:</p>
    <ul>
      <li>Name: <input type="text" /></li>
      <li>Place: <input type="text" /></li>
      <li>Animal: <input type="text" /></li>
      <li>Thing: <input type="text" /></li>
    </ul>
    <button id="submitRegular">Submit</button>
    <button id="backToMenu">🔙 Back to Menu</button>
  `;

  document.getElementById('backToMenu')?.addEventListener('click', showMenu);
}

