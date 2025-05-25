// File: scripts/utils/errorHandler.js
// Edited by Gemini (Added logModuleImportFailure export)
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

/**
 * Log an error object to localStorage across multiple time-based buckets.
 * Buckets: default, daily, weekly, monthly
 */
export function logError(error) {
    const entry = {
        ...error,
        hint: detectHint(error),
        time: new Date().toLocaleString()
    };

    ['default', 'daily', 'weekly', 'monthly'].forEach(type => {
        const key = type === 'default' ? 'errorLog' : getDateKey(type);
        const logs = JSON.parse(localStorage.getItem(key) || '[]');
        logs.unshift(entry);
        localStorage.setItem(key, JSON.stringify(logs.slice(0, 100)));
    });
}

/**
 * Logs a specific error for when a dynamically imported module fails to provide an expected export.
 * This is called by gameNavigation.js when a game mode module (like regular.js) is missing its 'init' export.
 * @param {string} modulePath - The path of the module that failed to load.
 * @param {string} expectedExport - The name of the export that was expected but not found (e.g., 'init').
 */
export function logModuleImportFailure(modulePath, expectedExport) {
    logError({
        type: 'ModuleLoadFailure',
        message: `Module "${modulePath}" loaded, but missing expected export "${expectedExport}".`,
        source: modulePath,
        stack: `Attempted import of ${expectedExport} from ${modulePath}` // Add a basic stack trace hint
    });
}

/**
 * Get error logs for a specific period: default | daily | weekly | monthly
 */
export function getErrorLog(period = 'default') {
    const key = period === 'default' ? 'errorLog' : getDateKey(period);
    return JSON.parse(localStorage.getItem(key) || '[]');
}

/**
 * Clear all logs (optionally by period)
 */
export function clearErrorLog(period = 'default') {
    const key = period === 'default' ? 'errorLog' : getDateKey(period);
    localStorage.removeItem(key);
}

/**
 * Create localStorage key based on period
 */
function getDateKey(type = 'daily') {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');

    if (type === 'daily') return `errorLog_daily_${yyyy}-${mm}-${dd}`;
    if (type === 'weekly') {
        const firstJan = new Date(yyyy, 0, 1);
        const week = Math.ceil(((now - firstJan) / 86400000 + firstJan.getDay() + 1) / 7);
        return `errorLog_weekly_${yyyy}-W${week}`;
    }
    if (type === 'monthly') return `errorLog_monthly_${yyyy}-${mm}`;
    return 'errorLog';
}

/**
 * Extracts likely script/module name from stack
 */
function extractModuleFromStack(stack = '') {
    const match = stack.match(/(scripts\/[^\s'")]+)/i);
    return match ? match[1] : '';
}

/**
 * Adds developer hints based on message/stack
 */
function detectHint(error) {
    const msg = error?.message?.toLowerCase() || '';
    const stack = error?.stack?.toLowerCase() || '';
    const suspectedModule = extractModuleFromStack(stack);

    if (msg.includes('not a function') || msg.includes('undefined')) {
        return `🔁 Possible circular import or missing export ${suspectedModule ? `in ${suspectedModule}` : ''}`;
    }
    if (msg.includes('unexpected token')) {
        return `🧩 Syntax error — possibly invalid JSON or broken module ${suspectedModule ? `(${suspectedModule})` : ''}`;
    }
    if (msg.includes('dynamically imported module')) {
        return `🌐 Module load failed — check import path or extension ${suspectedModule ? `→ ${suspectedModule}` : ''}`;
    }
    if (msg.includes('cors')) {
        return `🚫 CORS error — check GitHub Pages or fetch policy`;
    }
    if (msg.includes('does not provide an export named')) {
        const missingExport = msg.match(/named '(.*?)'/)?.[1]; // Extract the missing export name
        return `❌ Missing export: "${missingExport}" not found in imported module ${suspectedModule ? `(${suspectedModule})` : ''}`;
    }

    return '';
}

// ========== Global Error Capture ==========

window.addEventListener('error', event => {
    const { message, filename, lineno, colno, error } = event;
    logError({
        type: 'error',
        message,
        source: filename,
        lineno,
        colno,
        stack: error?.stack || ''
    });
});

window.addEventListener('unhandledrejection', event => {
    const message = event.reason?.message || event.reason?.toString() || 'Unhandled rejection';
    const stack = event.reason?.stack || '';
    logError({
        type: 'promise',
        message,
        source: '',
        lineno: '',
        colno: '',
        stack
    });
});
