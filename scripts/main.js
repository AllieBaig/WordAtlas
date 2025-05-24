// File: scripts/main.js
// License: MIT — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE
import { registerGlobalErrorHandlers } from './utils/errorHandler.js';
import { injectDebugTools } from './utils/debugTools.js';

document.addEventListener('DOMContentLoaded', () => {
  registerGlobalErrorHandlers();
  injectDebugTools();
});
