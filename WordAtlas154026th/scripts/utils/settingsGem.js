

// 25th 14:10
// File: scripts/utils/settings.js
// Edited by Gemini (Re-introduced applyUserSettings and theme/contrast controls)
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
    emojis: localStorage.getItem('emojis') !== 'false',
    theme: localStorage.getItem('napt-theme') || 'light', // Re-add theme
    contrast: localStorage.getItem('napt-contrast') === 'true' // Re-add contrast
  };
}

/**
 * Applies saved user settings (theme, contrast, font, easy mode) to the DOM on page load.
 * This function should be called once on application initialization.
 */
export function applyUserSettings() {
  const root = document.documentElement;
  const settings = getSettings(); // Get current settings

  // Apply theme
  root.dataset.theme = settings.theme;

  // Apply contrast
  root.classList.toggle('theme-high-contrast', settings.contrast);

  // Apply font (this directly sets document.body.style.fontFamily)
  setFont(settings.font); // Use setFont for initial font application

  // Apply easy mode class
  document.body.classList.toggle('easy-mode', settings.easyMode);

  console.log('✅ Initial user settings applied.');
}

export function toggleEasyMode(enabled) {
  localStorage.setItem('easyMode', enabled ? 'true' : 'false');
  // The easy-mode class is now toggled by applyUserSettings (on load) and the main.js event listener.
}

export function toggleEmojis(enabled) {
  localStorage.setItem('emojis', enabled ? 'true' : 'false');
}

export function setFont(font) {
  localStorage.setItem('font', font);
  document.body.style.fontFamily = font; // Direct application
}

/**
 * Injects a live settings UI into #settingsPanel
 */
export function injectSettingsPanel() {
  const panel = document.getElementById('settingsPanel');
  if (!panel) return;

  const settings = getSettings(); // Get current settings for UI population

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
    <br/>
    <label>
      Theme:
      <select id="themeSelectSetting">
        <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>Light</option>
        <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>Dark</option>
      </select>
    </label>
    <br/>
    <label>
      <input type="checkbox" id="contrastToggleSetting" ${settings.contrast ? 'checked' : ''} />
      High Contrast
    </label>

    <br/><br/>
    <small style="opacity:0.6;">Settings are saved locally in your browser.</small>
  `;

  // Live bindings for the newly created elements
  panel.querySelector('#easyToggleSetting')?.addEventListener('change', (e) => {
    toggleEasyMode(e.target.checked);
    // Apply immediately to body class for visual update
    document.body.classList.toggle('easy-mode', e.target.checked);
  });

  panel.querySelector('#emojiToggleSetting')?.addEventListener('change', (e) => {
    toggleEmojis(e.target.checked);
  });

  panel.querySelector('#fontSelectSetting')?.addEventListener('change', (e) => {
    setFont(e.target.value);
  });

  panel.querySelector('#themeSelectSetting')?.addEventListener('change', (e) => {
    const newTheme = e.target.value;
    document.documentElement.dataset.theme = newTheme; // Apply to html element
    localStorage.setItem('napt-theme', newTheme);
  });

  panel.querySelector('#contrastToggleSetting')?.addEventListener('change', (e) => {
    const enabled = e.target.checked;
    document.documentElement.classList.toggle('theme-high-contrast', enabled); // Apply to html element
    localStorage.setItem('napt-contrast', enabled.toString());
  });
}
