import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatClock, formatDate, formatDuration, formatShortClock, toRoman } from '../js/lib/format.js';

test('toRoman covers chapter and book numbers', () => {
  assert.deepEqual([1, 4, 6, 9, 12, 14, 40].map(toRoman), ['I', 'IV', 'VI', 'IX', 'XII', 'XIV', 'XL']);
});

test('formatDuration matches the design ("2 h 41 m", zero-padded minutes)', () => {
  assert.equal(formatDuration(9660), '2 h 41 m');
  assert.equal(formatDuration(10920), '3 h 02 m');
  assert.equal(formatDuration(59), '0 h 00 m');
});

test('formatDate reads ISO dates without a time-zone shift', () => {
  assert.equal(formatDate('2026-06-03'), 'June 3, 2026');
  assert.equal(formatDate('2024-12-25'), 'December 25, 2024');
  assert.equal(formatDate('2025-01-01'), 'January 1, 2025');
});

test('playback clocks', () => {
  assert.equal(formatClock(724), '0:12:04');
  assert.equal(formatClock(9420), '2:37:00');
  assert.equal(formatClock(-5), '0:00:00');
  assert.equal(formatShortClock(724), '0:12');
  assert.equal(formatShortClock(9420), '2:37');
});
