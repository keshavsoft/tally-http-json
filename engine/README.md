# Engine experiments

Each version is intentionally isolated. Do not edit an earlier version when exploring a later one.

- **V1** — fetch configured collection IDs; save to `output/`.
- **V2** — same fetch process; save to `data/`.
- **V3** — scan saved response JSON and extract array-valued collection keys to `collection/<key>.json`.
- **V4** — preserve a second nested collection level within each primary collection JSON.
- **V5** — preserve three nested collection levels.

V3–V5 operate on saved JSON files. Run V2 first to populate each version's `data/` folder (or copy the resulting data files into that version's `data/`). No live Tally requests were executed while preparing this archive.
