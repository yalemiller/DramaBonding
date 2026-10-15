// Display formatting for numerals, durations, dates and playback clocks.

const NUMERALS = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];

const pad2 = n => String(n).padStart(2, '0');

/** 1 → "I", 14 → "XIV". */
export function toRoman(n) {
  let rest = n;
  let out = '';
  for (const [value, symbol] of NUMERALS) {
    while (rest >= value) {
      out += symbol;
      rest -= value;
    }
  }
  return out;
}

/** 9660 → "2 h 41 m" */
export function formatDuration(sec) {
  const totalMin = Math.floor(sec / 60);
  return `${Math.floor(totalMin / 60)} h ${pad2(totalMin % 60)} m`;
}

/** "2026-06-03" → "June 3, 2026", read as a calendar date with no time-zone shift. */
export function formatDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** 724 → "0:12:04" */
export function formatClock(sec) {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 3600)}:${pad2(Math.floor((s % 3600) / 60))}:${pad2(s % 60)}`;
}

/** 724 → "0:12" (hours and minutes, used where space is tight). */
export function formatShortClock(sec) {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 3600)}:${pad2(Math.floor((s % 3600) / 60))}`;
}
