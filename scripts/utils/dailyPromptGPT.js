
const MIXLINGO_CACHE_KEY = 'mixlingoPrompt';
const WORDS_URL = './lang/mixlingoWords.json';

/**
 * Returns current hour key as YYYY-MM-DD-HH
 */
function getHourKey() {
  const now = new Date();
  return now.toISOString().slice(0, 13); // '2025-05-26T15' → '2025-05-26T15'
}

/**
 * Get hourly mixlingo prompt with localStorage fallback
 */
export async function getHourlyMixlingoPrompt() {
  const hourKey = getHourKey();
  const cached = JSON.parse(localStorage.getItem(MIXLINGO_CACHE_KEY) || '{}');

  if (cached?.key === hourKey && cached.prompt) {
    return cached.prompt;
  }

  try {
    const res = await fetch(WORDS_URL);
    const words = await res.json();
    const random = words[Math.floor(Math.random() * words.length)];

    const prompt = {
      word: random.word,
      language: random.language,
      meaning: random.meaning,
      tip: random.tip
    };

    localStorage.setItem(MIXLINGO_CACHE_KEY, JSON.stringify({
      key: hourKey,
      prompt
    }));

    return prompt;
  } catch (err) {
    console.warn('MixLingo JSON load failed, using fallback.', err);
    return cached.prompt || {
      word: 'Hello',
      language: 'English',
      meaning: 'A common greeting',
      tip: 'Use it to start a conversation.'
    };
  }
}
