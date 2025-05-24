// File: scripts/modes/wordSafari.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
import { getClueSet } from '../utils/clues.js';

export default function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  const clue = getClueSet(); // { clue, answerSet }

  game.innerHTML = `
    <div class="mode-header">
      <button onclick="(${showMenu.toString()})()">⬅️ Back</button>
      <h2>🦁 Word Safari</h2>
    </div>

    <p><strong>Clue:</strong> ${clue.clue}</p>
    <p>Type words that match Name, Place, Animal, Thing</p>

    <form id="safariForm">
      <label>Name: <input type="text" name="name" required></label><br>
      <label>Place: <input type="text" name="place" required></label><br>
      <label>Animal: <input type="text" name="animal" required></label><br>
      <label>Thing: <input type="text" name="thing" required></label><br>
      <button type="submit">✅ Submit</button>
    </form>

    <div id="safariResult" style="margin-top:1rem;"></div>
  `;

  document.getElementById('safariForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const feedback = [];

    for (const type of ['name', 'place', 'animal', 'thing']) {
      const user = (formData[type] || '').toLowerCase();
      const correct = clue.answerSet[type].toLowerCase();
      const pass = user === correct;

      feedback.push(
        pass
          ? `✅ ${type}: ${user}`
          : `❌ ${type}: ${user || '(blank)'} — Answer: ${correct}`
      );
    }

    document.getElementById('safariResult').innerHTML = `
      <h4>Results:</h4>
      ${feedback.join('<br>')}
    `;
  });
}

