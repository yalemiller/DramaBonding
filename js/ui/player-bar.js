// Global player: a bar fixed to the bottom on desktop, a floating card on mobile.

import { html, setHTML } from './dom.js';
import { getEpisode } from '../lib/catalog.js';
import { playerView } from '../lib/player.js';

export function mountPlayerBar(el, { books }) {
  setHTML(el, html`
    <div class="player__track" aria-hidden="true"><div class="player__fill"></div></div>
    <div class="player__row">
      <button type="button" class="player__toggle" data-action="toggle-play" aria-label="Pause">
        <span class="icon-play" aria-hidden="true"></span><span class="icon-pause" aria-hidden="true"></span>
      </button>
      <div class="player__info">
        <p class="player__eyebrow">Book <span data-slot="book"></span> · <span class="d-only">Episode <span data-slot="episode"></span></span><span class="m-only" data-slot="short-time"></span></p>
        <p class="player__title" data-slot="title"></p>
      </div>
      <p class="player__time d-only" data-slot="time"></p>
      <button type="button" class="player__close" data-action="close-player" aria-label="Close player">×</button>
    </div>`);

  const slot = name => el.querySelector(`[data-slot="${name}"]`);
  const fill = el.querySelector('.player__fill');
  const toggle = el.querySelector('.player__toggle');

  return function update(state) {
    const { player } = state;
    const episode = player.current && getEpisode(books, player.current);
    el.hidden = !episode;
    document.body.classList.toggle('has-player', !!episode);
    if (!episode) return;

    const view = playerView(player, episode.durationSec);
    slot('book').textContent = episode.bookNumeral;
    slot('episode').textContent = String(episode.number);
    slot('title').textContent = episode.title;
    slot('time').textContent = view.timeLabel;
    slot('short-time').textContent = view.shortTimeLabel;
    fill.style.width = `${view.progressPct.toFixed(2)}%`;
    toggle.classList.toggle('is-paused', player.paused);
    toggle.setAttribute('aria-label', player.paused ? 'Play' : 'Pause');
  };
}
