# Engine V2 — JSON key-path inspector

V2 is the next step after the successful V1 native-object crawl. It **does not call Tally again**. It reads the response JSON files produced by V1 and records every discovered JSON path, value type, source file, and array path.

## Run

From the repository root, after V1 has created `engine/V1/output/*.json`:

```bash
node engine/V2/index.js
```

## Outputs

- `engine/V2/output/key-path-report.json` — all observed paths and types across the V1 files.
- `engine/V2/output/array-candidates.json` — array-valued paths that may represent nested collections.

The array candidates are **observations in the returned JSON**, not guaranteed TDL collection names. Inspect the paths and sample keys before using them to build the next crawler.

V1 is not modified. V2 reads from `../V1/output`, so run V1 first whenever you want to refresh the source data.
