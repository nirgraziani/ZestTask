const extractARNsFile = require("./extractARNs");
const generateHtmlTable = require("./generateHtmlTable");

(() => {
  extractARNsFile.ReadResourceFile();
  generateHtmlTable.ReadJsonResources();
})();
