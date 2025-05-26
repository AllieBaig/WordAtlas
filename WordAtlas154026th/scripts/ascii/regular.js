

// File: scripts/ascii/regular.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';

export default function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
<pre>
+--------------------------------------+
|            🧠 SOLO MODE              |
|                                      |
| Name:   <input id="name">           |
| Place:  <input id="place">          |
| Animal: <input id="animal">         |
| Thing:  <input id="thing">          |
|                                      |
| <button id="submit">[SUBMIT]</button>   <button class="back-btn">[BACK]</button> |
+--------------------------------------+
</pre>
<div id="result" style="font-family: monospace; padding-top: 1rem;"></div>
  `;

  function get(id) {
    return (document.getElementById(id)?.value || '').trim().toLowerCase();
  }

  function evaluate() {
    const fields = ['name', 'place', 'animal', 'thing'];
    const results = fields.map(field => {
      const val = get(field);
      return val ? `✅ ${field}: ${val}` : `❌ ${field}: (blank)`;
    });
    document.getElementById('result').innerHTML = results.join('<br>') + '<br>✨ Nice!';
  }

  document.getElementById('submit')?.addEventListener('click', evaluate);
  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

