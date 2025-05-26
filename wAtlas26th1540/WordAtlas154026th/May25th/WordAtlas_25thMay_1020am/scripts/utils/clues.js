// File: scripts/utils/clues.js
// Features:
// - Provides data for Word Relic and Word Safari modes.
// - Exports getClueSet to provide formatted data for Word Relic.
//
// License: MIT — https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

// Data for Word Relic mode
// Each item has 'clues' (an array of hints) and 'answer' (the single word solution)
export const relicClues = [
  {
    clues: ["You can write with it", "It's often blue or black", "Found on desks", "Used for signing"],
    answer: "Pen"
  },
  {
    clues: ["Flies in the sky", "Has engines", "Takes passengers", "Needs a runway"],
    answer: "Airplane"
  },
  {
    clues: ["Lives in water", "Has gills", "Often eaten", "Can be a pet"],
    answer: "Fish"
  },
  {
    clues: ["Worn on feet", "Comes in pairs", "Used for walking", "Has laces"],
    answer: "Shoes"
  },
  {
    clues: ["It tells time", "Worn on the wrist", "Has hands or a digital display", "Tick-tock"],
    answer: "Watch"
  },
  {
    clues: ["You sit on it", "Often made of wood or metal", "Has four legs", "Found at a table"],
    answer: "Chair"
  }
];

// Data for Word Safari mode
export const safariPrompts = {
  name: [
    "A name starting with a vowel",
    "A royal name",
    "A name that sounds musical",
    "A short 3-letter name",
    "A name from a famous book"
  ],
  place: [
    "A place in Asia",
    "A city you want to visit",
    "A beach destination",
    "A historical landmark",
    "A place known for its food"
  ],
  animal: [
    "An animal with stripes",
    "A fast animal",
    "An animal that swims",
    "A nocturnal creature",
    "A creature from a fairytale"
  ],
  thing: [
    "Something you can wear",
    "A round object",
    "A kitchen item",
    "Something electronic",
    "An object found in space"
  ]
};

/**
 * Selects a random clue set from `relicClues` and formats it
 * to match the structure expected by `wordRelic.js`.
 * Assumes the single 'answer' applies to all 'name', 'place', 'animal', 'thing' categories.
 * @returns {{clue: string, answerSet: {name: string, place: string, animal: string, thing: string}}}
 */
export function getClueSet() {
  const randomIndex = Math.floor(Math.random() * relicClues.length);
  const selectedRelic = relicClues[randomIndex];

  // Combine multiple clues into a single string for display in Word Relic mode
  const combinedClue = selectedRelic.clues.join(', ');

  // Create the answerSet where the single 'answer' applies to all categories
  const answerSet = {
    name: selectedRelic.answer,
    place: selectedRelic.answer,
    animal: selectedRelic.answer,
    thing: selectedRelic.answer
  };

  return {
    clue: combinedClue,
    answerSet: answerSet
  };
}
