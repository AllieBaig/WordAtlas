

// File: scripts/ascii/versus.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
import { getRandomWord } from '../utils/randomizer.js';

export default function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  const categories = ['name', 'place', 'animal', 'thing'];
  const computerAnswers = {};
  categories.forEach(c => {
    computerAnswers[c] = getRandomWord(c); // Returns random string
  });

  game.innerHTML = `
<pre>
+--------------------------------------------------+
|           🤖 PLAY VS COMPUTER                    |
|                                                  |
| Your Turn:                                       |
| Name:   <input id="name">                       |
| Place:  <input id="place">                      |
| Animal: <input id="animal">                     |
| Thing:  <input id="thing">                      |
|                                                  |
| <button id="submit">[SUBMIT]</button>               <button class="back-btn">[BACK]</button> |
+--------------------------------------------------+
</pre>
<div id="versusResult" style="font-family: monospace; padding-top: 1rem;"></div>
  `;

  function get(id) {
    return (document.getElementById(id)?.value || '').trim().toLowerCase();
  }

  function evaluate() {
    const userAnswers = {};
    const feedback = [];

    categories.forEach(cat => {
      userAnswers[cat] = get(cat);
      feedback.push(`🧑 ${cat}: ${userAnswers[cat] || '(blank)'}`);
      feedback.push(`🤖 ${cat}: ${computerAnswers[cat]}`);
    });

    document.getElementById('versusResult').innerHTML =
      `<h4>Round Complete</h4>${feedback.join('<br>')}<br>🏆 Keep Playing!`;
  }

  document.getElementById('submit')?.addEventListener('click', evaluate);
  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

