
// File: scripts/modes/regular.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';
import { getDailyPrompt } from '../utils/dailyPrompt.js';
import { addXP } from '../utils/xpTracker.js';
import { updateStreak } from '../utils/streak.js';

function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  const prompt = getDailyPrompt('regular') || { word: 'inspire' };
  const word = prompt.word;

  game.innerHTML = `
    <section class="game-mode">
      <h2>🧠 Regular Mode</h2>
      <p><strong>Word of the Day:</strong> <span class="word">${word}</span></p>
      <textarea id="sentenceInput" placeholder="Use the word '${word}' in a sentence..." rows="3"></textarea>
      <div class="btn-row">
        <button id="submitBtn">Submit Sentence</button>
        <button class="back-btn">⬅️ Back to Menu</button>
      </div>
      <div id="feedback" class="feedback"></div>
    </section>
  `;

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
    addXP(10, 'Regular Mode Sentence');
    updateStreak();
  });

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

// ✅ Dual export: named and default
export { init };
export default init;
