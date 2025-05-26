
/**
 * Handles the German "Solo Mode" word game logic (Name, Place, Animal, Thing).
 * Loads prompts from JSON and handles user input, scoring, and easy mode.
 * Depends on: showMenu from gameNavigation.js
 * Related files: fontControls.js, streak.js, history.js, regular-de.json
 * Supports async prompt loading, UI feedback, and easy mode 3-option helper.
 * MIT License: https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE
 * Timestamp: 2025-05-27 18:30 | File: scripts/modes/regular-de.js
 */

import { showMenu } from '../gameNavigation.js';
import { getTodayKey } from '../utils/dailyPrompt.js';
import { recordAnswer } from '../utils/history.js';
import { updateStreak } from '../utils/streak.js';
import { isEasyMode, getEasyOptions } from '../utils/settings.js';

export default async function init({ showMenu }) {
  const gameArea = document.getElementById('game');
  if (!gameArea) return;

  gameArea.innerHTML = `
    <div class="game-header"><h2>🇩🇪 Deutscher Solo-Modus</h2></div>
    <p>Gib ein Wort für jede Kategorie (mit heutigem Buchstaben):</p>
    <div class="prompt-group">
      <label>Name: <input type="text" id="nameInput" /></label>
      <div id="nameChoices" class="easy-options"></div>

      <label>Ort: <input type="text" id="placeInput" /></label>
      <div id="placeChoices" class="easy-options"></div>

      <label>Tier: <input type="text" id="animalInput" /></label>
      <div id="animalChoices" class="easy-options"></div>

      <label>Ding: <input type="text" id="thingInput" /></label>
      <div id="thingChoices" class="easy-options"></div>
    </div>
    <button id="submitBtn">✅ Abschicken</button>
    <button id="backBtn">🔙 Zurück</button>
    <div id="feedback"></div>
  `;

  if (isEasyMode()) {
    const data = await fetch('./scripts/lang/regular-de.json').then(r => r.json());
    populateEasyOptions(data);
  }

  document.getElementById('submitBtn').addEventListener('click', () => {
    const answers = {
      name: document.getElementById('nameInput').value.trim(),
      place: document.getElementById('placeInput').value.trim(),
      animal: document.getElementById('animalInput').value.trim(),
      thing: document.getElementById('thingInput').value.trim()
    };

    recordAnswer('regular-de', getTodayKey(), answers);
    updateStreak('regular-de');
    document.getElementById('feedback').textContent = '✅ Antworten gespeichert!';
  });

  document.getElementById('backBtn').addEventListener('click', showMenu);
}

function populateEasyOptions(data) {
  ['name', 'place', 'animal', 'thing'].forEach(category => {
    const container = document.getElementById(`${category}Choices`);
    const options = getEasyOptions(data[category]);
    container.innerHTML = options.map(opt =>
      `<button class="option" onclick="document.getElementById('${category}Input').value='${opt}'">${opt}</button>`
    ).join('');
  });
}
