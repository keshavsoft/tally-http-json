import noCompanyFromInternal from "./noCompany/index.js";
import tdlFromInternal from "./tdl/index.js";
import fromCollectionInternal from "./fromCollection/index.js";
import fromimport from "./import/index.js";

const noCompany = async (headerId = "") => {
    return await noCompanyFromInternal({ inHeaderId: headerId });
};

const fromCollection = async (headerId = "") => {
    return await fromCollectionInternal({ inHeaderId: headerId });
};

const tdl = async (headerId = "", tdl) => {
    return await tdlFromInternal({ inHeaderId: headerId, inTdl: tdl });
};

const importLedger = async (name) => {
    return await fromimport(name);
};

export default noCompany;
export { noCompany, tdl, fromCollection, importLedger };
