

// File: scripts/utils/easyModeChoices.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Returns 3 choices for a category with 1 correct
 * @param {string} category - One of: name, place, animal, thing
 * @param {string} letter - Filter correct answer by this starting letter (optional)
 */
export function getEasyChoices(category, letter = '') {
  const wordBank = {
    name: ['Alice', 'George', 'Pineapple'],
    place: ['Paris', 'Shoe', 'Berlin'],
    animal: ['Tiger', 'Table', 'Elephant'],
    thing: ['Book', 'Spoon', 'Tiger']
  };

  const all = wordBank[category] || [];
  const correct = all.find(w => letter ? w.toLowerCase().startsWith(letter.toLowerCase()) : true) || all[0];
  const wrong = all.filter(w => w !== correct).sort(() => 0.5 - Math.random()).slice(0, 2);
  const options = [...wrong, correct].sort(() => 0.5 - Math.random());

  return {
    correct,
    options
  };
}

