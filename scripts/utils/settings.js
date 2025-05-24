// File: scripts/utils/settings.js
// Features:
// - Manages user settings for font, theme, contrast, emoji toggle
// - Saves to and reads from localStorage
// - Applies settings using class names on <html>
// - Used by settings panel in index.html
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const SETTINGS = {
  font: 'napt-font',
  theme: 'napt-theme',
  contrast: 'napt-contrast',
  useEmojis: 'napt-use-emojis',
  useSite1: 'wordatlas-use-site1'
};

export function applySettings() {
  const root = document.documentElement;

  // Clean up previous settings
  root.classList.remove(
    'theme-dark',
    'theme-high-contrast',
    'no-emojis',
    ...Array.from(root.classList).filter(cls => cls.startsWith('font-'))
  );

  // Apply current
  const font = localStorage.getItem(SETTINGS.font);
  const theme = localStorage.getItem(SETTINGS.theme);
  const contrast = localStorage.getItem(SETTINGS.contrast);
  const useEmojis = localStorage.getItem(SETTINGS.useEmojis);

  if (font) root.classList.add(`font-${font}`);
  if (theme === 'dark') root.classList.add('theme-dark');
  if (contrast === 'true') root.classList.add('theme-high-contrast');
  if (useEmojis === 'false') root.classList.add('no-emojis');
}

export function saveSetting(key, value) {
  localStorage.setItem(SETTINGS[key], value);
  applySettings();
}

export function getSetting(key) {
  return localStorage.getItem(SETTINGS[key]);
}

export function clearAllSettings() {
  Object.values(SETTINGS).forEach(k => localStorage.removeItem(k));
  applySettings();
}
