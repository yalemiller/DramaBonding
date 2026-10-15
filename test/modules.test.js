// Every browser module must parse and import cleanly without touching the DOM at load time.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';

const dir = new URL('../js/', import.meta.url);
const modules = readdirSync(dir, { recursive: true })
  .map(p => String(p).replaceAll('\\', '/'))
  .filter(p => p.endsWith('.js') && p !== 'main.js');

test('modules import without side effects', async () => {
  assert.ok(modules.length > 10);
  for (const path of modules) {
    await assert.doesNotReject(import(new URL(path, dir)), path);
  }
});
