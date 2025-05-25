// File: scripts/modes/wordRelic.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
import { getClueSet } from '../utils/clues.js';

export function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  const clues = getClueSet(); // returns { clue, answerSet: { name, place, animal, thing } }

  game.innerHTML = `
    <div class="mode-header">
      <button onclick="(${showMenu.toString()})()">⬅️ Back</button>
      <h2>🏺 Word Relic</h2>
    </div>
    <p><strong>Clue:</strong> ${clues.clue}</p>

    <form id="relicForm">
      <label>Name: <input type="text" name="name" required></label><br>
      <label>Place: <input type="text" name="place" required></label><br>
      <label>Animal: <input type="text" name="animal" required></label><br>
      <label>Thing: <input type="text" name="thing" required></label><br>
      <button type="submit">🔍 Submit Answers</button>
    </form>

    <div id="relicFeedback" style="margin-top:1rem;"></div>
  `;

  document.getElementById('relicForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const results = [];

    for (const key of ['name', 'place', 'animal', 'thing']) {
      const correct = clues.answerSet[key].toLowerCase();
      const userAns = (data[key] || '').toLowerCase();
      results.push({
        category: key,
        isCorrect: userAns === correct,
        correct,
        userAns
      });
    }

    const out = results.map(r =>
      r.isCorrect
        ? `✅ ${r.category}: ${r.userAns}`
        : `❌ ${r.category}: ${r.userAns || '(blank)'} — Answer: ${r.correct}`
    ).join('<br>');

    document.getElementById('relicFeedback').innerHTML = `
      <h4>Results:</h4>
      ${out}
      <p>🧩 Thanks for restoring this relic!</p>
    `;
  });
}

