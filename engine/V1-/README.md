# Engine V1 — collection experiment

This experiment reads the collection IDs in `collections.json`, sends one Tally HTTP Export request per ID, and saves each response as `output/<collection-id>.json`.

## Files

- `collections.json` — collection IDs found in the repository's HTTP examples that have a matching Collection definition.
- `body.json` — shared JSON request body with the repository's Collection definitions and the `jsonex` / `mani9` static variables.
- `fetch.js` — reusable request function, based on the existing `src/v3/transport.js` pattern.
- `index.js` — wrapper that reads the collection list, loops through it, and saves each response separately.

## Run

From the repository root, with Tally listening on `http://localhost:9000`:

```bash
node engine/V1/index.js
```

To use another Tally URL:

```bash
TALLY_URL=http://localhost:9000 node engine/V1/index.js
```

The script has **not** been run against Tally. JavaScript syntax and JSON parsing were checked only.
