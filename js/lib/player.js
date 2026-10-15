// Player state transitions. The audio element itself lives in js/integrations/audio.js.

import { formatClock, formatShortClock } from './format.js';

/** @typedef {import('./catalog.js').EpisodeRef} EpisodeRef */
/** @typedef {{ current: EpisodeRef|null, paused: boolean, position: number }} PlayerState */

/** @type {PlayerState} */
export const idlePlayer = Object.freeze({ current: null, paused: false, position: 0 });

export const sameRef = (a, b) => !!(a && b && a.book === b.book && a.episode === b.episode);

export const isCurrent = (player, ref) => sameRef(player.current, ref);

export const isPlaying = (player, ref) => isCurrent(player, ref) && !player.paused;

/** Play button pressed: toggles pause on the current episode, otherwise starts the new one from 0. */
export function selectEpisode(player, ref) {
  if (isCurrent(player, ref)) return { ...player, paused: !player.paused };
  return { current: { book: ref.book, episode: ref.episode }, paused: false, position: 0 };
}

export function togglePause(player) {
  return player.current ? { ...player, paused: !player.paused } : player;
}

export function closePlayer() {
  return idlePlayer;
}

export function setPosition(player, sec, durationSec) {
  if (!player.current) return player;
  return { ...player, position: Math.min(Math.max(0, sec), durationSec || Infinity) };
}

/** The episode reached its end: stay on it, paused at the end. */
export function finish(player, durationSec) {
  return player.current ? { ...player, paused: true, position: durationSec } : player;
}

/** Labels and progress for the player bar. */
export function playerView(player, durationSec) {
  const dur = durationSec || 0;
  const pos = Math.min(player.position, dur);
  return {
    progressPct: dur ? (pos / dur) * 100 : 0,
    timeLabel: `${formatClock(pos)} / ${formatClock(dur)}`,
    shortTimeLabel: `${formatShortClock(pos)} / ${formatShortClock(dur)}`
  };
}
