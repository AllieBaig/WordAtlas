

// File: scripts/utils/profileRecovery.js
// Features:
// - Allows restoring a profile using nickname + ID
// - Can import/export profile as JSON or QR
// - Designed to pair with profileManager.js
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { saveProfile, getProfile } from './profileManager.js';

/**
 * Export current profile as JSON string
 */
export function exportProfile() {
  const profile = getProfile();
  if (!profile) return null;
  return JSON.stringify(profile);
}

/**
 * Trigger browser download of profile JSON
 */
export function downloadProfileFile() {
  const data = exportProfile();
  if (!data) return;

  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'wordProfile.json';
  a.click();

  URL.revokeObjectURL(url);
}

/**
 * Import a saved profile from JSON string
 */
export function importProfile(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.id || !parsed.nickname) throw new Error('Invalid format');
    saveProfile(parsed);
    return true;
  } catch (e) {
    console.error('Failed to import profile:', e);
    return false;
  }
}

/**
 * Create a manual restore interface from textarea or file input
 */
export function setupProfileRecoveryUI(containerId = 'profile-recover') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <h3>🔄 Profile Recovery</h3>
    <textarea id="profileImport" placeholder="Paste exported profile JSON here" rows="4" style="width:100%"></textarea>
    <br />
    <button id="importProfileBtn">Import Profile</button>
    <button id="downloadProfileBtn">Export Profile</button>
    <div id="profileRecoverStatus"></div>
  `;

  document.getElementById('importProfileBtn')?.addEventListener('click', () => {
    const input = document.getElementById('profileImport').value;
    const success = importProfile(input);
    const status = document.getElementById('profileRecoverStatus');
    status.textContent = success ? '✅ Profile restored successfully!' : '❌ Invalid profile data';
  });

  document.getElementById('downloadProfileBtn')?.addEventListener('click', downloadProfileFile);
}
