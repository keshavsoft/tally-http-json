# Engine V1 — native object type crawler

This is a fresh V1 experiment. It tries one TDL Collection per entry in `collections.json`, using each entry's `objectType` as the collection's `Type`. It saves the raw JSONEx response and prints the keys discovered in each response.

## Run

From the repository root:

```bash
node engine/V1/index.js
```

Optional environment variables:

- `TALLY_URL` — defaults to `http://localhost:9000`
- `TALLY_COMPANY` — defaults to `mani9`

Outputs are written to `engine/V1/output/`; `keys-summary.json` contains success/failure and discovered keys for each candidate.

## Important

The entries in `collections.json` are **candidate native object types**, not guaranteed valid types for every TallyPrime release/company. This crawler is designed to test them against your local Tally instance. A failed type is reported and does not stop the remaining tests. The script has not been run against a live Tally instance here.
