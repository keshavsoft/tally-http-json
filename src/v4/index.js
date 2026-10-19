import noCompanyFromInternal from "./noCompany/index.js";
import tdlFromInternal from "./tdl/index.js";
import fromCollectionInternal from "./fromCollection/index.js";

const noCompany = async (headerId = "") => {
    return await noCompanyFromInternal({ inHeaderId: headerId });
};

const fromCollection = async (headerId = "") => {
    return await fromCollectionInternal({ inHeaderId: headerId });
};

const tdl = async (headerId = "", tdl) => {
    return await tdlFromInternal({ inHeaderId: headerId, inTdl: tdl });
};

export default noCompany;
export { noCompany, tdl, fromCollection };
