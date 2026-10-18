import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const inputDirectory = path.resolve(currentDirectory, "../V1/output");
const outputDirectory = path.join(currentDirectory, "output");

const getType = (value) => {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    if (typeof value === "object") return "object";
    return typeof value;
};

const addObservation = (map, jsonPath, value, parentArrayPath = null) => {
    const type = getType(value);
    const current = map.get(jsonPath) || {
        path: jsonPath,
        types: new Set(),
        occurrences: 0,
        arrayLengths: [],
        sampleKeys: new Set(),
        parentArrayPath
    };
    current.types.add(type);
    current.occurrences += 1;
    if (Array.isArray(value)) current.arrayLengths.push(value.length);
    if (value && typeof value === "object" && !Array.isArray(value)) {
        for (const key of Object.keys(value)) current.sampleKeys.add(key);
    }
    if (parentArrayPath && !current.parentArrayPath) current.parentArrayPath = parentArrayPath;
    map.set(jsonPath, current);
};

const scan = (value, jsonPath, map, parentArrayPath = null, ancestors = new Set()) => {
    addObservation(map, jsonPath, value, parentArrayPath);
    if (!value || typeof value !== "object" || ancestors.has(value)) return;
    const nextAncestors = new Set(ancestors);
    nextAncestors.add(value);

    if (Array.isArray(value)) {
        for (let index = 0; index < value.length; index += 1) {
            scan(value[index], `${jsonPath}[*]`, map, jsonPath, nextAncestors);
        }
        return;
    }

    for (const [key, child] of Object.entries(value)) {
        const childPath = `${jsonPath}.${key}`;
        scan(child, childPath, map, Array.isArray(child) ? childPath : parentArrayPath, nextAncestors);
    }
};

const run = async () => {
    let files;
    try {
        files = (await readdir(inputDirectory)).filter((name) => name.endsWith(".json") && name !== "keys-summary.json");
    } catch {
        throw new Error(`Cannot read ${inputDirectory}. Run V1 first so its output JSON files exist.`);
    }
    if (files.length === 0) throw new Error(`No response JSON files found in ${inputDirectory}. Run V1 first.`);

    await mkdir(outputDirectory, { recursive: true });
    const allObservations = new Map();
    const perFile = [];

    for (const file of files.sort()) {
        const fullPath = path.join(inputDirectory, file);
        let data;
        try {
            data = JSON.parse(await readFile(fullPath, "utf8"));
        } catch (error) {
            perFile.push({ file, status: "invalid-json", error: error.message });
            console.error(`[SKIP] ${file}: ${error.message}`);
            continue;
        }

        const observations = new Map();
        scan(data, "$", observations);
        for (const [key, observation] of observations) {
            const current = allObservations.get(key) || {
                path: key,
                types: new Set(),
                files: new Set(),
                occurrences: 0,
                arrayLengths: [],
                sampleKeys: new Set()
            };
            for (const type of observation.types) current.types.add(type);
            current.files.add(file);
            current.occurrences += observation.occurrences;
            current.arrayLengths.push(...observation.arrayLengths);
            for (const sampleKey of observation.sampleKeys) current.sampleKeys.add(sampleKey);
            allObservations.set(key, current);
        }
        perFile.push({
            file,
            status: "scanned",
            rootType: getType(data),
            discoveredPaths: observations.size,
            arrayPaths: [...observations.values()].filter((item) => item.types.has("array")).map((item) => item.path).sort()
        });
        console.log(`[OK] ${file}: scanned ${observations.size} JSON paths`);
    }

    const paths = [...allObservations.values()].map((item) => ({
        path: item.path,
        types: [...item.types].sort(),
        files: [...item.files].sort(),
        occurrences: item.occurrences,
        arrayLengthMin: item.arrayLengths.length ? Math.min(...item.arrayLengths) : null,
        arrayLengthMax: item.arrayLengths.length ? Math.max(...item.arrayLengths) : null,
        sampleKeys: [...item.sampleKeys].sort()
    })).sort((a, b) => a.path.localeCompare(b.path));

    const arrayCandidates = paths.filter((item) => item.types.includes("array")).map((item) => ({
        path: item.path,
        files: item.files,
        occurrences: item.occurrences,
        arrayLengthMin: item.arrayLengthMin,
        arrayLengthMax: item.arrayLengthMax,
        itemPaths: paths.filter((candidate) => candidate.path.startsWith(`${item.path}[*]`)).map((candidate) => candidate.path)
    }));

    const report = {
        generatedAt: new Date().toISOString(),
        sourceDirectory: inputDirectory,
        filesScanned: perFile.filter((item) => item.status === "scanned").length,
        files: perFile,
        paths,
        arrayCandidates
    };

    const reportPath = path.join(outputDirectory, "key-path-report.json");
    const arraysPath = path.join(outputDirectory, "array-candidates.json");
    await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n", "utf8");
    await writeFile(arraysPath, JSON.stringify(arrayCandidates, null, 2) + "\n", "utf8");
    console.log(`\nReport: ${reportPath}`);
    console.log(`Array candidates: ${arraysPath}`);
    console.log("V2 only analyzes saved V1 responses; it does not send requests to Tally.");
};

run().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
