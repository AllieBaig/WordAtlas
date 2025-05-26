

// File: scripts/ascii/wordRelic.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
import { getClueSet } from '../utils/clues.js';

export default function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  const clue = getClueSet();

  game.innerHTML = `
<pre>
+--------------------------------------+
|             🏺 WORD RELIC            |
|                                      |
| Clue: ${clue.clue}                   
|                                      |
| Name:   <input id="name">           |
| Place:  <input id="place">          |
| Animal: <input id="animal">         |
| Thing:  <input id="thing">          |
|                                      |
| <button id="submit">[SUBMIT]</button>   <button class="back-btn">[BACK]</button> |
+--------------------------------------+
</pre>
<div id="relicFeedback" style="font-family: monospace; padding-top: 1rem;"></div>
  `;

  function get(id) {
    return (document.getElementById(id)?.value || '').trim().toLowerCase();
  }

  function evaluate() {
    const fields = ['name', 'place', 'animal', 'thing'];
    const results = fields.map(field => {
      const user = get(field);
      const correct = clue.answerSet[field].toLowerCase();
      return user === correct
        ? `✅ ${field}: ${user}`
        : `❌ ${field}: ${user || '(blank)'} — Answer: ${correct}`;
    });
    document.getElementById('relicFeedback').innerHTML =
      `<h4>Results:</h4>${results.join('<br>')}<br>🧩 Relic Restored!`;
  }

  document.getElementById('submit')?.addEventListener('click', evaluate);
  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

