// Desktop books: a shelf of spines where the open book widens into a two-page spread.

import { html, setHTML } from './dom.js';
import { bookContents, bookNumeral, castForBook } from '../lib/catalog.js';
import { castPhotos, chapterRow, pageLabel, ringDivider, syncPlayButtons, themesList } from './parts.js';

// Staggered closed heights give the hand-shelved look.
const CLOSED_HEIGHTS = ['88%', '96%', '82%', '92%'];

const bookCast = (cast, books, bookIdx) => html`
  <ul class="book-cast">
    ${castForBook(cast, books, bookIdx).map(({ member, characterName }) => html`
      <li class="book-cast__item">
        <span class="book-cast__portrait">${castPhotos(member, { phClass: 'ph ph--fine' })}</span>
        <span class="book-cast__as">${characterName}</span>
        <span class="book-cast__player">${member.name} <span class="book-cast__pronouns">${member.pronouns}</span></span>
      </li>`)}
  </ul>`;

const bookMarkup = (book, i, { books, cast }) => {
  const num = bookNumeral(i);
  return html`
    <div class="book" data-book="${i}" style="--spine:${book.spineColor};--closed-h:${CLOSED_HEIGHTS[i % CLOSED_HEIGHTS.length]}">
      <button type="button" class="book__spine" data-open-book="${i}" aria-label="Open Book ${num}, ${book.title}">
        <span class="book__spine-col" aria-hidden="true">
          <span class="book__spine-end"><span class="dbl-rule"></span><span class="ring">${num}</span></span>
          <span class="book__spine-mid"><span class="book__vtitle">${book.title}</span></span>
          <span class="book__spine-end"><span class="book__year">${book.startYear}</span><span class="dbl-rule"></span></span>
        </span>
      </button>
      <div class="book__spread" role="group" aria-label="Book ${num}, ${book.title}">
        <div class="spread">
          <div class="page page--left">
            <div class="spread__head">
              <p class="spread__num">BOOK ${num}</p>
              <h3 class="spread__title" tabindex="-1">${book.title}</h3>
              ${ringDivider()}
            </div>
            <div class="spread__block">${pageLabel('The tale')}<p class="spread__blurb">${book.blurb}</p></div>
            <div class="spread__block">${pageLabel('Themes')}${themesList(book.themes)}</div>
            <div class="spread__cast">${bookCast(cast, books, i)}</div>
            <div class="spread__block">${pageLabel('Content warnings')}<p class="spread__warnings">${book.warnings}</p></div>
          </div>
          <div class="gutter" aria-hidden="true"><span class="gutter__rule"><span class="gutter__diamond"></span></span></div>
          <div class="page page--right">
            <div class="contents">
              ${pageLabel('Contents')}
              <ol class="contents__list">${bookContents(books, i).map(ep => chapterRow(ep))}</ol>
            </div>
          </div>
        </div>
      </div>
    </div>`;
};

export function mountShelf(el, content) {
  setHTML(el, html`<div class="shelf">${content.books.map((book, i) => bookMarkup(book, i, content))}</div>`);
  const bookEls = [...el.querySelectorAll('.book')];
  let openBook = null;

  return function update(state) {
    if (state.openBook !== openBook) {
      const spineHadFocus = bookEls.some(b => b.querySelector('.book__spine') === document.activeElement);
      openBook = state.openBook;
      bookEls.forEach((bookEl, i) => {
        const open = i === openBook;
        bookEl.classList.toggle('is-open', open);
        bookEl.querySelector('.book__spine').inert = open;
        bookEl.querySelector('.book__spread').inert = !open;
      });
      // The pressed spine disappears, so keep keyboard users in the book they opened.
      if (spineHadFocus) bookEls[openBook].querySelector('.spread__title').focus({ preventScroll: true });
    }
    syncPlayButtons(el, state.player);
  };
}
