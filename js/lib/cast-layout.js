// Mobile cast grid: the bio panel is inserted after the selected member's row using CSS `order`.

/** Tiles take the even order slots so a panel can sit in any odd slot between them. */
export const tileOrder = idx => idx * 2;

/** Order of the inline panel: right after the last tile in the selected member's row. */
export function inlinePanelOrder(selectedIdx, count, columns) {
  const rowEnd = Math.floor(selectedIdx / columns) * columns + columns - 1;
  return tileOrder(Math.min(rowEnd, count - 1)) + 1;
}
