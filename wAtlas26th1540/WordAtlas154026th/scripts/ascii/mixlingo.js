

// File: scripts/ascii/mixlingo.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { hideMenu } from '../utils/menuVisibility.js';

export default function init({ showMenu }) {
  hideMenu();

  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
<pre style="font-family:monospace; background:#111; color:#0f0; padding:1em; border-radius:8px; overflow:auto;">
+--------------------------------------------------+
|              🌍 MixLingo: Daily Word             |
+--------------------------------------------------+
|  Language: [🇫🇷 French ▼]     Date: [2025-05-25]  |
|                                                  |
|  🔤 Today's Word: <strong>amour</strong>                          |
|  Meaning: love (noun)                            |
|  Usage Tip: Common in French expressions         |
|                                                  |
|  ✍️ Your Sentence (in English):                  |
|  > I think true *amour* can cross borders.       |
|                                                  |
|  [ Submit Sentence ]   [ Hint ]                  |
|                                                  |
|  ✅ Streak: 3 Days     ⭐ Creativity: 7/10         |
|                                                  |
|  [📚 Word Info]   [🏆 Leaderboard]   [⚙ Settings]  |
+--------------------------------------------------+
</pre>

<div style="text-align:center; margin-top:1rem;">
  <button class="back-btn">⬅️ Back to Menu</button>
</div>
`;

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

