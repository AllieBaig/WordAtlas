// File: scripts/utils/modeLoader.js
// Features:
// - Dynamically loads mode from original or fallback (Site1)
// - Calls `init({ showMenu })` on success
//
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

export async function loadGameMode(file, showMenu) {
  const base = '/WordAtlas/scripts/modes/';
  const fallback = '/WordAtlas/Site1/scripts/modes/';
  const useFallback = localStorage.getItem('wordatlas-use-site1') === 'true';

  const tryImport = async (path) => {
    try {
      const mod = await import(path + file);
      if (mod?.default) {
        mod.default({ showMenu });
        console.log(`✅ Loaded mode from ${path}${file}`);
        return true;
      }
    } catch (e) {
      console.warn(`⚠️ Failed to load ${file} from ${path}`, e);
    }
    return false;
  };

  if (useFallback) {
    await tryImport(fallback) || tryImport(base);
  } else {
    await tryImport(base) || tryImport(fallback);
  }
}

