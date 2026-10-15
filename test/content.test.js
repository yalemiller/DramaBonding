// Checks the content files so placeholder and real data stay in the shape the UI expects.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { BOOKS } from '../js/data/books.js';
import { CAST } from '../js/data/cast.js';
import { SITE } from '../js/data/site.js';
import { castForBook } from '../js/lib/catalog.js';

const root = new URL('../', import.meta.url);
const ISO = /^\d{4}-\d{2}-\d{2}$/;

test('every book has the fields the shelf and panel render', () => {
  assert.ok(BOOKS.length > 0);
  for (const book of BOOKS) {
    assert.ok(book.title && book.blurb && book.warnings, book.title);
    assert.ok(book.themes.length > 0, book.title);
    assert.match(book.spineColor, /^#[0-9a-f]{6}$/i);
    assert.ok(['complete', 'ongoing'].includes(book.status), book.title);
    assert.ok(book.episodes.some(ep => ep.released), `${book.title} has a released episode`);
  }
  assert.ok(BOOKS.filter(b => b.status === 'ongoing').length <= 1, 'at most one ongoing book');
});

test('released episodes are playable and dated in order; planned ones come last', () => {
  for (const book of BOOKS) {
    let lastDate = '';
    let seenPlanned = false;
    for (const ep of book.episodes) {
      assert.ok(ep.title, book.title);
      if (!ep.released) {
        seenPlanned = true;
        continue;
      }
      assert.ok(!seenPlanned, `${ep.title}: released after a planned chapter`);
      assert.match(ep.releaseDate, ISO, ep.title);
      assert.ok(ep.releaseDate >= lastDate, `${ep.title} is dated in order`);
      assert.ok(ep.durationSec > 0, ep.title);
      assert.equal(typeof ep.audioUrl, 'string', ep.title);
      lastDate = ep.releaseDate;
    }
  }
});

test('the cast has one lead and every role points at a real book', () => {
  assert.equal(CAST.filter(m => m.isLead).length, 1);
  for (const member of CAST) {
    assert.ok(member.name && member.pronouns, member.name);
    assert.ok(member.bio.length > 0, member.name);
    if (member.isLead) continue;
    assert.ok(member.roles.length > 0, member.name);
    for (const role of member.roles) {
      assert.ok(BOOKS[role.book], `${member.name} role in book ${role.book}`);
      assert.ok(role.characterName, member.name);
    }
  }
});

test('each book seats the lead and three players, which the four-column spread expects', () => {
  BOOKS.forEach((book, i) => {
    const table = castForBook(CAST, BOOKS, i);
    assert.equal(table.length, 4, book.title);
    assert.ok(table[0].member.isLead, book.title);
  });
});

test('cast photos exist on disk', () => {
  for (const member of CAST) {
    for (const photo of [member.photoStd, member.photoFun]) {
      if (photo) assert.ok(existsSync(new URL(photo, root)), photo);
    }
  }
});

test('listen links are present', () => {
  assert.ok(SITE.platforms.length > 0);
  for (const p of SITE.platforms) assert.ok(p.name && p.url, p.name);
});
