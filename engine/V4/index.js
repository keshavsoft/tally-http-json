import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import collections from "./collections.json" with { type: "json" };
import fetchCollection from "./fetch.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.join(currentDirectory, "data");
const tallyUrl = process.env.TALLY_URL || "http://localhost:9000";

const run = async () => {
    await mkdir(outputDirectory, { recursive: true });

    for (const collectionId of collections) {
        try {
            const result = await fetchCollection({
                inHeaderId: collectionId,
                inUrl: tallyUrl
            });

            const outputPath = path.join(outputDirectory, `${collectionId}.json`);
            await writeFile(outputPath, JSON.stringify(result, null, 2) + "\n", "utf8");
            console.log(`Saved ${collectionId} -> ${outputPath}`);
        } catch (error) {
            console.error(`Failed ${collectionId}: ${error.message}`);
        }
    }
};

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
