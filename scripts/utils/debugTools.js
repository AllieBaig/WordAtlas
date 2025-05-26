// Timestamp: 2025-05-27 16:45
// File: scripts/utils/debugTools.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Injects a floating debug/tools panel with links to internal utilities.
 */
export function toggleToolsPanel() {
  let panel = document.getElementById('toolsPanel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'toolsPanel';
    panel.style = `
      position: fixed;
      bottom: 60px;
      right: 10px;
      background: #222;
      color: white;
      padding: 1em;
      border-radius: 0.5em;
      box-shadow: 0 0 10px rgba(0,0,0,0.4);
      z-index: 9999;
      max-width: 280px;
      font-family: system-ui, sans-serif;
    `;

    panel.innerHTML = `
      <h3 style="margin-top:0;">🧪 Developer Tools</h3>
      <ul style="list-style: none; padding-left: 0; font-size: 0.95rem; line-height: 1.6;">
        <li><a href="./scripts/utils/error-log.html" target="_blank">📄 Error Log</a></li>
        <li><a href="./scripts/utils/version-log.html" target="_blank">🕒 Version Log</a></li>
        <li><a href="./scripts/utils/fileDiffViewer.html" target="_blank">🧾 File Diff Viewer</a></li>
      </ul>
      <button id="closeToolsBtn" style="margin-top: 0.5em; padding: 0.4em 0.8em; background: #444; color: white; border: none; border-radius: 0.3em; cursor: pointer;">
        ❌ Close
      </button>
    `;

    document.body.appendChild(panel);

    document.getElementById('closeToolsBtn')?.addEventListener('click', () => {
      panel.remove();
    });
  } else {
    panel.remove(); // toggle close
  }
}
