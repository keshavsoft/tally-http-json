import { fromCollection } from "../../../src/index.js";

const run = async () => {
    const res = await fromCollection("Unit");

    console.log("Sample:", res?.data?.collection);
};

run().catch(console.error);
