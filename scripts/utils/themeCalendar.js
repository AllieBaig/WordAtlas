

// File: scripts/utils/themeCalendar.js
// MIT License — https://github.com/AllieBaig/WordAtlas/blob/main/LICENSE

const themes = [
  { date: '01-01', name: 'New Year', emoji: '🎉', colors: { bg: '#001F3F', btn: '#FFDC00' } },
  { date: '02-14', name: 'Valentine’s Day', emoji: '❤️', colors: { bg: '#FFF0F5', btn: '#FF69B4' } },
  { date: '02-10', name: 'Lunar New Year', emoji: '🐲', colors: { bg: '#FFEFCC', btn: '#B22222' } },
  { date: '03-17', name: 'St. Patrick’s Day', emoji: '☘️', colors: { bg: '#004225', btn: '#00FF7F' } },
  { date: '04-22', name: 'Earth Day', emoji: '🌍', colors: { bg: '#0F3', btn: '#222' } },
  { date: '07-04', country: 'US', name: 'US Independence Day', emoji: '🎆', colors: { bg: '#002868', btn: '#BF0A30' } },
  { date: '08-15', country: 'IN', name: 'India Independence Day', emoji: '🇮🇳', colors: { bg: '#F5F5F5', btn: '#FF9933' } },
  { date: '10-31', name: 'Halloween', emoji: '🎃', colors: { bg: '#222', btn: '#FF7518' } },
  { date: '11-24', name: 'Thanksgiving', emoji: '🦃', colors: { bg: '#F6E2B3', btn: '#6B4226' } },
  { date: '12-25', name: 'Christmas', emoji: '🎄', colors: { bg: '#004225', btn: '#C1121F' } },
  { date: '12-31', name: 'New Year’s Eve', emoji: '🕛', colors: { bg: '#000', btn: '#FFD700' } }
];

function getTodayKey() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}-${dd}`;
}

export function getThemeForToday(countryCode = '') {
  const key = getTodayKey();
  const match = themes.find(t => t.date === key && (!t.country || t.country === countryCode.toUpperCase()));
  return match || null;
}

