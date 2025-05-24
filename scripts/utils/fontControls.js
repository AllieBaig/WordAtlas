// File: scripts/utils/fontControls.js
// Features:
// - Provides list of supported fonts for UI
// - Updates root <html> class and localStorage
// - Used in settings panel for font selection
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const FONT_KEY = 'napt-font';

export const availableFonts = [
  { name: 'Domine', class: 'font-domine' },
  { name: 'Tinos', class: 'font-tinos' },
  { name: 'Merriweather', class: 'font-merriweather' },
  { name: 'Lora', class: 'font-lora' }
];

export function applyFontClass(fontClass) {
  const root = document.documentElement;

  // Remove all font-* classes
  Array.from(root.classList)
    .filter(cls => cls.startsWith('font-'))
    .forEach(cls => root.classList.remove(cls));

  if (fontClass) {
    root.classList.add(fontClass);
    localStorage.setItem(FONT_KEY, fontClass.replace('font-', ''));
  }
}

export function initFontSelector(selectEl) {
  if (!selectEl) return;

  // Populate select element
  selectEl.innerHTML = availableFonts.map(f =>
    `<option value="${f.class}">${f.name}</option>`
  ).join('');

  // Preselect current font
  const saved = localStorage.getItem(FONT_KEY);
  if (saved) selectEl.value = `font-${saved}`;

  selectEl.addEventListener('change', () => {
    applyFontClass(selectEl.value);
  });
}
