import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import collections from "./collections.json" with { type: "json" };
import fetchCollection from "./fetch.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.join(currentDirectory, "output");
const tallyUrl = process.env.TALLY_URL || "http://localhost:9000";
const company = process.env.TALLY_COMPANY || "mani9";

const run = async () => {
    await mkdir(outputDirectory, { recursive: true });
    const results = [];

    for (const collection of collections) {
        try {
            const result = await fetchCollection({
                collection,
                inUrl: tallyUrl,
                company
            });
            const outputPath = path.join(outputDirectory, `${collection.id}.json`);
            await writeFile(outputPath, JSON.stringify(result, null, 2) + "\n", "utf8");
            const keys = collectKeys(result);
            results.push({ id: collection.id, objectType: collection.objectType, status: "success", keys });
            console.log(`\n[OK] ${collection.id} (${collection.objectType})`);
            console.log(`Keys: ${keys.join(", ") || "<no keys discovered>"}`);
            console.log(`Saved: ${outputPath}`);
        } catch (error) {
            results.push({ id: collection.id, objectType: collection.objectType, status: "error", error: error.message });
            console.error(`[FAILED] ${collection.id} (${collection.objectType}): ${error.message}`);
        }
    }

    const summaryPath = path.join(outputDirectory, "keys-summary.json");
    await writeFile(summaryPath, JSON.stringify(results, null, 2) + "\n", "utf8");
    console.log(`\nSummary saved: ${summaryPath}`);
};

const collectKeys = (value, keys = new Set(), seen = new Set()) => {
    if (!value || typeof value !== "object" || seen.has(value)) return [...keys].sort();
    seen.add(value);
    if (Array.isArray(value)) {
        for (const item of value) collectKeys(item, keys, seen);
    } else {
        for (const [key, child] of Object.entries(value)) {
            keys.add(key);
            collectKeys(child, keys, seen);
        }
    }
    return [...keys].sort();
};

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
