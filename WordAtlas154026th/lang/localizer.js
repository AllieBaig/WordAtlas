
// File: scripts/lang/localizer.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import langData from './lang.json' assert { type: 'json' };

/**
 * Gets the user's language preference from localStorage
 */
export function getLang() {
  return localStorage.getItem('lang') || 'en';
}

/**
 * Returns the localized dictionary
 */
export function getLangPack() {
  const lang = getLang();
  return langData[lang] || langData.en;
}

/**
 * Apply translations to elements with [data-i18n]
 */
export function applyTranslations() {
  const t = getLangPack();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
}
