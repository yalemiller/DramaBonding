// Listen section: one pill link per podcast platform.

import { html, setHTML } from './dom.js';

export function renderListen(el, { site }) {
  setHTML(el, site.platforms.map(p => html`<li><a class="pill pill--lg" href="${p.url}">${p.name}</a></li>`));
}
