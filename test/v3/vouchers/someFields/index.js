import fs from "fs";
import { tdl } from "../../../../src/index.js";
import tdlJson from "./tdl.json" with {type: "json"};

const run = async () => {
    const res = await tdl("Receipts", tdlJson);

    await fs.writeFileSync(
        new URL("./output.json", import.meta.url),
        JSON.stringify(res?.data?.collection, null, 2) ?? "null",
        "utf8"
    );

    const grouped = Object.groupBy(res?.data?.collection, (item) => item.vouchernumber.value);

    const counts = Object.fromEntries(
        Object.entries(grouped).map(([key, value]) => [key, value.length])
    );
    console.log("result : ", counts);
};

run().catch(console.error);
