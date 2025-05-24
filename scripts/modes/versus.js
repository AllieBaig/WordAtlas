// File: scripts/modes/versus.js
// Features:
// - Player vs Computer in classic N-P-A-T challenge
// - Both sides use same random letter
// - Shows input for user, emoji answers for computer
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { showGame } from '../utils/menuVisibility.js';
import { randomLetter } from '../utils/randomizer.js';
import { bind, clearAllBindings } from '../utils/eventBinder.js';
import { logGameSession } from '../utils/statsTracker.js';

const categories = ['Name', 'Place', 'Animal', 'Thing'];

const dummyAnswers = {
  Name: ['Alice', 'Bob', 'Mira', 'Zane'],
  Place: ['Paris', 'Delhi', 'Mars', 'Zoo'],
  Animal: ['Lion', 'Ant', 'Zebra', 'Otter'],
  Thing: ['Ring', 'Net', 'Pen', 'Umbrella']
};

export default function init({ showMenu }) {
  clearAllBindings();
  showGame();

  const game = document.getElementById('game');
  const letter = randomLetter();

  const inputs = categories.map(cat => `
    <tr>
      <td>${cat}</td>
      <td><input name="${cat}" placeholder="Your answer..." /></td>
      <td class="ai-answer" data-cat="${cat}">🤖</td>
    </tr>
  `).join('');

  game.innerHTML = `
    <h2>🤖 Play vs Computer</h2>
    <p>Give words starting with: <strong>${letter}</strong></p>
    <table>
      <thead><tr><th>Category</th><th>You</th><th>Computer</th></tr></thead>
      <tbody>${inputs}</tbody>
    </table>
    <button id="submitVs">Submit</button>
    <button id="backToMenu">🔙 Back</button>
  `;

  bind(document.getElementById('submitVs'), 'click', () => {
    const time = Date.now();
    const emojiSet = ['⚔️', '🎯', '🏆', '📚'];

    categories.forEach(cat => {
      const aiEl = document.querySelector(`.ai-answer[data-cat="${cat}"]`);
      const compWord = dummyAnswers[cat].find(w => w.startsWith(letter)) || '—';
      aiEl.textContent = compWord;
    });

    logGameSession({
      mode: 'versus',
      emoji: '🤖',
      startTime: time,
      endTime: Date.now()
    });
  });

  bind(document.getElementById('backToMenu'), 'click', () => {
    clearAllBindings();
    showMenu();
  });
}

