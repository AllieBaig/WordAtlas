// File: scripts/utils/randomizer.js
// Features:
// - Provides reusable functions for shuffling, picking random items
// - Ensures no repeat of correct answers if desired
// - Can be used across modes like Dice, Safari, Word Relic, Trail
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Shuffle an array using Fisher-Yates algorithm.
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
 * Pick one random item from array.
 * @param {Array} list 
 * @returns random item
 */
export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Pick a random item NOT in usedSet (e.g., previous correct answers)
 * @param {Array} list 
 * @param {Set} usedSet 
 * @returns item or null
 */
export function pickUniqueRandom(list, usedSet = new Set()) {
  const filtered = list.filter(item => !usedSet.has(item));
  if (!filtered.length) return null;
  return pickRandom(filtered);
}

/**
 * Random alphabet letter (A-Z)
 */
export function randomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
}

/**
 * Pick N unique items from array
 * @param {Array} array 
 * @param {Number} count 
 */
export function pickMany(array, count = 1) {
  return shuffleArray(array).slice(0, count);
}

