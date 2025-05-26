// File: scripts/utils/randomizer.js
// Features:
// - Reusable random tools for games: shuffle, pick, no-repeat, letter
// - Supports unique question pulls per session
// - Ideal for Dice, Trail, Safari, Versus, and Relic modes
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array
 * @returns {Array} shuffled copy
 */
export function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Pick one random item from list
 * @param {Array} list
 * @returns any
 */
export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Pick N unique items from an array
 * @param {Array} list
 * @param {number} count
 */
export function pickMany(list, count = 1) {
  return shuffleArray(list).slice(0, count);
}

/**
 * Pick one item not in `usedSet`
 * @param {Array} list
 * @param {Set} usedSet
 */
export function pickUniqueRandom(list, usedSet = new Set()) {
  const available = list.filter(item => !usedSet.has(item));
  return available.length ? pickRandom(available) : null;
}

/**
 * Pick a letter from A-Z
 * @returns {string} single uppercase letter
 */
export function randomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

/**
 * Generate a randomized category challenge (e.g. Dice or Trail)
 * @param {Array} categories
 * @param {Set} seenCombos
 * @returns {Object} like { letter: 'M', categories: ['Name', 'Animal', 'Place'] }
 */
export function generateCategoryChallenge(categories = ['Name', 'Place', 'Animal', 'Thing'], seenCombos = new Set()) {
  const letter = randomLetter();
  const picked = pickMany(categories, 3);
  const key = `${letter}-${picked.join('-')}`;
  if (seenCombos.has(key)) return generateCategoryChallenge(categories, seenCombos);
  seenCombos.add(key);
  return { letter, categories: picked };
}

