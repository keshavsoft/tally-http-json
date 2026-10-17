import noCompanyFromInternal from "./noCompany/index.js";
import tdlFromInternal from "./tdl/index.js";

const noCompany = async (headerId = "") => {
    return await noCompanyFromInternal({ inHeaderId: headerId });
};

const tdl = async (headerId = "", tdl) => {
    return await tdlFromInternal({ inHeaderId: headerId, inTdl: tdl });
};

export default noCompany;
export { noCompany, tdl };
