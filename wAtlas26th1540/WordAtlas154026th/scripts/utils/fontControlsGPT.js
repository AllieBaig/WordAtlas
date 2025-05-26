
// File: scripts/utils/fontControls.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const STORAGE_KEY = 'fontScale';

/**
 * Apply font scaling from localStorage
 */
export function applyFontScaling() {
  const scale = parseFloat(localStorage.getItem(STORAGE_KEY)) || 1;
  document.documentElement.style.setProperty('--font-scale', scale);
}

/**
 * Adjust scale from slider or +/- buttons
 */
export function updateFontScale(newScale) {
  const safeScale = Math.min(Math.max(newScale, 0.5), 2.5); // clamp between 0.5x and 2.5x
  localStorage.setItem(STORAGE_KEY, safeScale);
  document.documentElement.style.setProperty('--font-scale', safeScale);
}

/**
 * Attach slider or UI controls
 */
export function bindFontControls() {
  const range = document.getElementById('fontSlider');
  if (range) {
    range.value = parseFloat(localStorage.getItem(STORAGE_KEY)) || 1;
    range.addEventListener('input', e => {
      updateFontScale(parseFloat(e.target.value));
    });
  }
}

