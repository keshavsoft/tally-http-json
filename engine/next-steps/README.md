# Next steps: three small experiments

Keep the existing `engine/V1` and `engine/V2` untouched. These folders are isolated experiments:

1. `01-configurable-builder` — config → generated TDL JSON body (does not send it).
2. `02-receipt-http` — a simple Receipt-only HTTP request with nested ledger entries.
3. `03-date-filter` — a date-range filtering experiment that still needs live Tally validation.

Start with each folder's README. The builder currently supports one source collection and one `Walk`; expand only after this shape is verified.
