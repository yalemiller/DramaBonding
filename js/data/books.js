// Placeholder content from the design handoff. Replace with real episodes (eventually the RSS feed).
// Book numerals and episode numbers come from array order.

/**
 * @typedef {{ title: string, released: boolean, durationSec?: number, releaseDate?: string, audioUrl?: string }} Episode
 * @typedef {{ title: string, tagline?: string, blurb: string, themes: string[], warnings: string,
 *   spineColor: string, startYear: number, status: 'complete'|'ongoing', keyArt?: string, episodes: Episode[] }} Book
 */

/** @type {Book[]} */
export const BOOKS = [
  {
    title: "The Verdant Overture",
    blurb: "A wedding in the wood, a vanished groom, and three guests who were never meant to meet. As the feast curdles and the lanterns gutter, an old bargain beneath the orchard begins to stir — and the price of finding the groom may be a vow none of them can afford to keep.",
    themes: ["Found family", "Forbidden bargains", "Grief", "Fae courts", "Romance"],
    warnings: "Body horror (mild), death of a loved one, drowning, insects, references to abandonment.",
    spineColor: '#24412f',
    startYear: 2024,
    status: 'complete',
    episodes: [
      { title: "The Invitation Arrives in Ivy", released: true, durationSec: 9660, releaseDate: '2024-09-04', audioUrl: '' },
      { title: "A Feast Without a Host", released: true, durationSec: 10920, releaseDate: '2024-09-18', audioUrl: '' },
      { title: "Lanterns on the Black Water", released: true, durationSec: 10500, releaseDate: '2024-10-02', audioUrl: '' },
      { title: "The Groom Who Walked Backwards", released: true, durationSec: 9420, releaseDate: '2024-10-16', audioUrl: '' },
      { title: "Of Moths and Minor Treasons", released: true, durationSec: 11460, releaseDate: '2024-10-30', audioUrl: '' },
      { title: "The Orchard of Teeth", released: true, durationSec: 10080, releaseDate: '2024-11-13', audioUrl: '' },
      { title: "Hymn for a Hollow Saint", released: true, durationSec: 8940, releaseDate: '2024-11-27', audioUrl: '' },
      { title: "Chess with the Heron King", released: true, durationSec: 9660, releaseDate: '2024-12-11', audioUrl: '' },
      { title: "What We Buried at Dawn", released: true, durationSec: 10920, releaseDate: '2024-12-25', audioUrl: '' }
    ]
  },
  {
    title: "The Lantern Oath",
    blurb: "Three lamplighters on a city wall, keeping a flame that something beyond the fog would very much like put out. Each night the fog speaks a little louder, and each night it knows a little more about them. When the oil runs low, they must decide what — and who — is worth burning.",
    themes: ["Duty and sacrifice", "Faith and doubt", "Isolation", "Cosmic dread"],
    warnings: "Fire and burns, fog-induced panic, religious trauma, death, implied self-sacrifice.",
    spineColor: '#3d5a48',
    startYear: 2025,
    status: 'complete',
    episodes: [
      { title: "First Light on the Wall", released: true, durationSec: 9420, releaseDate: '2025-03-12', audioUrl: '' },
      { title: "The Fog Has a Voice", released: true, durationSec: 11460, releaseDate: '2025-03-26', audioUrl: '' },
      { title: "Oil and Ash", released: true, durationSec: 10080, releaseDate: '2025-04-09', audioUrl: '' },
      { title: "A Watchman’s Lullaby", released: true, durationSec: 8940, releaseDate: '2025-04-23', audioUrl: '' },
      { title: "The Moth Bishop", released: true, durationSec: 9660, releaseDate: '2025-05-07', audioUrl: '' },
      { title: "What the Harbour Keeps", released: true, durationSec: 10920, releaseDate: '2025-05-21', audioUrl: '' },
      { title: "Ninety-Nine Steps Down", released: true, durationSec: 10500, releaseDate: '2025-06-04', audioUrl: '' },
      { title: "The Cinder Census", released: true, durationSec: 9420, releaseDate: '2025-06-18', audioUrl: '' },
      { title: "Lanterns Out", released: true, durationSec: 11460, releaseDate: '2025-07-02', audioUrl: '' }
    ]
  },
  {
    title: "Moss & Masquerade",
    blurb: "An invitation to a ball that has lasted a century. Three guests arrive; none are permitted to leave. Behind lacquered masks the dancers are growing moss, the host is perpetually late, and the clocks have begun to run backwards. To escape, they will have to learn the steps — and then break them.",
    themes: ["Identity and masks", "Time loops", "Decadence", "Escape"],
    warnings: "Being trapped, loss of time, mind control, body transformation, alcohol use.",
    spineColor: '#4f7a57',
    startYear: 2025,
    status: 'complete',
    episodes: [
      { title: "The Hundredth Year of Dancing", released: true, durationSec: 8940, releaseDate: '2025-09-03', audioUrl: '' },
      { title: "Masks of Bark and Lacquer", released: true, durationSec: 9660, releaseDate: '2025-09-17', audioUrl: '' },
      { title: "The Host Is Late Again", released: true, durationSec: 10920, releaseDate: '2025-10-01', audioUrl: '' },
      { title: "A Toast to the Drowned", released: true, durationSec: 10500, releaseDate: '2025-10-15', audioUrl: '' },
      { title: "Moss in the Ballroom", released: true, durationSec: 9420, releaseDate: '2025-10-29', audioUrl: '' },
      { title: "The Clockmaker’s Daughter", released: true, durationSec: 11460, releaseDate: '2025-11-12', audioUrl: '' },
      { title: "Intermission", released: true, durationSec: 10080, releaseDate: '2025-11-26', audioUrl: '' },
      { title: "Partners Exchanged", released: true, durationSec: 8940, releaseDate: '2025-12-10', audioUrl: '' },
      { title: "The Unmasking Hour", released: true, durationSec: 9660, releaseDate: '2025-12-24', audioUrl: '' }
    ]
  },
  {
    title: "Thorns of the Gilded Court",
    tagline: "Three strangers, one crown, and a forest that remembers every promise ever broken beneath it.",
    blurb: "Sworn beneath a dying oak, three strangers are summoned to a court that feeds on oaths. Every promise spoken in its gilded halls is weighed, and every broken one is collected. Between masked duchesses, silver debts and a drowned queen who will not stay buried, honesty may prove the deadliest weapon of all.",
    themes: ["Oaths and debt", "Political intrigue", "Revenge", "Class"],
    warnings: "Violence, blood, betrayal, drowning, coercion, references to past abuse.",
    spineColor: '#1b2e22',
    startYear: 2026,
    status: 'ongoing',
    episodes: [
      { title: "The Oak Remembers", released: true, durationSec: 10500, releaseDate: '2026-03-25', audioUrl: '' },
      { title: "Summons in Gold Leaf", released: true, durationSec: 9420, releaseDate: '2026-04-08', audioUrl: '' },
      { title: "A Masque of Borrowed Faces", released: true, durationSec: 11460, releaseDate: '2026-04-22', audioUrl: '' },
      { title: "The Duchess of Small Hours", released: true, durationSec: 10080, releaseDate: '2026-05-06', audioUrl: '' },
      { title: "Knives Under Velvet", released: true, durationSec: 8940, releaseDate: '2026-05-20', audioUrl: '' },
      { title: "The Thorn Garden", released: true, durationSec: 9660, releaseDate: '2026-06-03', audioUrl: '' },
      { title: "The Silver Inquest", released: false },
      { title: "A Crown Returned to Water", released: false },
      { title: "Thorns’ End", released: false }
    ]
  }
];
