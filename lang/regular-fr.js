
/**
 * Handles the French "Solo Mode" word game logic (Name, Place, Animal, Thing).
 * Loads prompts from JSON and manages user input, easy mode options, feedback.
 * Depends on: showMenu from gameNavigation.js
 * Related: fontControls.js, streak.js, history.js, regular-fr.json
 * Uses async loading and supports optional Easy Mode with emoji hints.
 * MIT License: https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE
 * Timestamp: 2025-05-27 18:45 | File: scripts/modes/regular-fr.js
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
    <div class="game-header"><h2>🇫🇷 Mode Solo Français</h2></div>
    <p>Entrez un mot pour chaque catégorie (avec la lettre du jour) :</p>
    <div class="prompt-group">
      <label>Nom : <input type="text" id="nameInput" /></label>
      <div id="nameChoices" class="easy-options"></div>

      <label>Lieu : <input type="text" id="placeInput" /></label>
      <div id="placeChoices" class="easy-options"></div>

      <label>Animal : <input type="text" id="animalInput" /></label>
      <div id="animalChoices" class="easy-options"></div>

      <label>Objet : <input type="text" id="thingInput" /></label>
      <div id="thingChoices" class="easy-options"></div>
    </div>
    <button id="submitBtn">✅ Valider</button>
    <button id="backBtn">🔙 Retour</button>
    <div id="feedback"></div>
  `;

  if (isEasyMode()) {
    const data = await fetch('./scripts/lang/regular-fr.json').then(r => r.json());
    populateEasyOptions(data);
  }

  document.getElementById('submitBtn').addEventListener('click', () => {
    const answers = {
      name: document.getElementById('nameInput').value.trim(),
      place: document.getElementById('placeInput').value.trim(),
      animal: document.getElementById('animalInput').value.trim(),
      thing: document.getElementById('thingInput').value.trim()
    };

    recordAnswer('regular-fr', getTodayKey(), answers);
    updateStreak('regular-fr');
    document.getElementById('feedback').textContent = '✅ Réponses enregistrées !';
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
