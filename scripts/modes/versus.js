// File: scripts/modes/versus.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE
// Timestamp: 2025-05-26 @ 15:37

import { hideMenu } from '../utils/menuVisibility.js';
import { addXP } from '../utils/xpTracker.js';

function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  const promptWord = ['spark', 'memory', 'echo', 'firefly', 'pulse'][Math.floor(Math.random() * 5)];

  game.innerHTML = `
    <section class="game-mode">
      <h2>🤖 Versus Mode: You vs AI</h2>
      <p>Your challenge word is: <strong>${promptWord}</strong></p>
      <textarea id="playerInput" rows="3" placeholder="Use '${promptWord}' in a sentence..."></textarea>
      <div class="btn-row">
        <button id="submitBtn">Submit</button>
        <button class="back-btn">⬅️ Back</button>
      </div>
      <div id="feedback" class="feedback"></div>
    </section>
  `;

  document.getElementById('submitBtn')?.addEventListener('click', () => {
    const input = document.getElementById('playerInput').value.trim();
    const feedback = document.getElementById('feedback');

    if (!input) {
      feedback.textContent = '❌ Please write your sentence.';
      return;
    }

    if (!input.toLowerCase().includes(promptWord.toLowerCase())) {
      feedback.textContent = `❌ Your sentence must include "${promptWord}".`;
      return;
    }

    // Simple AI stub
    const aiSentence = `The ${promptWord} lingered in the digital air.`;

    feedback.innerHTML = `
      <p>✅ Nice work! You earned +9 XP.</p>
      <p><strong>AI:</strong> ${aiSentence}</p>
    `;
    addXP(9, 'Versus Challenge');
  });

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

export { init };
export default init;
