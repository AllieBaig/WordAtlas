

// File: scripts/ascii/asciiRenderer.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * ASCII Renderer
 * Provides a fallback UI for game modes using monospace, box-drawn, or simple text-based views.
 */

export function renderAsciiLayout(title = 'Game Mode', lines = []) {
  const container = document.getElementById('game');
  if (!container) return;

  const asciiArt = [
    '┌────────────────────────────┐',
    `│       ${title.padEnd(24)}│`,
    '├────────────────────────────┤',
    ...lines.map(line => `│ ${line.padEnd(26)}│`),
    '└────────────────────────────┘'
  ].join('\n');

  container.innerHTML = `
    <pre style="font-family: monospace; padding: 1em; background: #111; color: #0f0;">
${asciiArt}
    </pre>
    <button onclick="history.back()" style="margin-top:1em;">⬅️ Back</button>
  `;
}

