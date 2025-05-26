// Timestamp: 2025-05-27 17:59
// File: scripts/utils/debugTools.js
// Edited by Gemini (Compromise: Integrate user's UI with existing functionality)
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { showErrorToast } from './errorUI.js';
import { clearErrorLog } from './errorHandler.js'; // Ensure this is imported for clear log functionality

const DEBUG_QUERY_PARAM = 'debug';
const TOOLS_PANEL_ID = 'toolsPanel'; // Consistent ID for the panel

/**
 * Initializes and injects the debug tools panel into the DOM if the URL contains '?debug'.
 * This function should be called once on application initialization (e.g., in DOMContentLoaded in main.js).
 * It creates the panel if it doesn't exist and populates its content.
 */
export function initDebugTools() {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has(DEBUG_QUERY_PARAM)) {
    // console.log('Debug tools not enabled. Add ?debug to the URL to enable.'); // Log only for development
    return;
  }

  let panel = document.getElementById(TOOLS_PANEL_ID);
  if (!panel) {
    panel = document.createElement('div');
    panel.id = TOOLS_PANEL_ID;
    document.body.appendChild(panel);
  }

  // Set initial state and styling if not already done by CSS
  panel.classList.add('hidden'); // Ensure it's hidden by default
  panel.style.cssText = `
    position: fixed;
    bottom: 60px; /* Aligned with user's new preference */
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

  // Populate content with user's requested links + existing debug functionalities
  panel.innerHTML = `
    <h3 style="margin-top:0;">🧪 Developer Tools</h3>
    <ul style="list-style: none; padding-left: 0; font-size: 0.95rem; line-height: 1.6;">
      <li><a href="./scripts/utils/error-log.html" target="_blank" style="color: white;">📄 Error Log</a></li>
      <li><a href="./scripts/utils/version-log.html" target="_blank" style="color: white;">🕒 Version Log (Not implemented)</a></li>
      <li><a href="./scripts/utils/fileDiffViewer.html" target="_blank" style="color: white;">🧾 File Diff Viewer (Not implemented)</a></li>
    </ul>
    <div style="margin-top: 1em; border-top: 1px solid #444; padding-top: 1em;">
        <button id="clearLogBtn" style="margin-right: 0.5em; padding: 0.4em 0.8em; background: #555; color: white; border: none; border-radius: 0.3em; cursor: pointer;">
          Clear Error Log
        </button>
        <button id="resetPWABtn" style="padding: 0.4em 0.8em; background: #d9534f; color: white; border: none; border-radius: 0.3em; cursor: pointer;">
          Reset PWA Data
        </button>
    </div>
    <button id="showErrorToastBtn" style="margin-top: 0.5em; padding: 0.4em 0.8em; background: #f0ad4e; color: white; border: none; border-radius: 0.3em; cursor: pointer;">
      Test Error Toast
    </button>
    <button id="closeToolsBtn" style="margin-top: 0.5em; padding: 0.4em 0.8em; background: #444; color: white; border: none; border-radius: 0.3em; cursor: pointer;">
      ❌ Close
    </button>
    <p style="font-size: 0.8em; opacity: 0.8; margin-top: 1em;">Last Error: <span id="lastErrorDisplay">None</span></p>
  `;

  // Bind event listeners for the debug panel buttons
  document.getElementById('clearLogBtn')?.addEventListener('click', () => {
    clearErrorLog();
    document.getElementById('lastErrorDisplay').textContent = 'Log Cleared.';
    showErrorToast('Error log cleared.', 'success');
  });

  document.getElementById('resetPWABtn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset PWA data (local storage, cache)? This will reload the page.')) {
      localStorage.clear();
      if ('caches' in window) {
        caches.keys().then(cacheNames => Promise.all(cacheNames.map(cacheName => caches.delete(cacheName))))
             .then(() => {
                showErrorToast('PWA data cleared. Reloading...', 'success');
                setTimeout(() => location.reload(), 1000);
             });
      } else {
        showErrorToast('Local storage cleared. Reloading...', 'success');
        setTimeout(() => location.reload(), 1000);
      }
    }
  });

  document.getElementById('showErrorToastBtn')?.addEventListener('click', () => {
    showErrorToast('This is a test error toast!', 'error');
  });

  // Bind the close button to the toggle function
  document.getElementById('closeToolsBtn')?.addEventListener('click', toggleToolsPanel);
}

/**
 * Toggles the visibility of the debug tools panel.
 * Hides other main UI panels (settings, menu, game) when tools panel is active.
 * This is the function called from main.js when the 'Tools' button is clicked.
 */
export function toggleToolsPanel() {
  const panel = document.getElementById(TOOLS_PANEL_ID);
  const settingsPanel = document.getElementById('settingsPanel'); // Assuming settingsPanel might be open
  const menu = document.getElementById('menu'); // Assuming menu might be active
  const game = document.getElementById('game'); // Assuming game might be active

  if (!panel) {
    // If the panel hasn't been initialized (e.g., no ?debug in URL), initialize it now
    // and then immediately show it.
    initDebugTools();
    const newPanel = document.getElementById(TOOLS_PANEL_ID);
    if (newPanel) newPanel.classList.remove('hidden');
    return;
  }

  panel.classList.toggle('hidden'); // Toggle the tools panel itself

  // Ensure other main UI elements are hidden when tools panel is active
  if (settingsPanel) settingsPanel.classList.add('hidden');
  if (menu) menu.classList.add('hidden');
  if (game) game.classList.add('hidden');
}

/**
 * Updates the last error display within the debug panel.
 * Other modules (e.g., errorHandler.js) can call this.
 */
export function updateLastErrorDisplay(message) {
    const display = document.getElementById('lastErrorDisplay');
    if (display) {
        display.textContent = message;
    }
}
