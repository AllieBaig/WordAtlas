// File: scripts/utils/fontControls.js
// Edited by Gemini (Renamed applyFontSettings to applyFontScaling to match main.js import)
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

// Renamed to applyFontScaling to match main.js import
export function applyFontScaling(mode = 'global') {
    const key = `fontSize-${mode}`;
    const fontSize = localStorage.getItem(key) || '100';
    document.documentElement.style.fontSize = `${fontSize}%`;
}

export function setFontSize(percent, mode = 'global') {
    const key = `fontSize-${mode}`;
    document.documentElement.style.fontSize = `${percent}%`;
    localStorage.setItem(key, percent);
}

export function getFontSize(mode = 'global') {
    return parseInt(localStorage.getItem(`fontSize-${mode}`) || '100', 10);
}

export function isResponsiveFont() {
    return localStorage.getItem('fontResponsive') !== 'false';
}

export function toggleResponsiveFont(enable) {
    localStorage.setItem('fontResponsive', enable ? 'true' : 'false');
    document.body.classList.toggle('fixed-font', !enable);
}


