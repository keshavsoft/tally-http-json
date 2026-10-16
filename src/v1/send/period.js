import transport from "../transport.js";
import { variableTemplate } from "./templates.js";

/**
 * Story: Sending XML Payload to Tally with Period
 * 
 * 1. Wraps the TDL message into the Tally XML envelope.
 * 2. Injects SVCURRENTCOMPANY and date range into static variables.
 * 3. Delegates HTTP dispatch to transport.
 * 4. Returns the raw XML response text.
 */
const startFunc = async ({ inTdlMessage, inCompany, inFromDate, inToDate }) => {
    const localTdlMessage = inTdlMessage?.replaceAll("$$$$", "$$");
    const localCompany = inCompany;
    const localFromDate = inFromDate;
    const localToDate = inToDate;

    let localXml = variableTemplate.replace("{{TDLMESSAGE}}", () => localTdlMessage);

    if (localCompany) {
        const companyTag = `<SVCURRENTCOMPANY>${localCompany}</SVCURRENTCOMPANY>`;
        const fromDateTag = `<SVFROMDATE TYPE="Date">${localFromDate}</SVFROMDATE>`;
        const toDateTag = `<SVTODATE TYPE="Date">${localToDate}</SVTODATE>`;
        localXml = localXml.replace("{{STATICVARIABLES}}", companyTag + fromDateTag + toDateTag);
    } else {
        const fromDateTag = `<SVFROMDATE TYPE="Date">${localFromDate}</SVFROMDATE>`;
        const toDateTag = `<SVTODATE TYPE="Date">${localToDate}</SVTODATE>`;
        localXml = localXml.replace("{{STATICVARIABLES}}", fromDateTag + toDateTag);
    }

    return await transport({
        inXml: localXml
    });
};

export default startFunc;
