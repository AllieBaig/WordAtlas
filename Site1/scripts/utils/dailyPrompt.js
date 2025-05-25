
// File: scripts/utils/dailyPrompt.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const STORAGE_KEY = 'dailyPrompts';

/**
 * Returns today's YYYY-MM-DD string
 */
function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Returns stored prompts for all modes
 */
function getStoredPrompts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

/**
 * Saves a prompt for today + mode
 */
function storePrompt(mode, prompt) {
  const all = getStoredPrompts();
  const today = getTodayKey();

  if (!all[today]) all[today] = {};
  all[today][mode] = prompt;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/**
 * Retrieves today's prompt for a given mode, or generates one
 */
export function getDailyPrompt(mode = 'default') {
  const all = getStoredPrompts();
  const today = getTodayKey();

  if (all[today]?.[mode]) {
    return all[today][mode];
  }

  const prompt = generatePrompt(mode);
  storePrompt(mode, prompt);
  return prompt;
}

/**
 * Customizable prompt pool
 */
function generatePrompt(mode) {
  const basePrompts = {
    default: ['Inspire', 'Create', 'Explore', 'Discover', 'Transform'],
    wordRelic: ['Ancient Wisdom', 'Hidden Chamber', 'Lost Scroll'],
    wordSafari: ['Savanna', 'Jungle', 'Rainforest', 'Outback'],
    dice: ['Quick Thinker', 'Wildcard', 'Roll Again'],
    trail: ['Frost Forest', 'Sky Isles', 'Golden Caves'],
    mixlingo: ['Bonjour', 'Guten Tag', 'Hola', 'Здравствуйте', '你好']
  };

  const pool = basePrompts[mode] || basePrompts.default;
  return pool[Math.floor(Math.random() * pool.length)];
}
