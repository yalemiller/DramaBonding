import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  bookContents, bookNumeral, castForBook, currentBookIndex, getEpisode, latestEpisode, roleIn, rolesOf
} from '../js/lib/catalog.js';

const books = [
  { title: 'One', status: 'complete', episodes: [
    { title: 'A', released: true, durationSec: 100, releaseDate: '2024-01-01' },
    { title: 'B', released: true, durationSec: 200, releaseDate: '2024-01-15' }
  ] },
  { title: 'Two', status: 'ongoing', episodes: [
    { title: 'C', released: true, durationSec: 300, releaseDate: '2024-02-01' },
    { title: 'D', released: false }
  ] }
];

const cast = [
  { name: 'Lead', isLead: true },
  { name: 'P1', roles: [{ book: 0, characterName: 'First' }, { book: 1, characterName: 'Second' }] },
  { name: 'P2', roles: [{ book: 1, characterName: 'Other' }] }
];

test('book numerals follow order', () => {
  assert.equal(bookNumeral(0), 'I');
  assert.equal(bookNumeral(3), 'IV');
});

test('the current book is the ongoing one, else the newest', () => {
  assert.equal(currentBookIndex(books), 1);
  assert.equal(currentBookIndex(books.map(b => ({ ...b, status: 'complete' }))), 1);
  assert.equal(currentBookIndex([books[1], books[0]]), 0);
});

test('getEpisode attaches numbers and rejects out-of-range refs', () => {
  const ep = getEpisode(books, { book: 1, episode: 0 });
  assert.equal(ep.title, 'C');
  assert.deepEqual(ep.ref, { book: 1, episode: 0 });
  assert.equal(ep.number, 1);
  assert.equal(ep.numeral, 'I');
  assert.equal(ep.bookNumeral, 'II');
  assert.equal(getEpisode(books, { book: 1, episode: 9 }), null);
  assert.equal(getEpisode(books, { book: 7, episode: 0 }), null);
});

test('book contents include planned chapters after the released ones', () => {
  const rows = bookContents(books, 1);
  assert.deepEqual(rows.map(r => [r.numeral, r.title, r.released]), [['I', 'C', true], ['II', 'D', false]]);
});

test('latest episode is the newest released one across books', () => {
  const latest = latestEpisode(books);
  assert.equal(latest.title, 'C');
  assert.deepEqual(latest.ref, { book: 1, episode: 0 });
});

test('the lead storyteller has a role in every book', () => {
  assert.deepEqual(rolesOf(cast[0], 2), [
    { book: 0, characterName: 'Lead Storyteller' },
    { book: 1, characterName: 'Lead Storyteller' }
  ]);
  assert.equal(roleIn(cast[0], 1, 2).characterName, 'Lead Storyteller');
});

test('players can play different characters in different books', () => {
  assert.equal(roleIn(cast[1], 0, 2).characterName, 'First');
  assert.equal(roleIn(cast[1], 1, 2).characterName, 'Second');
  assert.equal(roleIn(cast[2], 0, 2), null);
});

test('castForBook lists the table in cast order with the lead first', () => {
  assert.deepEqual(castForBook(cast, books, 1).map(e => [e.member.name, e.characterName]), [
    ['Lead', 'Lead Storyteller'], ['P1', 'Second'], ['P2', 'Other']
  ]);
  assert.deepEqual(castForBook(cast, books, 0).map(e => e.member.name), ['Lead', 'P1']);
});
