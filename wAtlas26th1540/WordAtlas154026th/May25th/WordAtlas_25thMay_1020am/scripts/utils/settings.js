// File: scripts/utils/settings.js
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

// Export an initialization function that takes the settings panel element
export function initSettingsPanel(panelElement) { // <--- THIS FUNCTION MUST BE EXPORTED
  if (!panelElement) {
    console.error("Settings panel element not provided to initSettingsPanel.");
    return;
  }

  // --- App Version Mode Toggle ---
  const versionKey = 'wordatlas-version';
  const currentVer = localStorage.getItem(versionKey) || 'v-latest';

  const versionLabel = document.createElement('label');
  versionLabel.textContent = '🧭 App Version Mode: ';
  versionLabel.style.display = 'block';
  versionLabel.style.marginTop = '1rem';

  const versionSelect = document.createElement('select');
  versionSelect.innerHTML = `
    <option value="v-latest">Latest</option>
    <option value="v-site1">Backup (Site1)</option>
    <option value="v-dev">Dev (Site2)</option>
  `;
  versionSelect.value = currentVer;

  versionSelect.onchange = () => {
    const newVer = versionSelect.value;
    localStorage.setItem(versionKey, newVer);
    alert(`🔁 Switched to ${newVer}. Reloading...`);
    location.reload();
  };

  versionLabel.appendChild(versionSelect);
  panelElement.appendChild(versionLabel); // Use the passed 'panelElement' here

  // --- Add other settings controls here as needed ---

  console.log('✅ Settings panel initialized.');
}
