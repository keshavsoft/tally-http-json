import noCompanyFromInternal from "./noCompany/index.js";

const noCompany = async (headerId = "") => {
    return await noCompanyFromInternal({ inHeaderId: headerId });
};

export default noCompany;
export { noCompany };
