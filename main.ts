// Two Days of Quiet Dread — make.fun entry
// Writes one code-review comment (a single line, max 140 chars) that
// approves a pull request while carrying quiet existential dread.
// The program is fully deterministic: the same constant, the same file,
// on every run. No input, no network, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";

// The entry line. Chosen by a coordinator concept test (3 variants, /25):
// it won because "merges cleanly" is a fresh double meaning — the code
// merges, and so does the reviewer's belief in clean code — the laugh
// comes from the dread itself, in a flat, tired-engineer tone.
const LINE =
  "Approved. It merges cleanly, and so, eventually, will the part of me that still believed in clean code.";

// --- Guards: fail loudly rather than write a bad entry. ---
// The gate counts characters (1-140) and the tie-break counts bytes,
// so check both: this line is pure ASCII, so the two agree, but verify.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${LINE.length}`);
}
const byteLength = Buffer.byteLength(LINE, "utf8");
if (byteLength > 140) {
  throw new Error(`entry must be at most 140 bytes, got ${byteLength}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line (no CR/LF)");
}
for (const ch of LINE) {
  const code = ch.codePointAt(0)!;
  if (code < 0x20 || code > 0x7e) {
    throw new Error(`entry must be pure printable ASCII, found U+${code.toString(16)}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote /output/entry.txt (${LINE.length} chars, ${byteLength} bytes)`);
