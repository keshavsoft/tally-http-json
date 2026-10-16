import { noCompany } from "../../src/index.js";

const run = async () => {
    const res = await noCompany("Company");

    console.log("Sample:", res);
};

run().catch(console.error);
