

// File: scripts/utils/nearbySim.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Simulate a list of nearby players with mock data
 * @param {Object} location - User location info (lat, lng, city, country)
 * @param {number} count - Number of fake players to generate
 * @returns {Array<Object>} - Array of simulated player objects
 */
export function simulateNearbyPlayers(location = {}, count = 5) {
  const nicknames = [
    'WordWolf', 'QuizQueen', 'AlphaAce', 'LingoLion', 'VocabViking',
    'PuzzlePanther', 'GrammarGhost', 'SilentScholar', 'TypingTornado'
  ];

  const sampleWords = ['Café', 'Berlin', 'Amor', 'Dragon', 'Otter', 'Helsinki'];

  const players = Array.from({ length: count }).map((_, i) => {
    const idSuffix = Math.floor(Math.random() * 900 + 100);
    const nickname = `${nicknames[i % nicknames.length]}${idSuffix}`;

    return {
      id: `player-${idSuffix}`,
      nickname,
      distance: (Math.random() * 30 + 1).toFixed(1), // 1–30 km
      lastWord: Math.random() > 0.3 ? sampleWords[Math.floor(Math.random() * sampleWords.length)] : null,
      city: location.city || 'Unknown',
      country: location.country || 'Earth',
      lastActive: Date.now() - Math.floor(Math.random() * 600000),
      xp: Math.floor(Math.random() * 200 + 50),
      badge: ['⭐', '🏅', '🥈', '👑'][Math.floor(Math.random() * 4)]
    };
  });

  return players;
}

