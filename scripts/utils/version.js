// File: scripts/utils/version.js
// Edited by Gemini (Added trackVisit export)
// Features:
// - Provides application and data version information.
// - Can be used by various modules for logging or display.
// - Tracks application visits.
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Defines various version identifiers for the application.
 * @type {Object}
 * @property {string} app - The primary application version.
 * @property {string} data - The version of the core game data/clues.
 * @property {string} last_updated - The date when this version file was last updated.
 */
export const versionMap = {
    app: '1.0.0', // Example: Your main application version
    data: '2025.05.24', // Example: Version for game data (e.g., clues, prompts)
    last_updated: '2025-05-24' // Current date as an example
};

/**
 * Tracks and logs application visits.
 * Can be extended for more sophisticated analytics (e.g., sending data to a server).
 * Uses localStorage to keep track of visit count and last visit time.
 */
export function trackVisit() {
    const now = new Date();
    const lastVisit = localStorage.getItem('lastAppVisit');
    let visitCount = parseInt(localStorage.getItem('appVisitCount') || '0', 10);

    visitCount++;
    localStorage.setItem('appVisitCount', visitCount.toString());
    localStorage.setItem('lastAppVisit', now.toISOString());

    if (lastVisit) {
        console.log(`🚀 WordAtlas: Welcome back! This is visit #${visitCount}. Last visit: ${new Date(lastVisit).toLocaleString()}`);
    } else {
        console.log(`🚀 WordAtlas: First visit! Welcome. Visit count: ${visitCount}`);
    }
    console.log(`App Version: ${versionMap.app}, Data Version: ${versionMap.data}`);
}
