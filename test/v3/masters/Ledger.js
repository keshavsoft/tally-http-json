import { noCompany } from "../../../src/index.js";

const run = async () => {
    const res = await noCompany("Ledger");

    console.log("Sample:", res?.data?.collection);
};

run().catch(console.error);
