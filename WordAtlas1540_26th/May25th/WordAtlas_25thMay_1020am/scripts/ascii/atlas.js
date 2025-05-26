

// File: scripts/ascii/atlas.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
import { getDailyPrompt } from '../utils/dailyPrompt.js';

export default function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  const prompt = getDailyPrompt(); // e.g., { letter: 'M', theme: 'Mountains' }

  game.innerHTML = `
<pre>
+---------------------------------------------+
|               🗺️ WORD ATLAS                |
|                                             |
| Theme: ${prompt.theme}                         
| Letter of the Day: ${prompt.letter}             
|                                             |
| Place: <input id="place">                  |
| Definition: <input id="def">               |
|                                             |
| <button id="submit">[SUBMIT]</button>           <button class="back-btn">[BACK]</button> |
+---------------------------------------------+
</pre>
<div id="atlasResult" style="font-family: monospace; padding-top: 1rem;"></div>
  `;

  function get(id) {
    return (document.getElementById(id)?.value || '').trim();
  }

  function check() {
    const place = get('place');
    const def = get('def');

    const feedback = [];

    if (place.toLowerCase().startsWith(prompt.letter.toLowerCase())) {
      feedback.push(`✅ Place: ${place}`);
    } else {
      feedback.push(`❌ Place must start with "${prompt.letter}"`);
    }

    feedback.push(def ? `✅ Definition: ${def}` : `❌ Missing definition`);

    document.getElementById('atlasResult').innerHTML = feedback.join('<br>') + '<br>🌍 Nicely done!';
  }

  document.getElementById('submit')?.addEventListener('click', check);
  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

