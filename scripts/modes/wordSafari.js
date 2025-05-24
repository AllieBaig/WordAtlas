// File: scripts/modes/wordSafari.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
// Import safariPrompts directly, not getClueSet
import { safariPrompts } from '../utils/clues.js'; // <-- Changed import

export default function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  // Generate random prompts for each category from safariPrompts
  const currentPrompts = {
    name: safariPrompts.name[Math.floor(Math.random() * safariPrompts.name.length)],
    place: safariPrompts.place[Math.floor(Math.random() * safariPrompts.place.length)],
    animal: safariPrompts.animal[Math.floor(Math.random() * safariPrompts.animal.length)],
    thing: safariPrompts.thing[Math.floor(Math.random() * safariPrompts.thing.length)]
  };

  game.innerHTML = `
    <div class="mode-header">
      <button onclick="(${showMenu.toString()})()">⬅️ Back</button>
      <h2>🦁 Word Safari</h2>
    </div>

    <p>Type words that match the following:</p>

    <form id="safariForm">
      <label>Name: <strong>${currentPrompts.name}</strong> <input type="text" name="name" required></label><br>
      <label>Place: <strong>${currentPrompts.place}</strong> <input type="text" name="place" required></label><br>
      <label>Animal: <strong>${currentPrompts.animal}</strong> <input type="text" name="animal" required></label><br>
      <label>Thing: <strong>${currentPrompts.thing}</strong> <input type="text" name="thing" required></label><br>
      <button type="submit">✅ Submit</button>
    </form>

    <div id="safariResult" style="margin-top:1rem;"></div>
  `;

  document.getElementById('safariForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const feedback = [];

    // For Word Safari, there's no single 'correct' answer, so we might just display what they typed.
    // If you have a mechanism to check if their answer *matches* the prompt (e.g., starts with a vowel for "A name starting with a vowel"), that logic would go here.
    // For now, I'll display what they entered for each prompt.

    for (const type of ['name', 'place', 'animal', 'thing']) {
      const user = (formData[type] || '').trim();
      feedback.push(
        `➡️ ${type} (${currentPrompts[type]}): <strong>${user || '(blank)'}</strong>`
      );
    }

    document.getElementById('safariResult').innerHTML = `
      <h4>Your Safari Entries:</h4>
      ${feedback.join('<br>')}
      <p>🧐 Review your answers and explore more words!</p>
    `;
  });
}
