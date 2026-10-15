// Mobile books: four spines on a shelf, with the selected book's contents in a framed panel below.

import { html, setHTML } from './dom.js';
import { bookContents, bookNumeral } from '../lib/catalog.js';
import { chapterRow, filigree, pageLabel, ringDivider, syncPlayButtons, themesList } from './parts.js';

const SPINE_HEIGHTS = ['88%', '100%', '82%', '94%'];
const SWAP_DELAY_MS = 280;

const panelMarkup = (books, i) => {
  const book = books[i];
  return html`
    <div class="m-panel__intro">
      <div class="spread__head">
        <p class="spread__num">BOOK ${bookNumeral(i)}</p>
        <h3 class="spread__title">${book.title}</h3>
        ${ringDivider()}
      </div>
      <div class="spread__block">${pageLabel('The tale')}<p class="spread__blurb">${book.blurb}</p></div>
      <div class="spread__block">${pageLabel('Themes')}${themesList(book.themes)}</div>
    </div>
    <div class="m-panel__contents">
      <div class="contents-head">${filigree('filigree--sm')}<h4 class="contents-head__title">CONTENTS</h4>${filigree('filigree--sm filigree--end')}</div>
      <ol class="contents__list">${bookContents(books, i).map(ep => chapterRow(ep, 'play-btn--lg'))}</ol>
      <div class="m-panel__warnings">
        <h4 class="label__text">Content warnings</h4>
        <p class="spread__warnings">${book.warnings}</p>
      </div>
    </div>`;
};

export function mountMobileBooks(el, { books }) {
  setHTML(el, html`
    <div class="m-shelf">
      <div class="m-shelf__row">
        ${books.map((book, i) => html`
          <button type="button" class="m-spine" data-open-book="${i}" aria-pressed="false" aria-controls="m-book-panel"
            style="--spine:${book.spineColor};--h:${SPINE_HEIGHTS[i % SPINE_HEIGHTS.length]}">
            <span class="m-spine__top" aria-hidden="true"><span class="dbl-rule"></span><span class="ring ring--sm">${bookNumeral(i)}</span></span>
            <span class="m-spine__mid" aria-hidden="true"><span class="m-spine__title">${book.title}</span></span>
            <span class="dbl-rule" aria-hidden="true"></span>
            <span class="sr-only">Book ${bookNumeral(i)}, ${book.title}</span>
          </button>`)}
      </div>
      <div class="m-shelf__line" aria-hidden="true"></div>
      <p class="m-shelf__hint">Tap a book to read inside</p>
    </div>
    <div class="m-panel" id="m-book-panel"></div>`);

  const spines = [...el.querySelectorAll('.m-spine')];
  const panel = el.querySelector('.m-panel');
  let picked = null;
  let latest = null;
  let timer = null;

  const showBook = i => {
    panel.style.setProperty('--spine', books[i].spineColor);
    setHTML(panel, panelMarkup(books, i));
    syncPlayButtons(panel, latest.player);
  };

  return function update(state) {
    latest = state;
    if (state.openBook !== picked) {
      const first = picked === null;
      picked = state.openBook;
      spines.forEach((spine, i) => spine.setAttribute('aria-pressed', String(i === picked)));
      clearTimeout(timer);
      if (first) {
        showBook(picked);
      } else {
        // Fade the panel out, swap its content, then fade back in.
        panel.classList.add('is-fading');
        timer = setTimeout(() => {
          showBook(picked);
          panel.classList.remove('is-fading');
        }, SWAP_DELAY_MS);
      }
    }
    syncPlayButtons(panel, state.player);
  };
}
