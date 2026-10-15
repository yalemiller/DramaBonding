// Placeholder cast from the design handoff; only Alex Marlowe's photos are real.
// The lead storyteller appears in every book automatically, so they have no roles list.
// `book` in a role is the index into BOOKS.

/**
 * @typedef {{ book: number, characterName: string }} Role
 * @typedef {{ name: string, pronouns: string, isLead?: boolean, photoStd: string|null, photoFun: string|null,
 *   bio: string[], roles?: Role[] }} CastMember
 */

/** @type {CastMember[]} */
export const CAST = [
  {
    name: "Alex Marlowe",
    pronouns: 'he/him',
    isLead: true,
    photoStd: 'assets/cast/alex-std.jpg',
    photoFun: 'assets/cast/alex-fun.jpg',
    bio: [
      "The voice of every villain, innkeeper and whispering tree. He builds each world, then cruelly lets it speak.",
      "Before the podcast there was a kitchen table, a borrowed rulebook and a session that was meant to last two hours and ended at four in the morning. Nobody has entirely recovered. What began as a way to stay in touch became a weekly ritual, then a recording, then — somewhat to everyone’s surprise — an audience.",
      "Outside the game they work in a field that has very little to do with dragons, which they insist is the secret: the table is where the rest of the week gets to be strange. Favourite moments tend to be the quiet ones — a character choosing mercy, a joke that lands at precisely the wrong time, a roll that changes everything.",
      "They are drawn to characters who want something they can’t say out loud, and to stories where the cost of a choice arrives three episodes later. Between sessions they keep a notebook of half-finished backstories, overheard lines and names that might one day belong to someone."
    ]
  },
  {
    name: "Morgan Hale",
    pronouns: 'she/her',
    photoStd: null,
    photoFun: null,
    roles: [{ book: 0, characterName: "Wren Ashveil" }],
    bio: [
      "Writer and theatre kid; first voice at the first table.",
      "Outside the game they work in a field that has very little to do with dragons, which they insist is the secret: the table is where the rest of the week gets to be strange. Favourite moments tend to be the quiet ones — a character choosing mercy, a joke that lands at precisely the wrong time, a roll that changes everything.",
      "They are drawn to characters who want something they can’t say out loud, and to stories where the cost of a choice arrives three episodes later. Between sessions they keep a notebook of half-finished backstories, overheard lines and names that might one day belong to someone.",
      "Listeners can find them most weeks in the community chat, cheerfully refusing to confirm theories. When not recording they can be found reading, walking somewhere green, or rewatching the same three films. They would like it noted that they were right about the lantern."
    ]
  },
  {
    name: "Riley Okafor",
    pronouns: 'they/them',
    photoStd: null,
    photoFun: null,
    roles: [{ book: 0, characterName: "Thistle" }, { book: 2, characterName: "Kestrel" }],
    bio: [
      "Musician and improviser; the reason every session has a song.",
      "They are drawn to characters who want something they can’t say out loud, and to stories where the cost of a choice arrives three episodes later. Between sessions they keep a notebook of half-finished backstories, overheard lines and names that might one day belong to someone.",
      "Listeners can find them most weeks in the community chat, cheerfully refusing to confirm theories. When not recording they can be found reading, walking somewhere green, or rewatching the same three films. They would like it noted that they were right about the lantern.",
      "Before the podcast there was a kitchen table, a borrowed rulebook and a session that was meant to last two hours and ended at four in the morning. Nobody has entirely recovered. What began as a way to stay in touch became a weekly ritual, then a recording, then — somewhat to everyone’s surprise — an audience."
    ]
  },
  {
    name: "Sam Brennan",
    pronouns: 'he/him',
    photoStd: null,
    photoFun: null,
    roles: [{ book: 0, characterName: "Oren Vale" }],
    bio: [
      "Teacher by day, sincere to a fault by night.",
      "Listeners can find them most weeks in the community chat, cheerfully refusing to confirm theories. When not recording they can be found reading, walking somewhere green, or rewatching the same three films. They would like it noted that they were right about the lantern.",
      "Before the podcast there was a kitchen table, a borrowed rulebook and a session that was meant to last two hours and ended at four in the morning. Nobody has entirely recovered. What began as a way to stay in touch became a weekly ritual, then a recording, then — somewhat to everyone’s surprise — an audience.",
      "Outside the game they work in a field that has very little to do with dragons, which they insist is the secret: the table is where the rest of the week gets to be strange. Favourite moments tend to be the quiet ones — a character choosing mercy, a joke that lands at precisely the wrong time, a roll that changes everything."
    ]
  },
  {
    name: "Jules Castellanos",
    pronouns: 'she/they',
    photoStd: null,
    photoFun: null,
    roles: [{ book: 1, characterName: "Maeve Corrin" }, { book: 3, characterName: "Aurelie Vance" }],
    bio: [
      "Actor and audio editor; makes the show sound like weather.",
      "Before the podcast there was a kitchen table, a borrowed rulebook and a session that was meant to last two hours and ended at four in the morning. Nobody has entirely recovered. What began as a way to stay in touch became a weekly ritual, then a recording, then — somewhat to everyone’s surprise — an audience.",
      "Outside the game they work in a field that has very little to do with dragons, which they insist is the secret: the table is where the rest of the week gets to be strange. Favourite moments tend to be the quiet ones — a character choosing mercy, a joke that lands at precisely the wrong time, a roll that changes everything.",
      "They are drawn to characters who want something they can’t say out loud, and to stories where the cost of a choice arrives three episodes later. Between sessions they keep a notebook of half-finished backstories, overheard lines and names that might one day belong to someone."
    ]
  },
  {
    name: "Avery Lindqvist",
    pronouns: 'he/him',
    photoStd: null,
    photoFun: null,
    roles: [{ book: 1, characterName: "Brannoch" }],
    bio: [
      "Illustrator; draws the company between sessions.",
      "Outside the game they work in a field that has very little to do with dragons, which they insist is the secret: the table is where the rest of the week gets to be strange. Favourite moments tend to be the quiet ones — a character choosing mercy, a joke that lands at precisely the wrong time, a roll that changes everything.",
      "They are drawn to characters who want something they can’t say out loud, and to stories where the cost of a choice arrives three episodes later. Between sessions they keep a notebook of half-finished backstories, overheard lines and names that might one day belong to someone.",
      "Listeners can find them most weeks in the community chat, cheerfully refusing to confirm theories. When not recording they can be found reading, walking somewhere green, or rewatching the same three films. They would like it noted that they were right about the lantern."
    ]
  },
  {
    name: "Casey Moreau",
    pronouns: 'they/them',
    photoStd: null,
    photoFun: null,
    roles: [{ book: 1, characterName: "Lysette" }],
    bio: [
      "Stage manager who runs the table’s secret notes.",
      "They are drawn to characters who want something they can’t say out loud, and to stories where the cost of a choice arrives three episodes later. Between sessions they keep a notebook of half-finished backstories, overheard lines and names that might one day belong to someone.",
      "Listeners can find them most weeks in the community chat, cheerfully refusing to confirm theories. When not recording they can be found reading, walking somewhere green, or rewatching the same three films. They would like it noted that they were right about the lantern.",
      "Before the podcast there was a kitchen table, a borrowed rulebook and a session that was meant to last two hours and ended at four in the morning. Nobody has entirely recovered. What began as a way to stay in touch became a weekly ritual, then a recording, then — somewhat to everyone’s surprise — an audience."
    ]
  },
  {
    name: "Drew Patel",
    pronouns: 'he/they',
    photoStd: null,
    photoFun: null,
    roles: [{ book: 2, characterName: "Pell Ambersmoke" }],
    bio: [
      "Engineer; brings props to the table.",
      "Listeners can find them most weeks in the community chat, cheerfully refusing to confirm theories. When not recording they can be found reading, walking somewhere green, or rewatching the same three films. They would like it noted that they were right about the lantern.",
      "Before the podcast there was a kitchen table, a borrowed rulebook and a session that was meant to last two hours and ended at four in the morning. Nobody has entirely recovered. What began as a way to stay in touch became a weekly ritual, then a recording, then — somewhat to everyone’s surprise — an audience.",
      "Outside the game they work in a field that has very little to do with dragons, which they insist is the secret: the table is where the rest of the week gets to be strange. Favourite moments tend to be the quiet ones — a character choosing mercy, a joke that lands at precisely the wrong time, a roll that changes everything."
    ]
  },
  {
    name: "Quinn Ashby",
    pronouns: 'she/her',
    photoStd: null,
    photoFun: null,
    roles: [{ book: 2, characterName: "Sister Ysolde" }],
    bio: [
      "Choir singer and chronic over-planner.",
      "Before the podcast there was a kitchen table, a borrowed rulebook and a session that was meant to last two hours and ended at four in the morning. Nobody has entirely recovered. What began as a way to stay in touch became a weekly ritual, then a recording, then — somewhat to everyone’s surprise — an audience.",
      "Outside the game they work in a field that has very little to do with dragons, which they insist is the secret: the table is where the rest of the week gets to be strange. Favourite moments tend to be the quiet ones — a character choosing mercy, a joke that lands at precisely the wrong time, a roll that changes everything.",
      "They are drawn to characters who want something they can’t say out loud, and to stories where the cost of a choice arrives three episodes later. Between sessions they keep a notebook of half-finished backstories, overheard lines and names that might one day belong to someone."
    ]
  },
  {
    name: "Harper Nakamura",
    pronouns: 'he/him',
    photoStd: null,
    photoFun: null,
    roles: [{ book: 3, characterName: "Cassius Thorne" }],
    bio: [
      "Podcast producer; keeps the episodes on schedule.",
      "Outside the game they work in a field that has very little to do with dragons, which they insist is the secret: the table is where the rest of the week gets to be strange. Favourite moments tend to be the quiet ones — a character choosing mercy, a joke that lands at precisely the wrong time, a roll that changes everything.",
      "They are drawn to characters who want something they can’t say out loud, and to stories where the cost of a choice arrives three episodes later. Between sessions they keep a notebook of half-finished backstories, overheard lines and names that might one day belong to someone.",
      "Listeners can find them most weeks in the community chat, cheerfully refusing to confirm theories. When not recording they can be found reading, walking somewhere green, or rewatching the same three films. They would like it noted that they were right about the lantern."
    ]
  },
  {
    name: "Emery Doyle",
    pronouns: 'she/her',
    photoStd: null,
    photoFun: null,
    roles: [{ book: 3, characterName: "Nell o’ the Hollow" }],
    bio: [
      "Comedian; reliably the first to roll a one.",
      "They are drawn to characters who want something they can’t say out loud, and to stories where the cost of a choice arrives three episodes later. Between sessions they keep a notebook of half-finished backstories, overheard lines and names that might one day belong to someone.",
      "Listeners can find them most weeks in the community chat, cheerfully refusing to confirm theories. When not recording they can be found reading, walking somewhere green, or rewatching the same three films. They would like it noted that they were right about the lantern.",
      "Before the podcast there was a kitchen table, a borrowed rulebook and a session that was meant to last two hours and ended at four in the morning. Nobody has entirely recovered. What began as a way to stay in touch became a weekly ritual, then a recording, then — somewhat to everyone’s surprise — an audience."
    ]
  }
];
