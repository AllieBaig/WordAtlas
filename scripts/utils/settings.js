// File: scripts/utils/settings.js
// Edited by Gemini
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

// Function to apply saved user settings (font, theme, contrast) from localStorage
export function applyUserSettings() {
    const root = document.documentElement;
    const font = localStorage.getItem('napt-font');
    const theme = localStorage.getItem('napt-theme');
    const contrast = localStorage.getItem('napt-contrast');

    if (font) {
        root.classList.add(`font-${font}`);
    }
    if (theme === 'light' || theme === 'dark') {
        root.classList.add(`theme-${theme}`);
    }
    if (contrast === 'true') {
        root.classList.add('theme-high-contrast');
    }
    console.log('✅ User settings applied.');
}

// Export an initialization function that takes the settings panel element
export function initSettingsPanel(panelElement) {
    if (!panelElement) {
        console.error("Settings panel element not provided to initSettingsPanel.");
        return;
    }

    // --- App Version Mode Toggle ---
    const versionKey = 'wordatlas-version'; // Note: This uses 'wordatlas-version' key, consistent with your previous setup
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
