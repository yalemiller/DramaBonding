// Desktop cast: a roster grid beside a framed biography panel for the selected member.

import { html, setHTML } from './dom.js';
import { castPhotos, diamond, filigreeBar } from './parts.js';

const bioMarkup = member => html`
  <div class="bio__id">
    <div class="arch arch--portrait">
      <div class="portrait cast-photo">${castPhotos(member, { alt: `Portrait of ${member.name}`, phClass: 'ph' })}</div>
    </div>
    <div class="bio__nameblock">
      <h3 class="bio__name">${member.name}</h3>
      ${filigreeBar()}
      <p class="bio__pronouns">${member.pronouns}</p>
    </div>
  </div>
  <div class="bio__text">
    <div class="bio__head"><h4 class="bio__head-title">BIOGRAPHY</h4>${diamond('diamond--7')}<span class="bio__head-rule" aria-hidden="true"></span></div>
    <div class="bio__paras">${member.bio.map(p => html`<p>${p}</p>`)}</div>
  </div>`;

export function mountCast(el, { cast }) {
  setHTML(el, html`
    <div class="cast-d">
      <ul class="roster">
        ${cast.map((member, i) => html`
          <li>
            <button type="button" class="roster__tile" data-cast="${i}" aria-pressed="false" aria-controls="cast-bio">
              <span class="tile-photo cast-photo">${castPhotos(member, { phClass: 'ph ph--dark' })}</span>
              <span class="roster__text">
                <span class="roster__name">${member.name}</span>
                <span class="roster__pronouns">${member.pronouns}</span>
              </span>
            </button>
          </li>`)}
      </ul>
      <article class="bio" id="cast-bio" aria-label="Biography"></article>
    </div>`);

  const tiles = [...el.querySelectorAll('.roster__tile')];
  const bio = el.querySelector('.bio');
  let selected = null;

  return function update(state) {
    if (state.castSelected === selected) return;
    selected = state.castSelected;
    tiles.forEach((tile, i) => {
      tile.setAttribute('aria-pressed', String(i === selected));
      tile.classList.toggle('is-selected', i === selected);
    });
    setHTML(bio, bioMarkup(cast[selected]));
  };
}
