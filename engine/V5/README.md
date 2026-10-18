# Engine V5 — preserve three nested collection levels

V5 copies V4 and extends the same traversal to three collection levels. It detects array-valued keys, extracts each primary collection to `collection/<key>.json`, and preserves nested arrays under their parent items through three levels. It does not emit separate files for each nested level.

Run after V2 has produced `data/`: `node engine/V5/traverse.js`. Live Tally requests have not been run.
