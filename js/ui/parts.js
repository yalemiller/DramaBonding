// Markup shared across sections: ornaments, labels, chapter rows, play buttons and cast photos.

import { html } from './dom.js';
import { isCurrent, isPlaying } from '../lib/player.js';

export const diamond = (mod = '') => html`<span class="diamond ${mod}" aria-hidden="true"></span>`;

/** `[rule] ◆ TITLE ◆ [rule]` */
export const sectionHead = (id, title) => html`
  <div class="section-head">
    <span class="section-head__rule" aria-hidden="true"></span>${diamond()}
    <h2 class="section-head__title" id="${id}">${title}</h2>
    ${diamond()}<span class="section-head__rule" aria-hidden="true"></span>
  </div>`;

/** Half of the filigree bar: dot, rounded double rule, outlined diamond, ringed diamond. */
export const filigree = (mod = '') => html`
  <span class="filigree ${mod}" aria-hidden="true">
    <span class="filigree__dot"></span><span class="filigree__rule"></span>
    <span class="filigree__diamond"></span><span class="filigree__ring"></span>
  </span>`;

/** The symmetric bar under a cast member's name. */
export const filigreeBar = () => html`
  <span class="filigree-bar" aria-hidden="true">
    <span class="filigree__dot"></span><span class="filigree__rule"></span><span class="filigree__diamond"></span>
    <span class="filigree__ring"></span>
    <span class="filigree__diamond"></span><span class="filigree__rule"></span><span class="filigree__dot"></span>
  </span>`;

/** Small uppercase label followed by a hairline. */
export const pageLabel = text => html`
  <div class="label"><h4 class="label__text">${text}</h4><span class="label__rule" aria-hidden="true"></span></div>`;

export const ringDivider = () => html`<span class="ring-divider" aria-hidden="true"><span></span></span>`;

export const themesList = themes => html`<ul class="themes">${themes.map(t => html`<li>${t}</li>`)}</ul>`;

/** Round play/pause button for a chapter. State classes are applied by syncPlayButtons. */
export const playButton = (ep, mod = '') => html`
  <button type="button" class="play-btn ${mod}" data-play="${ep.ref.book}:${ep.ref.episode}"
    data-label="chapter ${ep.numeral}, ${ep.title}" aria-label="Play chapter ${ep.numeral}, ${ep.title}">
    <span class="icon-play" aria-hidden="true"></span><span class="icon-pause" aria-hidden="true"></span>
  </button>`;

/** One row of a book's contents: numeral, title, and a play button or an "upcoming" marker. */
export const chapterRow = (ep, mod = '') => html`
  <li class="ep${ep.released ? '' : ' ep--upcoming'}">
    <span class="ep__num">${ep.numeral}.</span>
    <span class="ep__title">${ep.title}</span>
    ${ep.released
      ? playButton(ep, mod)
      : html`<span class="ep__soon ${mod}" aria-hidden="true"></span><span class="sr-only">Coming soon</span>`}
  </li>`;

/** Standard photo with the "fun" shot stacked on top, or a placeholder when there are no photos yet. */
export function castPhotos(member, { alt = '', placeholder = 'photo', phClass = 'ph' } = {}) {
  if (!member.photoStd) return html`<span class="${phClass}" aria-hidden="true">${placeholder}</span>`;
  return html`
    <img class="photo" src="${member.photoStd}" alt="${alt}" loading="lazy" decoding="async">
    ${member.photoFun ? html`<img class="photo photo--fun" src="${member.photoFun}" alt="" loading="lazy" decoding="async">` : ''}`;
}

/** Applies the current/playing state to every chapter play button under `root`. */
export function syncPlayButtons(root, player) {
  root.querySelectorAll('.play-btn[data-play]').forEach(btn => {
    const [book, episode] = btn.dataset.play.split(':').map(Number);
    const ref = { book, episode };
    const playing = isPlaying(player, ref);
    btn.classList.toggle('is-current', isCurrent(player, ref));
    btn.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${btn.dataset.label}`);
  });
}
