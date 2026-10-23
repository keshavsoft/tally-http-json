import { importLedger } from "../../../../src/index.js";

const run = async () => {
    const res = await importLedger("aa2");

    console.log("Sample:", res);
};

run().catch(console.error);