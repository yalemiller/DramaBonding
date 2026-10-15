import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  closePlayer, finish, idlePlayer, isCurrent, isPlaying, playerView, selectEpisode, setPosition, togglePause
} from '../js/lib/player.js';

const a = { book: 3, episode: 5 };
const b = { book: 0, episode: 1 };

test('selecting an episode starts it from the beginning', () => {
  const p = selectEpisode(idlePlayer, a);
  assert.deepEqual(p, { current: a, paused: false, position: 0 });
  assert.ok(isCurrent(p, a));
  assert.ok(isPlaying(p, a));
  assert.ok(!isCurrent(p, b));
});

test('selecting the current episode toggles pause and keeps the position', () => {
  const playing = { current: a, paused: false, position: 42 };
  const paused = selectEpisode(playing, a);
  assert.deepEqual(paused, { current: a, paused: true, position: 42 });
  assert.ok(!isPlaying(paused, a));
  assert.deepEqual(selectEpisode(paused, a), playing);
});

test('selecting a different episode switches and resets the position', () => {
  const p = selectEpisode({ current: a, paused: true, position: 42 }, b);
  assert.deepEqual(p, { current: b, paused: false, position: 0 });
});

test('togglePause does nothing without an episode', () => {
  assert.equal(togglePause(idlePlayer), idlePlayer);
  assert.equal(togglePause({ current: a, paused: false, position: 3 }).paused, true);
});

test('closing stops playback and hides the player', () => {
  assert.deepEqual(closePlayer(), { current: null, paused: false, position: 0 });
});

test('positions are clamped to the episode length', () => {
  const p = { current: a, paused: false, position: 0 };
  assert.equal(setPosition(p, 120, 100).position, 100);
  assert.equal(setPosition(p, -3, 100).position, 0);
  assert.equal(setPosition(p, 50, 100).position, 50);
  assert.equal(setPosition(idlePlayer, 50, 100), idlePlayer);
});

test('finishing pauses at the end', () => {
  assert.deepEqual(finish({ current: a, paused: false, position: 99 }, 100), { current: a, paused: true, position: 100 });
});

test('playerView labels match both player layouts', () => {
  const view = playerView({ current: a, paused: false, position: 724 }, 9420);
  assert.equal(view.timeLabel, '0:12:04 / 2:37:00');
  assert.equal(view.shortTimeLabel, '0:12 / 2:37');
  assert.ok(Math.abs(view.progressPct - (724 / 9420) * 100) < 1e-9);
  assert.equal(playerView({ current: a, paused: false, position: 5 }, 0).progressPct, 0);
});
