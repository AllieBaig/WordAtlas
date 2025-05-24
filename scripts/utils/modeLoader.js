
// File: scripts/utils/modeLoader.js
// Features:
// - Dynamically loads ES modules from /scripts or /Site1
// - Falls back and flags fallback status visually
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

import { showError } from './errorUI.js';

const useSite1 = localStorage.getItem('wordatlas-use-site1') === 'true';
const primaryBase = './scripts/modes/';
const fallbackBase = './Site1/scripts/modes/';

export async function loadGameMode(file, showMenu) {
  const base = useSite1 ? fallbackBase : primaryBase;
  try {
    const mod = await import(base + file);
    mod.default?.({ showMenu });
  } catch (err) {
    console.warn(`Failed to load ${file} from ${base}`, err);
    if (!useSite1) {
      try {
        const fallbackMod = await import(fallbackBase + file);
        fallbackMod.default?.({ showMenu });
        document.body.classList.add('fallback-active');
      } catch {
        showError(`❌ Cannot load mode "${file}" from original or backup.`);
      }
    } else {
      showError(`⚠️ Failed to load "${file}" from Site1.`);
    }
  }
}

