// Tiny HTML templating: `html` escapes interpolated values unless they are already safe markup.

class SafeHTML {
  constructor(value) { this.value = value; }
  toString() { return this.value; }
}

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ENTITIES[c]);

/** Marks trusted markup so `html` inserts it unescaped. */
export const raw = markup => new SafeHTML(markup);

function renderValue(value) {
  if (value == null || value === false) return '';
  if (value instanceof SafeHTML) return value.value;
  if (Array.isArray(value)) return value.map(renderValue).join('');
  return escapeHTML(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((value, i) => { out += renderValue(value) + strings[i + 1]; });
  return new SafeHTML(out);
}

/** Replaces an element's children with rendered markup. */
export function setHTML(el, markup) {
  el.innerHTML = renderValue(markup);
}
