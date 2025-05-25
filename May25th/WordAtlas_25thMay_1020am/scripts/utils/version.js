// File: scripts/utils/version.js
// Features:
// - Provides application and data version information.
// - Can be used by various modules for logging or display.
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
