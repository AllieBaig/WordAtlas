
// File: scripts/lang/regularLang.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Loads and applies localized text for Regular Mode in French.
 */

export async function applyRegularLang(lang = 'fr') {
  try {
    const res = await fetch(`./scripts/lang/regular.${lang}.json`);
    const dict = await res.json();

    const update = (selector, key) => {
      const el = document.querySelector(selector);
      if (el && dict[key]) el.textContent = dict[key];
    };

    update('h2[data-key="title"]', 'title');
    update('p[data-key="description"]', 'description');
    update('label[for="name"]', 'nameLabel');
    update('label[for="place"]', 'placeLabel');
    update('label[for="animal"]', 'animalLabel');
    update('label[for="thing"]', 'thingLabel');
    update('#submitBtn', 'submit');
    update('#backBtn', 'back');
    update('#hintBtn', 'hint');
  } catch (err) {
    console.warn('Language file missing or invalid for regular mode:', err);
  }
}
