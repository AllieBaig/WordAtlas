

// File: scripts/ascii/trail.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
import { getDailyTrail } from '../utils/trailThemes.js';

export default function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  const { theme, letter, relic } = getDailyTrail();

  game.innerHTML = `
<pre>
+--------------------------------------------------+
|              🪄 TRAIL OF LETTERS                |
|                                                  |
| Theme: ${theme}                                    
| Letter: ${letter}                                     
|                                                  |
| Name:   <input id="name">                       |
| Place:  <input id="place">                      |
| Animal: <input id="animal">                     |
| Thing:  <input id="thing">                      |
|                                                  |
| <button id="submit">[SUBMIT]</button>               <button class="back-btn">[BACK]</button> |
+--------------------------------------------------+
</pre>
<div id="trailResult" style="font-family: monospace; padding-top: 1rem;"></div>
  `;

  function get(id) {
    return (document.getElementById(id)?.value || '').trim().toLowerCase();
  }

  function evaluate() {
    const entries = ['name', 'place', 'animal', 'thing'];
    const result = entries.map(type => {
      const ans = get(type);
      return ans.startsWith(letter.toLowerCase())
        ? `✅ ${type}: ${ans}`
        : `❌ ${type}: ${ans || '(blank)'} — Must start with "${letter}"`;
    });

    const extra = relic ? `<br>🏺 You found: ${relic}` : '';
    document.getElementById('trailResult').innerHTML =
      `<h4>Trail Complete!</h4>${result.join('<br>')}${extra}`;
  }

  document.getElementById('submit')?.addEventListener('click', evaluate);
  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

