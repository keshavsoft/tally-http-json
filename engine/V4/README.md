# Engine V4 — preserve a second nested collection layer

V4 copies V3 and keeps its data-driven traversal. It identifies array-valued collection keys in the saved response, then writes each primary collection to `collection/<key>.json`, preserving nested arrays inside each item up to two collection levels. It does not create separate files for the nested second-level collections.

Run after V2 has produced `data/`: `node engine/V4/traverse.js`. Live Tally requests have not been run.
