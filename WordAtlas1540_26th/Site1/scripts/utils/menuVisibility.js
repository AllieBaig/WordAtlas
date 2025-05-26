// File: scripts/utils/menuVisibility.js
// Edited by Gemini
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

// Show the main menu and hide the game screen, also ensuring other panels are hidden
export function showMenu() {
    document.getElementById('menu')?.classList.add('active');
    document.getElementById('menu')?.classList.remove('hidden'); // Ensure menu is visible

    // Hide game and other panels
    document.getElementById('game')?.classList.remove('active');
    document.getElementById('game')?.classList.add('hidden');
    document.getElementById('settingsPanel')?.classList.remove('active');
    document.getElementById('settingsPanel')?.classList.add('hidden');
    document.getElementById('toolsPanel')?.classList.remove('active');
    document.getElementById('toolsPanel')?.classList.add('hidden');
}

// Hide the menu and show the game screen, ensuring other panels are hidden
export function hideMenu() {
    document.getElementById('menu')?.classList.remove('active');
    document.getElementById('menu')?.classList.add('hidden'); // Ensure menu is hidden

    // Show game and hide other panels
    document.getElementById('game')?.classList.add('active');
    document.getElementById('game')?.classList.remove('hidden');
    document.getElementById('settingsPanel')?.classList.remove('active');
    document.getElementById('settingsPanel')?.classList.add('hidden');
    document.getElementById('toolsPanel')?.classList.remove('active');
    document.getElementById('toolsPanel')?.classList.add('hidden');
}

// Manages visibility for 'menu', 'settingsPanel', and 'toolsPanel'
// Hides all managed panels except the target, and ensures the game panel is hidden.
export function togglePanel(targetPanelId) {
    const panelsToManage = ['menu', 'settingsPanel', 'toolsPanel']; // These are the panels controlled by footer buttons

    panelsToManage.forEach(panelId => {
        const panelElement = document.getElementById(panelId);
        if (panelElement) {
            if (panelId === targetPanelId) {
                // Show the target panel
                panelElement.classList.add('active');
                panelElement.classList.remove('hidden');
            } else {
                // Hide all other managed panels
                panelElement.classList.remove('active');
                panelElement.classList.add('hidden');
            }
        }
    });

    // When navigating to any of these UI panels (menu, settings, tools), ensure the game panel is hidden.
    const gamePanel = document.getElementById('game');
    if (gamePanel) {
        gamePanel.classList.remove('active');
        gamePanel.classList.add('hidden');
    }
}
