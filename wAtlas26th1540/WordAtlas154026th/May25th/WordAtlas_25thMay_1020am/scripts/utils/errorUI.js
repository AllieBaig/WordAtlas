
// File: scripts/utils/errorUI.js
// Features:
// - Shows a styled error banner with custom message
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

export function showError(message) {
  let box = document.getElementById('mode-error-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'mode-error-box';
    box.style = `
      background:#ffe0e0; color:#900; font-weight:bold;
      padding:1rem; margin:1rem auto; max-width:600px;
      border:1px solid #f99; border-radius:0.5rem; text-align:center;
    `;
    document.body.prepend(box);
  }
  box.textContent = message;
}

