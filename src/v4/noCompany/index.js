import transport from "../transport.js";
import body from "./body.json" with { type: "json" };

const startFunc = async ({
    inHeaderId,
    inUrl = "http://localhost:9000"
} = {}) => {
    const localHeaderId = inHeaderId;
    const localUrl = inUrl;

    return transport({
        inHeaderId: localHeaderId,
        inUrl: localUrl,
        inBodyAsJson: JSON.stringify(body)
    });
};

export default startFunc;
