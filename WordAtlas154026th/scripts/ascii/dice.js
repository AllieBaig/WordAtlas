

// File: scripts/ascii/dice.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';

export default function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  const alphabet = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const clue = `Give words starting with "${alphabet}"`;

  game.innerHTML = `
<pre>
+------------------------------------------+
|            🎲 DICE CHALLENGE             |
|                                          |
| Letter Rolled: ${alphabet}                       
|                                          |
| Name:   <input id="name">               |
| Place:  <input id="place">              |
| Animal: <input id="animal">             |
| Thing:  <input id="thing">              |
|                                          |
| <button id="submit">[SUBMIT]</button>       <button class="back-btn">[BACK]</button> |
+------------------------------------------+
</pre>
<div id="diceResult" style="font-family: monospace; padding-top: 1rem;"></div>
  `;

  function get(id) {
    return (document.getElementById(id)?.value || '').trim().toLowerCase();
  }

  function check() {
    const results = ['name', 'place', 'animal', 'thing'].map(type => {
      const word = get(type);
      return word.startsWith(alphabet.toLowerCase())
        ? `✅ ${type}: ${word}`
        : `❌ ${type}: ${word || '(blank)'} — Must start with "${alphabet}"`;
    });

    document.getElementById('diceResult').innerHTML =
      `<h4>Results:</h4>${results.join('<br>')}<br>🎉 Challenge Done!`;
  }

  document.getElementById('submit')?.addEventListener('click', check);
  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}
