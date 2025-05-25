

// File: scripts/modes/nearby.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
import { getUserLocation } from '../utils/location.js';
import { simulateNearbyPlayers } from '../utils/nearbySim.js';

export async function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `<p>📍 Fetching location...</p>`;

  try {
    const location = await getUserLocation();
    const players = simulateNearbyPlayers(location, 5);

    const list = players.map(player => `
      <li>
        <strong>${player.nickname}</strong> 
        (${player.distance} km) – <em>${player.lastWord || 'Waiting...'}</em>
      </li>
    `).join('');

    game.innerHTML = `
      <h2>📍 Nearby Players</h2>
      <p>Location: ${location.city}, ${location.country}</p>
      <ul>${list}</ul>
      <div class="mode-footer" style="text-align:center; margin-top:2rem;">
        <button class="back-btn">⬅️ Back to Menu</button>
      </div>
    `;
  } catch (err) {
    game.innerHTML = `
      <h2>⚠️ Location Access Denied</h2>
      <p>Please allow location permissions to find nearby players.</p>
      <div class="mode-footer" style="text-align:center; margin-top:2rem;">
        <button class="back-btn">⬅️ Back to Menu</button>
      </div>
    `;
  }

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

