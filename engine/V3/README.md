# Engine V3 — discover array-valued collection keys

V3 is copied from V2 and keeps the `data/` response files. `traverse.js` scans the saved response JSON, inspects objects/rows, and considers a key a collection key when at least one inspected row has an array as its value. It writes the combined array items for each discovered key to `collection/<key>.json`.

Run after V2 has produced `data/`: `node engine/V3/traverse.js`. This step is a structural experiment, not a Tally live request.
