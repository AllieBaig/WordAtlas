// File: scripts/utils/config.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

export const CONFIG = {
  toolsPassword: 'admin123',
  fallbackEnabled: true,
  emojiSupport: true,
  fontOptions: ['Domine', 'Tinos', 'Atkinson Hyperlegible', 'System UI'],
  defaultFont: 'Domine',
  xpEnabled: true,
  theme: 'system',
  debug: true,
  toolsUnlockedViaQuery: true
};

export function toolsAccessGranted() {
  const url = new URL(window.location.href);
  const queryParam = url.searchParams.get('tools');
  return CONFIG.toolsUnlockedViaQuery && queryParam === '1';
}

