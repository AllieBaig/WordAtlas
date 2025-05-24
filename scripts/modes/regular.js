export default function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
    <h2>🧠 Solo Mode</h2>
    <p>Enter something for each category:</p>
    <ul>
      <li>Name: <input /></li>
      <li>Place: <input /></li>
      <li>Animal: <input /></li>
      <li>Thing: <input /></li>
    </ul>
    <button id="back">🔙 Back</button>
  `;

  document.getElementById('back')?.addEventListener('click', showMenu);
}

