import { readdir, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.join(currentDirectory, "data");
const collectionDirectory = path.join(currentDirectory, "collection");

const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const readJson = async (filePath) => JSON.parse(await readFile(filePath, "utf8"));
const writeJson = async (filePath, value) => writeFile(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");

// Find records/rows inside the common Tally response envelope without changing the source JSON.
const collectRows = (value, rows = []) => {
    if (Array.isArray(value)) {
        for (const item of value) collectRows(item, rows);
    } else if (isRecord(value)) {
        // A row is any object containing at least one array-valued property.
        rows.push(value);
        for (const child of Object.values(value)) {
            if (Array.isArray(child)) collectRows(child, rows);
        }
    }
    return rows;
};

const findArrayKeys = (rows) => {
    const keys = new Set();
    for (const row of rows) {
        if (!isRecord(row)) continue;
        for (const [key, value] of Object.entries(row)) {
            if (Array.isArray(value)) keys.add(key);
        }
    }
    return [...keys].sort();
};

const readDataFiles = async () => {
    await mkdir(collectionDirectory, { recursive: true });
    const files = (await readdir(dataDirectory)).filter((name) => name.endsWith(".json")).sort();
    const records = [];
    for (const name of files) records.push({ name, data: await readJson(path.join(dataDirectory, name)) });
    return records;
};

const mergeRows = (values) => values.flatMap((value) => Array.isArray(value) ? value : []);
const extractAtDepth = (rows, maxDepth, currentDepth = 1) => {
    const output = [];
    for (const row of rows) {
        if (!isRecord(row)) { output.push(row); continue; }
        const next = {};
        for (const [key, value] of Object.entries(row)) {
            if (Array.isArray(value)) {
                if (currentDepth < maxDepth) next[key] = value.map((child) => isRecord(child) ? extractAtDepth([child], maxDepth, currentDepth + 1)[0] : child);
                else next[key] = value;
            } else next[key] = value;
        }
        output.push(next);
    }
    return output;
};
const run = async () => {
    const files = await readDataFiles();
    for (const { name, data } of files) {
        const rows = collectRows(data);
        const keys = findArrayKeys(rows);
        for (const key of keys) {
            const values = [];
            for (const row of rows) if (isRecord(row) && Array.isArray(row[key])) values.push(...row[key]);
            // Keep nested array properties in the parent collection JSON, to two collection levels.
            await writeJson(path.join(collectionDirectory, `${key}.json`), extractAtDepth(values, 3));
            console.log(`${name}: ${key} (${values.length} items; nested depth 3)`);
        }
    }
};
run().catch((error) => { console.error(error); process.exitCode = 1; });
