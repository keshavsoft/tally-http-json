# 03 — Receipt date-filter experiment

## The story

The collection `Filter` attribute uses a TDL System Formula. This request adds a date-range formula to the proven Receipt source collection, with start/end dates supplied as static variables.

**Validation status:** this is an experiment, not yet confirmed against the user's local Tally. Tally's official documentation confirms that `Filter` references a System Formula; the exact date comparison and variable handling must be tested locally before relying on it.

## Try it

1. Change `svFromDate` and `svToDate` to the date range you want, using Tally's expected date representation.
2. Send `receipt-date-filter.http`.
3. Compare the returned voucher dates with the selected range.
4. If Tally rejects the formula or ignores the variables, keep the working receipt request and adjust this experiment only.

The date filter is applied in Tally, so a successful filter should reduce the response before it reaches Node.js.
