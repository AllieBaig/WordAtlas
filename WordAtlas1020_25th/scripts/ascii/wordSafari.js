

// File: scripts/ascii/wordSafari.js
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
|           🦁 WORD SAFARI             |
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
<div id="safariResult" style="font-family: monospace; padding-top: 1rem;"></div>
  `;

  function get(id) {
    return (document.getElementById(id)?.value || '').trim().toLowerCase();
  }

  function checkAnswers() {
    const result = ['name', 'place', 'animal', 'thing'].map(type => {
      const user = get(type);
      const correct = clue.answerSet[type].toLowerCase();
      return user === correct
        ? `✅ ${type}: ${user}`
        : `❌ ${type}: ${user || '(blank)'} — Answer: ${correct}`;
    });

    document.getElementById('safariResult').innerHTML =
      `<h4>Results:</h4>${result.join('<br>')}<br>🦓 Safari Complete!`;
  }

  document.getElementById('submit')?.addEventListener('click', checkAnswers);
  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

