import { tdl } from "../../../src/index.js";
import tdlJson from "./tdl.json" with {type: "json"};

const run = async () => {
    const res = await tdl("KSAllBatchBalances", tdlJson);

    console.log("Sample:", res?.data?.collection[0]);
};

run().catch(console.error);