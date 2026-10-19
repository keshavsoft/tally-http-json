import transport from "../transport.js";
import { variableTemplate } from "./templates.js";

/**
 * Story: Sending XML Payload to Tally
 * 
 * 1. Wraps the TDL message into the Tally XML envelope.
 * 2. Injects SVCURRENTCOMPANY if a company name is supplied.
 * 3. Delegates HTTP dispatch to transport.
 * 4. Returns the raw XML response text.
 */
const startFunc = async ({ inTdlMessage, inCompany }) => {
    const localTdlMessage = inTdlMessage;
    const localCompany = inCompany;

    let localXml = variableTemplate.replace("{{TDLMESSAGE}}", () => localTdlMessage);

    if (localCompany) {
        const companyTag = `<SVCURRENTCOMPANY>${localCompany}</SVCURRENTCOMPANY>`;
        localXml = localXml.replace("{{STATICVARIABLES}}", companyTag);
    } else {
        localXml = localXml.replace("{{STATICVARIABLES}}", "");
    }
    console.log("localXml : ", localXml);

    return await transport({
        inXml: localXml
    });
};

export default startFunc;
