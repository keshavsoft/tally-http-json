import transport from "../transport.js";
import reportTemplate from "./template.js";

const report = async ({
    reportId = "Stock Summary",
    company = "mani9",
    explode = true,
    url = "http://localhost:9000"
} = {}) => {
    const inXml = reportTemplate({ reportId, company, explode });
    console.log("inXml : ", inXml);

    return transport({ inXml, url });
};

export default report;
