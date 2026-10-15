import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inlinePanelOrder, tileOrder } from '../js/lib/cast-layout.js';
import { createStore } from '../js/lib/store.js';
import { escapeHTML, html, raw } from '../js/ui/dom.js';

test('the mobile bio panel sits after the selected member\'s row', () => {
  // 11 members in 3 columns: rows are 0-2, 3-5, 6-8, 9-10.
  assert.equal(inlinePanelOrder(0, 11, 3), tileOrder(2) + 1);
  assert.equal(inlinePanelOrder(4, 11, 3), tileOrder(5) + 1);
  assert.equal(inlinePanelOrder(8, 11, 3), tileOrder(8) + 1);
  // The short last row ends at the last member.
  assert.equal(inlinePanelOrder(9, 11, 3), tileOrder(10) + 1);
  assert.equal(inlinePanelOrder(10, 11, 3), tileOrder(10) + 1);
});

test('panel order lands between tiles', () => {
  const order = inlinePanelOrder(4, 11, 3);
  assert.ok(order > tileOrder(5) && order < tileOrder(6));
});

test('store merges updates and notifies with the previous state', () => {
  const store = createStore({ a: 1, b: 2 });
  const seen = [];
  const off = store.subscribe((s, prev) => seen.push([prev.a, s.a, s.b]));
  store.update(s => ({ a: s.a + 1 }));
  off();
  store.update(() => ({ a: 10 }));
  assert.deepEqual(seen, [[1, 2, 2]]);
  assert.deepEqual(store.get(), { a: 10, b: 2 });
});

test('html escapes values but keeps nested templates and raw markup', () => {
  assert.equal(escapeHTML(`<a href="x">'&'</a>`), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;');
  const title = 'Moss & Masquerade';
  const out = html`<ul>${['<b>', title].map(t => html`<li>${t}</li>`)}</ul>${raw('<hr>')}${null}${false}`;
  assert.equal(String(out), '<ul><li>&lt;b&gt;</li><li>Moss &amp; Masquerade</li></ul><hr>');
});
