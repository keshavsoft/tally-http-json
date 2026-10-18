# 02 — Receipt vouchers with ledger-entry details

## The story

This is a standalone `.http` request for Receipt vouchers. It follows the working `KSReceiptVoucherSource` → `KSReceiptLedgerEntryProbe` pattern and returns one row per ledger entry, with the parent voucher date and number attached.

Open `receipt-ledger-entries.http` in VS Code with the REST Client extension and run **Send Request**. It targets `http://localhost:9000` and company `mani9`.

This request fetches only the listed fields. It is not a request for every voucher type.
