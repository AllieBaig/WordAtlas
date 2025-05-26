

// File: scripts/modes/nearby.js
// Features:
// - Get user location with consent
// - Show basic map and radius
// - Simulate nearby word challenges
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { showGame } from '../utils/menuVisibility.js';
import { getLocation } from '../utils/location.js';
import { loadStaticMap } from '../utils/mapUtils.js';
import { bind, clearAllBindings } from '../utils/eventBinder.js';
import { randomLetter } from '../utils/randomizer.js';

export default async function init({ showMenu }) {
  clearAllBindings();
  showGame();

  const game = document.getElementById('game');
  game.innerHTML = `<p>📍 Getting your location...</p>`;

  try {
    const coords = await getLocation();
    const letter = randomLetter();
    const categories = ['Name', 'Place', 'Animal', 'Thing'];
    const mapHTML = loadStaticMap(coords.lat, coords.lng, 5000);

    game.innerHTML = `
      <h2>📍 Play Nearby</h2>
      <p>Find local players and complete this challenge!</p>
      ${mapHTML}
      <p><strong>Letter:</strong> ${letter}</p>
      <ul>
        ${categories.map(cat => `<li>${cat}: <input placeholder="${cat}" /></li>`).join('')}
      </ul>
      <button id="submitNearby">Submit</button>
      <button id="backToMenu">🔙 Back</button>
    `;

    bind(document.getElementById('submitNearby'), 'click', () => {
      alert('✅ Challenge submitted!');
    });

    bind(document.getElementById('backToMenu'), 'click', () => {
      clearAllBindings();
      showMenu();
    });

  } catch (err) {
    game.innerHTML = `<p>❌ Location not available. Please allow GPS access.</p>
    <button id="backToMenu">🔙 Back</button>`;
    bind(document.getElementById('backToMenu'), 'click', showMenu);
  }
}

