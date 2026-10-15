# Drama Bonding

Website for **Drama Bonding**, an actual-play tabletop podcast told in books. It's a single static page with no build step and no dependencies. It's built from the design handoff in [`docs/handoff/`](docs/handoff/README.md).

## Run it

```bash
py -m http.server 8770 --bind 127.0.0.1
```

Then open http://127.0.0.1:8770. Any static file server works. The page uses ES modules, so it has to be served rather than opened as a file.

## Test it

```bash
node --test
```

The tests cover the business logic (catalog queries, player state, formatting, mobile cast layout), check the content files against the shape the UI expects, and confirm every module imports cleanly. The UI itself is checked in a browser at desktop, mobile and 320px widths.

## How it's organised

| Path | Responsibility |
|---|---|
| `js/data/` | Content only: `books.js`, `cast.js`, `site.js` (platform links, hero ornament flag). Edit these to change what the site says. |
| `js/lib/` | Pure logic with no DOM: catalog queries, player state transitions, formatting, the store, mobile cast ordering. Unit tested. |
| `js/integrations/audio.js` | The `<audio>` element. Episodes without an `audioUrl` run on a simulated clock, so the player works with placeholder content. |
| `js/ui/` | One module per section. Each renders its markup once and returns an `update(state)` that toggles classes and attributes, so CSS transitions survive state changes. |
| `js/main.js` | Wires data, store, UI and audio together, and routes clicks (`data-play`, `data-open-book`, `data-cast`, `data-action`) into the store. |
| `css/tokens.css` | Design tokens from the handoff (colour, type, spacing). |
| `css/site.css` | Components. Desktop first; the mobile layout starts below `52rem`. |
| `docs/agent.md` | Working principles for anyone (or any agent) changing this repo. |

## Editing content

- **Episodes**: add to a book's `episodes` array in `js/data/books.js`. Numerals come from array order. Set `released: false` for planned chapters, which show dimmed with a dashed marker. Set `audioUrl` to the episode's enclosure URL and the player streams it.
- **Books**: the hero features the book whose `status` is `'ongoing'`. Add `keyArt` (an image path) to replace the hatched placeholder.
- **Cast**: each member has `photoStd` and `photoFun` (the hover shot), `bio` paragraphs, and `roles` (`{ book, characterName }`, where `book` is the index in `BOOKS`). The member with `isLead: true` appears in every book as Lead Storyteller. The spread's cast grid expects four people per book, and a test enforces that.
- **Listen links**: `js/data/site.js`.

## Where this differs from the handoff

- **Mobile breakpoint is `52rem` (832px), not about 720px.** Below that width the desktop shelf can't fit four spines plus the 520px spread without clipping it.
- **The hero sunburst is on**, behind the `ornateHero` flag in `site.js`. The handoff asks to confirm this default with design.
- **Mobile header and player use safe-area insets** in place of the prototype's fixed iOS status-bar padding.
- **Mobile cast tiles use the dual photos too**: tapping a member shows their fun shot, as the handoff suggests.
- **Cast photos are wired per member.** Only Alex Marlowe has real photos (converted to JPEG, about 80 KB each); everyone else shows the placeholder rather than borrowing Alex's photos as the prototype does.
- **Book and chapter dates and lengths are explicit data**, not computed from a start date as in the prototype.

## Not done yet

- Episode data from the podcast RSS feed (the data shape matches what the feed provides).
- Real platform URLs, key art, and the other ten cast members' photos.
- Hosting (GitHub Pages from `main` would serve it as-is).
