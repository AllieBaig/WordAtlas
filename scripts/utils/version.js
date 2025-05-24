// File: scripts/utils/version.js
// Tracks app version and feature notes
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

export const appVersion = '2.1.0';

export const versionLog = [
  {
    version: '2.1.0',
    date: '2025-05-24',
    summary: '🗂️ Diff tool, auto history, profile system',
    changes: [
      'Added diff-tool.html with GitHub compare',
      'Saved comparison history in localStorage',
      'Auto-naming diff history entries',
      'Improved fallback behavior for Site1'
    ]
  },
  {
    version: '2.0.0',
    date: '2025-05-20',
    summary: '🎮 All modes connected + Site1 fallback',
    changes: [
      'Mode loader with error handling and fallback',
      'Integrated regular, dice, relic, trail, safari, atlas, versus, nearby',
      'Settings, history, streak modules connected'
    ]
  },
  {
    version: '1.0.0',
    date: '2025-05-10',
    summary: 'Initial launch of WordAtlas',
    changes: [
      'Basic menu and solo game mode',
      'Workbox + PWA manifest',
      'Offline support and UI skeleton'
    ]
  }
];

