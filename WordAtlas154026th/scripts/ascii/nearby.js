

// File: scripts/ascii/nearby.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
import { getUserLocation } from '../utils/location.js';
import { simulateNearbyPlayers } from '../utils/nearbySim.js';

export default async function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `<pre>📍 Fetching nearby data...</pre>`;

  try {
    const location = await getUserLocation();
    const players = simulateNearbyPlayers(location, 5); // returns array of mock users

    const playersText = players.map((p, i) => 
      `#${i + 1} ${p.nickname} (${p.distance} km) - ${p.lastWord || 'waiting...'}`).join('\n');

    game.innerHTML = `
<pre>
+-----------------------------------------------------+
|              📍 PLAY NEARBY                         |
|                                                     |
| Location found: ${location.city}, ${location.country}    
| Nearby players:                                     |
|                                                     |
${playersText.padEnd(2)}
|                                                     |
| <button class="back-btn">[BACK]</button>                 |
+-----------------------------------------------------+
</pre>
    `;
  } catch (err) {
    game.innerHTML = `
<pre>
+--------------------------------------------------+
|          ❌ LOCATION ACCESS DENIED               |
| Please allow location to see nearby players.     |
|                                                  |
| <button class="back-btn">[BACK]</button>              |
+--------------------------------------------------+
</pre>`;
  }

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

