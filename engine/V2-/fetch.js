import body from "./body.json" with { type: "json" };

const fetchCollection = async ({
    inHeaderId,
    inUrl = "http://localhost:9000"
} = {}) => {
    const response = await fetch(inUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "version": "1",
            "tallyrequest": "Export",
            "type": "Collection",
            "id": inHeaderId
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Tally request failed for ${inHeaderId}: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};

export default fetchCollection;
