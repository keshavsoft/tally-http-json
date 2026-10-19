const startFunc = async ({ inBodyAsJson, inHeaderId, inUrl = "http://localhost:9000" }) => {
    const localBodyAsJson = inBodyAsJson;
    const localHeaderId = inHeaderId;
    const localUrl = inUrl;

    const response = await fetch(localUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "version": "1",
            "tallyrequest": "Export",
            "type": "Collection",
            "id": localHeaderId
        },
        body: localBodyAsJson
    });

    return await response.json();
};

export default startFunc;