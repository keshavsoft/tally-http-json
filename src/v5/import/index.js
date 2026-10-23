import transport from "../transport.js";
import body from "./body.json" with { type: "json" };

const startFunc = async (name) => {
    body.tallymessage[0].metadata.name = name;
    body.tallymessage[0].name = name;

    return await transport({
        inHeaderId: "All Masters",
        inTallyrequest: "Import",
        inType: "Data",
        inBodyAsJson: JSON.stringify(body)
    });
};

export default startFunc;
