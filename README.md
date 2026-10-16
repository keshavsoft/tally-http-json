# tally-extract

Fast, typed Tally XML & JSON client for Node.js, driven directly by structure specifications.

[![npm version](https://img.shields.io/npm/v/tally-extract.svg)](https://www.npmjs.com/package/tally-extract)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Features

- **Dual Return Flavor:** Query raw TDL XML responses or automatically parsed JSON objects.
- **Autocomplete Tree:** Fully typed dot-notation interface with IntelliSense for all endpoints (e.g. `tally.company.fetch()`, `tally.masters.units.all()`).
- **Direct Route Calls:** Invoke endpoints flexibly with path strings using `call()` or `asJson()`.
- **Zero Schema Dependencies:** Pure ES Module client with built-in TypeScript declarations.

---

## Installation

```bash
npm install tally-extract
```

---

## Usage

Ensure your local Tally instance is running with ODBC / HTTP server enabled (default port `9000`).

### 1. Autocomplete Dot-Notation

```javascript
import tally from "tally-extract";

// 1. Fetch raw XML string
const xml = await tally.company.fetch("Company Name");
console.log(xml);

// 2. Fetch parsed JSON object directly
const json = await tally.company.fetch.asJson("Company Name");
console.log(json);

// Master routes
const units = await tally.masters.units.all.asJson("Company Name");
const stockItems = await tally.masters.stockItems.withBatches.asJson("Company Name");
```

### 2. Direct Route Invocation

```javascript
import { call, asJson, getJson } from "tally-extract";

// Raw XML
const rawXml = await call("tally.company.fetch", "Company Name");

// Parsed JSON
const data = await asJson("tally.masters.units.all", "Company Name");
```

---

## TypeScript Support

Full TypeScript IntelliSense definitions are bundled out of the box:

```typescript
import tally, { call, asJson } from "tally-extract";
```

All routes, parameter hints, and method signatures are auto-completed in VS Code and modern IDEs.

---

## License

[MIT](LICENSE) © [KeshavSoft](https://github.com/keshavsoft)
