// Questions about the books, episodes and cast. Pure functions over the content data.

import { toRoman } from './format.js';

/** @typedef {{ book: number, episode: number }} EpisodeRef */

export const bookNumeral = bookIdx => toRoman(bookIdx + 1);

/** The book the hero features: the ongoing one, otherwise the newest. */
export function currentBookIndex(books) {
  for (let i = books.length - 1; i >= 0; i--) {
    if (books[i].status === 'ongoing') return i;
  }
  return books.length - 1;
}

/** An episode with its position and display numbers attached, or null when the ref is out of range. */
export function getEpisode(books, ref) {
  const book = books[ref.book];
  const ep = book && book.episodes[ref.episode];
  if (!ep) return null;
  return {
    ...ep,
    ref: { book: ref.book, episode: ref.episode },
    number: ref.episode + 1,
    numeral: toRoman(ref.episode + 1),
    bookNumeral: bookNumeral(ref.book)
  };
}

/** Every chapter in a book, released or planned, in order. */
export function bookContents(books, bookIdx) {
  return books[bookIdx].episodes.map((_, i) => getEpisode(books, { book: bookIdx, episode: i }));
}

/** The most recently released episode across all books. */
export function latestEpisode(books) {
  let latest = null;
  books.forEach((book, b) => book.episodes.forEach((ep, e) => {
    if (ep.released && (!latest || ep.releaseDate >= latest.releaseDate)) latest = { ...ep, b, e };
  }));
  return latest && getEpisode(books, { book: latest.b, episode: latest.e });
}

/** The books a member appears in. The lead storyteller is in every book. */
export function rolesOf(member, bookCount) {
  if (member.isLead) {
    return Array.from({ length: bookCount }, (_, book) => ({ book, characterName: 'Lead Storyteller' }));
  }
  return member.roles || [];
}

export function roleIn(member, bookIdx, bookCount) {
  return rolesOf(member, bookCount).find(r => r.book === bookIdx) || null;
}

/** The table for one book, in cast order: [{ member, characterName }]. */
export function castForBook(cast, books, bookIdx) {
  return cast
    .map(member => ({ member, role: roleIn(member, bookIdx, books.length) }))
    .filter(entry => entry.role)
    .map(({ member, role }) => ({ member, characterName: role.characterName }));
}
