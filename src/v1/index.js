import tallySpec from "tally-spec";
import send from "./send/index.js";
import sendPeriod from "./send/period.js";
import byId from "./byId/index.js";

/**
 * Story: Clean Tally XML Client (v12)
 * 
 * Directly imports tally-spec for TDL definitions.
 * Exposes:
 * 1. companyFilter(inPath, inCompany): Fetches masters/company from Tally given a path and company name.
 * 2. companyAndPeriodFilter(inPath, inCompany, inFromDate, inToDate): Fetches period vouchers from Tally.
 * 3. reports(): Fetches reports (e.g. Stock Summary) from Tally.
 */
const companyFilter = async (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;

    const endpoint = localPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source);

    if (!endpoint?.tdl) {
        throw new Error(`Master endpoint not found in structure: ${localPath}`);
    }

    return await send({
        inTdlMessage: endpoint.tdl,
        inCompany: localCompany
    });
};

const companyAndPeriodFilter = async (inPath, inCompany, inFromDate, inToDate) => {
    const localPath = inPath;
    const localCompany = inCompany;
    const localFromDate = inFromDate;
    const localToDate = inToDate;

    const endpoint = localPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source);

    if (!endpoint?.tdl) {
        throw new Error(`Master endpoint not found in structure: ${localPath}`);
    }

    return await sendPeriod({
        inTdlMessage: endpoint.tdl,
        inCompany: localCompany,
        inFromDate: localFromDate,
        inToDate: localToDate
    });
};

const reports = async (inPath, inCompany) => {
    const localPath = inPath;
    const localCompany = inCompany;

    const endpoint = localPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source);
    // console.log("endpoint : ", endpoint);

    if (!endpoint?.reportId) {
        throw new Error(`Master endpoint not found in structure: ${localPath}`);
    };

    return await byId({
        reportId: endpoint.reportId,
        company: localCompany
    });
};

export default companyFilter;
export { companyFilter, companyAndPeriodFilter, reports };
