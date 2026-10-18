import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import config from "./config.json" with { type: "json" };

const directory = path.dirname(fileURLToPath(import.meta.url));

const fetchAttributes = (fields) => fields.map((field) => ({ Fetch: field }));

const buildRequestBody = (config) => {
  const source = {
    metadata: { name: `${config.id}Source`, type: "Collection", ismodify: false },
    attributes: [
      { Type: config.objectType },
      ...(config.childOf ? [{ ChildOf: config.childOf }] : []),
      ...fetchAttributes(config.fetch)
    ]
  };

  const definitions = [source];

  if (config.walk) {
    definitions.unshift({
      metadata: { name: config.walk.id, type: "Collection", ismodify: false },
      attributes: [
        { "Source Collection": `${config.id}Source` },
        { Walk: config.walk.collection },
        ...(config.walk.parentFields?.length
          ? [{ "Source Fetch": config.walk.parentFields.join(",") }]
          : []),
        ...fetchAttributes(config.walk.fetch),
        ...(config.walk.parentFields ?? []).map((field) => ({
          Compute: `Parent${field}: $$LoopCollObj:$${field}`
        }))
      ]
    });
  }

  return {
    static_variables: [
      { name: "svExportFormat", value: "jsonex" },
      { name: "svCurrentCompany", value: "mani9" }
    ],
    tdlmessage: [{ definitions }]
  };
};

const body = buildRequestBody(config);
await writeFile(path.join(directory, "request-body.json"), `${JSON.stringify(body, null, 2)}\n`, "utf8");
console.log("Generated request-body.json. Inspect it before sending it to Tally.");
