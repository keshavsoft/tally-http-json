const stockSummaryTemplate = ({ company = "mani9", reportId = "Stock Summary", explode = true } = {}) => `
<ENVELOPE>
    <HEADER>
        <VERSION>1</VERSION>
        <TALLYREQUEST>Export</TALLYREQUEST>
        <TYPE>Data</TYPE>
        <ID>${reportId}</ID>
    </HEADER>
    <BODY>
        <DESC>
            <STATICVARIABLES>
                <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
                <SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>
                   <ITEM>Viaadi Hooks</ITEM>
                ${explode ? "<EXPLODEFLAG>Yes</EXPLODEFLAG>" : ""}
            </STATICVARIABLES>
        </DESC>
    </BODY>
</ENVELOPE>
`;

export default stockSummaryTemplate;
export { stockSummaryTemplate };
