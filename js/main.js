// Entry point: builds the page from the content data and routes user actions into the store.

import { BOOKS } from './data/books.js';
import { CAST } from './data/cast.js';
import { SITE } from './data/site.js';
import { currentBookIndex, getEpisode } from './lib/catalog.js';
import { closePlayer, finish, idlePlayer, sameRef, selectEpisode, setPosition, togglePause } from './lib/player.js';
import { createStore } from './lib/store.js';
import { createAudioEngine } from './integrations/audio.js';
import { renderHero } from './ui/hero.js';
import { mountShelf } from './ui/shelf.js';
import { mountMobileBooks } from './ui/mobile-books.js';
import { mountCast } from './ui/cast.js';
import { mountCastMobile } from './ui/cast-mobile.js';
import { mountPlayerBar } from './ui/player-bar.js';
import { renderListen } from './ui/listen.js';
import { initMenu } from './ui/menu.js';

const content = { books: BOOKS, cast: CAST, site: SITE };
const $ = selector => document.querySelector(selector);

const store = createStore({
  openBook: currentBookIndex(BOOKS),
  castSelected: 0, // desktop bio panel always shows someone
  castSheet: null, // mobile inline bio, closed until a member is tapped
  player: idlePlayer
});

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

// ----- Render -----

renderHero($('#top'), content);
renderListen($('[data-mount="listen"]'), content);
const views = [
  mountShelf($('[data-mount="shelf"]'), content),
  mountMobileBooks($('[data-mount="mobile-books"]'), content),
  mountCast($('[data-mount="cast"]'), content),
  mountCastMobile($('[data-mount="cast-mobile"]'), content),
  mountPlayerBar($('[data-mount="player"]'), content)
];
const render = state => views.forEach(update => update(state));
store.subscribe(render);
render(store.get());

initMenu($('#menu'), $('[data-action="open-menu"]'), scrollToSection);

// ----- Audio -----

const durationOfCurrent = () => {
  const { current } = store.get().player;
  return current ? getEpisode(BOOKS, current).durationSec : 0;
};
const updatePlayer = fn => store.update(s => ({ player: fn(s.player) }));

const audio = createAudioEngine({
  onTime: sec => updatePlayer(p => setPosition(p, sec, durationOfCurrent())),
  onEnded: () => updatePlayer(p => finish(p, durationOfCurrent())),
  onError: () => updatePlayer(p => (p.current ? { ...p, paused: true } : p))
});

store.subscribe((state, prev) => {
  const now = state.player;
  const before = prev.player;
  const switched = !sameRef(now.current, before.current);
  if (switched) {
    if (now.current) audio.load(getEpisode(BOOKS, now.current));
    else audio.stop();
  }
  if (now.current && (switched || now.paused !== before.paused)) {
    if (now.paused) audio.pause();
    else audio.play();
  }
});

// ----- Actions -----

const actions = {
  'toggle-play': () => updatePlayer(togglePause),
  'close-player': () => updatePlayer(closePlayer),
  'close-sheet': () => store.update(() => ({ castSheet: null })),
  begin: () => {
    store.update(() => ({ openBook: 0 }));
    scrollToSection('episodes');
  }
};

document.addEventListener('click', event => {
  const el = event.target.closest('[data-play], [data-open-book], [data-cast], [data-cast-sheet], [data-action]');
  if (!el) return;
  const { play, openBook, cast, castSheet, action } = el.dataset;

  if (play !== undefined) {
    const [book, episode] = play.split(':').map(Number);
    updatePlayer(p => selectEpisode(p, { book, episode }));
  } else if (openBook !== undefined) {
    store.update(() => ({ openBook: Number(openBook) }));
  } else if (cast !== undefined) {
    store.update(() => ({ castSelected: Number(cast) }));
  } else if (castSheet !== undefined) {
    const idx = Number(castSheet);
    store.update(s => ({ castSheet: s.castSheet === idx ? null : idx }));
  } else if (actions[action]) {
    actions[action]();
  }
});
