
// File: scripts/main.js
// Features:
// - Initializes user font, theme, emoji and contrast settings from localStorage
// - Applies CSS classes to <html> for PWA-wide behavior
// - Ensures clean reapplication (removes previous font/theme/emoji classes)
// - Can be used at startup or reactively from settings
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

export function applyUserPreferences() {
  const root = document.documentElement;

  // Remove previous classes
  root.classList.remove(
    'theme-dark',
    'theme-high-contrast',
    'no-emojis',
    ...Array.from(root.classList).filter(cls => cls.startsWith('font-'))
  );

  // Apply from saved preferences
  const font = localStorage.getItem('napt-font');
  const theme = localStorage.getItem('napt-theme');
  const contrast = localStorage.getItem('napt-contrast');
  const useEmojis = localStorage.getItem('napt-use-emojis');

  if (font) root.classList.add(`font-${font}`);
  if (theme === 'dark') root.classList.add('theme-dark');
  if (contrast === 'true') root.classList.add('theme-high-contrast');
  if (useEmojis === 'false') root.classList.add('no-emojis');
}

// Auto-run on script load
applyUserPreferences();

