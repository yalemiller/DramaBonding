// Hero: the current book on the left, its key art in an arch, and the latest episode.

import { html, setHTML } from './dom.js';
import { bookNumeral, currentBookIndex, latestEpisode } from '../lib/catalog.js';
import { formatDate, formatDuration } from '../lib/format.js';

export function renderHero(el, { books, site }) {
  const bookIdx = currentBookIndex(books);
  const book = books[bookIdx];
  const num = bookNumeral(bookIdx);
  const latest = latestEpisode(books);

  el.classList.toggle('is-ornate', site.ornateHero);
  setHTML(el, html`
    <div class="hero__rays" aria-hidden="true"></div>
    <div class="hero__rings" aria-hidden="true"></div>

    <div class="hero__intro">
      <p class="eyebrow">Now unfolding · Book ${num}</p>
      <h1 class="hero__title">${book.title}</h1>
      ${book.tagline ? html`<p class="hero__tagline">${book.tagline}</p>` : ''}
      <button type="button" class="hero__begin d-only" data-action="begin">New here? Begin with Book I</button>
    </div>

    <div class="arch arch--hero">
      ${book.keyArt
        ? html`<img class="arch__inner" src="${book.keyArt}" alt="Key art for Book ${num}, ${book.title}">`
        : html`<div class="arch__inner ph" aria-hidden="true"><span>book ${num} key art</span></div>`}
    </div>

    ${latest ? html`
      <div class="hero__latest">
        <div class="hero__latest-text">
          <p class="eyebrow eyebrow--latest">Latest · <span class="d-only">Episode ${latest.number}</span><span class="m-only">Chapter ${latest.numeral}</span></p>
          <p class="hero__latest-title">${latest.title}</p>
          <p class="hero__latest-meta">${formatDuration(latest.durationSec)}<span class="d-only"> · ${formatDate(latest.releaseDate)}</span></p>
        </div>
        <button type="button" class="hero__play" data-play="${latest.ref.book}:${latest.ref.episode}">
          <span class="hero__play-icon" aria-hidden="true"></span><span class="hero__play-text">Play episode</span>
        </button>
      </div>` : ''}
  `);
}
