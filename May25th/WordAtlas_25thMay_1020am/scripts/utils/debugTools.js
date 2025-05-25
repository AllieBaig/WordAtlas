// File: scripts/utils/debugTools.js
// Features:
// - Toggle fallback mode
// - Clear service worker + cache
// - Clear localStorage + error logs
// - Only injected if `?debug` is in URL
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { clearErrorLog } from './errorHandler.js';

export function injectDebugTools() {
  if (!location.search.includes('debug')) return;

  const panel = document.createElement('div');
  panel.id = 'debugPanel';
  panel.style = `
    position:fixed; bottom:1rem; right:1rem;
    background:#111; color:#fff; padding:1rem;
    font-size:0.9rem; border-radius:0.5rem;
    z-index:9999; max-width:300px;
  `;

  panel.innerHTML = `
    <h3 style="margin-top:0;">🧪 Debug Tools</h3>
    <button onclick="location.reload()">🔄 Reload</button>
    <button onclick="resetPWA()">♻️ Reset PWA</button>
    <button onclick="toggleFallback()">🛟 Toggle Fallback</button>
    <button onclick="clearLogs()">🧹 Clear Logs</button>
  `;

  document.body.appendChild(panel);

  window.resetPWA = async function () {
    const keys = await caches.keys();
    for (const key of keys) await caches.delete(key);
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) await reg.unregister();
    }
    localStorage.clear();
    alert('✅ Cache, SW, and localStorage cleared.\nReloading...');
    location.reload();
  };

  window.toggleFallback = function () {
    const current = localStorage.getItem('wordatlas-use-site1') === 'true';
    localStorage.setItem('wordatlas-use-site1', (!current).toString());
    alert(`✅ Fallback mode is now ${!current}`);
  };

  window.clearLogs = function () {
    clearErrorLog();
    alert('🧹 Error log cleared.');
  };

  console.log('🧪 Debug panel injected');
}
