// Mobile cast: a three-column grid; tapping a member opens their bio inline, after their row.

import { html, setHTML } from './dom.js';
import { castPhotos, diamond } from './parts.js';
import { inlinePanelOrder, tileOrder } from '../lib/cast-layout.js';

const COLUMNS = 3;

const sheetMarkup = member => html`
  <div class="m-bio__top">
    <div class="m-bio__who">
      <h3 class="m-bio__name">${member.name}</h3>
      <p class="m-bio__pronouns">${member.pronouns}</p>
    </div>
    <button type="button" class="m-bio__close" data-action="close-sheet" aria-label="Close biography">×</button>
  </div>
  <div class="m-bio__head"><h4 class="m-bio__head-title">BIOGRAPHY</h4>${diamond('diamond--6')}<span class="bio__head-rule" aria-hidden="true"></span></div>
  ${member.bio.map(p => html`<p class="m-bio__para">${p}</p>`)}`;

export function mountCastMobile(el, { cast }) {
  setHTML(el, html`
    <div class="m-roster">
      ${cast.map((member, i) => html`
        <button type="button" class="m-roster__tile" data-cast-sheet="${i}" aria-expanded="false" aria-controls="m-cast-panel"
          style="order:${tileOrder(i)}">
          <span class="tile-photo cast-photo">${castPhotos(member, { phClass: 'ph ph--dark' })}</span>
          <span class="m-roster__name">${member.name}</span>
          <span class="m-roster__pronouns">${member.pronouns}</span>
        </button>`)}
      <div class="m-bio" id="m-cast-panel" role="region" aria-label="Biography" hidden></div>
    </div>`);

  const grid = el.querySelector('.m-roster');
  const tiles = [...el.querySelectorAll('.m-roster__tile')];
  const sheet = el.querySelector('.m-bio');
  let open = null;

  return function update(state) {
    if (state.castSheet === open) return;
    const closing = state.castSheet === null && open !== null;
    const returnFocusTo = closing && sheet.contains(document.activeElement) ? tiles[open] : null;
    open = state.castSheet;

    grid.classList.toggle('has-selection', open !== null);
    tiles.forEach((tile, i) => {
      tile.setAttribute('aria-expanded', String(i === open));
      tile.classList.toggle('is-selected', i === open);
    });
    sheet.hidden = open === null;
    if (open !== null) {
      sheet.style.order = String(inlinePanelOrder(open, cast.length, COLUMNS));
      setHTML(sheet, sheetMarkup(cast[open]));
    }
    if (returnFocusTo) returnFocusTo.focus();
  };
}
