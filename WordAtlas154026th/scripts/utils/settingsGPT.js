
// File: scripts/utils/settings.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Settings Manager
 * Controls user preferences like Easy Mode, font family, emoji usage, 
 * and accessibility-friendly features.
 */

export function getSettings() {
  return {
    easyMode: localStorage.getItem('easyMode') === 'true',
    font: localStorage.getItem('font') || 'Domine',
    emojis: localStorage.getItem('emojis') !== 'false'
  };
}

export function toggleEasyMode(enabled) {
  localStorage.setItem('easyMode', enabled ? 'true' : 'false');
}

export function toggleEmojis(enabled) {
  localStorage.setItem('emojis', enabled ? 'true' : 'false');
}

export function setFont(font) {
  localStorage.setItem('font', font);
  document.body.style.fontFamily = font;
}

/**
 * Injects a live settings UI into #settingsPanel
 */
export function injectSettingsPanel() {
  const panel = document.getElementById('settingsPanel');
  if (!panel) return;

  const settings = getSettings();

  panel.innerHTML = `
    <h3>⚙️ Settings</h3>

    <label>
      <input type="checkbox" id="easyToggleSetting" ${settings.easyMode ? 'checked' : ''} />
      🌟 Easy Mode
    </label>
    <br/>

    <label>
      <input type="checkbox" id="emojiToggleSetting" ${settings.emojis ? 'checked' : ''} />
      💬 Use Emojis
    </label>
    <br/>

    <label>
      Font:
      <select id="fontSelectSetting">
        <option value="Domine" ${settings.font === 'Domine' ? 'selected' : ''}>Domine</option>
        <option value="Sans-serif" ${settings.font === 'Sans-serif' ? 'selected' : ''}>Sans-serif</option>
        <option value="Tiempos" ${settings.font === 'Tiempos' ? 'selected' : ''}>Tiempos (Custom)</option>
        <option value="Sans Forgetica" ${settings.font === 'Sans Forgetica' ? 'selected' : ''}>Sans Forgetica</option>
      </select>
    </label>

    <br/><br/>
    <small style="opacity:0.6;">Settings are saved locally in your browser.</small>
  `;

  // Live bindings
  panel.querySelector('#easyToggleSetting')?.addEventListener('change', (e) => {
    toggleEasyMode(e.target.checked);
  });

  panel.querySelector('#emojiToggleSetting')?.addEventListener('change', (e) => {
    toggleEmojis(e.target.checked);
  });

  panel.querySelector('#fontSelectSetting')?.addEventListener('change', (e) => {
    setFont(e.target.value);
  });

  // Apply immediately
  setFont(settings.font);
}