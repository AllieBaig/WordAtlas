// Timestamp: 2025-05-26 18:12
// File: scripts/utils/dailyPrompt.js
// Fix Summary: Corrected the URL path for mixlingoWords.json to use an absolute path from the root,
//              ensuring words load correctly regardless of the script's location.
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const MIXLINGO_CACHE_KEY = 'mixlingoPrompt';
const WORDS_URL = '/lang/mixlingoWords.json'; // Changed to absolute path from root

/**
 * Returns current hour key as YYYY-MM-DD-HH
 */
function getHourKey() {
  const now = new Date();
  return now.toISOString().slice(0, 13); // '2025-05-26T15' -> '2025-05-26T15'
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
    if (!res.ok) { // Check for HTTP errors (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${res.status}`);
    }
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
    console.warn('MixLingo JSON load failed or network error, using fallback.', err);
    // If fetching fails AND there's no cache, provide a default prompt
    return cached.prompt || {
      word: 'Hello',
      language: 'English',
      meaning: 'A common greeting',
      tip: 'Use it to start a conversation.'
    };
  }
}
