// File: scripts/modes/mixlingo.js
// Edited by Gemini (Fixed imports and function calls)
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
import { getDailyPrompt } from '../utils/dailyPrompt.js'; // Fixed: Changed getDailyWord to getDailyPrompt
import { addXP } from '../utils/xpTracker.js';
import { updateStreak } from '../utils/streak.js';

export async function init({ showMenu }) {
  hideMenu();
  const game = document.getElementById('game');
  if (!game) return;

  // Fixed: Changed getDailyWord to getDailyPrompt
  const wordData = getDailyPrompt('mixlingo');
  // Assuming wordData structure includes word, language, meaning, tip based on usage below
  const { word, language, meaning, tip } = wordData;

  game.innerHTML = `
    <section class="game-mode">
      <h2>🌍 MixLingo Challenge (${language || 'Unknown Language'})</h2>
      <p><strong>Today's Word:</strong> <span class="word">${word}</span></p>
      <p><strong>Meaning:</strong> ${meaning || 'N/A'}</p>
      <p><em>Usage Tip:</em> ${tip || 'N/A'}</p>

      <label for="sentence">✍️ Enter a sentence using "<strong>${word}</strong>":</label><br/>
      <textarea id="sentenceInput" placeholder="Write in English..." rows="3"></textarea>
      <div class="btn-row">
        <button id="submitBtn">Submit Sentence</button>
        <button id="hintBtn">Hint</button>
        <button class="back-btn">⬅️ Back to Menu</button>
      </div>

      <div id="feedback" class="feedback"></div>
    </section>
  `;

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);

  document.getElementById('submitBtn')?.addEventListener('click', () => {
    const input = document.getElementById('sentenceInput').value.trim();
    const feedback = document.getElementById('feedback');

    if (!input) {
      feedback.textContent = '❌ Please enter a sentence.';
      return;
    }

    if (!input.toLowerCase().includes(word.toLowerCase())) {
      feedback.innerHTML = `❌ Your sentence must include the word "<strong>${word}</strong>".`;
      return;
    }

    feedback.innerHTML = `✅ Great! You've used "<strong>${word}</strong>" correctly. +10 XP!`;
    addXP(10, 'MixLingo Correct Sentence', 'mixlingo'); // Added reason and mode
    updateStreak(); // Fixed: Removed 'mixlingo' argument, as updateStreak in streak.js takes no arguments
  });

  document.getElementById('hintBtn')?.addEventListener('click', () => {
    alert(`Hint: Try using "${word}" in a sentence about travel, emotion, or culture.`);
  });
}
