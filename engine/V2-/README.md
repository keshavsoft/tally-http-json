# Engine V2 — save each collection response under data/

V2 is copied from V1. The only functional change is the output directory: each response is saved as `data/<collection-id>.json`. V1 remains unchanged.

Run from the repository root: `node engine/V2/index.js`. Set `TALLY_URL` to override `http://localhost:9000`. Live Tally requests have not been run as part of building this archive.
