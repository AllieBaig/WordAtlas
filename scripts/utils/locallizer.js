
// File: scripts/utils/localizer.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Localizer module
 * Loads UI text strings based on user's selected language.
 * Used in menus, settings, and gameplay UI.
 */

import langData from './lang.json' assert { type: 'json' };

/**
 * Get translation dictionary for current language
 */
export function getLangPack() {
  const lang = localStorage.getItem('lang') || 'en';
  return langData[lang] || langData.en;
}

/**
 * Replace all elements with [data-i18n="key"] using the dictionary
 */
export function applyTranslations() {
  const t = getLangPack();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
}
