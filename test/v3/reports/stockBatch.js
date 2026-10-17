import { tdl } from "../../../src/index.js";
import tdlJson from "./tdl.json" with {type: "json"};

const run = async () => {
    const res = await tdl("KSAllBatchBalances", tdlJson);

    console.log("Sample:", res?.data?.collection);
};

run().catch(console.error);
