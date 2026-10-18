const fetchCollection = async ({ collection, inUrl = "http://localhost:9000", company = "mani9" } = {}) => {
    if (!collection?.id || !collection?.objectType) {
        throw new TypeError("Each collection needs id and objectType");
    }

    const definition = {
        metadata: { name: collection.id, type: "Collection", ismodify: false },
        attributes: [
            { Type: collection.objectType },
            ...((collection.fetch || []).map((field) => ({ Fetch: field })))
        ]
    };
    const body = {
        static_variables: [
            { name: "svExportFormat", value: "jsonex" },
            { name: "svCurrentCompany", value: company }
        ],
        tdlmessage: [{ definitions: [definition] }]
    };

    const response = await fetch(inUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            version: "1",
            tallyrequest: "Export",
            type: "Collection",
            id: collection.id
        },
        body: JSON.stringify(body)
    });

    const responseText = await response.text();
    if (!response.ok) {
        throw new Error(`Tally request failed: ${response.status} ${response.statusText}; ${responseText.slice(0, 300)}`);
    }
    try { return JSON.parse(responseText); }
    catch { throw new Error(`Tally returned non-JSON response: ${responseText.slice(0, 300)}`); }
};

export default fetchCollection;
