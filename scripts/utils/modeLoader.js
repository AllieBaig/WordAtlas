// File: scripts/utils/modeLoader.js
// Dynamically loads mode modules with fallback to Site1
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { showError } from './errorUI.js';

const useSite1 = localStorage.getItem('wordatlas-use-site1') === 'true';
const base = useSite1 ? './Site1/scripts/modes/' : './scripts/modes/';
const fallback = './Site1/scripts/modes/';

export async function loadGameMode(file, showMenu) {
  try {
    const mod = await import(base + file);
    mod.default?.({ showMenu });
  } catch (err) {
    console.warn(`Primary failed: ${file}`, err);
    if (!useSite1) {
      try {
        const fallbackMod = await import(fallback + file);
        fallbackMod.default?.({ showMenu });
        document.body.classList.add('fallback-active');
      } catch {
        showError(`❌ Could not load mode "${file}"`);
      }
    } else {
      showError(`❌ Failed loading mode "${file}" from Site1`);
    }
  }
}

