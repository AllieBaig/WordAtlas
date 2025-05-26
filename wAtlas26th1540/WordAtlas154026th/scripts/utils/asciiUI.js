

// File: scripts/utils/asciiUI.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Renders a classic ASCII-style UI with fields and buttons
 * @param {Object} config - title, inputs, submitId, backId, onSubmit
 * @param {Function} showMenu - callback for back button
 */
export function renderAsciiGame(config, showMenu) {
  const game = document.getElementById('game');
  if (!game) return;

  const {
    title = '🧩 ASCII MODE',
    description = '',
    letter = '',
    theme = '',
    inputs = [], // array of { label, id }
    submitId = 'submit',
    backId = 'back',
    resultId = 'asciiResult'
  } = config;

  const inputLines = inputs.map(i => `${i.label}: <input id="${i.id}">`).join('\n');

  game.innerHTML = `
<pre>
+------------------------------------------------+
|           ${title.padEnd(40)}|
|${description ? ' ' + description.padEnd(46) : ''}|
|${letter ? ' Letter: ' + letter.padEnd(38) : ''}|
|${theme ? ' Theme:  ' + theme.padEnd(38) : ''}|
|                                                |
${inputLines}
|                                                |
| <button id="${submitId}">[SUBMIT]</button>   <button class="back-btn">[BACK]</button> |
+------------------------------------------------+
</pre>
<div id="${resultId}" style="font-family: monospace; padding-top: 1rem;"></div>
`;

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

