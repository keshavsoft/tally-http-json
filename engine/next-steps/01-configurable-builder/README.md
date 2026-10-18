# 01 — Choose fields, then build the TDL request

## The story

V1 already knows how to send an HTTP request and save Tally's response. This small experiment focuses on the missing step: **describe the fields you want in a config, then build the TDL JSON request from that config**.

This first version intentionally supports one source collection and one nested `Walk`. It is a starting point, not a complete TDL compiler.

## Run

From the repository root:

```bash
node engine/next-steps/01-configurable-builder/index.js
```

It writes `request-body.json` in this folder. It does not contact Tally.

## Change the fields

Edit `config.json`:

- `fetch` selects fields on the voucher/source object.
- `walk.collection` selects the nested collection to walk.
- `walk.fetch` selects fields on each nested row.
- `walk.parentFields` preserves selected parent values on each walked row using `Source Fetch` and `Compute`.

The generated body is intended for inspection before you send it to Tally. Verify any new TDL attribute against a working request.
